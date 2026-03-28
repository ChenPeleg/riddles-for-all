import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from 'react';

import {Riddle} from '../models/riddle';
import {useI18n} from './I18nContext';

interface RiddleContextType {
    riddles: Riddle[];
    loading: boolean;
    error: string | null;
}

interface RiddleCollection {
    metadata: {
        totalRiddles: number;
        sources: string[];
        generatedAt: string;
        version: string;
    };
    riddles: Riddle[];
}

const RiddleContext = createContext<RiddleContextType | undefined>(undefined);

export function RiddleProvider({children}: { children: ReactNode }) {
    const {lang} = useI18n();
    const [allRiddles, setAllRiddles] = useState<Riddle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRiddles = async () => {
            try {
                setLoading(true);

                // Load both JSON files in parallel
                const [gymResponse, ultimateResponse] = await Promise.all([
                    fetch('/data/gym-for-the-brain.json'),
                    fetch('/data/ultimate-collection.json')
                ]);

                if (!gymResponse.ok || !ultimateResponse.ok) {
                    throw new Error('Failed to load riddle data');
                }

                const gymData: RiddleCollection = await gymResponse.json();
                const ultimateData: RiddleCollection = await ultimateResponse.json();

                // Process ultimate collection
                const ultimateCollection: Riddle[] = ultimateData.riddles.map(r => ({
                    ...r,
                    categories: [],
                    source: {book: 'Ultimate 500 Riddles Collection'}
                }) satisfies Riddle);

                // Combine all riddles
                const combined = [...gymData.riddles, ...ultimateCollection];
                setAllRiddles(combined);
                setLoading(false);
            } catch (err) {
                console.error('Error loading riddles:', err);
                setError(err instanceof Error ? err.message : 'Failed to load riddles');
                setLoading(false);
            }
        };

        loadRiddles();
    }, []);

    const riddles = useMemo<Riddle[]>(() => {
        if (lang === 'he') {
            return allRiddles.filter(r => {
                return Boolean(r.textHe && String(r.textHe).trim().length > 0);
            });
        }
        return allRiddles;
    }, [lang, allRiddles]);

    return (<RiddleContext.Provider value={{
        riddles,
        loading,
        error
    }}>
        {children}
    </RiddleContext.Provider>);
}

export function useRiddles() {
    const context = useContext(RiddleContext);
    if (context === undefined) {
        throw new Error('useRiddles must be used within a RiddleProvider');
    }
    return context;
}
