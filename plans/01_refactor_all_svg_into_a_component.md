Refactor all SVG into a component
 
 ## Plan: Refactor all SVG into a component
 
 This plan consolidates all inline SVG icons scattered across the riddles application into a centralized `AppImage` component. Currently, there are ~20 SVG usages across 6 files ([NavBar.tsx](../src/components/NavBar.tsx), [RiddleCard.tsx](../src/components/RiddleCard.tsx), [Home.tsx](../src/pages/Home.tsx), [Search.tsx](../src/pages/Search.tsx), [Categories.tsx](../src/pages/Categories.tsx), [Sources.tsx](../src/pages/Sources.tsx), [BookReader.tsx](../src/pages/BookReader.tsx)). The refactor will improve maintainability, consistency, and enable centralized styling control.
 
 ### Steps
 
 1. Create `src/components/AppImage.tsx` with a type-safe icon component supporting all current SVG variants (hamburger, close, chevron-left, chevron-right, search, book, folder, eye, checkmark, plus, bookmark, etc.) with configurable `className`, `size`, and `fill` props
 
 2. Extract and catalog all unique SVG icons from [NavBar.tsx](../src/components/NavBar.tsx), [RiddleCard.tsx](../src/components/RiddleCard.tsx), [Home.tsx](../src/pages/Home.tsx), [Search.tsx](../src/pages/Search.tsx), [Categories.tsx](../src/pages/Categories.tsx), [Sources.tsx](../src/pages/Sources.tsx), and [BookReader.tsx](../src/pages/BookReader.tsx) into named icon variants within `AppImage`
 
 3. Replace all inline `<svg>` elements in [NavBar.tsx](../src/components/NavBar.tsx) (hamburger, close icons), [RiddleCard.tsx](../src/components/RiddleCard.tsx) (checkmark, plus, eye, lightbulb), [Home.tsx](../src/pages/Home.tsx) (chevrons, search, folder, book icons), and remaining pages with `<AppImage name="icon-name" />` calls
 
 4. Update [Search.tsx](../src/pages/Search.tsx), [Categories.tsx](../src/pages/Categories.tsx), [Sources.tsx](../src/pages/Sources.tsx), and [BookReader.tsx](../src/pages/BookReader.tsx) to import and use `AppImage` for all back buttons, search icons, category icons, and bookmark icons
 
 5. Validate all pages render correctly with responsive styling, RTL support, and hover states preserved
 
 ### Further Considerations
 
 1. **Icon naming convention** — Use descriptive names like `chevron-left`, `chevron-right`, `menu`, `close`, `search`, `book`, `folder`, `eye`, `checkmark`, `plus`, `bookmark`, `lightbulb`, or use a prefix system like `icon-*`?
 
 2. **TypeScript typing** — Should icon names be a union type of string literals for autocomplete and type safety, or allow flexible string for extensibility?
 
 3. **Default sizing** — Should the component accept size presets (`sm`, `md`, `lg`) in addition to custom `className` for consistent icon sizing across the app?
