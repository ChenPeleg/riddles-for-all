# GitHub Copilot Instructions

## Project Overview

**Riddles For All** is a React + TypeScript + Vite frontend application for browsing, searching, and enjoying riddles. Riddle collections are loaded from static JSON files and displayed through a modern, responsive UI.

---

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (utility-first; avoid inline styles)
- **Routing**: React Router v6 (`HashRouter`)
- **Language**: TypeScript (strict mode via `tsconfig.json`)

---

## Project Structure

```
src/
  components/     # Reusable UI components (NavBar, Footer, RiddleCard, etc.)
  context/        # React Contexts: RiddleContext, ThemeContext, I18nContext
  hooks/          # Custom React hooks
  i18n/           # Translation strings (English + Hebrew)
  models/         # TypeScript interfaces and types (e.g., Riddle)
  pages/          # Route-level page components (Home, Search, Categories, etc.)
  styles/         # Global styles
data/             # Static JSON riddle collections (loaded at runtime)
plans/            # Planning documents for larger features
```

---

## Core Conventions

### Components
- Use **functional components** with TypeScript and explicit prop interfaces.
- Export a single default component per file.
- Component filenames use **PascalCase** (e.g., `RiddleCard.tsx`).

### Styling
- Use **Tailwind CSS utility classes** exclusively. Do not use inline styles or CSS modules.
- Support both light and dark themes via `dark:` Tailwind variants (e.g., `dark:bg-surface-900`).

### Routing
- All routes are declared in `src/App.tsx` using `HashRouter`.
- Add new routes there when creating new pages.

### State & Context
- **RiddleContext**: Provides the list of all riddles and loading state globally.
- **ThemeContext**: Manages dark/light mode toggle.
- **I18nContext**: Manages the active language (`en` or `he`) and exposes a `t()` translation helper.

---

## Internationalization (i18n)

- Supported languages: **English (`en`)** and **Hebrew (`he`)**.
- All UI strings must be added to **both** language objects in `src/i18n/translations.ts`.
- Access translations via the `useI18n()` hook: `const { t } = useI18n()` then `t('section.key')`.
- Hebrew is a RTL language; ensure layout handles RTL appropriately when adding new UI.

---

## Data Model

The core data type is `Riddle` (defined in `src/models/riddle.ts`):

```ts
interface Riddle {
  id: string;
  text: string;          // English riddle text
  textHe?: string;       // Hebrew riddle text (optional)
  solution?: string;     // English solution
  solutionHe?: string;   // Hebrew solution
  categories: string[];
  image?: string;
  clue?: string;
  clueHe?: string;
  difficulty?: "easy" | "medium" | "hard";
  source: { book: string; page?: number };
}
```

---

## Adding New Features

1. **New page**: Create a file in `src/pages/`, add translations in `src/i18n/translations.ts` for both `en` and `he`, and register the route in `src/App.tsx`.
2. **New component**: Create a file in `src/components/`. Keep it focused and reusable.
3. **New riddle data**: Add or update JSON files in the `data/` directory following the existing schema.
4. **New hook**: Create a file in `src/hooks/` prefixed with `use` (e.g., `useRiddleFilter.ts`).

---

## What to Avoid

- Do not add new third-party libraries without a strong reason.
- Do not use inline styles; always prefer Tailwind classes.
- Do not add UI strings as hardcoded text; always route them through the i18n system.
- The `backend/` folder contains experimental, non-production scripts — do not modify it for frontend features.
