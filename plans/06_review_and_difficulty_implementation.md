# Plan 06: Internal Reviews + Difficulty Levels (Implementation)

> **Status:** Not started
> **Implements:** `04_riddle_difficulty_leveling_system.md` + `05_internal_riddle_review_system.md`
> When every stage below is checked, mark this plan, 04 and 05 "✅ Done" and move all three to `plans/archive/`.

## Why one plan

Plans 04 and 05 depend on each other:

- Plan 05 (reviews) produces **human level ratings**, which are the ground truth plan 04 needs to tune its scorer.
- Plan 04 (auto difficulty) gives every riddle a **starting level**, so reviewers confirm or change a number
  instead of starting from nothing.
- Both need the same base pieces: a backend riddle loader, a stable review store, a CLI, and a guard that keeps
  internal data out of the shipped site.

So we build the shared base once, then the auto scorer and the translation pre-flags, then the review workflow,
then tune the scorer against the human ratings, and only then publish `difficulty` to the site.

## Decisions (open questions from plan 05, answered)

| Question | Decision |
|---|---|
| Who reviews? | One review per riddle, with an optional `reviewer` name. Multi-reviewer can come later |
| Level scale | 1–5 internally. Public mapping: 1–2 → `easy`, 3 → `medium`, 4–5 → `hard` |
| Hide Hebrew riddles with compliance 1? | Yes, but only in Stage 7, through a generated list of ids |
| Dev review UI (plan 05, phase 5) | Out of scope. Optional Stage 8 |
| Plan 04 approach | Hybrid weighted score (plan 04, option 7) **without** the clue metric: no riddle has a `clue` today |
| Unit tests | Node's built-in runner through `tsx --test`, so no new dependency |

## Facts from the current code

- `src/assets/gym-for-the-brain.ts`: 300 riddles, 284 with `textHe`, all with a solution, no clues.
- `src/assets/ultimate-collection.ts`: 500 riddles, English only, no categories or source (these are added in
  `src/context/RiddleContext.tsx`).
- `src/components/RiddleCard.tsx:48` falls back to `"easy"` when `difficulty` is missing, so every card says "easy" today.
- `backend/cli/` uses `commander` and already uses `readline` for interactive mode.
- `.github/workflows/ci.yml` runs only Playwright, and `deploy.yml` copies only `data/04-process/*.json`.
- **Rule:** nothing under `src/` may import from `backend/` or `data/reviews/`. The backend *may* import from `src/`.

## Target layout

```
backend/
  reviews/
    types.ts              # review schema (internal)
    riddle-loader.ts      # all riddles for Node scripts
    content-hash.ts
    review-store.ts       # load / save / validate riddle-reviews.json
    flag-translations.ts  # heuristic translation flags
    *.test.ts
  difficulty/
    features.ts           # measurable features of one riddle
    scorer.ts             # features → score → 1..5
    weights.json          # tunable weights + thresholds
    calibrate.ts          # compare auto vs human
    *.test.ts
  cli/
    review-commands.ts    # `npm run cli review …`
  scripts/
    publish-difficulty.ts # writes the public generated file (Stage 7)
    check-no-leak.sh      # CI guard (Stage 5)
data/reviews/
  riddle-reviews.json     # internal reviews (committed, never shipped)
  README.md               # rubric + workflow
src/assets/
  index.ts                         # shared `allRiddles` (new, Stage 1)
  riddle-meta.generated.ts         # public: id → difficulty, hidden-he ids (Stage 7)
```

---

## Stage 1: Shared base (loader, schema, store)

**Goal:** Node scripts can load every riddle and read and write a validated `riddle-reviews.json`.

- [ ] 1.1 Move the riddle merge out of `RiddleContext.tsx` into `src/assets/index.ts`, and use it from both the
      context and the backend (one source of truth)
- [ ] 1.2 Add `backend/reviews/types.ts` (schema below)
- [ ] 1.3 Add `backend/reviews/content-hash.ts`
- [ ] 1.4 Add `backend/reviews/review-store.ts` (load, save with sorted keys, upsert)
- [ ] 1.5 Add `validateReviews()` to the store
- [ ] 1.6 Create `data/reviews/riddle-reviews.json` (empty) and `data/reviews/README.md` (rubric from plan 05)
- [ ] 1.7 Add the `test:unit` script and the first tests (hash stability, validation errors)
- [ ] 1.8 `npm run build` and `npm run test:e2e` still pass (the context refactor must not change behavior)

**1.1 `src/assets/index.ts`**

```ts
import type { Riddle } from '../models/riddle';
import { riddlesDataGym } from './gym-for-the-brain';
import { ultimateRiddleCollection } from './ultimate-collection';

const ultimate: Riddle[] = ultimateRiddleCollection.riddles.map(r => ({
  ...r,
  categories: [],
  source: { book: 'Ultimate 500 Riddles Collection' },
}) satisfies Riddle);

export const allRiddles: Riddle[] = [...riddlesDataGym.riddles, ...ultimate];
```

`RiddleContext.tsx` then imports `allRiddles` from `../assets` and drops its own copy.

`backend/reviews/riddle-loader.ts`:

```ts
import { allRiddles } from '../../src/assets/index.js';
import type { Riddle } from '../../src/models/riddle.js';

export type Collection = 'gym' | 'ultimate';

export function collectionOf(id: string): Collection {
  return id.startsWith('gym-') ? 'gym' : 'ultimate';
}

export function loadRiddles(filter?: { collection?: Collection; onlyTranslated?: boolean }): Riddle[] {
  return allRiddles.filter(r =>
    (!filter?.collection || collectionOf(r.id) === filter.collection) &&
    (!filter?.onlyTranslated || Boolean(r.textHe?.trim())));
}

export const riddleById = new Map(allRiddles.map(r => [r.id, r]));
```

**1.2 `backend/reviews/types.ts`**: plan 05's schema, plus an `autoLevel` slot so the auto score sits next to the
human one (which calibration needs), and an optional `reviewer`:

```ts
export type ReviewStatus = 'unreviewed' | 'ok' | 'needs-fix' | 'fixed' | 'drop';
export type ReviewSource = 'human' | 'heuristic' | 'llm';
export type Rating = 1 | 2 | 3 | 4 | 5;

export type TranslationIssue =
  | 'foreign-chars' | 'grammar' | 'literal' | 'wordplay-lost' | 'solution-mismatch'
  | 'meaning-changed' | 'missing' | 'spelling' | 'other';

export interface LevelReview {
  rating: Rating;               // 1 very easy … 5 very hard
  comment?: string;
  source: ReviewSource;         // always 'human' in practice
  reviewer?: string;
  reviewedAt: string;           // ISO date
}

/** Written only by the scorer. Never edited by hand. */
export interface AutoLevel {
  score: number;                // 0..1
  rating: Rating;
  scorerVersion: string;        // from weights.json, e.g. "1.0"
}

export interface TranslationReview {
  language: 'he';
  rating?: Rating;              // unset while only heuristically flagged
  issues: TranslationIssue[];
  comment?: string;
  suggestedText?: string;       // reserved for the fix step
  suggestedSolution?: string;
  source: ReviewSource;
  reviewer?: string;
  reviewedAt: string;
}

export interface RiddleReview {
  riddleId: string;
  status: ReviewStatus;
  level?: LevelReview;
  autoLevel?: AutoLevel;
  translations?: TranslationReview[];
  generalComment?: string;
  contentHash: string;
}

export interface ReviewsFile {
  version: 1;
  updatedAt: string;
  reviews: Record<string, RiddleReview>;
}
```

**1.3 `backend/reviews/content-hash.ts`**

```ts
import { createHash } from 'node:crypto';
import type { Riddle } from '../../src/models/riddle.js';

export function contentHash(r: Riddle): string {
  const payload = JSON.stringify([r.text, r.textHe ?? '', r.solution ?? '', r.solutionHe ?? '']);
  return createHash('sha1').update(payload).digest('hex').slice(0, 12);
}
```

**1.4–1.5 `backend/reviews/review-store.ts`**

```ts
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { ReviewsFile, RiddleReview } from './types.js';
import { riddleById } from './riddle-loader.js';
import { contentHash } from './content-hash.js';

export const REVIEWS_PATH = path.resolve('data/reviews/riddle-reviews.json');

export function loadReviews(file = REVIEWS_PATH): ReviewsFile {
  if (!fs.existsSync(file)) return { version: 1, updatedAt: new Date().toISOString(), reviews: {} };
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/** Stable output: reviews sorted by natural id order, so diffs stay small. */
export function saveReviews(data: ReviewsFile, file = REVIEWS_PATH): void {
  const ids = Object.keys(data.reviews).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  const reviews = Object.fromEntries(ids.map(id => [id, data.reviews[id]]));
  const out: ReviewsFile = { ...data, updatedAt: new Date().toISOString(), reviews };
  fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
}

export function getOrCreate(data: ReviewsFile, riddleId: string): RiddleReview {
  const riddle = riddleById.get(riddleId);
  if (!riddle) throw new Error(`Unknown riddle id: ${riddleId}`);
  return (data.reviews[riddleId] ??= { riddleId, status: 'unreviewed', contentHash: contentHash(riddle) });
}

export interface ValidationResult { errors: string[]; stale: string[] }

export function validateReviews(data: ReviewsFile): ValidationResult {
  const errors: string[] = [];
  const stale: string[] = [];
  const inRange = (n: unknown) => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= 5;

  for (const [id, rev] of Object.entries(data.reviews)) {
    const riddle = riddleById.get(id);
    if (!riddle) { errors.push(`${id}: riddle does not exist`); continue; }
    if (rev.riddleId !== id) errors.push(`${id}: riddleId mismatch (${rev.riddleId})`);
    if (rev.level && !inRange(rev.level.rating)) errors.push(`${id}: level.rating out of range`);
    for (const t of rev.translations ?? []) {
      if (!riddle.textHe) errors.push(`${id}: has a translation review but no textHe`);
      if (t.rating !== undefined && !inRange(t.rating)) errors.push(`${id}: translation rating out of range`);
    }
    if (rev.contentHash !== contentHash(riddle)) stale.push(id);
  }
  return { errors, stale };
}
```

**1.7 Tests:** add to `package.json`:

```json
"test:unit": "tsx --test backend/**/*.test.ts"
```

```ts
// backend/reviews/review-store.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateReviews } from './review-store.js';

test('unknown riddle id is an error', () => {
  const { errors } = validateReviews({ version: 1, updatedAt: '', reviews: {
    'nope-1': { riddleId: 'nope-1', status: 'ok', contentHash: 'x' },
  }});
  assert.match(errors[0], /does not exist/);
});

test('level rating out of range is an error', () => { /* rating: 7 → error */ });
test('changed text marks the review stale', () => { /* wrong contentHash → stale contains id */ });
```

---

## Stage 2: Automatic difficulty scorer (plan 04)

**Goal:** every riddle gets an `autoLevel` (score 0..1 → rating 1..5) from measurable features.

- [ ] 2.1 `backend/difficulty/features.ts`: pure feature extraction, each feature normalized to 0..1
- [ ] 2.2 `backend/difficulty/weights.json`: weights + rating thresholds + `version`
- [ ] 2.3 `backend/difficulty/scorer.ts`: weighted sum → rating
- [ ] 2.4 Unit tests with handpicked riddles (a short object riddle must score below a long logic puzzle)
- [ ] 2.5 Script `npm run reviews:score` writes `autoLevel` for all 800 riddles into the reviews file
      (never touches `level`)
- [ ] 2.6 Check the spread: about 40% / 35% / 25% easy/medium/hard after mapping (plan 04's target). Adjust thresholds
      if it's far off

**Features** (plan 04's options 1, 2, 3, 4 and 6; option 5 "clues" is dropped because no riddle has a clue):

| Feature | How | Normalize |
|---|---|---|
| `length` | `text.length` | clamp((len − 40) / 360) |
| `sentences` | split on `[.!?]` | clamp((n − 1) / 4) |
| `numbers` | digits + number words, count; large numbers or operators add more | clamp(hits / 4) |
| `logic` | keywords: `if, then, but, not, never, only, each, every, how many, older, younger, true, lie` | clamp(hits / 4) |
| `solutionLength` | words in `solution` | clamp((words − 1) / 8) |
| `abstractSolution` | solution is not a short concrete noun phrase (no `a/an/the` + ≤2 words) | 0 or 1 |

English text only. Every riddle has English, so one scale fits all, and Hebrew can't skew it.

**2.1 `backend/difficulty/features.ts`**

```ts
import type { Riddle } from '../../src/models/riddle.js';

export type FeatureName = 'length' | 'sentences' | 'numbers' | 'logic' | 'solutionLength' | 'abstractSolution';
export type Features = Record<FeatureName, number>;

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const NUMBER_WORDS = /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|hundred|thousand|half|twice|double)\b/gi;
const LOGIC_WORDS = /\b(if|then|but|not|never|only|each|every|how many|older|younger|truth|lie|always|both|neither)\b/gi;

export function extractFeatures(r: Riddle): Features {
  const text = r.text;
  const solution = r.solution ?? '';
  const count = (re: RegExp, s: string) => (s.match(re) ?? []).length;

  const digitHits = count(/\d+/g, text);
  const bigNumbers = count(/\d{3,}/g, text);
  const operators = count(/[+\-×*/=%]/g, text);
  const solutionWords = solution.trim().split(/\s+/).filter(Boolean).length;

  return {
    length: clamp((text.length - 40) / 360),
    sentences: clamp((text.split(/[.!?]+/).filter(s => s.trim()).length - 1) / 4),
    numbers: clamp((digitHits + count(NUMBER_WORDS, text) + bigNumbers + operators) / 4),
    logic: clamp(count(LOGIC_WORDS, text) / 4),
    solutionLength: clamp((solutionWords - 1) / 8),
    abstractSolution: /^(an?|the)?\s*\S+(\s\S+)?$/i.test(solution.trim()) ? 0 : 1,
  };
}
```

**2.2 `backend/difficulty/weights.json`** (starting values from plan 04, with the clue weight spread to the others):

```json
{
  "version": "1.0",
  "weights": {
    "length": 0.25, "sentences": 0.15, "numbers": 0.2,
    "logic": 0.15, "solutionLength": 0.15, "abstractSolution": 0.1
  },
  "thresholds": [0.12, 0.25, 0.4, 0.55]
}
```

`thresholds` are the cut points between ratings 1|2|3|4|5.

**2.3 `backend/difficulty/scorer.ts`**

```ts
import weightsConfig from './weights.json' with { type: 'json' };
import { extractFeatures, type FeatureName } from './features.js';
import type { AutoLevel, Rating } from '../reviews/types.js';
import type { Riddle, RiddleDifficulty } from '../../src/models/riddle.js';

export function scoreRiddle(r: Riddle, cfg = weightsConfig): AutoLevel {
  const f = extractFeatures(r);
  const score = (Object.keys(cfg.weights) as FeatureName[])
    .reduce((sum, k) => sum + f[k] * cfg.weights[k], 0);
  const rating = (1 + cfg.thresholds.filter(t => score >= t).length) as Rating;
  return { score: Number(score.toFixed(3)), rating, scorerVersion: cfg.version };
}

export function toPublicDifficulty(rating: Rating): RiddleDifficulty {
  return rating <= 2 ? 'easy' : rating === 3 ? 'medium' : 'hard';
}
```

**2.5 `backend/scripts/score-difficulty.ts`** → `"reviews:score": "tsx backend/scripts/score-difficulty.ts"`

```ts
const data = loadReviews();
const buckets = { easy: 0, medium: 0, hard: 0 };
for (const r of loadRiddles()) {
  const rev = getOrCreate(data, r.id);
  rev.autoLevel = scoreRiddle(r);
  buckets[toPublicDifficulty(rev.autoLevel.rating)]++;
}
saveReviews(data);
console.table(buckets);
```

---

## Stage 3: Translation pre-flags (plan 05, phase 3)

**Goal:** suspect Hebrew translations are marked `needs-fix` with a reason, so reviewers start with the worst ones.

- [ ] 3.1 `backend/reviews/flag-translations.ts` with one pure function per check
- [ ] 3.2 Script `npm run reviews:flag`. It is idempotent: it replaces earlier `heuristic` entries and never touches
      `human` ones
- [ ] 3.3 Unit tests (the `gym-2` "אךiano" case must be flagged `foreign-chars`)
- [ ] 3.4 Run it and commit the seeded file. Expect about 25 `foreign-chars` hits

| Check | Issue | Confidence |
|---|---|---|
| Latin letters in `textHe` / `solutionHe` | `foreign-chars` | high |
| `textHe` without `solutionHe` (or the other way) | `missing` | high |
| `textHe.length / text.length` outside 0.35–1.3 | `meaning-changed` | low |
| English solution is one word or letter and the text mentions `letter`, `word`, `spell`, `rhymes` | `wordplay-lost` | low |

```ts
// backend/reviews/flag-translations.ts
import type { Riddle } from '../../src/models/riddle.js';
import type { TranslationIssue } from './types.js';

const LATIN = /[A-Za-z]/;

export function detectIssues(r: Riddle): TranslationIssue[] {
  if (!r.textHe && !r.solutionHe) return [];
  const issues = new Set<TranslationIssue>();
  if (LATIN.test(r.textHe ?? '') || LATIN.test(r.solutionHe ?? '')) issues.add('foreign-chars');
  if (Boolean(r.textHe?.trim()) !== Boolean(r.solutionHe?.trim())) issues.add('missing');
  if (r.textHe) {
    const ratio = r.textHe.length / r.text.length;
    if (ratio < 0.35 || ratio > 1.3) issues.add('meaning-changed');
  }
  if (/\b(letter|word|spell|rhymes?)\b/i.test(r.text)) issues.add('wordplay-lost');
  return [...issues];
}
```

```ts
// backend/scripts/flag-translations.ts (core loop)
for (const r of loadRiddles({ onlyTranslated: true })) {
  const issues = detectIssues(r);
  const rev = getOrCreate(data, r.id);
  const human = rev.translations?.filter(t => t.source === 'human') ?? [];
  if (human.length) continue;                          // humans win
  rev.translations = issues.length
    ? [{ language: 'he', issues, source: 'heuristic', reviewedAt: today }]
    : undefined;
  if (issues.length && rev.status === 'unreviewed') rev.status = 'needs-fix';
}
```

---

## Stage 4: Review CLI (plan 05, phase 2)

**Goal:** reviewing is fast enough that a person can do 50+ riddles in one sitting.

- [ ] 4.1 `backend/cli/review-commands.ts` with a `review` command group, registered in `backend/cli/index.ts`
- [ ] 4.2 `review show <id>`: EN and HE text, solutions, auto level, current review, stale warning
- [ ] 4.3 `review set <id> [--level N] [--level-comment] [--he N] [--issues a,b] [--he-comment] [--status] [--reviewer]`
- [ ] 4.4 `review next [--collection gym|ultimate] [--only-translated] [--flagged-first]`: interactive loop
- [ ] 4.5 `review stats`: status counts, human level histogram, auto level histogram, HE compliance histogram, top issues
- [ ] 4.6 `review export --format csv|md [--he-max N] [--status needs-fix]`
- [ ] 4.7 `review validate`: exits 1 on errors, prints stale ids as warnings
- [ ] 4.8 `package.json` shortcuts: `"review": "npm run cli review"`, `"reviews:validate": "npm run cli review validate"`

**4.1 Registration**

```ts
// backend/cli/review-commands.ts
import { Command } from 'commander';

export function reviewCommand(program: Command): void {
  const review = program.command('review').description('Internal riddle reviews (not shipped)');
  review.command('show <id>').action(showAction);
  review.command('set <id>')
    .option('--level <n>', 'difficulty 1-5', parseRating)
    .option('--level-comment <text>')
    .option('--he <n>', 'Hebrew compliance 1-5', parseRating)
    .option('--issues <list>', 'comma-separated TranslationIssue values', parseIssues)
    .option('--he-comment <text>')
    .option('--status <status>')
    .option('--reviewer <name>')
    .action(setAction);
  review.command('next')
    .option('--collection <c>').option('--only-translated').option('--flagged-first')
    .action(nextAction);
  review.command('stats').action(statsAction);
  review.command('export').option('--format <f>', 'csv|md', 'md')
    .option('--he-max <n>', '', Number).option('--status <s>').action(exportAction);
  review.command('validate').action(validateAction);
}

function parseRating(v: string): Rating {
  const n = Number(v);
  if (![1, 2, 3, 4, 5].includes(n)) throw new Error(`Rating must be 1-5, got ${v}`);
  return n as Rating;
}
```

**4.4 Interactive loop** (the main workflow). Pressing Enter accepts the auto level:

```
$ npm run review next -- --only-translated --flagged-first

[12/284]  gym-2   status: needs-fix   flags: foreign-chars
EN  What has both wheels and flies but is not an aircraft?    → A garbage truck
HE  מה יש לו גלגלים ויש עליו זבובים אךiano לא מטוס?             → משאית זבל
auto level: 2 (score 0.18)

Level 1-5 [Enter=2, s=skip, q=quit]: 2
Level comment (optional):
HE compliance 1-5: 1
Issues [foreign-chars] (comma list, Enter=keep): foreign-chars,grammar
HE comment (optional): garbage text mid-sentence
✔ saved gym-2 → status needs-fix
```

```ts
async function nextAction(opts: NextOptions) {
  const data = loadReviews();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q: string) => new Promise<string>(res => rl.question(q, res));

  for (const riddle of queue(data, opts)) {          // unreviewed or stale; flagged first if asked
    printRiddle(riddle, data.reviews[riddle.id]);
    const rev = getOrCreate(data, riddle.id);
    const auto = rev.autoLevel?.rating;

    const lvl = (await ask(`Level 1-5 [Enter=${auto ?? '-'}, s=skip, q=quit]: `)).trim();
    if (lvl === 'q') break;
    if (lvl === 's') continue;
    rev.level = { rating: parseRating(lvl || String(auto)), source: 'human', reviewedAt: today() };
    // … level comment, then HE compliance + issues + comment when riddle.textHe exists
    rev.status = hasProblems(rev) ? 'needs-fix' : 'ok';
    rev.contentHash = contentHash(riddle);
    saveReviews(data);                               // save after every riddle, so a crash loses nothing
  }
  rl.close();
}
```

---

## Stage 5: Keep internal data internal (plan 05, phase 4)

**Goal:** CI fails if review data could reach the deployed site.

- [ ] 5.1 `backend/scripts/check-no-leak.sh`: no file in `src/` imports `backend/` or `data/reviews`
- [ ] 5.2 Same script: after `vite build`, `dist/` has no `contentHash`, `levelComment`, `"reviewer"` or `riddleId`
- [ ] 5.3 New `checks` job in `.github/workflows/ci.yml`: `npm ci` → `test:unit` → `reviews:validate` → `build` →
      `check-no-leak.sh`
- [ ] 5.4 Confirm that `deploy.yml` copies nothing from `data/reviews` (true today, so add a comment there)

```bash
#!/usr/bin/env bash
# backend/scripts/check-no-leak.sh
set -euo pipefail

if grep -rnE "from ['\"].*(backend/|data/reviews)" src/; then
  echo "ERROR: src/ imports internal backend or review code"; exit 1
fi

if [ -d dist ] && grep -rlE '"?(contentHash|levelComment|reviewer|riddleId)"?' dist/; then
  echo "ERROR: internal review fields found in the built bundle"; exit 1
fi
echo "OK: no internal review data in src/ imports or dist/"
```

```yaml
# .github/workflows/ci.yml (new job beside `test`)
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: lts/*, cache: npm }
      - run: npm ci
      - run: npm run test:unit
      - run: npm run reviews:validate
      - run: npm run build
      - run: bash backend/scripts/check-no-leak.sh
```

---

## Stage 6: Human review pass + scorer tuning

**Goal:** enough human level ratings to tune the scorer, and a worklist of bad translations.

- [ ] 6.1 Review every `foreign-chars` / `missing` riddle (about 25–40), with level and HE compliance
- [ ] 6.2 Review a **stratified sample** for level: 20 riddles from each auto bucket (easy, medium, hard), half gym and half
      ultimate, so 60 or more human levels in total. Add `--sample stratified` to `review next`
- [ ] 6.3 `backend/difficulty/calibrate.ts` + `review calibrate` command: compare human `level` with `autoLevel`
- [ ] 6.4 Tune `weights.json` (and bump `version`) until the targets below are met, then re-run `reviews:score`
- [ ] 6.5 Record the final numbers in `data/reviews/README.md`

**Targets** (from plan 04): bucket accuracy (easy/medium/hard) of at least 70%, and the 1–5 rating within ±1 for at
least 85%.

```ts
// backend/difficulty/calibrate.ts
export function calibrate(data: ReviewsFile) {
  const pairs = Object.values(data.reviews)
    .filter(r => r.level?.source === 'human' && r.autoLevel)
    .map(r => ({ id: r.riddleId, human: r.level!.rating, auto: r.autoLevel!.rating }));

  const bucketHit = pairs.filter(p => toPublicDifficulty(p.human) === toPublicDifficulty(p.auto)).length;
  const within1 = pairs.filter(p => Math.abs(p.human - p.auto) <= 1).length;
  const worst = [...pairs].sort((a, b) => Math.abs(b.human - b.auto) - Math.abs(a.human - a.auto)).slice(0, 10);

  return {
    n: pairs.length,
    bucketAccuracy: bucketHit / pairs.length,
    within1: within1 / pairs.length,
    worst,                                     // look at these to decide which weight to change
  };
}
```

Optional: a small grid search over the weights (each weight in 0..0.4 in steps of 0.05, summing to 1) that maximizes
`bucketAccuracy`. It needs no library. Only do this if hand-tuning stalls.

---

## Stage 7: Publish to the site

**Goal:** the site shows real difficulty levels and hides broken Hebrew translations. Only public ids and labels
ship, never scores or comments.

- [ ] 7.1 `backend/scripts/publish-difficulty.ts` → `npm run reviews:publish` writes
      `src/assets/riddle-meta.generated.ts`
- [ ] 7.2 Difficulty source order: human `level` → `autoLevel` → none
- [ ] 7.3 `hiddenHe`: ids whose human HE compliance is 1 (or status `drop`)
- [ ] 7.4 `src/assets/index.ts` merges `difficulty`, and `RiddleContext` skips `hiddenHe` ids in Hebrew mode
- [ ] 7.5 `RiddleCard.tsx`: no badge when `difficulty` is missing, instead of the "easy" fallback
- [ ] 7.6 CI: run `reviews:publish` and then `git diff --exit-code src/assets/riddle-meta.generated.ts`, so the generated
      file never drifts from the reviews
- [ ] 7.7 E2E: one riddle shows its expected difficulty badge, and one `hiddenHe` id is absent in Hebrew mode

```ts
// src/assets/riddle-meta.generated.ts  (GENERATED, do not edit)
import type { RiddleDifficulty } from '../models/riddle';

export const riddleDifficulty: Record<string, RiddleDifficulty> = {
  "gym-1": "easy",
  "gym-2": "easy",
  // …
};

export const hiddenHe: ReadonlySet<string> = new Set(["gym-2" /* … */]);
```

```ts
// backend/scripts/publish-difficulty.ts (core)
const data = loadReviews();
const difficulty: Record<string, RiddleDifficulty> = {};
const hidden: string[] = [];
for (const r of loadRiddles()) {
  const rev = data.reviews[r.id];
  const rating = rev?.level?.rating ?? rev?.autoLevel?.rating;
  if (rating) difficulty[r.id] = toPublicDifficulty(rating);
  const he = rev?.translations?.find(t => t.language === 'he' && t.source === 'human');
  if (rev?.status === 'drop' || he?.rating === 1) hidden.push(r.id);
}
fs.writeFileSync('src/assets/riddle-meta.generated.ts', render(difficulty, hidden));
```

```ts
// src/assets/index.ts (addition)
import { riddleDifficulty } from './riddle-meta.generated';

export const allRiddles: Riddle[] = [...riddlesDataGym.riddles, ...ultimate]
  .map(r => ({ ...r, difficulty: r.difficulty ?? riddleDifficulty[r.id] }));
```

```tsx
// RiddleCard.tsx: replace the "easy" fallback
{riddle.difficulty && (
  <DifficultyBadge level={riddle.difficulty} label={t(`riddle.difficulties.${riddle.difficulty}`)} />
)}
```

---

## Stage 8 (optional, later)

- [ ] 8.1 Difficulty filter on the Home and search pages (the field is now filled in)
- [ ] 8.2 Dev-only `/__review` page (plan 05, phase 5), only if Hebrew in the terminal is too painful to review.
      Register it only when `import.meta.env.DEV`, serve it through a Vite `configureServer` middleware, and let the
      Stage 5 bundle check prove it isn't shipped
- [ ] 8.3 LLM pre-pass (`source: 'llm'`) suggesting HE compliance and issues
- [ ] 8.4 Translation fix step: fill `suggestedText`/`suggestedSolution`, apply them to `src/assets`, and the
      `contentHash` change sends the riddle back for re-review → `fixed`

---

## Stage dependency

```
1 base ──┬─> 2 scorer ──┐
         ├─> 3 flags ───┼─> 4 CLI ─> 6 review + tune ─> 7 publish ─> 8 optional
         └─> 5 guards (any time after 1; must be in place before 7)
```

Stages 2, 3 and 5 can be done in parallel after Stage 1. Each stage is one PR.

## Definition of done

- [ ] All stages 1–7 checked
- [ ] `npm run test:unit`, `npm run reviews:validate`, `npm run build`, `npm run test:e2e` and the leak check pass in CI
- [ ] Calibration targets met and recorded in `data/reviews/README.md`
- [ ] Plans 04, 05 and 06 marked "✅ Done" and moved to `plans/archive/`
