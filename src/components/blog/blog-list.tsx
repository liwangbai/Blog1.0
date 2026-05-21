import { BlogCard } from './blog-card';
import type { Post } from '@/types/post';

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-16">
        No posts yet. Check back soon!
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
