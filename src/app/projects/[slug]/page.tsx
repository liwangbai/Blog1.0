import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import { mdxOptions } from '@/lib/mdx';
import { SITE } from '@/lib/constants';
import { BackLink } from '@/components/ui/back-link';
import { Tag } from '@/components/ui/tag';
import type { ProjectFrontmatter } from '@/types/project';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.frontmatter.name,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.name,
      description: project.frontmatter.description,
      type: 'article',
      url: `${SITE.url}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const { content } = await compileMDX<ProjectFrontmatter>({
    source: project.source,
    options: mdxOptions,
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <article>
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {project.frontmatter.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {project.frontmatter.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.frontmatter.techStack.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
          <div className="flex gap-4">
            {project.frontmatter.repoUrl && (
              <a
                href={project.frontmatter.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                Source Code
              </a>
            )}
            {project.frontmatter.liveUrl && (
              <a
                href={project.frontmatter.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </header>

        <div className="mt-8 prose dark:prose-invert prose-gray max-w-none">
          {content}
        </div>
      </article>

      <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <BackLink href="/projects" label="Back to projects" />
      </div>
    </div>
  );
}
