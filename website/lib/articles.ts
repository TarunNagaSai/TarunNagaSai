import { SITE } from './site';

export interface Article {
  title: string;
  href: string;
  date: string;
  teaser: string;
  tags: string[];
  featured: boolean;
}

export const articles: Article[] = [
  {
    title: 'Scaling Sacred Texts: Building a High-Throughput Translation Pipeline with Gemma 4 31B and vLLM',
    href: SITE.social.medium,
    date: '2025',
    teaser:
      'A deep engineering walkthrough of the Yahuah AI pipeline — how I translated 60,000 verses with zero errors using a custom DAG, GPU mutex gating, and a three-layer noise filter that caught 7,300+ false positives.',
    tags: ['vLLM', 'Gemma', 'DAG', 'Engineering'],
    featured: true,
  },
  {
    title: 'Migrating an Offline-First Flutter App from State-Heavy to Data-Driven Architecture',
    href: SITE.social.medium,
    date: '2024',
    teaser:
      'The story of rewriting Horeb. Why I moved off Bloc-as-data-warehouse, why ObjectBox won over Hive/Isar/Drift, and how a cleaner architecture cut memory use by 64% on its own.',
    tags: ['Flutter', 'ObjectBox', 'Architecture'],
    featured: true,
  },
  {
    title: 'Building a Mental Firewall Against AI Dependency',
    href: SITE.social.medium,
    date: '2024',
    teaser:
      'I noticed I was outsourcing my thinking to ChatGPT. Seven habits I built to use AI as a tool without losing the muscle of reasoning for myself.',
    tags: ['AI', 'Reflection'],
    featured: false,
  },
  {
    title: 'Flutter GenUI — A Closer Look',
    href: SITE.external.genUiArticle,
    date: '2024',
    teaser:
      'A research dive into Flutter\'s GenUI package — how AI-driven UI generation actually works under the hood, plus a custom YouTube CatalogItem and AI tool I built to extend it.',
    tags: ['Flutter', 'GenUI', 'Firebase AI'],
    featured: true,
  },
];

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}
