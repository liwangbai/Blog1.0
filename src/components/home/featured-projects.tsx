import Link from 'next/link';
import { getDictionary } from '@/i18n/get-dictionary';
import { ProjectGrid } from '@/components/projects/project-grid';
import type { Project } from '@/types/project';

interface FeaturedProjectsProps {
  projects: Project[];
  locale: string;
}

export function FeaturedProjects({ projects, locale }: FeaturedProjectsProps) {
  const dict = getDictionary(locale);

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {dict.home.featuredProjects}
        </h2>
        <Link
          href="/projects"
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {dict.home.viewAll}
        </Link>
      </div>
      <ProjectGrid projects={projects} locale={locale} />
    </section>
  );
}
