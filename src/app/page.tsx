import { cookies } from 'next/headers';
import { PAGINATION } from '@/lib/constants';
import { getFeaturedPosts } from '@/lib/posts';
import { getFeaturedProjects } from '@/lib/projects';
import { getDictionary } from '@/i18n/get-dictionary';
import { cookieName, defaultLocale } from '@/i18n/settings';
import { Hero } from '@/components/home/hero';
import { FeaturedPosts } from '@/components/home/featured-posts';
import { FeaturedProjects } from '@/components/home/featured-projects';

export default async function HomePage() {
  const [featuredPosts, featuredProjects] = await Promise.all([
    getFeaturedPosts(PAGINATION.featuredPostsCount),
    getFeaturedProjects(PAGINATION.featuredProjectsCount),
  ]);

  const cookieStore = await cookies();
  const locale = cookieStore.get(cookieName)?.value || defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <Hero locale={locale} />

      {featuredPosts.length > 0 && (
        <FeaturedPosts posts={featuredPosts} locale={locale} />
      )}

      {featuredProjects.length > 0 && (
        <FeaturedProjects projects={featuredProjects} locale={locale} />
      )}
    </div>
  );
}
