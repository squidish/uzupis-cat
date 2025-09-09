import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import en from './en.json';
import lt from './lt.json';

type Locale = 'en' | 'lt';

const dictionaries = { en, lt } as const;

interface I18nContextType {
  lang: Locale;
  setLang: (l: Locale) => void;
  t: (key: string) => any;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

const STORAGE_KEY = 'language';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    return stored ?? 'en';
    });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const t = (key: string): any => {
    return key.split('.').reduce<any>((obj, k) => (obj ? obj[k] : undefined), dictionaries[lang]) ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
