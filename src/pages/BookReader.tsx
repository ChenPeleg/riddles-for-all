import {useMemo} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useRiddles} from '../context/RiddleContext';
import {displayBookTitle, getBookSlug} from '../i18n/bookKeys';
import {useTranslationLegacy} from '../hooks/useTranslationLegacy';
import {useBookmarks} from '../hooks/useBookmarks';
import AppImage from '../components/AppImage';

// new imports
import { useReaderState } from '../hooks/useReaderState';
import BookReaderShell from '../components/BookReader/BookReaderMain';
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

    // Find riddles that match the slug (use same slug generation)
    const bookRiddles = useMemo(() => {
        if (!slug) {
            return [];
        }
        return riddles.filter(r => getBookSlug(r.source.book) === slug);
    }, [slug]);

    // reader state hook handles index and url sync
    const { index, goPrev, goNext, goToPage } = useReaderState(bookRiddles.length, slug);

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
        <BookReaderShell
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
        >
            <BookReaderPageViewer riddle={riddle} />

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-6 py-12">
                    {/* RiddleCard moved to BookReaderPageViewer; bookmarks remain here */}


                    {bookmarks.length > 0 && (
                        <div className="mt-8 p-4 bg-white border border-surface-200 rounded-2xl">
                            <h3 className="text-sm font-semibold text-surface-700 mb-3 flex items-center gap-2">
                                <AppImage name="bookmark" className="w-4 h-4 text-yellow-500" fill="currentColor" />
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
        </BookReaderShell>
    );
 }

 export default BookReader;
