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
    children: React.ReactNode;
};

export   function BookReaderShell({ title, currentPage, totalPages, onPrev, onNext, onGoToPage, onBack, isBookmarked, canAddBookmark, onToggleBookmark, children }: Props) {
    return (
        <div className="min-h-screen bg-surface-50">
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
                >
                    {children}
                </BookReaderLayout>
            </div>
        </div>
    );
}
