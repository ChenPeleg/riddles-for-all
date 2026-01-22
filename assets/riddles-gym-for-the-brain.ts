import type { Riddle } from "../models/riddle";

// Read the original text files from disk when running under Node.
// This avoids bundling the .txt files via static imports.
let questionsRaw = "";
let answersRaw = "";

const isNode =
  typeof process !== "undefined" &&
  !!(process.versions && process.versions.node);
if (isNode) {
  try {
    // Use require in a try/catch so bundlers that don't provide `fs` won't break.
    // Resolve paths relative to the process cwd so this works when run from project root.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = (globalThis as any).require
      ? (globalThis as any).require("fs")
      : require("fs");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = (globalThis as any).require
      ? (globalThis as any).require("path")
      : require("path");
    const base = process.cwd();
    questionsRaw = fs.readFileSync(
      path.join(base, "assets", "Gym for the Brain.questions.txt"),
      "utf8",
    );
    answersRaw = fs.readFileSync(
      path.join(base, "assets", "Gym for the Brain.answers.txt"),
      "utf8",
    );
  } catch (err) {
    // If reading fails, leave strings empty and warn. Callers can handle empty data.
    // eslint-disable-next-line no-console
    console.warn("Could not read Gym for the Brain text files from disk:", err);
  }
} else {
  // Not running in Node (e.g. browser). Warn the developer that bundling of raw imports
  // or server-side generation should be used for client builds.
  // eslint-disable-next-line no-console
  console.warn(
    "assets/riddles-gym-for-the-brain: running outside Node. The .txt files are not read from disk.",
  );
}

function parseNumberedEntries(raw: string) {
  const entries: string[] = [];
  const re = /\d+\.\s+([\s\S]*?)(?=\n\d+\.\s|$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    entries.push(m[1].trim().replace(/\r/g, "").replace(/\n+/g, " "));
  }
  return entries;
}

const questions = parseNumberedEntries(questionsRaw);
const answers = parseNumberedEntries(answersRaw);

const count = Math.max(questions.length, answers.length);

export const riddlesData: {
  metadata: {
    totalRiddles: number;
    sources: string[];
    generatedAt: string;
    version: string;
  };
  riddles: Riddle[];
} = {
  metadata: {
    totalRiddles: count,
    sources: ["Gym for the Brain"],
    generatedAt: new Date().toISOString(),
    version: "1.0.0",
  },
  riddles: Array.from({ length: count }).map((_, i) => {
    const q = questions[i] ?? "";
    const a = answers[i] ?? "";
    const id = `gym-${i + 1}`;
    const r: Riddle = {
      id,
      text: q,
      solution: a,
      categories: ["gym-for-the-brain"],
      source: { book: "Gym for the Brain" },
    };
    return r;
  }),
};
