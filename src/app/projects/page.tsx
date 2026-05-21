import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import { PageHeader } from '@/components/ui/page-header';
import { ProjectGrid } from '@/components/projects/project-grid';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of projects I have built and contributed to.',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <PageHeader
        title="Projects"
        description="Things I've built and contributed to."
      />
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
