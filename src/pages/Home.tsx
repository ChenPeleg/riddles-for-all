import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import RiddleCard from '../components/RiddleCard'
import {useRiddles} from '../context/RiddleContext'
import LanguageToggle from '../components/LanguageToggle'
import AppImage from '../components/AppImage'
import {useTranslationLegacy} from '../hooks/useTranslationLegacy';

function Home() {
    const {riddles} = useRiddles();
    const {t, isRTL} = useTranslationLegacy();
    const [randomRiddle, setRandomRiddle] = useState(null as any);

    useEffect(() => {
        if (riddles.length > 0 && !randomRiddle) {
            const randomIndex = Math.floor(Math.random() * riddles.length);
            setRandomRiddle(riddles[randomIndex]);
        }
    }, [riddles, randomRiddle]);

    // Pick another random riddle (tries to avoid the current one when possible)
    const pickNext = () => {
        if (!riddles || riddles.length === 0) return;
        if (riddles.length === 1) {
            setRandomRiddle(riddles[0]);
            return;
        }

        let idx = Math.floor(Math.random() * riddles.length);
        if (randomRiddle) {
            const currentIndex = riddles.findIndex(r => r.id === randomRiddle.id);
            // Try a few times to avoid selecting the same riddle
            let attempts = 0;
            while (riddles[idx].id === randomRiddle.id && attempts < 8) {
                idx = Math.floor(Math.random() * riddles.length);
                attempts++;
            }
            if (riddles[idx].id === randomRiddle.id) {
                // fallback: pick the next index
                idx = (currentIndex + 1) % riddles.length;
            }
        }

        setRandomRiddle(riddles[idx]);
    };

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 pt-12 md:pt-24 pb-24">
            <header className="text-center mb-16 md:mb-24 animate-fade-in">
                <div className="flex justify-center items-center gap-4 mb-6">
                    <div
                        className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full transition-colors">
                        {t('common.tagline')}
                    </div>
                    <LanguageToggle/>
                </div>
                {/* For RTL languages (e.g. Hebrew) display the collection suffix before the title */}
                <h1 className="text-5xl md:text-7xl font-bold text-surface-900 dark:text-white mb-6 tracking-tight transition-colors">
                    {isRTL ? (
                        <>
                            <span className="text-brand-primary">{t('home.collection_suffix')}</span>
                            {" "}
                            {t('common.title')}
                        </>
                    ) : (
                        <>
                            {t('common.title')} {" "}
                            <span className="text-brand-primary">{t('home.collection_suffix')}</span>
                        </>
                    )}
                </h1>
                <p className="text-lg md:text-xl text-surface-800 dark:text-surface-300 max-w-2xl mx-auto leading-relaxed transition-colors">
                    {t('common.description')}
                </p>
            </header>

            <div className="mb-20 animate-fade-in [animation-delay:200ms]">
                <div className="flex items-center justify-between gap-3 mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-surface-400">
                            {t('home.riddle_of_the_moment')}
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={pickNext}
                            aria-label={t('home.next_riddle')}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-surface-200 dark:border-surface-700 rounded-2xl bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-900 dark:text-surface-100 transition"
                        >
                            {/* In RTL, show caret on the left and point it left; otherwise text then right caret */}
                            {isRTL ? (
                                <>
                                    <span>{t('home.next_riddle') || 'Next'}</span>
                                    <AppImage name="chevron-left" className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    <span>{t('home.next_riddle') || 'Next'}</span>
                                    <AppImage name="chevron-right" className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
                {randomRiddle ? (
                    <>
                        <RiddleCard riddle={randomRiddle}/>
                    </>
                ) : (
                    <div className="h-48 flex items-center justify-center bg-white dark:bg-surface-800 rounded-3xl border border-surface-200 dark:border-surface-700">
                        <p className="text-surface-400 font-medium animate-pulse">{t('common.loading_riddle')}</p>
                    </div>
                )}
            </div>

            <nav className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in [animation-delay:400ms]">
                <Link to="/search" className="group no-underline">
                    <div className="h-full p-8 bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-800 rounded-3xl card-hover relative overflow-hidden transition-colors duration-300">
                        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-8 opacity-10 group-hover:opacity-20 transition-opacity`}>
                            <AppImage name="search" className="w-16 h-16 text-brand-primary" fill="currentColor" />
                        </div>
                        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">{t('navigation.search')}</h3>
                        <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{t('home.search_card_desc')}</p>
                    </div>
                </Link>
                <Link to="/categories" className="group no-underline">
                    <div className="h-full p-8 bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-800 rounded-3xl card-hover relative overflow-hidden transition-colors duration-300">
                        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-8 opacity-10 group-hover:opacity-20 transition-opacity`}>
                            <AppImage name="folder" className="w-16 h-16 text-brand-secondary" fill="currentColor" />
                        </div>
                        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">{t('navigation.categories')}</h3>
                        <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{t('home.categories_card_desc')}</p>
                    </div>
                </Link>
                <Link to="/sources" className="group no-underline">
                    <div className="h-full p-8 bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-800 rounded-3xl card-hover relative overflow-hidden transition-colors duration-300">
                        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-8 opacity-10 group-hover:opacity-20 transition-opacity`}>
                            <AppImage name="book" className="w-16 h-16 text-brand-accent" fill="currentColor" />
                        </div>
                        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">{t('navigation.sources')}</h3>
                        <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{t('home.sources_card_desc')}</p>
                    </div>
                </Link>
            </nav>
        </div>
    </div>)
}

export default Home
