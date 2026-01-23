import type { Riddle } from "../src/models/riddle";

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
    totalRiddles: 21,
    sources: ["Sample Riddles Collection", "Classic Riddles", "Nature Riddles"],
    generatedAt: "2026-01-20T17:20:17.079Z",
    version: "1.0.0",
  },
  riddles: [
    {
      id: "riddle-001",
      text: "What has keys but no locks, space but no room, and you can enter but not go inside?",
      textHe: "מה יש לו מקשים אך אין לו מנעולים, יש בו רווח אך אין לו חדר, ואתה יכול להיכנס אליו אך לא להיכנס פנימה?",
      solution: "A keyboard",
      solutionHe: "מקלדת",
      categories: ["wordplay", "everyday", "technology"],
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-002",
      text: "What comes once in a minute, twice in a moment, but never in a thousand years?",
      textHe: "מה מופיע פעם בדקה, פעמיים ברגע, אבל אף פעם באלף שנה?",
      solution: "The letter M",
      solutionHe: "האוט M",
      categories: ["wordplay", "tricky"],
      difficulty: "medium",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-003",
      text: "What has a head and a tail but no body?",
      textHe: "מה שיש לו ראש וזנב אבל אין לו גוף?",
      solution: "A coin",
      solutionHe: "מטבע",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-004",
      text: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
      textHe: "אני לא חי, אבל אני גדל; אין לי ריאות אך אני צריך אוויר; אין לי פה אבל מים הורגים אותי. מה אני?",
      solution: "Fire",
      solutionHe: "אש",
      categories: ["logic", "nature"],
      difficulty: "medium",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-005",
      text: "What can travel around the world while staying in a corner?",
      textHe: "מה יכול להקיף את העולם בעודו נשאר בפינה?",
      solution: "A stamp",
      solutionHe: "בול",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-006",
      text: "What gets wetter the more it dries?",
      textHe: "מה נעשה רטוב יותר ככל שהוא מייבש יותר?",
      solution: "A towel",
      solutionHe: "מגבת",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-007",
      text: "If you have me, you want to share me. If you share me, you haven't got me. What am I?",
      textHe: "אם יש לך אותי, תרצה לחלוק אותי. אם תחלוק אותי, כבר אין לך אותי. מה אני?",
      solution: "A secret",
      solutionHe: "סוד",
      categories: ["logic", "tricky"],
      difficulty: "medium",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-008",
      text: "What has many teeth but cannot bite?",
      textHe: "מה שיש לו הרבה שיניים אבל לא יכול לנשוך?",
      solution: "A comb",
      solutionHe: "מסרק",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-009",
      text: "What begins with T, ends with T, and has T in it?",
      textHe: "מה מתחיל ב‑T, נגמר ב‑T, ובתוכו יש T?",
      solution: "A teapot",
      solutionHe: "קומקום/קומקום תה",
      categories: ["wordplay", "tricky"],
      difficulty: "medium",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-010",
      text: "The more you take, the more you leave behind. What are they?",
      textHe: "ככל שלוקחים יותר, משאירים יותר מאחור. מה הם?",
      solution: "Footsteps",
      solutionHe: "צעדים",
      categories: ["logic", "everyday"],
      difficulty: "medium",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-011",
      text: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
      textHe: "מה יכול לרוץ אבל לעולם לא הולך, יש לו פה אבל אף פעם אינו מדבר, יש לו ראש אבל אינו בוכה, יש לו מיטה אבל אינו ישן?",
      solution: "A river",
      solutionHe: "נהר",
      categories: ["wordplay", "nature"],
      difficulty: "hard",
      source: {
        book: "Nature Riddles",
      },
    },
    {
      id: "riddle-010",
      text: "What has one eye but cannot see?",
      textHe: "מה שיש לו עין אחת אבל לא יכול לראות?",
      solution: "A needle",
      solutionHe: "מחט",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-011",
      text: "What can you catch but not throw?",
      textHe: "מה אפשר לתפוס אבל אי אפשר לזרוק?",
      solution: "A cold",
      solutionHe: "הצטננות",
      categories: ["wordplay", "tricky"],
      difficulty: "easy",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-012",
      text: "I have cities but no houses, forests but no trees, and water but no fish. What am I?",
      textHe: "יש לי ערים אבל אין לי בתים, יערות אבל אין לי עצים, ומים אבל אין לי דגים. מה אני?",
      solution: "A map",
      solutionHe: "מפה",
      categories: ["logic", "tricky"],
      difficulty: "hard",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-013",
      text: "What goes up but never comes down?",
      textHe: "מה עולה אבל אף פעם לא יורד?",
      solution: "Your age",
      solutionHe: "הגיל שלך",
      categories: ["logic", "everyday"],
      difficulty: "easy",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-014",
      text: "I have branches, but no fruit, trunk or leaves. What am I?",
      textHe: "יש לי סניפים, אבל אין לי פירות, גזע או עלים. מה אני?",
      solution: "A bank",
      solutionHe: "בנק",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-015",
      text: "What has to be broken before you can use it?",
      textHe: "מה צריך להישבר לפני שאפשר להשתמש בו?",
      solution: "An egg",
      solutionHe: "ביצה",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-016",
      text: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
      textHe: "אני גבוה כשאני צעיר, וקצר כשאני זקן. מה אני?",
      solution: "A candle",
      solutionHe: "נר",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-017",
      text: "What bulan has 28 days?",
      textHe: "איזה חודש יש לו 28 ימים?",
      solution: "All of them",
      solutionHe: "כולם",
      categories: ["tricky", "logic"],
      difficulty: "medium",
      source: {
        book: "Sample Riddles Collection",
      },
    },
    {
      id: "riddle-018",
      text: "What is full of holes but still holds water?",
      textHe: "מה מלא בחורים ועדיין מחזיק מים?",
      solution: "A sponge",
      solutionHe: "ספוג",
      categories: ["wordplay", "everyday"],
      difficulty: "easy",
      source: {
        book: "Classic Riddles",
      },
    },
    {
      id: "riddle-019",
      text: "What question can you never answer yes to?",
      textHe: "איזה שאלה לעולם לא תוכל לענות 'כן' עליה?",
      solution: "Are you asleep yet?",
      solutionHe: "האם אתה כבר ישן?",
      categories: ["tricky", "logic"],
      difficulty: "medium",
      source: {
        book: "Sample Riddles Collection",
      },
    },
  ],
};
