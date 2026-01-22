# Riddles Management System 🧩

A TypeScript-based riddle management system that extracts, parses, stores, and provides search over riddles sourced from EPUB, PDF, and MOBI books. This repository includes backend scripts for extraction/parsing, a CLI for searching and browsing, and a React + Vite frontend for a static website.

---

## Quick Start ✅

### Prerequisites
- Node.js 18+ and npm
- Optional but recommended: Visual Studio Code

### Clone & Install

```bash
git clone https://your-repo-url.git
cd riddles
npm install
```

### Generate Sample Data (for testing)

```bash
npm run backend:sample
```

### Extract Text from Book Files

Place book files (EPUB, PDF, MOBI) into the `resources/` directory and run:

```bash
npm run backend:extract
```

This extracts text into `data/` and prepares it for parsing.

### Parse Riddles and Generate JSON

```bash
npm run backend:parse
```

This parses the extracted text into structured JSON files (see `public/data/` and `data/`).

### Per-book parsing instructions (metadata) 🔧

Some books require custom parsing rules (different numbering, grouped answer sections, noisy extraction). You can specify per-book parsing instructions in the book metadata so the parser can use heuristics suited to that book.

Recommended metadata field: `parsing` (object). Supported fields:

- `strategy` (string): e.g. `numbered`, `lot-answers`, `chapter-based`, `needs-cleanup`, `skipped`
- `questionDelimiter` (string, regex): regex used to split/questions (as a string)
- `answerMarkers` (array of strings): words or headings that mark answers (e.g. `"Answers:"`, `"Response:"`)
- `lotSize` (number): for `lot-answers` strategy (e.g. 20)
- `questionSectionStart` / `questionSectionEnd` (string): optional markers for bounded sections
- `notes` (string): free-form guidance for humans or fallback logic

Example in `data/raw/<book>/metadata.json`:

```json
"parsing": {
  "strategy": "lot-answers",
  "lotSize": 20,
  "questionDelimiter": "\\d+[\\.)]\\s+",
  "answerMarkers": ["Answers:"]
}
```

Notes:
- The parser will use the provided `parsing` fields to pick heuristics (e.g., use lot parsing when `lotSize` is set). If no `parsing` is present, the parser falls back to generic numbered and QA heuristics.
- For noisy or binary-extracted files, set `strategy` to `needs-cleanup` and include `notes` so a human or a cleanup step can be run first.


### Start the Frontend (Development)

```bash
npm run dev
```

Open `http://localhost:5173/` to view the frontend.

### Build & Preview Production Frontend

```bash
npm run build
npm run preview
```

---

## CLI: Search and Browse Riddles 🔎

The project includes a CLI for working with the riddle dataset. Use `npm run cli -- <command>` to pass commands and arguments.

Examples:

- Show statistics

```bash
npm run cli -- stats
```

- Search by keyword with filters (note the `--` to forward args to the script)

```bash
npm run cli -- search -- -k "water" -t logic,nature
```

- List riddles

```bash
npm run cli -- list -- -l 10
```

- View a specific riddle

```bash
npm run cli -- view riddle-001
```

- Interactive search mode

```bash
npm run cli -- interactive
```

---

## Important npm scripts 🔧

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the frontend dev server (Vite) |
| `npm run build` | Build TypeScript and the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run backend:extract` | Extract text from books in `resources/` |
| `npm run backend:parse` | Parse extracted text into JSON files |
| `npm run backend:sample` | Generate sample data for testing |
| `npm run cli -- <cmd>` | Run CLI commands (search, list, stats, interactive, etc.) |

---

---

## Project Structure 📁

```
├── backend/                # Backend logic: extractors, parsers, search, CLI
│   ├── cli/               # CLI implementation
│   ├── extractors/        # Text extraction from PDF/EPUB
│   ├── parsers/           # Riddle detection and parsing logic
│   ├── scripts/           # Extraction and parsing entry points
│   └── search/            # Search engine logic
├── components/             # React UI components
├── context/                # React Context for global state (Riddles)
├── pages/                  # React page components (Home, Search, etc.)
├── styles/                 # Global styles and Tailwind configuration
├── data/                   # Raw and intermediate extraction files
├── public/data/            # Final generated riddle collections (JSON)
├── resources/              # Input book files (EPUB, PDF, etc.)
├── App.tsx                 # Main React App component
├── main.tsx                # React entry point
└── package.json            # Scripts and dependencies
```

---

## How it works (brief) 💡

1. **Extract**: Book files placed in `resources/` are processed by backend extractors (EPUB/PDF/MOBI) to produce raw text, which is saved in `data/raw/`.
2. **Parse**: The backend parser processes raw text, identifying riddle-answer pairs. It uses heuristics or metadata-driven strategies (like `lot-answers`).
3. **Store**: Structured JSON collections are generated and saved in `public/data/` for the frontend and `data/` for the CLI.
4. **Browse/Search**: 
   - **Frontend**: A React application (using Vite) loads the JSON data and provides a modern UI for browsing categories, searching, and viewing riddle details.
   - **CLI**: A command-line tool provides direct access to stats, search, and listing from the terminal.

---

## Contributing 🙌

- Add new book files to `resources/` and run the extract/parse scripts.
- Add/modify parser rules in `src/parsers/` to improve riddle detection.
- For frontend work, update `frontend/` and run `npm run dev`.

Please follow the existing planning docs in `plans/` when proposing or implementing larger changes.

---

## Troubleshooting & Tips ⚠️

- If `ts-node` errors occur, ensure you have compatible Node and `npm install` completed.
- For extraction failures with certain book files, try converting to EPUB or use a different source.

---

## Resources & Roadmap

- Planning docs: `plans/` (phases, detailed tasks)
- Sample data: `public/data/riddles-sample-riddles-collection.json`
- Frontend roadmap: `plans/plan_08_frontend_website.md`

---

## License

ISC

---

If you'd like, I can also update the `plans/README.md` to reference this Quick Start and add a short contributor checklist—want me to do that next?
