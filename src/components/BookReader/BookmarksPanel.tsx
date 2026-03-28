import React from 'react';
import AppImage from '../AppImage';

type Bookmark = {
    id: string;
    riddleId: string;
    pageNumber: number;
};

type Props = {
    bookmarks: Bookmark[];
    currentPage: number;
    onGoToPage: (page: number) => void;
    onRemoveBookmark: (bookmarkId: string) => void;
    bookmarksLabel: string;
    pageLabel: string;
    removeBookmarkLabel: string;
};

export function BookmarksPanel({
    bookmarks,
    currentPage,
    onGoToPage,
    onRemoveBookmark,
    bookmarksLabel,
    pageLabel,
    removeBookmarkLabel
}: Props) {
    if (bookmarks.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 p-4 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl transition-colors">
            <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3 flex items-center gap-2">
                <AppImage name="bookmark" className="w-4 h-4 text-yellow-500 dark:text-yellow-400" fill="currentColor" />
                {bookmarksLabel} ({bookmarks.length}/5)
            </h3>
            <div className="flex flex-wrap gap-2">
                {bookmarks.map((bookmark) => {
                    const isCurrentPage = bookmark.pageNumber === currentPage;
                    return (
                        <button
                            key={bookmark.id}
                            onClick={() => onGoToPage(bookmark.pageNumber)}
                            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors flex items-center gap-2 ${
                                isCurrentPage
                                    ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400'
                                    : 'bg-surface-50 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                            }`}
                        >
                            <span>{pageLabel} {bookmark.pageNumber}</span>
                            {isCurrentPage && (
                                <span className="text-xs">•</span>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveBookmark(bookmark.id);
                                }}
                                className="ml-1 text-surface-400 hover:text-red-500 transition-colors"
                                title={removeBookmarkLabel}
                            >
                                <AppImage name="close" className="w-3.5 h-3.5" />
                            </button>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
