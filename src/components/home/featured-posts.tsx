import Link from 'next/link';
import { getDictionary } from '@/i18n/get-dictionary';
import { BlogList } from '@/components/blog/blog-list';
import type { Post } from '@/types/post';

interface FeaturedPostsProps {
  posts: Post[];
  locale: string;
}

export function FeaturedPosts({ posts, locale }: FeaturedPostsProps) {
  const dict = getDictionary(locale);

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {dict.home.latestPosts}
        </h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {dict.home.viewAll}
        </Link>
      </div>
      <BlogList posts={posts} locale={locale} />
    </section>
  );
}
