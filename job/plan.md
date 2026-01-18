# script for the txt file

✅ **Implemented**: Added `job/add-delimiters.ts` — a TypeScript script that reads `job/raw.txt` and writes `job/raw-separated.txt`.

What it does
- Inserts `---` on its own line **before** and **after** every line that starts with a numbered marker (e.g., `1.`, `2.`, ...).
- Avoids duplicating `---` if they are already present immediately before or after the numbered line.

Usage
- Run with ts-node or your preferred runner:

  ```bash
  ts-node ./job/add-delimiters.ts [inputPath] [outputPath]
  # Defaults: inputPath=job/raw.txt  outputPath=job/raw-separated.txt
  ```

Notes
- Implemented following the guidelines in `job/recipie/script-recipies.md` (ESM, async/await, error handling, class with `run` method).
- The script is exported as a default class and also exposes a small CLI wrapper for convenience.

If you'd like, I can add a package.json script entry for easier execution or add a unit test for the transformation. 📦