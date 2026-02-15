import { useState } from 'react';
import { Link } from 'react-router-dom';
import RiddleCard from '../components/RiddleCard';
import { useRiddles } from '../context/RiddleContext';
import { useTranslationLegacy } from '../hooks/useTranslationLegacy';
import AppImage from '../components/AppImage';

function Search() {
  const { riddles, loading } = useRiddles();
  const { t } = useTranslationLegacy();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRiddles = riddles.filter(r => 
    r.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.categories.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <header className="mb-12 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-surface-400 hover:text-brand-primary transition-colors mb-8 group">
            <AppImage name="chevron-left" className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">{t('navigation.back_to_home')}</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-4">{t('search.heading').split(' ')[0]} <span className="text-brand-primary">{t('search.heading').split(' ').slice(1).join(' ')}</span></h1>
          <p className="text-surface-600">{t('search.description') || t('common.description')}</p>
        </header>
        
        <div className="mb-12 animate-fade-in [animation-delay:100ms]">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <AppImage name="search" className="h-6 w-6 text-surface-300 group-focus-within:text-brand-primary transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder={t('search.placeholder') || 'Search by text or category...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-5 text-lg rounded-2xl border-2 border-surface-200 bg-white shadow-sm focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all placeholder:text-surface-300"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-surface-400 font-medium">{t('search.loading_message')}</p>
          </div>
        ) : (
          <div className="animate-fade-in [animation-delay:200ms]">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-surface-400">
                {t('search.found_results').replace('{count}', String(filteredRiddles.length))}
               </p>
               <div className="h-px flex-1 bg-surface-100 mx-4"></div>
            </div>
            
            {filteredRiddles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredRiddles.map(riddle => (
                  <RiddleCard key={riddle.id} riddle={riddle} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-surface-200">
                <p className="text-surface-400 text-lg font-medium">{t('search.no_results_match')}</p>
                <button onClick={() => setSearchTerm('')} className="mt-4 text-brand-primary font-bold hover:underline">{t('search.clear_search')}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
