import { useEffect, useState } from "react";
import AppImage from './AppImage';

import { Riddle } from "../models/riddle";
import { useTranslationLegacy } from "../hooks/useTranslationLegacy";
import { displayBookTitle } from "../i18n/bookKeys";

interface RiddleProps {
  riddle: Riddle;
}

const RiddleCard = ({ riddle }: RiddleProps) => {
  const { t, lang, isRTL } = useTranslationLegacy();
  const [showSolution, setShowSolution] = useState(false); 
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    try {
      const v =
        typeof window !== "undefined"
          ? localStorage.getItem(`riddle_done_${riddle.id}`)
          : null;
      setDone(v === "true");
    } catch (e) { 
    }
  }, [riddle.id]);
 
  useEffect(() => {
    setShowSolution(false);
  }, [riddle.id]);

  const toggleDone = () => {
    const newDone = !done;
    setDone(newDone);
    try {
      localStorage.setItem(
        `riddle_done_${riddle.id}`,
        newDone ? "true" : "false",
      );
    } catch (e) { 
    }
  };
 
  const displayText =
    lang === "he" && riddle.textHe ? riddle.textHe : riddle.text;
  const displaySolution =
    lang === "he" && riddle.solutionHe ? riddle.solutionHe : riddle.solution;
  const difficultyKey = riddle.difficulty || "easy";
  const difficultyLabel = t(`riddle.difficulties.${difficultyKey}`);

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="card-hover border border-surface-200 dark:border-surface-800 rounded-3xl p-8 mb-6 bg-white dark:bg-surface-800/50 shadow-sm animate-fade-in transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {riddle.categories.map((cat) => (
            <span
              key={cat}
              className="text-[10px] px-2.5 py-1 bg-surface-100 dark:bg-surface-800 rounded-lg text-surface-800 dark:text-surface-200 font-bold uppercase tracking-widest"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <div className="flex flex-row items-center justify-between md:justify-center  gap-2 mt-3 md:mt-0">
            <div
              className={`w-2 h-2 rounded-full ${riddle.difficulty === "hard" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : riddle.difficulty === "medium" ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"}`}
            ></div>
            <span
              className={`text-[10px] font-black uppercase tracking-widest ${riddle.difficulty === "hard" ? "text-red-500" : riddle.difficulty === "medium" ? "text-orange-500" : "text-emerald-500"}`}
            >
              {difficultyLabel}
            </span>
                  <button
            onClick={toggleDone}
            aria-pressed={done}
            title={done ? t("riddle.mark_not_done") : t("riddle.mark_done")}
            className="md:ml-2 inline-flex items-center justify-center px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-sm font-semibold transition-colors"
          > 
            {done ? (
              <>
                <AppImage name="checkmark" className="w-4 h-4 text-emerald-500 mr-2" />
                 <span className="text-emerald-500">
                   {t("riddle.mark_not_done")}
                 </span>
               </>
             ) : (
               <>
                <AppImage name="plus" className="w-4 h-4 text-surface-400 dark:text-surface-500 mr-2" />
                 <span className="text-surface-700 dark:text-surface-300">
                   {t("riddle.mark_done")}
                 </span>
               </>
             )}
          </button>
          </div>
    
        </div>
      </div>

      <h3
        className={`text-xl md:text-2xl font-medium leading-relaxed mb-8 text-surface-900 dark:text-surface-100 tracking-tight transition-colors duration-300 ${done ? "opacity-60" : ""} ${isRTL ? "text-right" : ""}`}
      >
        {displayText}
      </h3>

      <div className="relative">
        {!showSolution ? (
          <button
            onClick={() => setShowSolution(true)}
            className="group relative w-full inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-brand-primary rounded-2xl shadow-md"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-brand-primary opacity-0 transition-opacity duration-300 ease-in-out motion-reduce:transition-none group-hover:opacity-100">
              <AppImage name="eye" className="w-6 h-6" />
             </span>
            <span className="absolute flex items-center justify-center w-full h-full text-brand-primary opacity-100 transition-opacity duration-300 ease-in-out motion-reduce:transition-none group-hover:opacity-0">
              {t("riddle.reveal_solution")}
            </span>
            <span className="relative invisible">
              {t("riddle.reveal_solution")}
            </span>
          </button>
        ) : (
          <div className="p-6 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-2xl border-2 border-brand-primary/20 mt-4 animate-fade-in transition-colors duration-300">
            <div className="flex items-center gap-2 mb-3">
              <AppImage name="flash" className="w-5 h-5 text-brand-primary" />
               <p className="font-bold text-brand-primary uppercase tracking-widest text-[10px]">
                 {t("riddle.solution_title")}
               </p>
             </div>
            <p
              className={`text-surface-900 dark:text-surface-100 text-lg md:text-xl font-medium leading-relaxed transition-colors duration-300 ${isRTL ? "text-right" : ""}`}
            >
              {displaySolution || t("riddle.no_solution")}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between transition-colors duration-300">
        <div className="text-[10px] text-surface-400 dark:text-surface-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <AppImage name="book-open" className="w-3.5 h-3.5" stroke="currentColor" />
          {displayBookTitle(riddle.source.book, t)}
        </div>
      </div>
    </div>
  );
};

export default RiddleCard;
