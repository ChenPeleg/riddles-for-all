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
    isTrackingEnabled?: boolean;
    onToggleTracking?: () => void;
    backLabel?: string;
    sourcesLabel?: string;
    trackingEnabledLabel?: string;
    trackReadingLabel?: string;
    enableTrackingAriaLabel?: string;
    disableTrackingAriaLabel?: string;
};

export function BookReaderToolbar({
                                      currentPage,
                                      totalPages,
                                      onBack,
                                      isBookmarked,
                                      canAddBookmark,
                                      onToggleBookmark,
                                      isTrackingEnabled,
                                      onToggleTracking,
                                      sourcesLabel = 'Sources',
                                      backLabel = 'Back',
                                      trackingEnabledLabel = 'Tracking enabled - Click to disable',
                                      trackReadingLabel = 'Track reading progress',
                                      enableTrackingAriaLabel = 'Enable reading progress tracking',
                                      disableTrackingAriaLabel = 'Disable reading progress tracking'
                                  }: Props) {
    return (<div className="flex items-center gap-6 md:ml-auto">
            <button onClick={() => onBack && onBack()} className="text-surface-400 hover:text-brand-accent transition-colors">{backLabel}</button>
            <div className="flex items-center gap-3">
                <div className="text-sm text-surface-500 dark:text-surface-400 transition-colors">{currentPage + 1} / {totalPages}</div>
                <button
                    onClick={() => onToggleTracking && onToggleTracking()}
                    className={`p-2 rounded-lg transition-colors ${isTrackingEnabled ? 'text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30' : 'text-surface-400 dark:text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-600 dark:hover:text-surface-300'}`}
                    title={isTrackingEnabled ? trackingEnabledLabel : trackReadingLabel}
                    aria-label={isTrackingEnabled ? disableTrackingAriaLabel : enableTrackingAriaLabel}
                >
                    <AppImage name="eye" className="w-5 h-5" fill={isTrackingEnabled ? 'currentColor' : 'none'}/>
                </button>
                <button
                    onClick={() => onToggleBookmark && onToggleBookmark()}
                    disabled={!isBookmarked && !canAddBookmark}
                    className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-yellow-500 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/30' : canAddBookmark ? 'text-surface-400 dark:text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-600 dark:hover:text-surface-300' : 'text-surface-300 dark:text-surface-700 cursor-not-allowed'}`}
                    title={isBookmarked ? 'Remove bookmark' : canAddBookmark ? 'Add bookmark' : 'Bookmark limit reached'}
                >
                    <AppImage name="bookmark" className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'}/>
                </button>
            </div>
            <Link to="/sources" className="ml-auto text-sm text-brand-accent hover:underline">{sourcesLabel}</Link>
        </div>);
}
