import { getDictionary } from '@/i18n/get-dictionary';
import { Tag } from '@/components/ui/tag';

interface PostMetaProps {
  date: string;
  readingTime: number;
  tags: string[];
  locale: string;
}

export function PostMeta({ date, readingTime, tags, locale }: PostMetaProps) {
  const dict = getDictionary(locale);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
        {formattedDate}
      </time>
      <span className="text-sm text-gray-400 dark:text-gray-500">
        {readingTime} {dict.blog.minRead}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
