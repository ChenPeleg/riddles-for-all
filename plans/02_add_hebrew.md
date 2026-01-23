# Plan: Add Hebrew (RTL) Support

Summary

Add lightweight, dependency-free Hebrew support to the site using a small React Context-based i18n layer and a simple translation file. Provide a language toggle button (English <-> עברית) that persists the user's preference in localStorage and updates document `lang` and `dir` attributes to enable RTL layout. No external libraries or installs.

Quick checklist

- [ ] Add translations file (en/he)
- [ ] Add `I18nProvider` (React Context)
- [ ] Add `useTranslation` hook
- [ ] Add `LanguageToggle` component and place it in the UI
- [ ] Wrap the app with `I18nProvider` in `main.tsx`
- [ ] Replace a few sample strings with `t('...')` (Home, RiddleCard, header)
- [ ] Verify persistence, RTL `dir`/`lang`, and fallbacks

Contract (2–4 bullets)

- Inputs: translation key strings (e.g. `common.title`), saved preference from `localStorage` key `lang` (value `'en' | 'he'`).
- Outputs: rendered localized strings; `lang` state; `isRTL` boolean; DOM `document.documentElement.lang` and `dir` updated.
- Data shape: translation file -> { en: Record<string,string|object>, he: Record<...> } (nested key paths allowed, e.g. `common.title`).
- Error modes: missing keys fall back to English; invalid saved value falls back to `'en'`.

Edge cases

1. Missing translations in Hebrew -> per-key fallback to English.
2. Corrupted/invalid `localStorage.lang` -> reset to `'en'`.
3. Mixed-direction content (LTR inside RTL) -> wrap LTR segments with `span dir="ltr"`.
4. Client-only localStorage on initial render -> ensure provider only reads/writes in browser (guard window).
5. Accessibility: ensure `lang`/`dir` set and `aria-*` strings are localized.

Files to add / change

- Add: `src/i18n/translations.ts` (or `.json`) — translation resources for `en` and `he`.
- Add: `src/context/I18nContext.tsx` — context + provider that exposes `{ lang, setLang, t, isRTL }`.
- Add: `src/hooks/useTranslation.ts` — convenience hook to consume the context.
- Add: `src/components/LanguageToggle.tsx` — small toggle button UI.
- Modify: `src/main.tsx` — wrap `<App/>` with `<I18nProvider>`.
- Modify: `index.html` (optional) / provider effect — set `document.documentElement.lang` and `.dir`.
- Modify: example components: `pages/Home.tsx`, `components/RiddleCard.tsx`, header/App.tsx — use `t('...')`.

Translation file shape (example)

File: `src/i18n/translations.ts`

```ts
export const translations = {
  en: {
    common: {
      title: "Riddles",
      toggle_to_he: "עברית",
      toggle_to_en: "English",
    },
    riddle: {
      reveal_solution: "Reveal Solution",
      no_solution: "No solution provided.",
    },
  },
  he: {
    common: {
      title: "חידות",
      toggle_to_he: "עברית",
      toggle_to_en: "English",
    },
    riddle: {
      reveal_solution: "הצג פתרון",
      no_solution: "לא סופק פתרון.",
    },
  },
};
```

Provider (concept & responsibilities)

File: `src/context/I18nContext.tsx` — provide a concise API:

- state: `lang` (`'en' | 'he'`), default `'en'`.
- setter: `setLang(lang)` validates and persists to `localStorage`.
- helper: `t(keyPath: string): string` — returns translation for `lang` or falls back to English or the key itself.
- helper: `isRTL: boolean` (e.g. `lang === 'he'`).
- side effects: on mount, read `localStorage.lang` (guarded by `typeof window !== 'undefined'`), set document `lang` and `dir` when `lang` changes.

Small `t` semantics

- Accept nested keys like `'common.title'` and resolve by splitting on `.`.
- Lookup order: translations[lang] -> translations['en'] -> return key.

Example provider pseudocode (abbreviated)

```tsx
const I18nContext = createContext({
  lang: 'en',
  setLang: (l: 'en'|'he')=>{},
  t: (k: string) => k,
  isRTL: false,
});

function I18nProvider({ children }){
  const [lang, setLangState] = useState('en');
  useEffect(() => { /* read localStorage, validate */ }, []);
  useEffect(() => { /* write localStorage, set document.documentElement.lang/dir */ }, [lang]);
  const t = (key) => { /* resolve with fallback */ };
  return <I18nContext.Provider value={{ lang, setLang, t, isRTL }}>{children}</I18nContext.Provider>;
}
```

Hook: `useTranslation`

File: `src/hooks/useTranslation.ts`

- Simple wrapper that `return useContext(I18nContext)`.
- Use it in components: `const { t, lang, setLang } = useTranslation();`

Language toggle component

File: `src/components/LanguageToggle.tsx`

- Minimal accessible button that toggles between `'en'` and `'he'`.
- Persisted via provider.
- Accessibility: `aria-pressed={lang === 'he'}` and `aria-label={t('common.toggle_language')}`.

Example UI (concept)

```tsx
const LanguageToggle = () => {
  const { lang, setLang, t } = useTranslation();
  return (
    <button onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
            aria-pressed={lang === 'he'}
            aria-label={t('common.toggle_language')}
    >
      {lang === 'en' ? 'עברית' : 'English'}
    </button>
  );
};
```

Where to place the toggle

- A small spot in `App.tsx` top bar, header, or inside `pages/Home.tsx` header. You can also add it to `components/RiddleCard.tsx` toolbar if you want per-card toggle (not recommended). Prefer global placement in the header.

Replacing strings in components

- Replace static strings with `t('...')`, e.g. `t('riddle.reveal_solution')` and `t('riddle.no_solution')`.
- For attributes: `aria-label={t('buttons.next')}`.
- For any LTR tokens inside Hebrew text (URLs, code, numbers), wrap with `<span dir="ltr">...</span>`.

Testing checklist

1. Toggle language -> UI strings update immediately.
2. Reload page -> selected language persists.
3. Verify `document.documentElement.lang === 'he'` and `dir === 'rtl'` after selecting Hebrew.
4. Remove a key from `he` -> confirm English fallback.
5. Insert invalid value into `localStorage.lang` -> app falls back to `'en'` on load.
6. Accessibility checks: screen reader announces `lang`, `aria-*` values localized.
7. Visual RTL checks: list ordering, alignment, and spacing look sensible; adjust CSS if necessary.

Rollout steps

1. Implement translations and provider on a feature branch.
2. Convert a few high-value components (Home, RiddleCard, header) to use `t(...)` as examples.
3. Run the testing checklist and fix RTL/CSS issues.
4. Add remaining strings gradually.
5. Merge and monitor for missing translations/UI regressions.

Estimated effort

- Prototype (provider + toggle + 3 components): 3–5 hours.
- Full site coverage: 1–2 days plus QA.

Implementation notes / best practices

- Use namespaced stable keys, e.g. `page.home.title` or `riddle.reveal_solution`.
- Keep translations small and avoid runtime key construction.
- For future languages, split translations into per-language files.
- Consider a dev-time script to check for missing translations.

Further considerations

- If you later add server-side rendering, ensure initial `lang`/`dir` is deterministic (e.g., user profile, accept-language) rather than client-only localStorage.
- For long-term maintenance, consider a small CLI that spots missing keys across languages.

----

This plan is intentionally minimal and focused on: no extra dependencies, React Context for translations, a simple translation file, a persisted language toggle button, and basic RTL handling by setting `lang` and `dir` on the document root.
