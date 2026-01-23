import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRiddles } from '../context/RiddleContext';
import RiddleCard from '../components/RiddleCard';
import { useTranslationLegacy } from '../hooks/useTranslationLegacy';
import { displayBookTitle, BOOK_KEY_MAP } from '../i18n/bookKeys';

function Sources() {
  const { riddles, loading } = useRiddles();
  const { t, isRTL } = useTranslationLegacy();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // Simple helper to produce a stable book slug. Prefer the i18n key map when available.
  const getBookSlug = (raw: string) => {
    const key = BOOK_KEY_MAP[raw];
    if (key) return key;
    return raw
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const gotoLabel = (() => {
    const s = t('sources.goto_book');
    return typeof s === 'string' && s.startsWith('sources.') ? 'Go to book' : s;
  })();

  if (loading) return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const sources = Array.from(new Set(riddles.map(r => r.source.book))).sort();

  const filteredRiddles = selectedSource 
    ? riddles.filter(r => r.source.book === selectedSource)
    : [];

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-surface-400 hover:text-brand-accent transition-colors mb-8 group">
            <svg className={`w-5 h-5 transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="text-xs font-bold uppercase tracking-widest">{t('navigation.back_to_home')}</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-4">{t('sources.heading').split(' ')[0]} <span className="text-brand-accent">{t('navigation.sources')}</span></h1>
          <p className="text-surface-600">{t('sources.description')}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-fade-in [animation-delay:100ms]">
          {sources.map(source => (
            // Changed from <button> to a div with role=button so we can safely nest a Link inside.
            <div
              key={source}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedSource(source === selectedSource ? null : source)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedSource(source === selectedSource ? null : source);
                  e.preventDefault();
                }
              }}
              className={`group p-6 rounded-4xl border-2 ${isRTL ? 'text-right' : 'text-left'} transition-all duration-300 relative overflow-hidden ${
                selectedSource === source
                  ? 'bg-brand-accent text-white border-brand-accent shadow-[0_12px_24px_-8px_rgba(245,158,11,0.4)] scale-105 z-10'
                  : 'bg-white text-surface-900 border-surface-200 hover:border-brand-accent/30 active:scale-95'
              }`}
            >
               <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/></svg>
              </div>
              <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${selectedSource === source ? 'text-white/70' : 'text-surface-400'}`}>
                {t('sources.source_label')}
              </div>
              <div className={`font-bold text-lg leading-tight line-clamp-2`}>{displayBookTitle(source, t)}</div>

              <div className="mt-4">
                <Link
                  to={`/books/${getBookSlug(source)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm font-medium text-brand-accent hover:underline"
                >
                  {gotoLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {selectedSource ? (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-surface-900 tracking-tight">{displayBookTitle(selectedSource || '', t)}</h2>
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-surface-400 px-3 py-1 bg-surface-100 rounded-lg">
                {t('sources.riddles_count').replace('{count}', String(filteredRiddles.length))}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredRiddles.map(riddle => (
                <RiddleCard key={riddle.id} riddle={riddle} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-surface-200 animate-fade-in [animation-delay:200ms]">
            <div className="w-16 h-16 bg-surface-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-surface-200">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <p className="text-surface-400 text-lg font-medium">{t('sources.select_book_prompt')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sources;
