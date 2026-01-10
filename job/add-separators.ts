import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export default class AddSeparators {
    inputPath: string;
    outputPath: string;

    constructor(inputPath?: string, outputPath?: string) {
        this.inputPath = inputPath || path.resolve(__dirname, 'raw.txt');
        this.outputPath = outputPath || path.resolve(__dirname, 'raw-separated.txt');
    }

    async run() {
        try {
            const raw = await readFile(this.inputPath, 'utf8');

            // Split header, Chapter One, Chapter Two, and the rest
            const chapterOneIndex = raw.indexOf('Chapter One:');
            const chapterTwoIndex = raw.indexOf('Chapter Two:');
            const conclusionIndex = raw.indexOf('Conclusion');

            if (chapterOneIndex === -1) {
                throw new Error('Could not find "Chapter One:" marker in the input file');
            }

            // preserve everything before Chapter One
            const pre = raw.slice(0, chapterOneIndex);

            // chapter one block (up to chapter two or end)
            const chOneEnd = chapterTwoIndex !== -1 ? chapterTwoIndex : raw.length;
            const chapterOneBlock = raw.slice(chapterOneIndex, chOneEnd);

            // format riddles in chapter one
            let formattedRiddles = '';
            // Try regex match of numbered riddles (non-greedy)
            const riddleRegex = /(\d+\.\s[\s\S]*?)(?=\s*\d+\.\s|\s*Chapter Two:|$)/g;
            const riddles = chapterOneBlock.match(riddleRegex);

            if (riddles && riddles.length > 0) {
                formattedRiddles = riddles.map(r => r.trim()).join('\n\n---\n\n');
            } else {
                // Fallback: split by positions where a number and dot start a riddle
                const parts = chapterOneBlock.split(/(?=\d+\.\s)/g).map(s => s.trim()).filter(s => /^\d+\./.test(s));
                if (parts.length > 0) {
                    formattedRiddles = parts.join('\n\n---\n\n');
                } else {
                    // last resort, leave as-is
                    formattedRiddles = chapterOneBlock.trim();
                }
            }

                // Chapter Two / answers formatting
                let formattedAnswers = '';
                let chTwoHeading = '';
                let rest = '';

                if (chapterTwoIndex !== -1) {
                    // find where the answers end (use "Conclusion" or end of file)
                    const chTwoStart = chapterTwoIndex;
                    const chTwoEnd = conclusionIndex !== -1 ? conclusionIndex : raw.length;
                    const chapterTwoBlock = raw.slice(chTwoStart, chTwoEnd);

                    // keep heading (e.g., "Chapter Two: Answer Key")
                    const firstLineEnd = chapterTwoBlock.indexOf(' ');
                    // we'll keep the whole heading up to the first capitalized answer roughly
                    // but simpler: split after the heading phrase
                    const headingMatch = chapterTwoBlock.match(/Chapter Two:\s*Answer Key\s*/i);
                    if (headingMatch) {
                        chTwoHeading = headingMatch[0];
                        const answersText = chapterTwoBlock.slice(headingMatch[0].length).trim();

                        // Heuristic: split on capitalized-word boundaries (start of each answer)
                        // Match sequences that start with a capital letter and continue until next capital letter
                        const answerMatches = answersText.match(/[A-Z][^A-Z]*/g);
                        if (answerMatches && answerMatches.length > 0) {
                            formattedAnswers = answerMatches.map(a => a.trim()).join('\n\n---\n\n');
                        } else {
                            // fallback: keep as-is
                            formattedAnswers = answersText;
                        }
                    } else {
                        // no heading match, keep raw block
                        formattedAnswers = chapterTwoBlock.trim();
                    }

                    // rest (from conclusion onwards)
                    rest = conclusionIndex !== -1 ? raw.slice(conclusionIndex) : '';
                } else {
                    // no chapter two: keep the rest as empty
                    rest = raw.slice(chOneEnd);
                }

                // Reconstruct final content
                const outParts: string[] = [];
                outParts.push(pre.trim());
                outParts.push('\n\n');
                outParts.push('Chapter One: (formatted riddles)\n\n');
                outParts.push(formattedRiddles);

                if (chapterTwoIndex !== -1) {
                    outParts.push('\n\n---\n\n');
                    outParts.push(chTwoHeading.trim());
                    outParts.push('\n\n');
                    outParts.push(formattedAnswers);
                }

                if (rest && rest.trim()) {
                    outParts.push('\n\n---\n\n');
                    outParts.push(rest.trim());
                }

                const out = outParts.join('');

                await writeFile(this.outputPath, out, 'utf8');
                console.log(`Wrote formatted file to ${this.outputPath}`);
            } catch (err) {
                console.error('Error:', (err as Error).message);
                throw err;
            }
        }
}

// run when executed directly
(async () => {
    try {
        const runner = new AddSeparators();
        await runner.run();
    } catch (e) {
        process.exitCode = 1;
    }
})();
