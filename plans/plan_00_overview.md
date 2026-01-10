# Project Overview

I have a folder with resources of several books I own with riddles. I'd like to build a mini record holder for them in TypeScript. Extract the text, and allow for me a way to search them.

## Goals

Build a TypeScript-based riddle management system that:
- Extracts riddles from various book formats (EPUB, PDF, MOBI)
- Stores riddles in a structured format
- Provides search functionality to find riddles by keywords, categories, or content

**Future Goal**: Build a frontend-only website that consumes the processed riddle data. The extraction and processing tools will be used as a one-time build step to generate static JSON data files that the frontend can load and search through.

## Implementation Phases

### Backend Development (Complete)

1. ✅ **Phase 1: Project Setup** - See [plan_01_project_setup.md](./plan_01_project_setup.md)
2. ✅ **Phase 2: Text Extraction** - See [plan_02_text_extraction.md](./plan_02_text_extraction.md)
3. ✅ **Phase 3: Riddle Parsing & Data Structure** - See [plan_03_riddle_parsing.md](./plan_03_riddle_parsing.md)
4. ✅ **Phase 4: Data Storage** - See [plan_04_data_storage.md](./plan_04_data_storage.md)
5. ✅ **Phase 5: Search Functionality** - See [plan_05_search_functionality.md](./plan_05_search_functionality.md)
6. ✅ **Phase 6: User Interface** - See [plan_06_user_interface.md](./plan_06_user_interface.md)
7. ✅ **Phase 7: Testing & Refinement** - See [plan_07_testing_refinement.md](./plan_07_testing_refinement.md)

### Frontend Development (Planned)

8. 🚧 **Phase 8: Frontend Website** - See [plan_08_frontend_website.md](./plan_08_frontend_website.md)

## Technical Considerations

- **Text Extraction**: Handle different book formats, encoding issues, and formatting variations
- **Parsing**: Riddles may have inconsistent formatting across books - need robust parsing logic
- **Storage**: Consider scalability if riddles collection grows
- **Search**: Balance between search speed and accuracy
- **Error Handling**: Gracefully handle corrupted files or extraction failures

## File Structure (Proposed)

```
riddles/
├── src/
│   ├── extractors/
│   │   ├── epub-extractor.ts
│   │   ├── pdf-extractor.ts
│   │   └── mobi-extractor.ts
│   ├── parsers/
│   │   └── riddle-parser.ts
│   ├── storage/
│   │   └── json-storage.ts
│   ├── search/
│   │   └── search-engine.ts
│   ├── cli/
│   │   └── commands.ts
│   └── types/
│       └── riddle.ts
├── data/
│   └── riddles.json (or riddles/ directory with multiple JSON files)
├── scripts/
│   └── extract-and-import.ts
├── package.json
└── tsconfig.json
```
