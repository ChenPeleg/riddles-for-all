import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const LanguageToggle: React.FC = () => {
  const { lang, setLang, t } = useTranslations();
  const toggle = () => setLang(lang === 'en' ? 'he' : 'en');
  return (
    <button
      onClick={toggle}
      aria-pressed={lang === 'he'}
      aria-label={t('common.toggle_language')}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-200 bg-white shadow-sm hover:bg-surface-50"
    >
      {lang === 'en' ? 'עברית' : 'English'}
    </button>
  );
};

export default LanguageToggle;
