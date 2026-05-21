import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getAllProjects } from '@/lib/projects';
import { getDictionary } from '@/i18n/get-dictionary';
import { cookieName, defaultLocale } from '@/i18n/settings';
import { PageHeader } from '@/components/ui/page-header';
import { ProjectGrid } from '@/components/projects/project-grid';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.projects.title,
    description: dict.projects.description,
  };
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <PageHeader
        title={dict.projects.title}
        description={dict.projects.pageDesc}
      />
      <div className="mt-12">
        <ProjectGrid projects={projects} locale={locale} />
      </div>
    </div>
  );
}
