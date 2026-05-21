'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { getDictionary, type Dictionary } from './get-dictionary';
import { cookieName, defaultLocale } from './settings';

interface LocaleContextValue {
  locale: string;
  dict: Dictionary;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: string;
}) {
  const [locale, setLocaleState] = useState(initialLocale);
  const dict = getDictionary(locale);

  const setLocale = useCallback((newLocale: string) => {
    document.cookie = `${cookieName}=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;
    setLocaleState(newLocale);
    window.location.reload();
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, dict, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
