import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RiddleCard from '../components/RiddleCard'
import { useRiddles } from '../context/RiddleContext'
import { useTranslation } from '../hooks/useTranslation'
import LanguageToggle from '../components/LanguageToggle'

function Home() {
  const { riddles } = useRiddles();
  const { t } = useTranslation();
  const [randomRiddle, setRandomRiddle] = useState(null as any);

  useEffect(() => {
    if (riddles.length > 0 && !randomRiddle) {
      const randomIndex = Math.floor(Math.random() * riddles.length);
      setRandomRiddle(riddles[randomIndex]);
    }
  }, [riddles, randomRiddle]);

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24">
        <header className="text-center mb-16 md:mb-24 animate-fade-in">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary bg-brand-primary/10 rounded-full">
              {t('common.tagline')}
            </div>
            <LanguageToggle />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-surface-900 mb-6 tracking-tight">
            {t('common.title')} <span className="text-brand-primary">Collection</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-800 max-w-2xl mx-auto leading-relaxed">
            {t('common.description')}
          </p>
        </header>

        <div className="mb-20 animate-fade-in [animation-delay:200ms]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-brand-primary/30"></span>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-surface-400">
              {t('home.riddle_of_the_moment')}
            </h2>
          </div>
          {randomRiddle ? (
            <RiddleCard riddle={randomRiddle} />
          ) : (
            <div className="h-48 flex items-center justify-center bg-white rounded-3xl border border-surface-200">
                <p className="text-surface-400 font-medium animate-pulse">{t('common.loading_riddle')}</p>
            </div>
          )}
        </div>

        <nav className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in [animation-delay:400ms]">
          <Link to="/search" className="group no-underline">
            <div className="h-full p-8 bg-white border border-surface-200 rounded-3xl card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16 text-brand-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">{t('navigation.search')}</h3>
              <p className="text-surface-600 text-sm leading-relaxed">{t('navigation.search')}</p>
            </div>
          </Link>
          <Link to="/categories" className="group no-underline">
             <div className="h-full p-8 bg-white border border-surface-200 rounded-3xl card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">{t('navigation.categories')}</h3>
              <p className="text-surface-600 text-sm leading-relaxed">{t('navigation.categories')}</p>
            </div>
          </Link>
          <Link to="/sources" className="group no-underline">
             <div className="h-full p-8 bg-white border border-surface-200 rounded-3xl card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">{t('navigation.sources')}</h3>
              <p className="text-surface-600 text-sm leading-relaxed">{t('navigation.sources')}</p>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Home
