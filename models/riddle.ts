export type RiddleDifficulty = "easy" | "medium" | "hard";

export interface RiddleSource {
  book: string;
  page?: number;
}

export interface Riddle {
  id: string;
  text: string;
  solution?: string;
  categories: string[];
  image?: string;
  clue?: string;
  difficulty?: RiddleDifficulty;
  source: RiddleSource;
}
