import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { PAGINATION } from '@/lib/constants';
import { getPaginatedPosts } from '@/lib/posts';
import { getDictionary } from '@/i18n/get-dictionary';
import { cookieName, defaultLocale } from '@/i18n/settings';
import { PageHeader } from '@/components/ui/page-header';
import { BlogList } from '@/components/blog/blog-list';
import { Pagination } from '@/components/ui/pagination';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.blog.title,
    description: dict.blog.description,
  };
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const { posts, totalPages } = await getPaginatedPosts(currentPage, PAGINATION.postsPerPage);

  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  if (posts.length === 0 && currentPage > 1) {
    const { posts: firstPagePosts, totalPages: tp } = await getPaginatedPosts(1, PAGINATION.postsPerPage);
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <PageHeader title={dict.blog.title} description={dict.blog.pageDesc} />
        <BlogList posts={firstPagePosts} locale={locale} />
        <Pagination currentPage={1} totalPages={tp} basePath="/blog" locale={locale} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <PageHeader title={dict.blog.title} description={dict.blog.pageDesc} />
      <div className="mt-12">
        <BlogList posts={posts} locale={locale} />
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" locale={locale} />
    </div>
  );
}
