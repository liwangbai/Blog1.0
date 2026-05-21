import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Post, PostFrontmatter } from '@/types/post';
import { calculateReadingTime } from './reading-time';
import { mdxOptions } from './mdx';
import { PAGINATION } from './constants';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export async function getAllPosts(): Promise<Post[]> {
  const entries = await fs.readdir(POSTS_DIR);
  const files = entries.filter((f) => f.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = await fs.readFile(path.join(POSTS_DIR, filename), 'utf8');

      const { frontmatter: fm } = await compileMDX<PostFrontmatter>({
        source: raw,
        options: { parseFrontmatter: true, ...mdxOptions },
      });

      if (process.env.NODE_ENV === 'production' && fm.draft) return null;

      return {
        slug,
        frontmatter: fm,
        source: raw,
        readingTime: calculateReadingTime(raw),
      };
    }),
  );

  return posts
    .filter((p): p is Post => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const raw = await fs.readFile(
      path.join(POSTS_DIR, `${slug}.mdx`),
      'utf8',
    );

    const { frontmatter: fm } = await compileMDX<PostFrontmatter>({
      source: raw,
      options: { parseFrontmatter: true, ...mdxOptions },
    });

    return {
      slug,
      frontmatter: fm,
      source: raw,
      readingTime: calculateReadingTime(raw),
    };
  } catch {
    return null;
  }
}

export async function getFeaturedPosts(
  count: number = PAGINATION.featuredPostsCount,
): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.frontmatter.featured).slice(0, count);
}

export async function getPaginatedPosts(
  page: number,
  perPage: number = PAGINATION.postsPerPage,
): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  const all = await getAllPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const posts = all.slice(start, start + perPage);

  return { posts, total, totalPages };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
