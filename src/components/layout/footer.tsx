import { cookies } from 'next/headers';
import { SITE } from '@/lib/constants';
import { getDictionary } from '@/i18n/get-dictionary';
import { cookieName, defaultLocale } from '@/i18n/settings';
import { SocialLinks } from './SocialLinks';

export async function Footer() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-8 sm:px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {dict.common.copyright
            .replace('{year}', String(new Date().getFullYear()))
            .replace('{author}', SITE.author)}
        </p>
        <SocialLinks githubLabel={dict.common.github} />
      </div>
      <div className="flex justify-center border-t border-gray-200 dark:border-gray-800 py-4">
        <a
          href="http://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          渝ICP备2026009814号
        </a>
      </div>
    </footer>
  );
}
