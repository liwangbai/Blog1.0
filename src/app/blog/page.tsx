import type { Metadata } from 'next';
import { SITE, PAGINATION } from '@/lib/constants';
import { getPaginatedPosts } from '@/lib/posts';
import { PageHeader } from '@/components/ui/page-header';
import { BlogList } from '@/components/blog/blog-list';
import { Pagination } from '@/components/ui/pagination';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Read articles about full-stack development, TypeScript, React, and more.`,
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const { posts, totalPages } = await getPaginatedPosts(currentPage, PAGINATION.postsPerPage);

  if (posts.length === 0 && currentPage > 1) {
    const { posts: firstPagePosts, totalPages: tp } = await getPaginatedPosts(1, PAGINATION.postsPerPage);
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <PageHeader title="Blog" description="Thoughts on development, design, and technology." />
        <BlogList posts={firstPagePosts} />
        <Pagination currentPage={1} totalPages={tp} basePath="/blog" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <PageHeader title="Blog" description="Thoughts on development, design, and technology." />
      <div className="mt-12">
        <BlogList posts={posts} />
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}
