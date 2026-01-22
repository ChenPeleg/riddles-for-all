import type { Riddle } from "../models/riddle";

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
    totalRiddles: 300,
    sources: ["Gym for the Brain"],
    generatedAt: "2026-01-20T17:20:17.079Z",
    version: "1.0.0",
  },
  riddles: [],
};
