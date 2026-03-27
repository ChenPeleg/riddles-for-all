import { useMemo } from 'react';

const READING_STORAGE_KEY = 'riddles_reading_tracker';

export interface ReadingProgress {
    bookSlug: string;
    lastPage: number;
    updatedAt: number;
}

/**
 * Hook to get the most recently read book across all books
 * Returns the reading progress entry with the most recent timestamp
 */
export function useGlobalReadingProgress() {
    const lastStop = useMemo<ReadingProgress | null>(() => {
        try {
            const stored = localStorage.getItem(READING_STORAGE_KEY);
            if (!stored) return null;

            const all: Record<string, ReadingProgress> = JSON.parse(stored);
            const entries = Object.values(all);

            if (entries.length === 0) return null;

            // Return the entry with the most recent updatedAt timestamp
            return entries.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
        } catch {
            return null;
        }
    }, []); // Empty deps array - we only check once on mount

    return { lastStop };
}
