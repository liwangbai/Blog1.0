import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Project, ProjectFrontmatter } from '@/types/project';
import { mdxOptions } from './mdx';
import { PAGINATION } from './constants';

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

export async function getAllProjects(): Promise<Project[]> {
  const entries = await fs.readdir(PROJECTS_DIR);
  const files = entries.filter((f) => f.endsWith('.mdx') && !f.startsWith('._'));

  const projects = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = await fs.readFile(path.join(PROJECTS_DIR, filename), 'utf8');

      const { frontmatter: fm } = await compileMDX<ProjectFrontmatter>({
        source: raw,
        options: { parseFrontmatter: true, ...mdxOptions },
      });

      return { slug, frontmatter: fm, source: raw };
    }),
  );

  return projects.sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999;
    const orderB = b.frontmatter.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    const yearA = a.frontmatter.year ?? 0;
    const yearB = b.frontmatter.year ?? 0;
    return yearB - yearA;
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const raw = await fs.readFile(
      path.join(PROJECTS_DIR, `${slug}.mdx`),
      'utf8',
    );

    const { frontmatter: fm } = await compileMDX<ProjectFrontmatter>({
      source: raw,
      options: { parseFrontmatter: true, ...mdxOptions },
    });

    return { slug, frontmatter: fm, source: raw };
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(
  count: number = PAGINATION.featuredProjectsCount,
): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.frontmatter.featured).slice(0, count);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((p) => p.slug);
}
