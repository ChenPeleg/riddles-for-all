# Overall plan

I have a folder with resources of several books I own with riddles. I'd like to build a mini record holder for them in TypeScript. Extract the text, and allow for me a way to search them.

## Project Overview

Build a TypeScript-based riddle management system that:
- Extracts riddles from various book formats (EPUB, PDF, MOBI)
- Stores riddles in a structured format
- Provides search functionality to find riddles by keywords, categories, or content

**Future Goal**: Build a frontend-only website that consumes the processed riddle data. The extraction and processing tools will be used as a one-time build step to generate static JSON data files that the frontend can load and search through.

## Implementation Steps

### Phase 1: Project Setup
1. **Initialize TypeScript project**
   - Set up `package.json` with TypeScript dependencies
   - Configure `tsconfig.json` with appropriate compiler options
   - Set up project folder structure (src/, data/, scripts/)

2. **Install core dependencies (dev dependencies only)**
   - TypeScript and type definitions:
     ```bash
     npm install --save-dev typescript @types/node
     ```
   - Text extraction libraries:
     ```bash
     npm install --save-dev epubjs pdf-parse mobi-parser
     ```
   - Database/storage solution (using JSON files for frontend compatibility):
     ```bash
     npm install --save-dev @types/node
     ```
   - CLI framework:
     ```bash
     npm install --save-dev commander
     ```
   - Build tools:
     ```bash
     npm install --save-dev ts-node nodemon
     ```
   
   **Note**: All dependencies are dev-only since the goal is to build a frontend-only website in the future. The extraction and processing will be done as a one-time build step, and the final data (JSON) will be consumed by the frontend application.

### Phase 2: Text Extraction
3. **Create text extraction utilities**
   - Build EPUB extractor module
   - Build PDF extractor module
   - Build MOBI extractor module
   - Create unified extraction interface

4. **Test extraction on sample files**
   - Extract text from one EPUB file
   - Extract text from one PDF file
   - Extract text from one MOBI file
   - Verify text quality and formatting

### Phase 3: Riddle Parsing & Data Structure
5. **Design data model**
   - Define TypeScript interfaces for Riddle (id, question, answer, source, category, tags)
   - Create data structure for storing riddles

6. **Build riddle parser**
   - Create parser to identify riddle questions and answers from extracted text
   - Handle different book formats and structures
   - Extract metadata (source book, chapter, etc.)

7. **Process all resource files**
   - Run extraction on all files in `resources/` folder
   - Parse extracted text into structured riddle objects
   - Handle errors and edge cases

### Phase 4: Data Storage
8. **Implement storage solution**
   - Use JSON file storage (for frontend compatibility)
   - Create JSON structure/schema for riddle data
   - Build data access utilities for reading/writing JSON files
   - Consider splitting into multiple JSON files if dataset is large (e.g., by category or source)

9. **Populate database**
   - Import all parsed riddles into storage
   - Add indexes for search optimization
   - Validate data integrity

### Phase 5: Search Functionality
10. **Implement search engine**
    - Build full-text search capability
    - Support keyword search in questions and answers
    - Add filtering by source, category, or tags
    - Implement fuzzy matching for typos

11. **Create search API/interface**
    - Design search query interface
    - Build search result formatter
    - Add pagination for large result sets

### Phase 6: User Interface
12. **Build CLI interface**
    - Create command-line commands (search, list, view, stats)
    - Add interactive search mode
    - Implement result display formatting

13. **Optional: Web interface**
    - Set up simple web server (Express.js)
    - Create search form and results page
    - Add basic styling

### Phase 7: Testing & Refinement
14. **Test search functionality**
    - Test various search queries
    - Verify search accuracy and performance
    - Test edge cases and error handling

15. **Optimize and refine**
    - Improve parsing accuracy
    - Optimize search performance
    - Add additional features (export, import, favorites, etc.)

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