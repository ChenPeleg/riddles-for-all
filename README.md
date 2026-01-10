# Riddles Management System

A TypeScript-based riddle management system for extracting, parsing, and searching riddles from various book formats (EPUB, PDF, MOBI).

## Project Status

### ✅ Completed Phases

1. **Phase 1: Project Setup** - TypeScript configuration, dependencies, and project structure
2. **Phase 2: Text Extraction** - Extract text from EPUB, PDF, and MOBI formats
3. **Phase 3: Riddle Parsing** - Parse riddles from extracted text with automatic categorization
4. **Phase 4: Data Storage** - Store riddles in JSON format for frontend consumption
5. **Phase 5: Search Functionality** - Search engine with filtering capabilities, fuzzy matching, and pagination
6. **Phase 6: User Interface** - CLI interface for browsing and searching riddles
7. **Phase 7: Testing & Refinement** - Sample data generation and CLI testing

## Usage

### Generate Sample Data (for testing)

```bash
npm run sample
```

This generates sample riddles for testing the search and CLI features.

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

### Search and Browse Riddles (CLI)

#### Show Statistics

```bash
npm run cli stats
```

Display statistics about the riddle collection including total count, sources, tags, and difficulty distribution.

#### Search Riddles

```bash
# Search by keyword
npm run cli search -- -k "keyboard"

# Search with filters
npm run cli search -- -k "water" -t logic,nature

# Search by source
npm run cli search -- -s "Classic Riddles"

# Search by difficulty
npm run cli search -- -d easy

# Disable fuzzy matching for exact search
npm run cli search -- -k "key" --no-fuzzy

# Pagination
npm run cli search -- -k "what" -l 5 -o 10
```

#### List Riddles

```bash
# List all riddles (first 10)
npm run cli list

# List with custom limit
npm run cli list -- -l 5

# List from specific source
npm run cli list -- -s "Sample Riddles Collection"
```

#### View Specific Riddle

```bash
npm run cli view riddle-001
```

#### Interactive Search Mode

```bash
npm run cli interactive
# or
npm run cli i
```

Type your search queries interactively and see results immediately. Type `exit` to quit.

#### List Sources

```bash
npm run cli sources
```

Shows all available riddle sources with riddle counts.

#### List Tags

```bash
npm run cli tags
```

Shows all available tags with riddle counts.

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
│   ├── search/           # Search engine with fuzzy matching
│   ├── cli/              # Command-line interface
│   └── types/            # TypeScript type definitions
├── scripts/
│   ├── extract-and-import.ts    # Extract text from books
│   ├── parse-and-store.ts       # Parse and store riddles
│   └── generate-sample-data.ts  # Generate sample data for testing
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

## Features

### Search Engine
- **Full-text search** across riddle questions, answers, and tags
- **Fuzzy matching** to handle typos and variations
- **Advanced filtering** by source, category, tags, and difficulty
- **Pagination** for large result sets
- **Scoring system** to rank results by relevance

### CLI Interface
- **Search command** - Search riddles with various filters
- **List command** - Browse riddles with optional filtering
- **View command** - View detailed information about specific riddles
- **Stats command** - Display collection statistics
- **Interactive mode** - Real-time search as you type
- **Sources/Tags commands** - Browse available sources and tags

### Data Management
- Extract text from EPUB, PDF, and MOBI formats
- Automatic riddle parsing and categorization
- JSON storage for frontend consumption
- Support for multiple book sources

## Current Statistics

- **Total Riddles Parsed**: 142
- **Books Processed**: 6
- **Categories**: math, logic, wordplay, visual, nature, everyday, tricky

## Frontend Website 🚧

The project now includes a React-based frontend for browsing and searching riddles.

### Development

```bash
# Start the frontend development server
npm run dev

# Build the frontend for production
npm run build

# Preview the production build
npm run preview
```

The frontend will be available at `http://localhost:5173/riddles/`

### Frontend Structure

```
frontend/
├── components/       # Reusable UI components (coming soon)
├── pages/           # Page components (Home, Search, RiddleDetail, etc.)
├── services/        # Data loading and search services (coming soon)
├── hooks/           # Custom React hooks (coming soon)
├── types/           # TypeScript type definitions (coming soon)
├── styles/          # Global styles
└── utils/           # Utility functions (coming soon)
```

### Deployment

The frontend is configured to deploy automatically to GitHub Pages via GitHub Actions when you push to the main branch.

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Generate sample data (for testing)
npm run sample

# Run extraction (requires book files in resources/)
npm run extract

# Parse and store riddles
npm run parse

# CLI commands
npm run cli stats
npm run cli search -- -k "your keyword"
npm run cli list
npm run cli interactive
```

## CLI Command Reference

| Command | Description | Example |
|---------|-------------|---------|
| `stats` | Show collection statistics | `npm run cli stats` |
| `search` | Search riddles by keyword and filters | `npm run cli search -- -k "water"` |
| `list` | List riddles with optional filters | `npm run cli list -- -l 5` |
| `view` | View a specific riddle by ID | `npm run cli view riddle-001` |
| `interactive` | Interactive search mode | `npm run cli interactive` |
| `sources` | List all available sources | `npm run cli sources` |
| `tags` | List all available tags | `npm run cli tags` |

### Search Options

| Option | Description | Example |
|--------|-------------|---------|
| `-k, --keyword` | Search keyword | `-k "keyboard"` |
| `-s, --source` | Filter by source book | `-s "Classic Riddles"` |
| `-t, --tags` | Filter by tags (comma-separated) | `-t logic,wordplay` |
| `-c, --category` | Filter by category | `-c wordplay` |
| `-d, --difficulty` | Filter by difficulty | `-d easy` |
| `--no-fuzzy` | Disable fuzzy matching | `--no-fuzzy` |
| `--case-sensitive` | Enable case-sensitive search | `--case-sensitive` |
| `-l, --limit` | Maximum results | `-l 20` |
| `-o, --offset` | Pagination offset | `-o 10` |

## License

ISC
