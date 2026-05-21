import Link from 'next/link';
import { cookies } from 'next/headers';
import { SITE } from '@/lib/constants';
import { getDictionary } from '@/i18n/get-dictionary';
import { cookieName, defaultLocale } from '@/i18n/settings';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { MobileNav } from './mobile-nav';

export async function Header() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  const navLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/blog', label: dict.nav.blog },
    { href: '/projects', label: dict.nav.projects },
    { href: '/about', label: dict.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {SITE.author}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
