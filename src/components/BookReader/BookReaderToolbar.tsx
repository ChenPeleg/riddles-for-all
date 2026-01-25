import React from 'react';
import {Link} from 'react-router-dom';
import AppImage from '../AppImage';

type Props = {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    onGoToPage: (n: number) => void;
    onBack?: () => void;
    isBookmarked?: boolean;
    canAddBookmark?: boolean;
    onToggleBookmark?: () => void;
    backLabel?: string;
    sourcesLabel?: string;
};

export function BookReaderToolbar({
                                      currentPage,
                                      totalPages,
                                      onBack,
                                      isBookmarked,
                                      canAddBookmark,
                                      onToggleBookmark,
                                      sourcesLabel = 'Sources',
                                      backLabel = 'Back'
                                  }: Props) {
    return (<div className="flex items-center gap-6 md:ml-auto">
            <button onClick={() => onBack && onBack()} className="text-surface-400 hover:text-brand-accent">{backLabel}</button>
            <div className="flex items-center gap-3">
                <div className="text-sm text-surface-500">{currentPage + 1} / {totalPages}</div>
                <button
                    onClick={() => onToggleBookmark && onToggleBookmark()}
                    disabled={!isBookmarked && !canAddBookmark}
                    className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-yellow-500 hover:bg-yellow-50' : canAddBookmark ? 'text-surface-400 hover:bg-surface-100 hover:text-surface-600' : 'text-surface-300 cursor-not-allowed'}`}
                    title={isBookmarked ? 'Remove bookmark' : canAddBookmark ? 'Add bookmark' : 'Bookmark limit reached'}
                >
                    <AppImage name="bookmark" className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'}/>
                </button>
            </div>
            <Link to="/sources" className="ml-auto text-sm text-brand-accent hover:underline">{sourcesLabel}</Link>
        </div>);
}
