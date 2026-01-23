import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations, Lang } from '../i18n/translations';

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

const STORAGE_KEY = 'lang';

const defaultContext: I18nContextType = {
  lang: 'en',
  setLang: () => {},
  t: (k: string) => k,
  isRTL: false,
};

const I18nContext = createContext<I18nContextType>(defaultContext);

function safeReadLang(): Lang {
  try {
    if (typeof window === 'undefined') return 'en';
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'he' || v === 'en') return v;
  } catch (e) {
    // ignore
  }
  return 'en';
}

function getNested(obj: any, path: string): any {
  return path.split('.').reduce((acc: any, p: string) => (acc && acc[p] != null ? acc[p] : undefined), obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => safeReadLang());

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, lang);
      }
    } catch (e) {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    if (l !== 'en' && l !== 'he') return;
    setLangState(l);
  };

  const t = (key: string) => {
    const v = getNested(translations[lang], key);
    if (v !== undefined) return String(v);
    const fallback = getNested(translations['en'], key);
    if (fallback !== undefined) return String(fallback);
    return key;
  };

  const isRTL = lang === 'he';

  const value = useMemo(() => ({ lang, setLang, t, isRTL }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
