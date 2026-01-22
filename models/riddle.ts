export type RiddleDifficulty = "easy" | "medium" | "hard";

export interface RiddleSource {
  book: string;
  page?: number;
}

export interface Riddle {
  id: string;
  text: string;
  textHe?: string;
  solution?: string;
  solutionHe?: string;
  categories: string[];
  image?: string;
  clue?: string;
  clueHe?: string;
  difficulty?: RiddleDifficulty;
  source: RiddleSource;
}
