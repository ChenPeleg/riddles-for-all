import React from 'react';
import {useTranslationLegacy} from '../hooks/useTranslationLegacy';

const LanguageToggle: React.FC = () => {
    const {
        lang,
        setLang,
        t
    } = useTranslationLegacy();
    const toggle = () => setLang(lang === 'en' ? 'he' : 'en');
    return (<button
            onClick={toggle}
            aria-pressed={lang === 'he'}
            aria-label={t('common.toggle_language')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 shadow-sm hover:bg-surface-50 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 text-sm font-medium transition-colors"
        >
            {lang === 'en' ? t('common.toggle_to_he') : t('common.toggle_to_en')}
        </button>);
};

export default LanguageToggle;
