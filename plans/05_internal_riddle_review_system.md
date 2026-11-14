# Internal Riddle Review System (Level + Translation Compliance)

## Overview

Some Hebrew translations are poor (e.g. `gym-2`: `"...ויש עליו זבובים אךiano לא מטוס?"`, which has stray Latin
text in the middle of the Hebrew). Before we fix translations, we need a way to **record internal reviews** for each
riddle:

1. **Level**: how hard the riddle really is (our own judgment).
2. **Language compliance**: for translated riddles, how good the Hebrew is (correct, natural, and still working as a
   riddle).
3. **Comments**: free text for each of the above.

This data is **internal only**. End users must never see it, and it must not end up in the deployed site.

This is step 1: capture and store reviews. Fixing bad translations is a later step that will use this data.

---

## Current State

- The data lives in `src/assets/gym-for-the-brain.ts` (300 riddles, 284 with `textHe`) and
  `src/assets/ultimate-collection.ts` (500 riddles, no Hebrew).
- `Riddle` (`src/models/riddle.ts`) has an optional public `difficulty` field. No riddle sets it yet.
- The site is a static Vite build deployed to GitHub Pages (`.github/workflows/deploy.yml`). **Anything imported from
  `src/` is shipped to the browser**, so internal data must not live in, or be imported by, `src/`.
- A quick scan finds about 25 `textHe` values that contain Latin letters, a cheap signal of broken translations.
- Plan 04 (difficulty leveling) proposes *automatic* difficulty scoring. Human level ratings from this plan act as
  the ground truth to calibrate it.

---

## Design Decisions

### 1. Storage: a separate JSON file outside `src/`

```
data/reviews/
  riddle-reviews.json        # all reviews, keyed by riddle id
  README.md                  # rubric + how to use the CLI
```

- Committed to git, so it gets history, diffs, and PR review of the reviews themselves.
- Not under `src/` and never imported by the frontend, so it is not part of the bundle.
- Keyed by riddle `id` (`gym-12`, `ultimate-collection-40`). IDs are already stable and unique.
- One file is fine at about 800 riddles. Split by collection later if it grows.

**Alternatives considered:**

| Option | Why not (for now) |
|---|---|
| Add fields to the `Riddle` objects in `src/assets/*.ts` | They would ship to users and mix public and internal data |
| External DB or spreadsheet | Adds infra and auth. Not versioned with the data |
| Comments inline in the TS files | Not structured or queryable |

### 2. Schema

New file `backend/types/review.ts` (backend-only, never imported from `src/`):

```ts
export type ReviewStatus = 'unreviewed' | 'ok' | 'needs-fix' | 'fixed' | 'drop';
export type ReviewSource = 'human' | 'heuristic' | 'llm';

/** 1 = very easy … 5 = very hard */
export type LevelRating = 1 | 2 | 3 | 4 | 5;

/** 1 = unusable … 5 = native quality (see rubric) */
export type ComplianceRating = 1 | 2 | 3 | 4 | 5;

export type TranslationIssue =
  | 'foreign-chars'        // Latin/garbage text inside the Hebrew
  | 'grammar'              // gender/number agreement, verb forms, syntax
  | 'literal'              // word-for-word, unnatural phrasing
  | 'wordplay-lost'        // the riddle depends on an English pun that doesn't work in Hebrew
  | 'solution-mismatch'    // solutionHe doesn't answer textHe (or differs from solution)
  | 'meaning-changed'      // translation changes facts of the riddle
  | 'missing'              // textHe or solutionHe absent / empty
  | 'spelling'
  | 'other';

export interface LevelReview {
  rating: LevelRating;
  comment?: string;
  source: ReviewSource;
  reviewedAt: string;          // ISO date
}

export interface TranslationReview {
  language: 'he';              // ready for more languages later
  rating: ComplianceRating;
  issues: TranslationIssue[];
  comment?: string;
  /** reserved for the next step (fixing); not filled in step 1 */
  suggestedText?: string;
  suggestedSolution?: string;
  source: ReviewSource;
  reviewedAt: string;
}

export interface RiddleReview {
  riddleId: string;
  status: ReviewStatus;
  level?: LevelReview;
  translations?: TranslationReview[];   // only for riddles that have a translation
  generalComment?: string;
  /** hash of text/textHe/solution/solutionHe at review time → detects stale reviews */
  contentHash: string;
}

export interface ReviewsFile {
  version: 1;
  updatedAt: string;
  reviews: Record<string, RiddleReview>;
}
```

Notes:
- **Level uses a 1–5 scale** rather than easy/medium/hard. It is finer for calibration and maps simply to the public
  field later (1–2 → easy, 3 → medium, 4–5 → hard).
- **`contentHash`**: when a riddle's text changes (for example after a translation fix), the review is marked stale and
  needs another look.
- **`source`** tells human judgments apart from automatic pre-flags, so heuristics never overwrite a human rating.

### 3. Compliance rubric (goes in `data/reviews/README.md`)

| Score | Meaning |
|---|---|
| 5 | Natural, correct Hebrew. The riddle works as well as in English |
| 4 | Correct, slightly awkward wording. The riddle still works |
| 3 | Understandable, but clearly translated or has minor errors. Should be improved |
| 2 | Wrong grammar or meaning, or the riddle no longer works (lost wordplay). Must be fixed |
| 1 | Broken: garbage characters, nonsense, or a wrong solution. Hide or rewrite |

Rule of thumb: a riddle whose answer depends on English wordplay gets at most 2 unless it was *adapted*, not just
translated.

---

## Implementation Steps

### Phase 1: Types, file, and validation
1. Add `backend/types/review.ts` with the schema above.
2. Add `backend/reviews/review-store.ts` to load and save `data/reviews/riddle-reviews.json` with stable key order
   (sorted by id) so diffs stay clean.
3. Add `backend/reviews/riddle-loader.ts` to load all riddles from both collections for the backend scripts (reuse the
   same merge logic as `RiddleContext`).
4. Add a validation function that checks:
   - every `riddleId` exists,
   - ratings are in range,
   - `translations` only appear on riddles that have `textHe`,
   - stale `contentHash` values are reported.

### Phase 2: CLI commands (extend `backend/cli/commands.ts`)
- `npm run cli review show <id>`: prints EN and HE side by side with the current review.
- `npm run cli review set <id> --level 3 --level-comment "..."`
- `npm run cli review set <id> --he 2 --issues literal,grammar --he-comment "..."`
- `npm run cli review next [--collection gym] [--only-translated]`: an interactive loop (readline is already used)
  that shows the next unreviewed riddle and asks for level, compliance, issues, and a comment. This is the main
  reviewing workflow.
- `npm run cli review stats`: counts by status, level histogram, compliance histogram, top issues.
- `npm run cli review export --format csv|md`: exports a list such as "all riddles with HE compliance ≤ 2" for the
  fix step, or for reviewers who prefer a spreadsheet.
- `npm run cli review validate`: runs the Phase 1 checks and exits non-zero on errors.

### Phase 3: Automatic pre-flagging (heuristic seed)
Script `backend/scripts/flag-translations.ts` fills `translations[]` with `source: 'heuristic'` and
`status: 'needs-fix'` for:
- Latin letters inside `textHe` or `solutionHe` (`foreign-chars`, about 25 hits today),
- missing `textHe` or `solutionHe` when the other one exists (`missing`),
- suspicious length ratio between `text` and `textHe` (`meaning-changed`?, low confidence),
- solutions that are English words or letters, where wordplay is likely (`wordplay-lost`?, low confidence).

A human then confirms or corrects each flag. Heuristics never overwrite a `human` entry.

*(Optional, later: an LLM pass, `source: 'llm'`, that proposes a compliance score and issues for each riddle. Keep it
out of step 1.)*

### Phase 4: Keep it internal (guardrails)
- Add a CI step (`.github/workflows/ci.yml`) that runs `review validate`.
- Add a CI check that fails if anything under `src/` imports from `data/reviews` or `backend/types/review`. A simple
  grep in CI is enough, or add an ESLint `no-restricted-imports` rule later.
- After `vite build`, grep `dist/` for a sentinel key (for example `"contentHash"`) to prove the reviews are not in the
  bundle.
- Do not copy `data/reviews` in `deploy.yml` (today it only copies `data/04-process/*.json`, which is fine).

### Phase 5 (optional): Dev-only review UI
Only if the CLI feels too slow for reviewing Hebrew text (RTL in terminals can be painful):
- A route such as `/__review` that is registered only when `import.meta.env.DEV`, and loads the reviews through a small
  Vite dev-server middleware (`vite.config.ts` `configureServer`) that reads and writes the JSON file.
- Production builds drop this code, and the Phase 4 bundle check confirms it.
- Recommended only after the CLI flow is in use.

---

## Files to Add or Change

| File | Change |
|---|---|
| `backend/types/review.ts` | **new**: schema |
| `backend/reviews/review-store.ts` | **new**: load, save, validate |
| `backend/reviews/riddle-loader.ts` | **new**: load riddles for backend use |
| `backend/cli/commands.ts`, `backend/cli/index.ts` | add the `review` command group |
| `backend/scripts/flag-translations.ts` | **new**: heuristic pre-flagging |
| `data/reviews/riddle-reviews.json` | **new**: data, starts empty or seeded by Phase 3 |
| `data/reviews/README.md` | **new**: rubric and workflow |
| `.github/workflows/ci.yml` | validate reviews and the "not in bundle" check |
| `package.json` | scripts: `reviews:flag`, `reviews:validate` |

No changes to `src/` in this step.

---

## How This Feeds the Next Steps

- **Fixing translations (next step):** `review export --he-max 2` gives the worklist. Fixes go into
  `suggestedText` and `suggestedSolution` first, then get applied to `src/assets`. The `contentHash` change flags the
  review for a re-check, and the status becomes `fixed`.
- **Hiding bad translations meanwhile (optional):** a build-time script could emit a list of riddle ids with
  compliance 1. The Hebrew view would then skip those riddles. Only ids ship, never scores or comments.
- **Difficulty (plan 04):** human `level.rating` values are the labelled set for tuning the automatic scorer, and can
  later be promoted into the public `difficulty` field.

---

## Open Questions

1. Who reviews? If several people review, should each review hold a `reviewer` name, or is one rating per riddle
   enough?
2. Is a 1–5 level scale acceptable, or do we want to rate directly with easy, medium, and hard?
3. Should riddles with compliance 1 be hidden from the Hebrew view right away, before the fix step?
4. Should the Phase 5 dev UI be in scope, or is the CLI enough?
