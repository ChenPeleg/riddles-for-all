import { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useRiddles } from '../context/RiddleContext';
import RiddleCard from '../components/RiddleCard';
import { getBookSlug, displayBookTitle } from '../i18n/bookKeys';
import { useTranslationLegacy } from '../hooks/useTranslationLegacy';

function BookReader() {
  const { slug } = useParams<{ slug: string }>();
  const { riddles } = useRiddles();
  const { t } = useTranslationLegacy();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Find riddles that match the slug (use same slug generation)
  const bookRiddles = useMemo(() => {
    if (!slug) return [];
    return riddles.filter(r => getBookSlug(r.source.book) === slug);
  }, [riddles, slug]);

  const [index, setIndex] = useState(0);

  // Initialize index from `page` search param when riddles load or slug changes
  useEffect(() => {
    if (!slug) return;
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
  }, [slug, bookRiddles, searchParams]);

  // Keep the URL search param in sync with the current index
  useEffect(() => {
    // store 1-based page in URL
    setSearchParams({ page: String(index + 1) }, { replace: true });
  }, [index, setSearchParams]);

  if (!slug) return <div className="p-6">{t('book.no_slug')}</div>;

  if (bookRiddles.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="mb-4">{t('book.not_found')}</p>
        <Link to="/sources" className="text-brand-accent hover:underline">{t('book.back_to_sources')}</Link>
      </div>
    );
  }

  const riddle = bookRiddles[index];

  const goPrev = () => setIndex(i => Math.max(0, i - 1));
  const goNext = () => setIndex(i => Math.min(bookRiddles.length - 1, i + 1));

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="text-surface-400 hover:text-brand-accent">{t('navigation.back')}</button>
          <h1 className="text-2xl font-bold">{displayBookTitle(riddle.source.book, t)}</h1>
          <div className="ml-auto text-sm text-surface-500">{index + 1} / {bookRiddles.length}</div>
        </div>

        <RiddleCard riddle={riddle} />

        <div className="flex items-center gap-4 mt-8">
          <button onClick={goPrev} disabled={index === 0} className="px-4 py-2 rounded-lg bg-white border border-surface-200">{t('book.prev')}</button>
          <button onClick={goNext} disabled={index === bookRiddles.length - 1} className="px-4 py-2 rounded-lg bg-white border border-surface-200">{t('book.next')}</button>
          <Link to="/sources" className="ml-auto text-sm text-brand-accent hover:underline">{t('book.back_to_sources')}</Link>
        </div>
      </div>
    </div>
  );
}

export default BookReader;
