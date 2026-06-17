import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { projects } from '@/lib/projects';
import { research } from '@/lib/research';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    '', // home
    '/about',
    '/work',
    '/writing',
    '/research',
    '/services',
    '/contact',
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${SITE.url}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const researchRoutes = research.flatMap((series) => [
    {
      url: `${SITE.url}/research/${series.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    ...series.topics.map((topic) => ({
      url: `${SITE.url}/research/${series.slug}/${topic.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]);

  return [...staticRoutes, ...projectRoutes, ...researchRoutes];
}
