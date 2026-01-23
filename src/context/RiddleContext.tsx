import React, { createContext, useContext, useState, ReactNode } from 'react';

import { riddlesData } from '../assets/riddles-all';
import { riddlesDataGym } from '../assets/gym-for-the-brain';
import { riddlesDataGymHe } from '../assets/gym-for-the-brain.he';
import { Riddle } from '../models/riddle';

interface RiddleContextType {
  riddles: Riddle[];
  loading: boolean;
  error: string | null;
}

const RiddleContext = createContext<RiddleContextType | undefined>(undefined);

// Merge Hebrew partials into base riddles by id when available
const mergedGymRiddles: Riddle[] = riddlesDataGym.riddles.map(r => {
  const extra = (riddlesDataGymHe as Record<string, Partial<Pick<Riddle, 'textHe' | 'solutionHe' | 'clueHe'>>>)[r.id];
  if (extra) {
    return { ...r, ...extra } as Riddle;
  }
  return r as Riddle;
});

const allRiddles: Riddle[] = [...riddlesData.riddles, ...mergedGymRiddles];

export function RiddleProvider({ children }: { children: ReactNode }) {

  // Use the imported data directly
  const [riddles] = useState<Riddle[]>(allRiddles as Riddle[]);
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
