'use client';

import { useLocale } from '@/i18n/locale-context';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { dict } = useLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-32 sm:px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {dict.error.somethingWrong}
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {dict.error.errorDesc}
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
      >
        {dict.error.tryAgain}
      </button>
    </div>
  );
}
