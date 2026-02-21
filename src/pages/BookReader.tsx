import {useMemo, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useRiddles} from '../context/RiddleContext';
import {displayBookTitle, getBookSlug} from '../i18n/bookKeys';
import {useTranslationLegacy} from '../hooks/useTranslationLegacy';
import {useBookmarks} from '../hooks/useBookmarks';
import {useReadingTracker} from '../hooks/useReadingTracker';
import AppImage from '../components/AppImage';

// new imports
import { useReaderState } from '../hooks/useReaderState';
import   {BookReaderMain} from '../components/BookReader/BookReaderMain';
import { BookReaderPageViewer } from '../components/BookReader/BookReaderPageViewer';

function BookReader() {
    const {slug} = useParams<{ slug: string }>();
    const {riddles} = useRiddles();
    const {t} = useTranslationLegacy();
    const {
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        canAddBookmark,
    } = useBookmarks(slug);
    
    const {
        isTrackingEnabled,
        toggleTracking,
        saveProgress,
        getLastPage,
    } = useReadingTracker(slug);

    // Find riddles that match the slug (use same slug generation)
    const bookRiddles = useMemo(() => {
        if (!slug) {
            return [];
        }
        return riddles.filter(r => getBookSlug(r.source.book) === slug);
    }, [slug]);

    // Get the last saved page if tracking is enabled, and validate it's within bounds
    const rawInitialPage = isTrackingEnabled ? getLastPage() : null;
    const initialPage = rawInitialPage != null && rawInitialPage <= bookRiddles.length ? rawInitialPage : null;

    // reader state hook handles index and url sync
    const { index, goPrev, goNext, goToPage } = useReaderState(bookRiddles.length, slug);

    const [showResumeOffer, setShowResumeOffer] = useState(false);

    // Show resume offer if there's a last page and we're at the start
    useEffect(() => {
        if (isTrackingEnabled && initialPage && initialPage > 1 && index === 0) {
            setShowResumeOffer(true);
        } else {
            setShowResumeOffer(false);
        }
    }, [isTrackingEnabled, initialPage, index]);

    // Save progress whenever the page changes
    useEffect(() => {
        if (bookRiddles.length > 0) {
            // Don't overwrite saved progress with page 1 if we are about to offer a resume
            const isOfferingResume = isTrackingEnabled && initialPage && initialPage > 1 && index === 0;
            if (isOfferingResume) {
                return;
            }
            saveProgress(index + 1);
        }
    }, [index, bookRiddles.length, saveProgress, isTrackingEnabled, initialPage]);

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

    return (
        <BookReaderMain
            title={displayBookTitle(riddle.source.book, t)}
            currentPage={index}
            totalPages={bookRiddles.length}
            onPrev={goPrev}
            onNext={goNext}
            onGoToPage={goToPage}
            onBack={() => window.history.back()}
            isBookmarked={isBookmarked(riddle.id)}
            canAddBookmark={canAddBookmark}
            onToggleBookmark={handleToggleBookmark}
            isTrackingEnabled={isTrackingEnabled}
            onToggleTracking={toggleTracking}
            trackingEnabledLabel={t('book.tracking_enabled')}
            trackReadingLabel={t('book.track_reading')}
            enableTrackingAriaLabel={t('book.enable_tracking_aria')}
            disableTrackingAriaLabel={t('book.disable_tracking_aria')}
        >
            {showResumeOffer && (
                <div className="mb-8 p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-accent/20 rounded-xl">
                            <AppImage name="book-open" className="w-5 h-5 text-brand-accent" />
                        </div>
                        <p className="text-sm font-medium text-surface-700 dark:text-surface-200">
                            {t('book.resume_offer').replace('{page}', String(initialPage))}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => {
                                goToPage(initialPage!);
                                setShowResumeOffer(false);
                            }}
                            className="flex-1 sm:flex-none px-4 py-2 bg-brand-accent text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm shadow-brand-accent/20"
                        >
                            {t('book.resume_button')}
                        </button>
                        <button
                            onClick={() => setShowResumeOffer(false)}
                            className="px-4 py-2 text-sm font-semibold text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
                        >
                            {t('book.dismiss_button')}
                        </button>
                    </div>
                </div>
            )}

            <BookReaderPageViewer riddle={riddle} />

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">


                    {bookmarks.length > 0 && (
                        <div className="mt-8 p-4 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl transition-colors">
                            <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3 flex items-center gap-2">
                                <AppImage name="bookmark" className="w-4 h-4 text-yellow-500 dark:text-yellow-400" fill="currentColor" />
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
                                                    ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400'
                                                    : 'bg-surface-50 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
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
                                                <AppImage name="close" className="w-3.5 h-3.5" />
                                            </button>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </BookReaderMain>
    );
 }

 export default BookReader;
