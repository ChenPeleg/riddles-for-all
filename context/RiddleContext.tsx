import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/riddles/data/riddles-all.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch riddles');
        }
        return res.json();
      })
      .then((data) => {
        setRiddles(data.riddles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching riddles:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
