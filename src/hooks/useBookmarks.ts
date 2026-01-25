import { useState, useEffect, useCallback } from 'react';

export interface Bookmark {
  id: string; // unique bookmark id
  bookSlug: string;
  riddleId: string;
  pageNumber: number; // 1-based page number
  createdAt: number; // timestamp
}

const STORAGE_KEY = 'riddles_bookmarks';
const MAX_BOOKMARKS_PER_BOOK = 5;

export function useBookmarks(bookSlug: string | undefined) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Bookmark[];
        setBookmarks(parsed);
      }
    } catch (e) {
      // ignore localStorage errors
      console.error('Failed to load bookmarks:', e);
    }
  }, []);

  // Get bookmarks for the current book
  const bookBookmarks = bookSlug
    ? bookmarks.filter(b => b.bookSlug === bookSlug)
    : [];

  // Save bookmarks to localStorage
  const saveBookmarks = useCallback((newBookmarks: Bookmark[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
      setBookmarks(newBookmarks);
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, []);

  // Add a bookmark
  const addBookmark = useCallback((riddleId: string, pageNumber: number) => {
    if (!bookSlug) return false;

    const bookBookmarks = bookmarks.filter(b => b.bookSlug === bookSlug);
    
    // Check if already bookmarked
    const existing = bookBookmarks.find(b => b.riddleId === riddleId);
    if (existing) {
      return false; // Already bookmarked
    }

    // Check limit
    if (bookBookmarks.length >= MAX_BOOKMARKS_PER_BOOK) {
      return false; // Limit reached
    }

    const newBookmark: Bookmark = {
      id: `${bookSlug}_${riddleId}_${Date.now()}`,
      bookSlug,
      riddleId,
      pageNumber,
      createdAt: Date.now(),
    };

    const newBookmarks = [...bookmarks, newBookmark];
    saveBookmarks(newBookmarks);
    return true;
  }, [bookSlug, bookmarks, saveBookmarks]);

  // Remove a bookmark
  const removeBookmark = useCallback((bookmarkId: string) => {
    const newBookmarks = bookmarks.filter(b => b.id !== bookmarkId);
    saveBookmarks(newBookmarks);
  }, [bookmarks, saveBookmarks]);

  // Check if current riddle is bookmarked
  const isBookmarked = useCallback((riddleId: string) => {
    if (!bookSlug) return false;
    return bookmarks.some(b => b.bookSlug === bookSlug && b.riddleId === riddleId);
  }, [bookSlug, bookmarks]);

  // Get bookmark for a specific riddle
  const getBookmark = useCallback((riddleId: string) => {
    if (!bookSlug) return undefined;
    return bookmarks.find(b => b.bookSlug === bookSlug && b.riddleId === riddleId);
  }, [bookSlug, bookmarks]);

  // Check if can add more bookmarks
  const canAddBookmark = bookBookmarks.length < MAX_BOOKMARKS_PER_BOOK;

  return {
    bookmarks: bookBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmark,
    canAddBookmark,
  };
}
