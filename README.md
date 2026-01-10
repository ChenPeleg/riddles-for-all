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

## Project Structure 📁

```
├── src/                    # Backend source: extractors, parsers, search, CLI
├── scripts/                # Standalone scripts (extract, parse, sample)
├── public/data/            # Generated JSON datasets (frontend consumption)
├── data/                   # Extracted text and working files
├── resources/              # Place book files here (EPUB, PDF, MOBI)
├── frontend/               # React + Vite frontend
├── plans/                  # Project planning & roadmap
└── package.json            # Scripts and dependencies
```

---

## How it works (brief) 💡

1. Extract: Book files in `resources/` are processed by extractors (EPUB/PDF/MOBI) to produce text.
2. Parse: Parser detects riddle question/answer pairs and tags them (math, wordplay, logic, etc.).
3. Store: Structured JSON files are generated and placed in `public/data/` or `data/` for frontend/CLI consumption.
4. Search: A search engine supports fuzzy matching, filtering, and pagination.

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
