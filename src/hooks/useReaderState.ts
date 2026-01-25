import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useReaderState(totalPages: number, slug?: string) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [index, setIndex] = useState(0);

    // Initialize index from `page` search param when totalPages or slug changes
    useEffect(() => {
        if (!slug) {
            setIndex(0);
            return;
        }
        if (totalPages === 0) {
            setIndex(0);
            return;
        }

        const raw = searchParams.get('page');
        const p = raw ? parseInt(raw, 10) : NaN;
        if (!isNaN(p)) {
            const idx = Math.max(0, Math.min(totalPages - 1, p - 1));
            setIndex(idx);
        } else {
            setIndex(0);
        }
    }, [slug, totalPages]);

    // Keep the URL search param in sync with the current index
    useEffect(() => {
        setSearchParams({ page: String(index + 1) }, { replace: true });
    }, [index, setSearchParams]);

    const goPrev = () => setIndex(i => Math.max(0, i - 1));
    const goNext = () => setIndex(i => Math.min(totalPages - 1, i + 1));
    const goToPage = (pageNumber: number) => {
        const idx = Math.max(0, Math.min(totalPages - 1, pageNumber - 1));
        setIndex(idx);
    };

    return { index, setIndex, goPrev, goNext, goToPage } as const;
}
