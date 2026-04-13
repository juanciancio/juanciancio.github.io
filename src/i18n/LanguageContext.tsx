import { createContext, useState, useEffect, type ReactNode } from 'react';
import es from './locales/es';
import en from './locales/en';

export type Locale = 'es' | 'en';

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof es>;

const locales: Record<Locale, Translations> = { es, en };

function detectLocale(): Locale {
  const stored = localStorage.getItem('lang');
  if (stored === 'es' || stored === 'en') return stored;

  const browserLang = navigator.language || (navigator as any).userLanguage || '';
  if (browserLang.startsWith('en')) return 'en';
  return 'es';
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue>({
  locale: 'es',
  setLocale: () => {},
  t: es,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('lang', l);
    document.documentElement.setAttribute('lang', l);
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: locales[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}
