import { PAGINATION } from '@/lib/constants';
import { getFeaturedPosts } from '@/lib/posts';
import { getFeaturedProjects } from '@/lib/projects';
import { Hero } from '@/components/home/hero';
import { FeaturedPosts } from '@/components/home/featured-posts';
import { FeaturedProjects } from '@/components/home/featured-projects';

export default async function HomePage() {
  const [featuredPosts, featuredProjects] = await Promise.all([
    getFeaturedPosts(PAGINATION.featuredPostsCount),
    getFeaturedProjects(PAGINATION.featuredProjectsCount),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <Hero />

      {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}

      {featuredProjects.length > 0 && (
        <FeaturedProjects projects={featuredProjects} />
      )}
    </div>
  );
}
