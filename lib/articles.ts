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
    title: 'about-me/skill.md',
    href: "https://tarunnagasai.substack.com/p/about-meskillmd",
    date: '05/2026',
    teaser:
      'A skill that know everything about me and grows with me',
    tags: ['AI', 'Agent', 'Skill', 'about-me'],
    featured: true,
  },
  {
    title: 'Scaling Sacred Texts: Building a High-Throughput Translation Pipeline with Gemma 4 31B and vLLM',
    href: "https://substack.com/home/post/p-197830805",
    date: '05/2026',
    teaser:
      'A deep engineering walkthrough of the Yahuah AI pipeline — how I translated 60,000 verses with zero errors using a custom DAG, GPU mutex gating, and a three-layer noise filter that caught 7,300+ false positives.',
    tags: ['vLLM', 'Gemma', 'DAG', 'Engineering'],
    featured: true,
  },
  {
    title: 'The Flutter Architecture Mistake That Worked in Production — Until It Didn’t',
    href: "https://medium.com/@tarunnagasai007/the-flutter-architecture-mistake-that-worked-in-production-until-it-didnt-c8a7c9577078",
    date: '01/2026',
    teaser:
      'Migrating an offline-first Flutter app from state-heavy architecture to a data-driven design using Bloc, ObjectBox, and lazy loading..',
    tags: ['Flutter', 'ObjectBox', 'Architecture'],
    featured: true,
  },
  {
    title: 'Building a Mental Firewall Against AI Dependency',
    href: "https://medium.com/write-a-catalyst/i-built-a-mental-firewall-to-stop-chatgpt-from-hijacking-my-brain-ea0b4b7a6ef3",
    date: '01/2026',
    teaser:
      'I noticed I was outsourcing my thinking to ChatGPT. Seven habits I built to use AI as a tool without losing the muscle of reasoning for myself.',
    tags: ['AI', 'ChatGPT', 'Reflection'],
    featured: false,
  },
  {
    title: 'Flutter GenUI — A Closer Look',
    href: SITE.external.genUiArticle,
    date: '11/2025',
    teaser:
      'A research dive into Flutter\'s GenUI package — how AI-driven UI generation actually works under the hood, plus a custom YouTube CatalogItem and AI tool I built to extend it.',
    tags: ['Flutter', 'GenUI', 'Firebase AI'],
    featured: false,
  },
];

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}
