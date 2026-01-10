# Phase 8: Frontend Website 🚧

## Overview

Build a static frontend-only website that consumes the processed riddle data (JSON files). The website will load JSON data files statically and provide a user-friendly interface for browsing and searching riddles.

**Technology Stack:** React + Vite + TypeScript + React Router (Hash Router)  
**Deployment:** GitHub Pages via GitHub Actions

## Goals

- Create a modern, responsive web interface using React
- Load and display riddles from static JSON files
- Implement client-side search functionality
- Support filtering by source, tags, category, and difficulty
- Provide an interactive and engaging user experience
- Deploy to GitHub Pages with automated CI/CD

## Step 16: Technology Stack Selection ✅

**Chosen Stack: React + Vite + React Router**

### Selected Technologies:

**React with TypeScript**
- ✅ Component-based architecture
- ✅ Type safety with TypeScript
- ✅ Rich ecosystem and tooling
- ✅ Can reuse existing TypeScript types from backend
- ✅ Large community and extensive documentation

**Vite**
- ✅ Lightning-fast development server
- ✅ Instant HMR (Hot Module Replacement)
- ✅ Optimized production builds
- ✅ Modern build tool with excellent React support
- ✅ TypeScript support out of the box

**React Router (Hash Router)**
- ✅ Client-side routing for SPA
- ✅ Hash-based routing for GitHub Pages compatibility
- ✅ No server configuration needed
- ✅ Works seamlessly with static hosting

### Why This Stack:

1. **GitHub Pages Compatibility**: Hash router works perfectly with GitHub Pages without requiring server-side configuration
2. **Modern Development**: Vite provides excellent DX with fast builds and HMR
3. **Type Safety**: TypeScript ensures code quality and can reuse types from the backend
4. **Ecosystem**: React has the largest ecosystem for UI components and libraries
5. **Performance**: Vite optimizes bundle size and enables code splitting

### Alternative Options Considered:

**Vanilla JS/HTML/CSS**
- ❌ More manual DOM manipulation required
- ❌ Less structured for larger applications

**Vue.js/TypeScript**
- ✅ Good framework but less familiar
- ❌ Smaller ecosystem compared to React

**Svelte/TypeScript**
- ✅ Excellent performance
- ❌ Smaller ecosystem and less team familiarity

## Step 17: Project Setup ✅

- [x] Create `frontend/` directory in repository
- [x] Install React Router with `npm install react-router-dom`
- [x] Configure HashRouter for GitHub Pages
- [x] Set up base path in `vite.config.ts` for deployment
- [x] Configure static JSON file loading from `/data` directory
- [x] Copy riddle JSON files to `public/data/`
- [x] Set up GitHub Actions workflow for automated deployment
- [x] Create basic page components (Home, Search, RiddleDetail, Categories, Sources)
- [x] Configure unified package.json (backend as devDependencies)
- [x] Test build process successfully

## Step 18: UI/UX Design ⏸️

- [ ] Design main layout (header, search bar, content area, footer)
- [ ] Create wireframes for key pages:
  - Home page with featured riddles
  - Search results page
  - Individual riddle detail page
  - Browse by category page
  - Browse by source page
- [ ] Choose color scheme and typography
- [ ] Design responsive breakpoints for mobile/tablet/desktop
- [ ] Plan navigation structure

## Step 19: Core Components ⏸️

### Essential Components to Build:

- [ ] **Navigation Bar**
  - Logo/title
  - Search input
  - Category filters
  - Source filters

- [ ] **Search Component**
  - Search input with live suggestions
  - Filter options (tags, difficulty, source)
  - Fuzzy matching toggle
  - Sort options

- [ ] **Riddle Card Component**
  - Question display (initially hidden answer)
  - "Show Answer" button
  - Tags display
  - Source attribution
  - Difficulty indicator
  - Share button
  - Favorite/bookmark button (local storage)

- [ ] **Riddle List Component**
  - Grid or list view toggle
  - Pagination
  - Loading states
  - Empty states

- [ ] **Riddle Detail Page**
  - Full riddle display
  - Related riddles suggestions
  - Navigation to previous/next riddle

- [ ] **Category Browser**
  - Display all categories with counts
  - Category cards with icons
  - Filter riddles by category

- [ ] **Statistics Dashboard**
  - Total riddles count
  - Sources breakdown
  - Tags distribution
  - Difficulty distribution
  - Interactive charts (optional)

- [ ] **Footer**
  - About information
  - Source attribution
  - GitHub link
  - Credits

## Step 20: Data Integration ⏸️

- [ ] Implement JSON data loader
- [ ] Create data fetching utilities
- [ ] Cache loaded JSON in memory
- [ ] Handle loading and error states
- [ ] Implement data parsing and validation
- [ ] Create TypeScript interfaces matching riddle data structure

## Step 21: Search Implementation ⏸️

- [ ] Port search logic from backend to frontend
- [ ] Implement client-side search algorithm
- [ ] Add fuzzy matching functionality
- [ ] Create search indexing for better performance
- [ ] Implement multi-criteria filtering
- [ ] Add search history (local storage)
- [ ] Implement search suggestions/autocomplete

## Step 22: Features & Enhancements ⏸️

- [ ] **Local Storage Features**
  - Save favorite riddles
  - Track viewed riddles
  - Remember filter preferences
  - Store search history

- [ ] **Interactive Features**
  - Random riddle button
  - Daily riddle feature
  - Share to social media
  - Copy riddle to clipboard
  - Print-friendly view

- [ ] **Accessibility**
  - Keyboard navigation
  - Screen reader support
  - ARIA labels
  - Focus management
  - Color contrast compliance

- [ ] **Performance Optimization**
  - Lazy loading of images
  - Code splitting
  - Bundle size optimization
  - JSON file compression
  - Service worker for offline support (optional)

## Step 23: Styling & Polish ⏸️

- [ ] Apply consistent styling across all components
- [ ] Implement responsive design
- [ ] Add animations and transitions
- [ ] Create loading skeletons
- [ ] Design error states
- [ ] Add dark mode toggle (optional)
- [ ] Polish mobile experience

## Step 24: Testing ⏸️

- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive design on various screen sizes
- [ ] Test keyboard navigation
- [ ] Test with screen readers
- [ ] Performance testing
- [ ] Load testing with large datasets
- [ ] User acceptance testing

## Step 25: Documentation ⏸️

- [ ] Create README for frontend directory
- [ ] Document component architecture
- [ ] Write setup and development instructions
- [ ] Document build and deployment process
- [ ] Create user guide (if needed)
- [ ] Add inline code documentation

## Step 26: Deployment to GitHub Pages ⏸️

**Deployment Platform: GitHub Pages via GitHub Actions**

### Setup Requirements:

- [ ] **Configure Vite for GitHub Pages**
  - Set base path in `vite.config.ts`: `base: '/riddles/'` (or your repo name)
  - Ensure HashRouter is used in React Router
  - Test build output locally

- [ ] **Create GitHub Actions Workflow**
  - Create `.github/workflows/deploy.yml`
  - Configure workflow to run on push to `main` branch
  - Build the frontend with `npm run build`
  - Deploy to `gh-pages` branch using `peaceiris/actions-gh-pages@v3`

- [ ] **Configure Repository Settings**
  - Enable GitHub Pages in repository settings
  - Set source to `gh-pages` branch
  - Configure custom domain (optional)

- [ ] **Verify Deployment**
  - Test production build locally: `npm run build && npm run preview`
  - Push to main branch and verify GitHub Actions runs
  - Verify site is accessible at `https://username.github.io/riddles/`
  - Test all routes and functionality on deployed site

### Example GitHub Actions Workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      
      - name: Build
        working-directory: ./frontend
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
          cname: your-custom-domain.com  # Optional
```

### Additional Configuration:

- [ ] Add `.nojekyll` file to `public/` directory to prevent Jekyll processing
- [ ] Configure 404.html for client-side routing fallback (copy index.html as 404.html)
- [ ] Set up analytics (Google Analytics, Plausible, etc.) - optional
- [ ] Monitor deployment with GitHub Actions status badges in README

## Step 27: Future Enhancements 💡

Ideas for future iterations:

- [ ] **Advanced Features**
  - User accounts and authentication
  - Community-contributed riddles
  - Comments and discussions
  - Riddle ratings and reviews
  - Leaderboards and achievements

- [ ] **Content Management**
  - Admin panel for adding/editing riddles
  - Moderation system
  - Content versioning

- [ ] **Social Features**
  - Share riddles with friends
  - Challenge friends with riddles
  - Social login integration

- [ ] **Gamification**
  - Point system
  - Badges and achievements
  - Daily challenges
  - Riddle streaks

- [ ] **AI Features**
  - AI-generated riddle variations
  - Difficulty estimation
  - Riddle recommendations
  - Natural language processing for better search

## Technical Architecture

**Stack: React + Vite + TypeScript + React Router**

### Project Structure:

```
frontend/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   ├── data/                   # Copy of riddles JSON files
│   │   ├── riddles-all.json
│   │   └── riddles-*.json
│   ├── .nojekyll               # Prevent Jekyll processing on GitHub Pages
│   └── favicon.ico
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx
│   │   │   └── Navigation.module.css
│   │   ├── Search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   └── Search.module.css
│   │   ├── RiddleCard/
│   │   │   ├── RiddleCard.tsx
│   │   │   └── RiddleCard.module.css
│   │   ├── RiddleList/
│   │   │   ├── RiddleList.tsx
│   │   │   └── RiddleList.module.css
│   │   ├── CategoryBrowser/
│   │   │   ├── CategoryBrowser.tsx
│   │   │   └── CategoryBrowser.module.css
│   │   └── Statistics/
│   │       ├── Statistics.tsx
│   │       └── Statistics.module.css
│   ├── pages/                  # Page components for routing
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   ├── RiddleDetail.tsx
│   │   ├── Categories.tsx
│   │   └── Sources.tsx
│   ├── services/               # Business logic
│   │   ├── dataLoader.ts       # Load JSON files
│   │   ├── searchEngine.ts     # Client-side search (port from backend)
│   │   └── localStorage.ts     # Favorites, history, preferences
│   ├── hooks/                  # Custom React hooks
│   │   ├── useRiddles.ts
│   │   ├── useSearch.ts
│   │   └── useFavorites.ts
│   ├── types/                  # TypeScript definitions (copied from backend)
│   │   └── riddle.ts
│   ├── styles/                 # Global styles
│   │   ├── index.css           # Global styles
│   │   └── variables.css       # CSS variables
│   ├── utils/                  # Utility functions
│   │   └── helpers.ts
│   ├── App.tsx                 # Main app with HashRouter
│   ├── main.tsx                # Entry point
│   └── vite-env.d.ts           # Vite types
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts              # Vite configuration with base path
└── README.md
```

### Key Configuration Files:

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/riddles/', // Replace with your repo name
  build: {
    outDir: 'dist',
  },
})
```

**App.tsx (with HashRouter):**
```typescript
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/riddle/:id" element={<RiddleDetail />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  )
}
```

## Success Criteria

- ✅ Website loads and displays riddles correctly
- ✅ Search functionality works with filters
- ✅ Responsive design works on all devices
- ✅ Performance is acceptable (< 3s load time)
- ✅ Accessibility standards met
- ✅ Successfully deployed and accessible online
- ✅ SEO optimized for search engines

## Resources & References

### Selected Stack Documentation:
- [Vite Official Documentation](https://vitejs.dev/)
- [React Official Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite + React + TypeScript Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

### Deployment:
- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Actions for Pages](https://github.com/peaceiris/actions-gh-pages)
- [Vite Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

### Additional Resources:
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://react.dev/learn/accessibility)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Hooks](https://react.dev/reference/react)

## Notes

- Technology stack has been selected: **React + Vite + TypeScript + React Router**
- Deployment platform chosen: **GitHub Pages via GitHub Actions**
- All backend work (Phases 1-7) is complete
- The frontend will be entirely static and consume pre-generated JSON files
- No server-side code or API required - purely client-side SPA
- Hash-based routing ensures compatibility with GitHub Pages
- JSON data files should be copied to `frontend/public/data/` directory
- Automated deployment via GitHub Actions on push to main branch
