import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';

import {riddlesData} from '../assets/riddles-all';
import {riddlesDataGym} from '../assets/gym-for-the-brain';
import {ultimateRiddleCollection} from '../assets/ultimate-collection';
import {Riddle} from '../models/riddle';
import {useI18n} from './I18nContext';

interface RiddleContextType {
    riddles: Riddle[];
    loading: boolean;
    error: string | null;
}

const RiddleContext = createContext<RiddleContextType | undefined>(undefined);

const ultimateCollection: Riddle[] = ultimateRiddleCollection.riddles.map(r => ({
    ...r,
    categories: [],
    source: {book: 'Ultimate 500 Riddles Collection'}
}) satisfies Riddle);
const allRiddles: Riddle[] = [...riddlesData.riddles, ...riddlesDataGym.riddles, ...ultimateCollection];

export function RiddleProvider({children}: { children: ReactNode }) {

    const {lang} = useI18n();

    const riddles = useMemo<Riddle[]>(() => {
        if (lang === 'he') {
            return allRiddles.filter(r => {
                return Boolean(r.textHe && String(r.textHe).trim().length > 0);
            });
        }
        return allRiddles;
    }, [lang]);

    const [loading] = useState(false);
    const [error] = useState<string | null>(null);

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
