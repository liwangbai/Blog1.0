import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  completed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  archived: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { frontmatter, slug } = project;

  return (
    <Card href={`/projects/${slug}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {frontmatter.name}
          </h2>
          <span
            className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[frontmatter.status]}`}
          >
            {frontmatter.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {frontmatter.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {frontmatter.techStack.map((tech) => (
            <Tag key={tech} label={tech} />
          ))}
        </div>
      </div>
    </Card>
  );
}
