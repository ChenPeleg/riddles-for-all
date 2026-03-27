import {useMemo, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useRiddles} from '../context/RiddleContext';
import {displayBookTitle, getBookSlug} from '../i18n/bookKeys';
import {useTranslationLegacy} from '../hooks/useTranslationLegacy';
import {useBookmarks} from '../hooks/useBookmarks';
import {useReadingTracker} from '../hooks/useReadingTracker';

// new imports
import { useReaderState } from '../hooks/useReaderState';
import {BookReaderContainer} from '../components/BookReader/BookReaderContainer';
import {ResumeOfferDialog} from '../components/BookReader/ResumeOfferDialog';
import {BookmarksPanel} from '../components/BookReader/BookmarksPanel';
import RiddleCard from '../components/RiddleCard';

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
        <BookReaderContainer
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
            {showResumeOffer && initialPage && (
                <ResumeOfferDialog
                    lastPage={initialPage}
                    onResume={() => {
                        goToPage(initialPage);
                        setShowResumeOffer(false);
                    }}
                    onDismiss={() => setShowResumeOffer(false)}
                    resumeOfferText={t('book.resume_offer')}
                    resumeButtonText={t('book.resume_button')}
                    dismissButtonText={t('book.dismiss_button')}
                />
            )}

            <RiddleCard riddle={riddle} />

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
                    <BookmarksPanel
                        bookmarks={bookmarks}
                        currentPage={index + 1}
                        onGoToPage={goToPage}
                        onRemoveBookmark={removeBookmark}
                        bookmarksLabel={t('book.bookmarks')}
                        pageLabel={t('book.page')}
                        removeBookmarkLabel={t('book.remove_bookmark')}
                    />
                </div>
            </div>
        </BookReaderContainer>
    );
 }

 export default BookReader;
