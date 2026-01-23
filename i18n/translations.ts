export type Lang = 'en' | 'he';

export const translations: Record<Lang, Record<string, any>> = {
  en: {
    common: {
      title: 'Riddles',
      tagline: 'The Ultimate Brain Teasers',
      description:
        "Exercise your brain with our handpicked collection of brain teasers and puzzles. Challenging your mind, one riddle at a time.",
      toggle_language: 'Toggle language',
      toggle_to_he: 'עברית',
      toggle_to_en: 'English',
      loading_riddle: 'Loading a fresh riddle for you...',
    },
    home: {
      riddle_of_the_moment: 'Riddle of the Moment',
    },
    navigation: {
      search: 'Search',
      categories: 'Categories',
      sources: 'Sources',
    },
    riddle: {
      reveal_solution: 'Reveal Solution',
      solution_title: 'The Solution',
      no_solution: 'No solution provided.',
      mark_done: 'Mark as done',
      mark_not_done: 'Mark as not done',
    },
  },
  he: {
    common: {
      title: 'חידות',
      tagline: 'חידות מוח האולטימטיביות',
      description:
        'תאמינו את המוח שלכם עם אוסף נבחר של חידות ותעלומות. מאתגר את המחשבה, חידה אחרי חידה.',
      toggle_language: 'החלף שפה',
      toggle_to_he: 'עברית',
      toggle_to_en: 'English',
      loading_riddle: 'טוען חידה טרייה במיוחד עבורך...',
    },
    home: {
      riddle_of_the_moment: 'חידת הרגע',
    },
    navigation: {
      search: 'חפש',
      categories: 'קטגוריות',
      sources: 'מקורות',
    },
    riddle: {
      reveal_solution: 'הצג פתרון',
      solution_title: 'הפתרון',
      no_solution: 'לא סופק פתרון.',
      mark_done: 'סמן כבוצע',
      mark_not_done: 'הסר סימון ביצוע',
    },
  },
};
