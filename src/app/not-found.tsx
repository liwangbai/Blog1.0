import Link from 'next/link';
import { cookies } from 'next/headers';
import { getDictionary } from '@/i18n/get-dictionary';
import { cookieName, defaultLocale } from '@/i18n/settings';

export default async function NotFound() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-32 sm:px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {dict.error.notFound}
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {dict.error.notFoundDesc}
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
      >
        {dict.error.goHome}
      </Link>
    </div>
  );
}
