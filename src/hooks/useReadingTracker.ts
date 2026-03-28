import { useState, useEffect, useCallback } from 'react';

export interface ReadingProgress {
  bookSlug: string;
  lastPage: number; // 1-based page number
  updatedAt: number; // timestamp
}

const STORAGE_KEY = 'riddles_reading_tracker';
const TRACKING_STATE_KEY = 'riddles_tracking_enabled';

export function useReadingTracker(bookSlug: string | undefined) {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(TRACKING_STATE_KEY);
      if (stored && bookSlug) {
        const parsed = JSON.parse(stored);
        return parsed[bookSlug] ?? true;
      }
    } catch (e) {}
    return true;
  });

  const [progress, setProgress] = useState<ReadingProgress | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && bookSlug) {
        const parsed = JSON.parse(stored);
        return parsed[bookSlug] || null;
      }
    } catch (e) {}
    return null;
  });

  // Keep state in sync with bookSlug changes
  useEffect(() => {
    try {
      const storedTracking = localStorage.getItem(TRACKING_STATE_KEY);
      if (storedTracking) {
        const parsed = JSON.parse(storedTracking);
        setIsTrackingEnabled(bookSlug ? parsed[bookSlug] ?? true : true);
      } else {
        setIsTrackingEnabled(true);
      }

      const storedProgress = localStorage.getItem(STORAGE_KEY);
      if (storedProgress && bookSlug) {
        const parsed = JSON.parse(storedProgress);
        setProgress(parsed[bookSlug] || null);
      } else {
        setProgress(null);
      }
    } catch (e) {
      console.error('Failed to sync reading tracker:', e);
    }
  }, [bookSlug]);

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
      const newState = !(trackingState[bookSlug] ?? true);
      
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
