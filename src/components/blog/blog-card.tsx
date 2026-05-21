import { getDictionary } from '@/i18n/get-dictionary';
import { Card } from '@/components/ui/card';
import { PostMeta } from './post-meta';
import type { Post } from '@/types/post';

interface BlogCardProps {
  post: Post;
  locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const { frontmatter, slug, readingTime } = post;
  const dict = getDictionary(locale);

  return (
    <Card href={`/blog/${slug}`}>
      <article className="space-y-3">
        <PostMeta
          date={frontmatter.date}
          readingTime={readingTime}
          tags={frontmatter.tags}
          locale={locale}
        />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-snug">
          {frontmatter.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {frontmatter.description}
        </p>
        <span className="inline-block text-sm font-medium text-gray-900 dark:text-white">
          {dict.blog.readMore}
        </span>
      </article>
    </Card>
  );
}
