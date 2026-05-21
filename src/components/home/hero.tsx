import { getDictionary } from '@/i18n/get-dictionary';

interface HeroProps {
  locale: string;
}

export function Hero({ locale }: HeroProps) {
  const dict = getDictionary(locale);

  return (
    <section className="flex flex-col items-center text-center py-20">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
        <span className="text-3xl font-bold text-gray-500 dark:text-gray-400">
          W
        </span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        {dict.home.greeting}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
        {dict.home.subtitle}
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/blog"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
        >
          {dict.home.readBlog}
        </a>
        <a
          href="/projects"
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {dict.home.viewProjects}
        </a>
      </div>
    </section>
  );
}
