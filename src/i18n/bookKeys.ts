// Maps raw book title strings (as they appear in the assets/data) to stable i18n keys
export const BOOK_KEY_MAP: Record<string, string> = {
  'Gym for the Brain': 'gym_for_the_brain',
  'Riddle Me This': 'riddle_me_this',
  'Riddle Me This - The Ultimate Collection Of Riddles & Brain Teasers': 'riddle_me_this',
  'The Little Book of Riddles': 'the_little_book_of_riddles',
  'The Ultimate Riddles Book: Word Riddles, Brain Teasers, Logic Puzzles, Math Problems, Trick Questions, and More!': 'the_ultimate_riddles_book',
  'Word Games, Riddles and Logic Tests - Tax Your Brain and Boost Your English': 'word_games_riddles',
  'The Best Fun Riddles & Trick Questions for Smart Kids and Family - 3 Books in 1 - 700 Jokes, Math': 'the_best_fun_riddles',
};

export function displayBookTitle(raw: string, t: (key: string) => string) {
  const key = BOOK_KEY_MAP[raw];
  if (!key) return raw;
  const translated = t(`books.${key}`);
  // t returns the key when a translation is missing in both current lang and fallback.
  // If that happens, fall back to the raw title.
  if (translated.startsWith('books.')) return raw;
  return translated;
}
