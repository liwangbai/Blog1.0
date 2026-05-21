import { getDictionary } from '@/i18n/get-dictionary';
import { ProjectCard } from './project-card';
import type { Project } from '@/types/project';

interface ProjectGridProps {
  projects: Project[];
  locale: string;
}

export function ProjectGrid({ projects, locale }: ProjectGridProps) {
  const dict = getDictionary(locale);

  if (projects.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-16">
        {dict.projects.noProjects}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
