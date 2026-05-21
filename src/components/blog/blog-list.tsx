import { getDictionary } from '@/i18n/get-dictionary';
import { BlogCard } from './blog-card';
import type { Post } from '@/types/post';

interface BlogListProps {
  posts: Post[];
  locale: string;
}

export function BlogList({ posts, locale }: BlogListProps) {
  const dict = getDictionary(locale);

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-16">
        {dict.blog.noPosts}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} locale={locale} />
      ))}
    </div>
  );
}
