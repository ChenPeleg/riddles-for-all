import { useState, useEffect, useCallback } from 'react';

export interface ReadingProgress {
  bookSlug: string;
  lastPage: number; // 1-based page number
  updatedAt: number; // timestamp
}

const STORAGE_KEY = 'riddles_reading_tracker';
const TRACKING_STATE_KEY = 'riddles_tracking_enabled';

export function useReadingTracker(bookSlug: string | undefined) {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
  const [progress, setProgress] = useState<ReadingProgress | null>(null);

  // Load tracking enabled state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRACKING_STATE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const trackingState = bookSlug ? parsed[bookSlug] ?? false : false;
        setIsTrackingEnabled(trackingState);
      }
    } catch (e) {
      console.error('Failed to load tracking state:', e);
    }
  }, [bookSlug]);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (!bookSlug || !isTrackingEnabled) {
      setProgress(null);
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, ReadingProgress>;
        const bookProgress = parsed[bookSlug];
        if (bookProgress) {
          setProgress(bookProgress);
        }
      }
    } catch (e) {
      console.error('Failed to load reading progress:', e);
    }
  }, [bookSlug, isTrackingEnabled]);

  // Save progress to localStorage
  const saveProgress = useCallback((pageNumber: number) => {
    if (!bookSlug || !isTrackingEnabled) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const allProgress = stored ? JSON.parse(stored) : {};
      
      const newProgress: ReadingProgress = {
        bookSlug,
        lastPage: pageNumber,
        updatedAt: Date.now(),
      };

      allProgress[bookSlug] = newProgress;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
      setProgress(newProgress);
    } catch (e) {
      console.error('Failed to save reading progress:', e);
    }
  }, [bookSlug, isTrackingEnabled]);

  // Toggle tracking for current book
  const toggleTracking = useCallback(() => {
    if (!bookSlug) return;

    try {
      const stored = localStorage.getItem(TRACKING_STATE_KEY);
      const trackingState = stored ? JSON.parse(stored) : {};
      const newState = !trackingState[bookSlug];
      
      trackingState[bookSlug] = newState;
      localStorage.setItem(TRACKING_STATE_KEY, JSON.stringify(trackingState));
      setIsTrackingEnabled(newState);

      // If disabling tracking, remove progress for this book
      if (!newState) {
        const progressStored = localStorage.getItem(STORAGE_KEY);
        if (progressStored) {
          const allProgress = JSON.parse(progressStored);
          delete allProgress[bookSlug];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
          setProgress(null);
        }
      }
    } catch (e) {
      console.error('Failed to toggle tracking:', e);
    }
  }, [bookSlug]);

  // Get the last saved page number
  const getLastPage = useCallback(() => {
    return progress?.lastPage ?? null;
  }, [progress]);

  return {
    isTrackingEnabled,
    toggleTracking,
    saveProgress,
    getLastPage,
  };
}
