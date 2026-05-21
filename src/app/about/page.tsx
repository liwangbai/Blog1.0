import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { SITE } from '@/lib/constants';
import { getDictionary } from '@/i18n/get-dictionary';
import { cookieName, defaultLocale } from '@/i18n/settings';
import { Tag } from '@/components/ui/tag';
import { PageHeader } from '@/components/ui/page-header';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.about.title,
    description: dict.about.description,
  };
}

const SKILLS = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Go',
  'Rust',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'GraphQL',
];

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader
        title={dict.about.aboutMe}
        description={dict.about.aboutMeDesc}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {dict.about.background}
          </h2>
          <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{dict.about.background1}</p>
            <p>{dict.about.background2}</p>
            <p>{dict.about.background3}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {dict.about.skills}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {dict.about.contact}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {dict.about.contactText}{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white underline hover:no-underline"
            >
              {dict.common.github}
            </a>
            {' '}{dict.about.or}{' '}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white underline hover:no-underline"
            >
              {dict.common.linkedin}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
