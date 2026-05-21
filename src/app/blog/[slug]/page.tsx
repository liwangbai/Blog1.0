import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import { mdxOptions } from '@/lib/mdx';
import { SITE } from '@/lib/constants';
import { getDictionary } from '@/i18n/get-dictionary';
import { cookieName, defaultLocale } from '@/i18n/settings';
import { BackLink } from '@/components/ui/back-link';
import { PostMeta } from '@/components/blog/post-meta';
import type { PostFrontmatter } from '@/types/post';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  if (!post) return { title: dict.blog.postNotFound };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated,
      url: `${SITE.url}/blog/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  if (!post) notFound();

  const { content } = await compileMDX<PostFrontmatter>({
    source: post.source,
    options: mdxOptions,
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <article>
        <header className="space-y-4">
          <PostMeta
            date={post.frontmatter.date}
            readingTime={post.readingTime}
            tags={post.frontmatter.tags}
            locale={locale}
          />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {post.frontmatter.title}
          </h1>
        </header>

        <div className="mt-8 prose dark:prose-invert prose-gray max-w-none">
          {content}
        </div>
      </article>

      <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <BackLink href="/blog" label={dict.blog.backToBlog} locale={locale} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            datePublished: post.frontmatter.date,
            dateModified: post.frontmatter.updated || post.frontmatter.date,
            author: { '@type': 'Person', name: SITE.author },
          }),
        }}
      />
    </div>
  );
}
