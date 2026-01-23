import {useEffect, useState} from 'react';

import {Riddle} from '../src/models/riddle';
import {useTranslationLegacy} from '../src/hooks/useTranslationLegacy';

interface RiddleProps {
    riddle: Riddle;
}

const RiddleCard = ({riddle}: RiddleProps) => {
    const {
        t,
        lang,
        isRTL
    } = useTranslationLegacy();
    const [showSolution, setShowSolution] = useState(false);
    // Track whether this riddle is marked done (persisted in localStorage)
    const [done, setDone] = useState<boolean>(false);

    useEffect(() => {
        try {
            const v = typeof window !== 'undefined' ? localStorage.getItem(`riddle_done_${riddle.id}`) : null;
            setDone(v === 'true');
        } catch (e) {
            // ignore localStorage errors
        }
    }, [riddle.id]);

    const toggleDone = () => {
        const newDone = !done;
        setDone(newDone);
        try {
            localStorage.setItem(`riddle_done_${riddle.id}`, newDone ? 'true' : 'false');
        } catch (e) {
            // ignore localStorage write errors
        }
    };

    // Choose Hebrew fields when language is Hebrew and a Hebrew value exists; otherwise fall back to English
    const displayText = (lang === 'he' && riddle.textHe) ? riddle.textHe : riddle.text;
    const displaySolution = (lang === 'he' && riddle.solutionHe) ? riddle.solutionHe : riddle.solution;
    const displayClue = (lang === 'he' && riddle.clueHe) ? riddle.clueHe : riddle.clue;

    return (<div dir={isRTL ? 'rtl' : 'ltr'}
                 className="card-hover border border-surface-200 rounded-3xl p-8 mb-6 bg-white shadow-sm animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-2">
                    {riddle.categories.map(cat => (<span key={cat}
                                                         className="text-[10px] px-2.5 py-1 bg-surface-100 rounded-lg text-surface-800 font-bold uppercase tracking-widest">
              {cat}
            </span>))}
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className={`w-2 h-2 rounded-full ${riddle.difficulty === 'hard' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : riddle.difficulty === 'medium' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
                    <span
                        className={`text-[10px] font-black uppercase tracking-widest ${riddle.difficulty === 'hard' ? 'text-red-500' : riddle.difficulty === 'medium' ? 'text-orange-500' : 'text-emerald-500'}`}>
            {riddle.difficulty || 'easy'}
          </span>

                    <button
                        onClick={toggleDone}
                        aria-pressed={done}
                        title={done ? t('riddle.mark_not_done') : t('riddle.mark_done')}
                        className="ml-2 inline-flex items-center justify-center p-2 rounded-lg hover:bg-surface-100"
                    >

                        {done ? (<svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>) : (<svg className="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>)}
                    </button>
                </div>
            </div>

            <h3 className={`text-xl md:text-2xl font-medium leading-relaxed mb-8 text-surface-900 tracking-tight ${done ? 'opacity-60 line-through' : ''} ${isRTL ? 'text-right' : ''}`}>
                {displayText}
            </h3>

            <div className="relative">
                {!showSolution ? (<button
                        onClick={() => setShowSolution(true)}
                        className="group relative w-full inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-brand-primary rounded-2xl shadow-md"
                    >
            <span
                className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-brand-primary group-hover:translate-x-0 ease">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </span>
                        <span
                            className="absolute flex items-center justify-center w-full h-full text-brand-primary transition-all duration-300 transform group-hover:translate-x-full ease">{t('riddle.reveal_solution')}</span>
                        <span className="relative invisible">{t('riddle.reveal_solution')}</span>
                    </button>) : (<div className="p-6 bg-brand-primary/5 rounded-2xl border-2 border-brand-primary/20 mt-4 animate-fade-in">
                        <div className="flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <p className="font-bold text-brand-primary uppercase tracking-widest text-[10px]">{t('riddle.solution_title')}</p>
                        </div>
                        <p className={`text-surface-900 text-lg md:text-xl font-medium leading-relaxed ${isRTL ? 'text-right' : ''}`}>{displaySolution || t('riddle.no_solution')}</p>
                    </div>)}
            </div>

            <div className="mt-8 pt-6 border-t border-surface-100 flex items-center justify-between">
                <div className="text-[10px] text-surface-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    {riddle.source.book}
                </div>
            </div>
        </div>);
};

export default RiddleCard;
