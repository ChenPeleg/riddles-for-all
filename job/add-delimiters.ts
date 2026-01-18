import { promises as fs } from 'fs';
import path from 'path';

export default class AddDelimiters {
    inputPath: string;
    outputPath: string;

    constructor(inputPath?: string, outputPath?: string) {
        this.inputPath = inputPath ?? path.resolve('job', 'raw.txt');
        this.outputPath = outputPath ?? path.resolve('job', 'raw-separated.txt');
    }

    async run(): Promise<void> {
        try {
            const data = await fs.readFile(this.inputPath, 'utf8');
            const lines = data.split(/\r?\n/);

            // Process lines and insert '---' before and after numbered lines (e.g., "1.")
            for (let i = 0; i < lines.length; i++) {
                const trimmed = lines[i].trim();
                if (/^\d+\.\s*/.test(trimmed)) {
                    // Ensure there's a '---' before (skipping blank lines)
                    let prevIdx = i - 1;
                    while (prevIdx >= 0 && lines[prevIdx].trim() === '') prevIdx--;
                    if (prevIdx < 0 || lines[prevIdx].trim() !== '---') {
                        lines.splice(i, 0, '---');
                        i++; // move past the inserted line
                    }

                    // Ensure there's a '---' after (skipping blank lines)
                    let nextIdx = i + 1;
                    while (nextIdx < lines.length && lines[nextIdx].trim() === '') nextIdx++;
                    if (nextIdx >= lines.length || lines[nextIdx].trim() !== '---') {
                        // Insert after the current numbered line
                        lines.splice(i + 1, 0, '---');
                        i++; // skip the numbered line we just processed
                    }
                }
            }

            const out = lines.join('\n');
            await fs.writeFile(this.outputPath, out, 'utf8');
            console.log(`Wrote separated file to ${this.outputPath}`);
        } catch (err) {
            console.error('Error in AddDelimiters:', err);
            throw err;
        }
    }
}

// CLI support
if (new URL(import.meta.url).pathname === process.argv[1] || process.argv[1]?.endsWith('add-delimiters.ts') || process.argv[1]?.endsWith('add-delimiters.js')) {
    const [, , input, output] = process.argv;
    const script = new AddDelimiters(input, output);
    script.run().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
