import Link from 'next/link';
import { BlogList } from '@/components/blog/blog-list';
import type { Post } from '@/types/post';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Latest Posts
        </h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View all &rarr;
        </Link>
      </div>
      <BlogList posts={posts} />
    </section>
  );
}
