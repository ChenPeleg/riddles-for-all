# Refactor plan — Split BookReader route into smaller components

Goal

- Break the large `BookReader` route/page into well-scoped, testable, and reusable components.
- Move complex logic into small hooks or services where appropriate.
- Keep behaviour unchanged for users; do the refactor incrementally.

Checklist (start -> done):

1. [ ] Inspect current `BookReader` implementation and list responsibilities
2. [ ] Identify candidate subcomponents and hooks
3. [ ] Create a folder layout and file checklist for extraction
4. [ ] Implement components and hooks incrementally (one at a time)
5. [ ] Add/adjust types and small unit tests for each piece
6. [ ] Run build/lint/typecheck after each extraction
7. [ ] Run a manual smoke test and automated tests
8. [ ] Cleanup deprecated code and exports

Assumptions

- `BookReader` lives under `src/pages` or `src/components` (search and confirm before coding).
- There's no external API breakage required — only internal reorganisation.
- UI/UX should remain functionally unchanged after refactor.

Contract (what success looks like)

- Inputs: same route params and props `BookReader` accepted before.
- Outputs: no visible behavioral change; smaller component files; unit tests added for extracted logic.
- Error modes: preserve existing error handling; any new hook should surface errors upwards.
- Success criteria: app builds cleanly, tests pass, manual smoke test of BookReader works.

High-level proposed subcomponents/hook list

- BookReader/index.tsx — thin page-level wrapper (keeps routing, loads data, provides context)
- components/BookReader/ReaderLayout.tsx — top-level layout: toolbar, viewer, sidebar
- components/BookReader/Toolbar.tsx — navigation buttons, controls, search, settings
- components/BookReader/PageViewer.tsx — renders current page (image/text) and handles zoom/pan
- components/BookReader/TOC.tsx — table-of-contents / jump-to-page UI
- components/BookReader/ProgressBar.tsx — reading progress, page input
- components/BookReader/Annotations.tsx — highlights/notes UI (if present)
- hooks/useBookLoader.ts — encapsulate loading/parsing book and pages
- hooks/useReaderState.ts — currentPage, zoom, mode, keyboard handlers
- services/book-storage.ts — small read-only helpers for local storage keys (optional)

Step-by-step plan

1. Explore and document the existing `BookReader` file
   - Locate the file with a repo-wide search for `BookReader` and open it.
   - Add comments in the file (local notes) to mark logical blocks: data-loading, UI, controls, side-effects.
   - Timebox: 30–60 minutes.

2. Create the component skeletons
   - Add the new directories and component files listed above (empty functional components and exports).
   - Implement `BookReader/index.tsx` as a wrapper that imports the new components and renders them with placeholders.
   - Commit: "chore(reader): scaffold BookReader subcomponents"
   - Run build and typecheck.

3. Extract data-loading into `useBookLoader`
   - Move async loading (fetching/parsing EPUB/MOBI/PDF) into a hook with a small stable API: { book, pages, loading, error, reload }
   - Keep side effects (analytics, metrics) in the page wrapper for now.
   - Add unit tests for the hook where feasible (mock fetch/parsers).
   - Commit: "refactor(reader): extract useBookLoader"
   - Run build/tests.

4. Extract reader state into `useReaderState`
   - Move page index, zoom, reading mode, keyboard handlers into a hook.
   - Expose actions: gotoPage, next, prev, setZoom, toggleMode
   - Replace direct setState usage in UI with hook values and actions.
   - Commit and run checks.

5. Extract visual subcomponents one-by-one
   - Toolbar: move top controls and connect to hook actions (gotoPage, setZoom).
   - PageViewer: render the actual page content; keep minimal rendering logic; connect touch/scroll events to hooks.
   - TOC/Sidebar: move navigation list; lazy-load TOC items if expensive.
   - ProgressBar and Annotations: extract similarly.
   - After each extraction: run build, run tests, smoke test the page.

6. Create a small `ReaderContext` if prop-drilling becomes noisy
   - Use a focused context to share state between nested components only if passing props becomes unwieldy.
   - Keep context API minimal and typed.

7. Tests and types
   - Create unit tests for hooks and any pure utilities.
   - Add snapshot or small component tests for critical components (Toolbar, PageViewer).
   - Keep test scope small and deterministic.

8. Cleanup
   - Remove unused functions from the original file.
   - Consolidate exports under `components/BookReader/index.ts` if helpful.
   - Update any imports across the app to use the new thin page wrapper.

Files to create (suggested)

- src/pages/BookReader.tsx (or src/pages/BookReader/index.tsx)
- src/components/BookReader/index.tsx
- src/components/BookReader/ReaderLayout.tsx
- src/components/BookReader/Toolbar.tsx
- src/components/BookReader/PageViewer.tsx
- src/components/BookReader/TOC.tsx
- src/components/BookReader/ProgressBar.tsx
- src/components/BookReader/Annotations.tsx (optional)
- src/hooks/useBookLoader.ts
- src/hooks/useReaderState.ts
- src/services/book-storage.ts (optional)

Recommended incremental commit messages

- chore(reader): scaffold BookReader subcomponents
- refactor(reader): extract useBookLoader
- refactor(reader): extract useReaderState
- refactor(reader): move toolbar and controls
- refactor(reader): move PageViewer
- test(reader): add unit tests for hooks
- chore(reader): cleanup old BookReader file

Edge cases and gotchas

- Large books: keep lazy loading and avoid rendering all pages at once.
- Parser errors for unsupported files: surface friendly errors and don't crash the page.
- State drift: ensure URL/state sync (if `BookReader` uses query params or route params) is preserved.
- Accessibility: ensure keyboard handlers still focus correctly and ARIA attributes are preserved.
- SSR / hydration: if app server-renders this route, keep side-effect code guarded with `useEffect`.

Quality gates (what to run after each major step)

- Build: `npm run build` or `vite build` (or local equivalent)
- Typecheck: `tsc --noEmit` (or `npm run typecheck` if available)
- Lint: `npm run lint`
- Tests: `npm test` (or project test command)
- Manual smoke: open the BookReader route, try navigation, zoom, open TOC, and load different book types.

Estimated effort

- Scaffolding + initial split: 1–2 hours
- Extract hooks + first components: 2–4 hours
- Tests & cleanup: 1–2 hours
- Total (iterative): 4–8 hours depending on complexity of parsing and ancillary features.

Next steps for me (if you'd like me to implement)

- I can locate the current `BookReader` file and produce the first scaffold commit.
- Then I can extract `useBookLoader` and run the build/tests after that change.


