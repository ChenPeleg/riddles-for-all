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
    children: React.ReactNode;
};

export function BookReaderLayout({
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
                                     children
                                 }: Props) {
    return (<>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold md:flex-1">{title}</h1>
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
                />
            </div>

            <div>{children}</div>

            <div className="flex items-center gap-4 mt-8">
                <button
                    onClick={onPrev}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded-lg bg-white border border-surface-200 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
                >
                    Prev
                </button>

                <button
                    onClick={onNext}
                    disabled={currentPage === totalPages - 1}
                    className={`px-4 py-2 rounded-lg bg-white border border-surface-200 ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
                >
                    Next
                </button>
            </div>
        </>);
}
