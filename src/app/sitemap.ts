import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { getAllSlugs } from '@/lib/posts';
import { getAllProjectSlugs } from '@/lib/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postSlugs = await getAllSlugs();
  const projectSlugs = await getAllProjectSlugs();

  const posts = postSlugs.map((slug) => ({
    url: `${SITE.url}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const projects = projectSlugs.map((slug) => ({
    url: `${SITE.url}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...posts,
    ...projects,
  ];
}
