import {useEffect, useMemo, useState} from 'react';
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {useRiddles} from '../context/RiddleContext';
import RiddleCard from '../components/RiddleCard';
import {displayBookTitle, getBookSlug} from '../i18n/bookKeys';
import {useTranslationLegacy} from '../hooks/useTranslationLegacy';
import {useBookmarks} from '../hooks/useBookmarks';

function BookReader() {
    const {slug} = useParams<{ slug: string }>();
    const {riddles} = useRiddles();
    const {t} = useTranslationLegacy();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        canAddBookmark,
    } = useBookmarks(slug);

    // Find riddles that match the slug (use same slug generation)
    const bookRiddles = useMemo(() => {
        if (!slug) {
            return [];
        }
        return riddles.filter(r => getBookSlug(r.source.book) === slug);
    }, [slug]);

    const [index, setIndex] = useState(0);

    // Initialize index from `page` search param when riddles load or slug changes
    useEffect(() => {
        if (!slug) {
            return;
        }
        if (bookRiddles.length === 0) {
            setIndex(0);
            return;
        }

        const raw = searchParams.get('page');
        const p = raw ? parseInt(raw, 10) : NaN;
        if (!isNaN(p)) {
            const idx = Math.max(0, Math.min(bookRiddles.length - 1, p - 1));
            setIndex(idx);
        } else {
            setIndex(0);
        }
    }, [slug, searchParams]);

    // Keep the URL search param in sync with the current index
    useEffect(() => {
        // store 1-based page in URL
        setSearchParams({page: String(index + 1)}, {replace: true});
    }, [index, setSearchParams]);

    if (!slug) {
        return <div className="p-6">{t('book.no_slug')}</div>;
    }

    if (bookRiddles.length === 0) {
        return (<div className="max-w-3xl mx-auto p-6">
            <p className="mb-4">{t('book.not_found')}</p>
            <Link to="/sources" className="text-brand-accent hover:underline">{t('book.back_to_sources')}</Link>
        </div>);
    }

    const riddle = bookRiddles[index];

    const goPrev = () => setIndex(i => Math.max(0, i - 1));
    const goNext = () => setIndex(i => Math.min(bookRiddles.length - 1, i + 1));
    const goToPage = (pageNumber: number) => {
        const idx = Math.max(0, Math.min(bookRiddles.length - 1, pageNumber - 1));
        setIndex(idx);
    };

    const handleToggleBookmark = () => {
        if (isBookmarked(riddle.id)) {
            const bookmark = bookmarks.find(b => b.riddleId === riddle.id);
            if (bookmark) {
                removeBookmark(bookmark.id);
            }
        } else {
            if (canAddBookmark) {
                addBookmark(riddle.id, index + 1);
            }
        }
    };

    return (<div className="min-h-screen bg-surface-50">
        <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)}
                        className="text-surface-400 hover:text-brand-accent">{t('navigation.back')}</button>
                <h1 className="text-2xl font-bold">{displayBookTitle(riddle.source.book, t)}</h1>
                <div className="ml-auto flex items-center gap-3">
                    <div className="text-sm text-surface-500">{index + 1} / {bookRiddles.length}</div>
                    <button
                        onClick={handleToggleBookmark}
                        disabled={!isBookmarked(riddle.id) && !canAddBookmark}
                        title={
                            isBookmarked(riddle.id)
                                ? t('book.remove_bookmark')
                                : canAddBookmark
                                ? t('book.add_bookmark')
                                : t('book.bookmark_limit_reached')
                        }
                        className={`p-2 rounded-lg transition-colors ${
                            isBookmarked(riddle.id)
                                ? 'text-yellow-500 hover:bg-yellow-50'
                                : canAddBookmark
                                ? 'text-surface-400 hover:bg-surface-100 hover:text-surface-600'
                                : 'text-surface-300 cursor-not-allowed'
                        }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill={isBookmarked(riddle.id) ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <RiddleCard riddle={riddle}/>

            {/* Bookmarks Section */}
            {bookmarks.length > 0 && (
                <div className="mt-8 p-4 bg-white border border-surface-200 rounded-2xl">
                    <h3 className="text-sm font-semibold text-surface-700 mb-3 flex items-center gap-2">
                        <svg
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {t('book.bookmarks')} ({bookmarks.length}/5)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {bookmarks.map((bookmark) => {
                            const isCurrentPage = bookmark.pageNumber === index + 1;
                            return (
                                <button
                                    key={bookmark.id}
                                    onClick={() => goToPage(bookmark.pageNumber)}
                                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors flex items-center gap-2 ${
                                        isCurrentPage
                                            ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                                            : 'bg-surface-50 border-surface-200 text-surface-700 hover:bg-surface-100'
                                    }`}
                                >
                                    <span>{t('book.page')} {bookmark.pageNumber}</span>
                                    {isCurrentPage && (
                                        <span className="text-xs">•</span>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeBookmark(bookmark.id);
                                        }}
                                        className="ml-1 text-surface-400 hover:text-red-500 transition-colors"
                                        title={t('book.remove_bookmark')}
                                    >
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4 mt-8">
                <button
                    onClick={goPrev}
                    disabled={index === 0}
                    className={`px-4 py-2 rounded-lg bg-white border border-surface-200 ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
                >
                    {t('book.prev')}
                </button>

                <button
                    onClick={goNext}
                    disabled={index === bookRiddles.length - 1}
                    className={`px-4 py-2 rounded-lg bg-white border border-surface-200 ${index === bookRiddles.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
                >
                    {t('book.next')}
                </button>

                <Link to="/sources" className="ml-auto text-sm text-brand-accent hover:underline">{t('book.back_to_sources')}</Link>
            </div>
        </div>
    </div>);
}

export default BookReader;
