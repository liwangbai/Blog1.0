'use client';

import { ThemeProvider } from 'next-themes';
import { LocaleProvider } from '@/i18n/locale-context';

export function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: string;
}) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LocaleProvider>
  );
}
