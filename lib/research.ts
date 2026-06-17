export interface ResearchTopic {
  /** Matches content/research/<seriesSlug>/<topicSlug>.mdx */
  slug: string;
  title: string;
  teaser: string;
  /** ISO date (YYYY-MM-DD) the article was published. Powers Article JSON-LD + SERP freshness. */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful edit. Optional — defaults to publishedAt. */
  updatedAt?: string;
}

export interface ResearchProject {
  slug: string;
  title: string;
  teaser: string;
  year: string;
  tags: string[];
  /** Articles in the series. Each maps to an MDX body under content/research/<slug>/. */
  topics: ResearchTopic[];
}

export const research: ResearchProject[] = [
  {
    slug: 'model-quantization',
    title: 'Model Quantization',
    teaser:
      'A series explaining how a huge LLM can run on consumer hardware with a minimal memory footprint, delivering results almost equal to the base model. I will start with the building blocks and go all the way to showing you how to run any large model on your own hardware.',
      year: '06/2026',
    tags: ['LLM', 'Fine-tune', 'AWQ', 'Unsloth'],
    topics: [
      {
        slug: 'IEEE-754-float-standard',
        title: 'IEEE 754 standard for Float',
        teaser:
          'A detailed explanation about how data is stored in float by explaining the engineering behind it.',
        publishedAt: '2026-06-16',
      },
    ],
  },
];

export function getResearchProject(slug: string): ResearchProject | undefined {
  return research.find((r) => r.slug === slug);
}

export function getResearchTopic(
  slug: string,
  topicSlug: string,
): { series: ResearchProject; topic: ResearchTopic } | undefined {
  const series = getResearchProject(slug);
  if (!series) return undefined;
  const topic = series.topics.find((t) => t.slug === topicSlug);
  if (!topic) return undefined;
  return { series, topic };
}
