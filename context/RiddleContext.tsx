import React, { createContext, useContext, useState, ReactNode } from 'react';
import riddlesData from '../public/data/riddles-all.json';

export interface Riddle {
  id: string;
  text: string;
  solution?: string;
  categories: string[];
  image?: string;
  clue?: string;
  difficulty?: string;
  source: {
    book: string;
  };
}

interface RiddleContextType {
  riddles: Riddle[];
  loading: boolean;
  error: string | null;
}

const RiddleContext = createContext<RiddleContextType | undefined>(undefined);

export function RiddleProvider({ children }: { children: ReactNode }) {
  // Use the imported data directly
  const [riddles] = useState<Riddle[]>(riddlesData.riddles as Riddle[]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return (
    <RiddleContext.Provider value={{ riddles, loading, error }}>
      {children}
    </RiddleContext.Provider>
  );
}

export function useRiddles() {
  const context = useContext(RiddleContext);
  if (context === undefined) {
    throw new Error('useRiddles must be used within a RiddleProvider');
  }
  return context;
}
