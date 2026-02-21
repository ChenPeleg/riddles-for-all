import { Link } from 'react-router-dom';
import { useRiddles } from '../context/RiddleContext';
import { useTranslationLegacy } from '../hooks/useTranslationLegacy';
import { displayBookTitle, BOOK_KEY_MAP } from '../i18n/bookKeys';
import AppImage from '../components/AppImage';

function Sources() {
  const { riddles, loading } = useRiddles();
  const { t, isRTL } = useTranslationLegacy();

  // Simple helper to produce a stable book slug. Prefer the i18n key map when available.
  const getBookSlug = (raw: string) => {
    const key = BOOK_KEY_MAP[raw];
    if (key) return key;
    return raw
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (loading) return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center transition-colors">
      <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const sources = Array.from(new Set(riddles.map(r => r.source.book))).sort();

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <header className="mb-12 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-surface-400 hover:text-brand-accent transition-colors mb-8 group">
            <AppImage name="chevron-left" className={`w-5 h-5 transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'} transition-transform`} />
            <span className="text-xs font-bold uppercase tracking-widest">{t('navigation.back_to_home')}</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white tracking-tight mb-4 transition-colors">{t('sources.heading').split(' ')[0]} <span className="text-brand-accent">{t('navigation.sources')}</span></h1>
          <p className="text-surface-600 dark:text-surface-400 transition-colors">{t('sources.description')}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-fade-in [animation-delay:100ms]">
          {sources.map(source => (
            <Link
              key={source}
              to={`/books/${getBookSlug(source)}`}
              className={`group p-6 rounded-4xl border-2 ${isRTL ? 'text-right' : 'text-left'} transition-all duration-300 relative overflow-hidden bg-white dark:bg-surface-800/50 text-surface-900 dark:text-white border-surface-200 dark:border-surface-800 hover:border-brand-accent/30 active:scale-95 transition-colors`}
            >
              <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                <AppImage name="book" className="w-12 h-12" fill="currentColor" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-surface-400 dark:text-surface-500">
                {t('sources.source_label')}
              </div>
              <div className="font-bold text-lg leading-tight line-clamp-2">{displayBookTitle(source, t)}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sources;
