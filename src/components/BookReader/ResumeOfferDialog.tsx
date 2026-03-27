import React from 'react';
import AppImage from '../AppImage';

type Props = {
    lastPage: number;
    onResume: () => void;
    onDismiss: () => void;
    resumeOfferText: string;
    resumeButtonText: string;
    dismissButtonText: string;
};

export function ResumeOfferDialog({
    lastPage,
    onResume,
    onDismiss,
    resumeOfferText,
    resumeButtonText,
    dismissButtonText
}: Props) {
    return (
        <div className="mb-8 p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in transition-colors">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-accent/20 rounded-xl">
                    <AppImage name="book-open" className="w-5 h-5 text-brand-accent" />
                </div>
                <p className="text-sm font-medium text-surface-700 dark:text-surface-200">
                    {resumeOfferText.replace('{page}', String(lastPage))}
                </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                    onClick={onResume}
                    className="flex-1 sm:flex-none px-4 py-2 bg-brand-accent text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm shadow-brand-accent/20"
                >
                    {resumeButtonText}
                </button>
                <button
                    onClick={onDismiss}
                    className="px-4 py-2 text-sm font-semibold text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
                >
                    {dismissButtonText}
                </button>
            </div>
        </div>
    );
}
