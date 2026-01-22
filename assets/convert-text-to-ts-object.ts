import { link } from "fs";
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
    // Resolve paths relative to the process cwd so this works when run from project root.
    const base = process.cwd();
    // If a synchronous `require` is available (CommonJS environment), prefer it for simplicity.
    if (typeof (globalThis as any).require === "function") {
      const fs = (globalThis as any).require("fs");
      const path = (globalThis as any).require("path");
      questionsRaw = fs.readFileSync(
        path.join(base, "assets", "Gym for the Brain.questions.txt"),
        "utf8",
      );
      answersRaw = fs.readFileSync(
        path.join(base, "assets", "Gym for the Brain.answers.txt"),
        "utf8",
      );
    } else {
      // ESM environment: use dynamic import with top-level await.
      const fs = await import("fs");
      const path = await import("path");
      questionsRaw = fs.readFileSync(
        path.join(base, "assets", "Gym for the Brain.questions.txt"),
        "utf8",
      );
      answersRaw = fs.readFileSync(
        path.join(base, "assets", "Gym for the Brain.answers.txt"),
        "utf8",
      );
    }
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
  let entryIndex = 1;
  const entries: string[] = [];
  const lines = raw.split("\n");
  for (let i = 0; i < lines.length; ) {
    const line = lines[i].trim();
    if (!line.startsWith(`${entryIndex}.`)) {
      entries[entryIndex - 1] = entries[entryIndex - 1] + "\n" + line + "\n";
    } else {
      entries[entryIndex - 1] = line;
    }
  }
  console.log(entries);

  return entries;
}

const questions = parseNumberedEntries(questionsRaw);
const answers = parseNumberedEntries(answersRaw);

if (questions.length !== answers.length) {
  // eslint-disable-next-line no-console
  console.warn(
    `questions/answers length mismatch: ${questions.length} questions, ${answers.length} answers — truncating to smallest.`,
  );
}
const count = Math.min(questions.length, answers.length);

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

// When run under Node, write a generated TS file similar to `riddles-all.ts`.
if (isNode) {
  try {
    // Prefer CommonJS `require` when available for simplicity.
    const fs =
      typeof (globalThis as any).require === "function"
        ? (globalThis as any).require("fs")
        : await import("fs");
    const path =
      typeof (globalThis as any).require === "function"
        ? (globalThis as any).require("path")
        : await import("path");

    const outPath = path.join(process.cwd(), "assets", "gym-for-the-brain.ts");

    const fileHeader = `import type { Riddle } from "../models/riddle";\n\n`;
    const exportDecl = `export const riddlesData: {\n  metadata: {\n    totalRiddles: number;\n    sources: string[];\n    generatedAt: string;\n    version: string;\n  };\n  riddles: Riddle[];\n} = `;

    const body = JSON.stringify(riddlesData, null, 2);
    const fileContent = fileHeader + exportDecl + body + ";\n";

    fs.writeFileSync(outPath, fileContent, "utf8");
    // eslint-disable-next-line no-console
    console.log("Wrote generated riddles to:", outPath);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Could not write gym-for-the-brain.ts:", err);
  }
}
