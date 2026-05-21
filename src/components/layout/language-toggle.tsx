'use client';

import { useLocale } from '@/i18n/locale-context';

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const nextLocale = locale === 'zh' ? 'en' : 'zh';

  return (
    <button
      onClick={() => setLocale(nextLocale)}
      className="inline-flex h-9 items-center justify-center rounded-md px-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      aria-label={`Switch to ${nextLocale === 'zh' ? '中文' : 'English'}`}
    >
      {locale === 'zh' ? 'EN' : '中文'}
    </button>
  );
}
