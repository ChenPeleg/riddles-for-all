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
      collection_suffix: 'Collection',
      search_card_desc: 'Discover mysteries across all categories and books.',
      categories_card_desc: 'Explore riddles grouped by themes and topics.',
      sources_card_desc: 'Browse the unique collections that power our riddles.',
      next_riddle: 'Next',
    },
    navigation: {
      search: 'Search',
      categories: 'Categories',
      sources: 'Sources',
      back_to_home: 'Back to Home',
      back: 'Back',
    },
    riddle: {
      reveal_solution: 'Reveal Solution',
      solution_title: 'The Solution',
      no_solution: 'No solution provided.',
      mark_done: 'Mark as done',
      mark_not_done: 'Mark as not done',
      difficulties: {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
        very_hard: 'Very hard',
        unknown: 'Unknown',
      },
    },
    word_collection: {
      title: 'Word Collection',
      description: 'Manage your collection of words and terms used in searches and tagging.',
      add_word: 'Add word',
      remove_word: 'Remove word',
      empty_message: 'No words in your collection yet.',
      import: 'Import',
      export: 'Export',
    },
    search: {
      title: 'Search',
      heading: 'Search Riddles',
      placeholder: 'Search riddles...',
      results_for: 'Results for',
      no_results: 'No riddles found.',
      loading_message: 'Seeking the answers...',
      found_results: 'Found {count} results',
      no_results_match: 'No riddles match your search.',
      clear_search: 'Clear search',
      filters: {
        difficulty: 'Difficulty',
        source: 'Source',
      },
      sort: {
        relevance: 'Relevance',
        newest: 'Newest',
        oldest: 'Oldest',
      },
    },
    resources: {
      title: 'Resources',
      source: 'Source',
      download: 'Download',
      author: 'Author',
      license: 'License',
      last_updated: 'Last updated',
    },
    // Added translations for book names
    books: {
      gym_for_the_brain:
        'Gym for the Brain - 300 Riddles',
      riddle_me_this:
        'Riddle Me This - The Ultimate Collection Of Riddles & Brain Teasers',
      the_best_fun_riddles:
        'The Best Fun Riddles & Trick Questions for Smart Kids and Family - 3 Books in 1 - 700 Jokes, Math',
      the_little_book_of_riddles: 'The Little Book of Riddles',
      the_ultimate_riddles_book:
        'The Ultimate Riddles Book: Word Riddles, Brain Teasers, Logic Puzzles, Math Problems, Trick Questions, and More!',
      word_games_riddles:
        'Word Games, Riddles and Logic Tests - Tax Your Brain and Boost Your English',
    },
    sources: {
      heading: 'Discover Sources',
      description: 'Browse the unique collections that power our riddles.',
      source_label: 'Source Book',
      riddles_count: '{count} riddles',
      select_book_prompt: 'Select a book above to explore its contents.',
      goto_book: 'Go to book',
    },
    book: {
      no_slug: 'No book specified.',
      not_found: 'No riddles found for this book.',
      back_to_sources: 'Back to sources',
      prev: 'Previous',
      next: 'Next',
    },
    categories: {
      heading: 'Browse by Categories',
      description: 'Explore riddles grouped by topic and theme.',
      select_prompt: 'Select a category above to reveal its mysteries.',
      loading: 'Loading categories...',
      riddles_count: '{count} riddles',
      labels: {
        wordplay: 'Wordplay',
        everyday: 'Everyday',
        technology: 'Technology',
        tricky: 'Tricky',
        logic: 'Logic',
        nature: 'Nature',
      },
    },
    riddle_detail: {
      title: 'Riddle Detail',
      showing_id: 'Showing riddle ID: {id}',
    },
  },
  he: {
    common: {
      title: 'חידות',
      tagline: 'חידות מוח האולטימטיביות',
      description:
        'אימןם המוח באמצעות אוסף נבחר של חידות ותעלומות. מאתגר את המחשבה, חידה אחרי חידה.',
      toggle_language: 'החלף שפה',
      toggle_to_he: 'עברית',
      toggle_to_en: 'English',
      loading_riddle: 'טוען חידה טרייה במיוחד עבורך...',
    },
    home: {
      riddle_of_the_moment: 'חידת הרגע',
      collection_suffix: 'אוסף',
      search_card_desc: 'גלה תעלומות בכל הקטגוריות והספרים.',
      categories_card_desc: 'חקור חידות מקובצות לפי נושאים וקטגוריות.',
      sources_card_desc: 'עיין באוספים הייחודיים שמניעים את החידות שלנו.',
      next_riddle: 'הבא',
    },
    navigation: {
      search: 'חפש',
      categories: 'קטגוריות',
      sources: 'מקורות',
      back_to_home: 'חזרה לדף הבית',
      back: 'חזרה',
    },
    riddle: {
      reveal_solution: 'הצג פתרון',
      solution_title: 'הפתרון',
      no_solution: 'לא סופק פתרון.',
      mark_done: 'סמן כבוצע',
      mark_not_done: 'הסר סימון ביצוע',
      difficulties: {
        easy: 'קל',
        medium: 'בינוני',
        hard: 'קשה',
        very_hard: 'קשה מאוד',
        unknown: 'לא ידוע',
      },
    },
    word_collection: {
      title: 'אוסף מילים',
      description: 'נהל את אוסף המילים והמונחים שלך המשמשים לחיפוש ותיוג.',
      add_word: 'הוסף מילה',
      remove_word: 'הסר מילה',
      empty_message: 'לא קיימות מילים באוסף שלך.',
      import: 'ייבא',
      export: 'ייצא',
    },
    search: {
      title: 'חיפוש',
      heading: 'חפש חידות',
      placeholder: 'חפש חידות...',
      results_for: 'תוצאות עבור',
      no_results: 'לא נמצאו חידות.',
      loading_message: 'מחפש את התשובות...',
      found_results: 'נמצאו {count} תוצאות',
      no_results_match: 'לא נמצאו חידות התואמות לחיפוש שלך.',
      clear_search: 'נקה חיפוש',
      filters: {
        difficulty: 'רמת קושי',
        source: 'מקור',
      },
      sort: {
        relevance: 'רלוונטיות',
        newest: 'החדשות ביותר',
        oldest: 'הישנות ביותר',
      },
    },
    resources: {
      title: 'משאבים',
      source: 'מקור',
      download: 'הורד',
      author: 'מחבר',
      license: 'רישיון',
      last_updated: 'עודכן לאחרונה',
    },
    // Hebrew translations for book names
    books: {
      gym_for_the_brain:
        'חדר כושר למוח - 300 חידות',
      riddle_me_this: 'חידו אותי - האוסף האולטימטיבי של חידות ואתגרים',
      the_best_fun_riddles:
        'החידות הכיפיות הטובות ביותר ושאלות תכסיס למשפחה וילדים - 3 ספרים ב-1 - 700 בדיחות ומתמטיקה',
      the_little_book_of_riddles: 'הספר הקטן של חידות',
      the_ultimate_riddles_book:
        'הספר האולטימטיבי של חידות: חידות מילים, חידות מוח, פאזלים לוגיים, בעיות מתמטיקה, שאלות תכסיס ועוד!',
      word_games_riddles:
        'משחקי מילים, חידות ובדיקות לוגיקה - אתגר את מוחך ושפר את האנגלית שלך',
    },
    sources: {
      heading: 'גלה מקורות',
      description: 'עיין באוספים הייחודיים שמניעים את החידות שלנו.',
      source_label: 'ספר מקור',
      riddles_count: '{count} חידות',
      select_book_prompt: 'בחר ספר לעיל כדי לגלות את תכניו.',
      goto_book: 'עבור אל הספר',
    },
    book: {
      no_slug: 'לא צוין ספר.',
      not_found: 'לא נמצאו חידות עבור ספר זה.',
      back_to_sources: 'חזרה למקורות',
      prev: 'הקודם',
      next: 'הבא',
    },
    categories: {
      heading: 'עיין לפי קטגוריות',
      description: 'חקור חידות מקובצות לפי נושאים וקטגוריות.',
      select_prompt: 'בחר קטגוריה לעיל כדי לחשוף את חידותיה.',
      loading: 'טוען קטגוריות...',
      riddles_count: '{count} חידות',
      labels: {
        wordplay: 'משחקי מילים',
        everyday: 'יומיומי',
        technology: 'טכנולוגיה',
        tricky: 'מתוחכם',
        logic: 'לוגיקה',
        nature: 'טבע',
      },
    },
    riddle_detail: {
      title: 'פרטי חידה',
      showing_id: 'מוצגת חידה עם מזהה: {id}',
    },
  },
};
