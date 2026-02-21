import React from 'react';
import {BookReaderLayout} from './BookReaderLayout';


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

export   function BookReaderMain({ title, currentPage, totalPages, onPrev, onNext, onGoToPage, onBack, isBookmarked, canAddBookmark, onToggleBookmark, isTrackingEnabled, onToggleTracking, trackingEnabledLabel, trackReadingLabel, enableTrackingAriaLabel, disableTrackingAriaLabel, children }: Props) {
    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <BookReaderLayout
                    title={title}
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
                >
                    {children}
                </BookReaderLayout>
            </div>
        </div>
    );
}
