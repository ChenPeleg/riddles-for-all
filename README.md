# Riddles Management System

A TypeScript-based riddle management system for extracting, parsing, and searching riddles from various book formats (EPUB, PDF, MOBI).

## Project Status

### ✅ Completed Phases

1. **Phase 1: Project Setup** - TypeScript configuration, dependencies, and project structure
2. **Phase 2: Text Extraction** - Extract text from EPUB, PDF, and MOBI formats
3. **Phase 3: Riddle Parsing** - Parse riddles from extracted text with automatic categorization
4. **Phase 4: Data Storage** - Store riddles in JSON format for frontend consumption

### 🚧 In Progress

5. **Phase 5: Search Functionality** - Search engine with filtering capabilities
6. **Phase 6: User Interface** - CLI interface for browsing and searching
7. **Phase 7: Testing & Refinement** - Tests and optimization

## Usage

### Extract Text from Books

```bash
npm run extract
```

This will extract text from all book files in the `resources/` directory and save them as `.txt` files in the `data/` directory.

### Parse Riddles and Generate JSON

```bash
npm run parse
```

This will:
- Parse riddles from all `.txt` files in the `data/` directory
- Automatically categorize riddles by tags (math, logic, wordplay, visual, nature, everyday, tricky)
- Generate JSON files:
  - `riddles-all.json` - All riddles in one file
  - `riddles-{book-name}.json` - Riddles grouped by source book

### Build the Project

```bash
npm run build
```

## Project Structure

```
riddles/
├── src/
│   ├── extractors/       # Text extraction from different formats
│   ├── parsers/          # Riddle parsing logic
│   ├── storage/          # JSON storage utilities
│   └── types/            # TypeScript type definitions
├── scripts/
│   ├── extract-and-import.ts  # Extract text from books
│   └── parse-and-store.ts     # Parse and store riddles
├── data/                 # Extracted text and JSON files
├── resources/            # Source book files (EPUB, PDF, MOBI)
└── plans/                # Project planning documents
```

## Data Format

Riddles are stored in JSON with the following structure:

```json
{
  "metadata": {
    "totalRiddles": 142,
    "sources": ["Book Title 1", "Book Title 2"],
    "generatedAt": "2026-01-10T09:15:57.795Z",
    "version": "1.0.0"
  },
  "riddles": [
    {
      "id": "riddle-81bee7f4",
      "question": "What has keys but no locks?",
      "answer": "A piano",
      "source": {
        "book": "Book Title"
      },
      "tags": ["wordplay", "general"]
    }
  ]
}
```

## Current Statistics

- **Total Riddles Parsed**: 142
- **Books Processed**: 6
- **Categories**: math, logic, wordplay, visual, nature, everyday, tricky

## Future Goals

Build a frontend-only website that consumes the processed riddle data. The extraction and processing tools serve as a one-time build step to generate static JSON data files.

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run extraction
npm run extract

# Parse and store riddles
npm run parse
```

## License

ISC
