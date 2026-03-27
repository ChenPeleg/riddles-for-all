import React from 'react';
import {BookReaderToolbar} from './BookReaderToolbar';

type Props = {
    title: string;
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
    trackingEnabledLabel?: string;
    trackReadingLabel?: string;
    enableTrackingAriaLabel?: string;
    disableTrackingAriaLabel?: string;
    children: React.ReactNode;
};

export function BookReaderContainer({
    title,
    currentPage,
    totalPages,
    onPrev,
    onNext,
    onGoToPage,
    onBack,
    isBookmarked,
    canAddBookmark,
    onToggleBookmark,
    isTrackingEnabled,
    onToggleTracking,
    trackingEnabledLabel,
    trackReadingLabel,
    enableTrackingAriaLabel,
    disableTrackingAriaLabel,
    children
}: Props) {
    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                    <h1 className="text-2xl font-bold md:flex-1 text-surface-900 dark:text-white transition-colors">
                        {title}
                    </h1>
                    <BookReaderToolbar
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={onPrev}
                        onNext={onNext}
                        onGoToPage={onGoToPage}
                        onBack={onBack}
                        isBookmarked={isBookmarked}
                        canAddBookmark={canAddBookmark}
                        onToggleBookmark={onToggleBookmark}
                        isTrackingEnabled={isTrackingEnabled}
                        onToggleTracking={onToggleTracking}
                        trackingEnabledLabel={trackingEnabledLabel}
                        trackReadingLabel={trackReadingLabel}
                        enableTrackingAriaLabel={enableTrackingAriaLabel}
                        disableTrackingAriaLabel={disableTrackingAriaLabel}
                    />
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onPrev}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 transition-colors ${
                            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'
                        }`}
                    >
                        Prev
                    </button>

                    <button
                        onClick={onNext}
                        disabled={currentPage === totalPages - 1}
                        className={`px-4 py-2 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 transition-colors ${
                            currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'
                        }`}
                    >
                        Next
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
}
