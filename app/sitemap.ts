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

  const researchRoutes = research.flatMap((series) => {
    // Series root reflects its most recently updated topic.
    const seriesLastModified = series.topics.reduce((latest, topic) => {
      const d = new Date(topic.updatedAt ?? topic.publishedAt);
      return d > latest ? d : latest;
    }, new Date(0));

    return [
      {
        url: `${SITE.url}/research/${series.slug}`,
        lastModified:
          series.topics.length > 0 ? seriesLastModified : now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      ...series.topics.map((topic) => ({
        url: `${SITE.url}/research/${series.slug}/${topic.slug}`,
        lastModified: new Date(topic.updatedAt ?? topic.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
    ];
  });

  return [...staticRoutes, ...projectRoutes, ...researchRoutes];
}
