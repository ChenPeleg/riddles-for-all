# Riddles For All 🧩

A React + Vite frontend website for browsing, searching, and enjoying riddles. The site loads riddle collections from static JSON data and provides a modern, responsive UI.

---

## Quick Start ✅

### Prerequisites
- Node.js 18+ and npm
- Optional but recommended: Visual Studio Code

### Clone & Install

```bash
git clone https://your-repo-url.git
cd riddles-for-all
npm install
```

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

## Important npm scripts 🔧

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the frontend dev server (Vite) |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |

---

## Project Structure 📁

```
├── src/
│   ├── components/         # React UI components
│   ├── context/            # React Context for global state (Riddles)
│   ├── pages/              # React page components (Home, Search, etc.)
│   └── styles/             # Global styles and Tailwind configuration
├── public/data/            # Riddle collections (JSON)
├── index.html              # HTML entry point
├── App.tsx                 # Main React App component
├── main.tsx                # React entry point
└── package.json            # Scripts and dependencies
```

---

## How it works 💡

The frontend loads pre-built JSON riddle collections from `public/data/` and provides a modern UI for browsing categories, searching, and viewing riddle details.

---

## ⚠️ Experimental: Backend folder

The `backend/` folder contains experimental scripts for extracting and parsing riddles from book files (EPUB, PDF, MOBI). **This feature is not fully working and is not part of the main site.** It is kept for future development but should not be relied upon.

---

## Contributing 🙌

- For frontend work, edit components in `src/` and run `npm run dev`.
- To add riddles, update the JSON files in `public/data/`.

Please follow the existing planning docs in `plans/` when proposing or implementing larger changes.

---

## License

ISC
