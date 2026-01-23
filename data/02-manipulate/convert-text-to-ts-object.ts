import type { Riddle } from "../../src/models/riddle";

const debug = false;

export class RiddleConverter {
  questionsRaw = "";
  answersRaw = "";

  static isNode() {
    return (
      typeof process !== "undefined" &&
      !!(process.versions && process.versions.node)
    );
  }

  private parseNumberedEntries(raw: string) {
    let entryIndex = 1;
    const entries: string[] = [];
    const lines = raw.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      console.log({ line, entryIndex });
      if (!line.startsWith(`${entryIndex}.`)) {
        entries[entryIndex - 1] = entries[entryIndex - 1] + "\n" + line + "\n";
      } else {
        entries[entryIndex - 1] = line;
        entryIndex++;
      }
    }

    if (!debug) {
      return entries.map((e) => e.replace(/^\d+\.\s*/, "").trim());
    }

    return entries;
  }

  async loadFiles() {
    if (!RiddleConverter.isNode()) {
      // eslint-disable-next-line no-console
      console.warn(
        "assets/riddles-gym-for-the-brain: running outside Node. The .txt files are not read from disk.",
      );
      return;
    }

    try {
      const base = process.cwd();
      if (typeof (globalThis as any).require === "function") {
        const fs = (globalThis as any).require("fs");
        const path = (globalThis as any).require("path");
        this.questionsRaw = fs.readFileSync(
          path.join(base, "assets", "Gym for the Brain.questions.txt"),
          "utf8",
        );
        this.answersRaw = fs.readFileSync(
          path.join(base, "assets", "Gym for the Brain.answers.txt"),
          "utf8",
        );
      } else {
        const fs = await import("fs");
        const path = await import("path");
        this.questionsRaw = fs.readFileSync(
          path.join(base, "assets", "Gym for the Brain.questions.txt"),
          "utf8",
        );
        this.answersRaw = fs.readFileSync(
          path.join(base, "assets", "Gym for the Brain.answers.txt"),
          "utf8",
        );
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        "Could not read Gym for the Brain text files from disk:",
        err,
      );
    }
  }

  buildRiddlesData() {
    const questions = this.parseNumberedEntries(this.questionsRaw);
    const answers = this.parseNumberedEntries(this.answersRaw);

    if (questions.length !== answers.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `questions/answers length mismatch: ${questions.length} questions, ${answers.length} answers — truncating to smallest.`,
      );
    }
    const count = Math.min(questions.length, answers.length);

    const riddles = Array.from({ length: count }).map((_, i) => {
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
    });

    return {
      metadata: {
        totalRiddles: count,
        sources: ["Gym for the Brain"],
        generatedAt: new Date().toISOString(),
        version: "1.0.0",
      },
      riddles,
    } as const;
  }

  async writeOutputIfNode(riddlesData: unknown) {
    if (!RiddleConverter.isNode()) return;

    try {
      const fs =
        typeof (globalThis as any).require === "function"
          ? (globalThis as any).require("fs")
          : await import("fs");
      const path =
        typeof (globalThis as any).require === "function"
          ? (globalThis as any).require("path")
          : await import("path");

      const outPath = path.join(
        process.cwd(),
        "assets",
        "gym-for-the-brain.ts",
      );

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
}

// Maintain the original module behavior using top-level await (matches the original file)
const converter = new RiddleConverter();
await converter.loadFiles();
export const riddlesData = converter.buildRiddlesData();
await converter.writeOutputIfNode(riddlesData);
