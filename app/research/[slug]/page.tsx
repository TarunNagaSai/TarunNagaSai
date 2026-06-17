import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { BackLink } from '@/components/ui/BackLink';
import { Tag } from '@/components/ui/Tag';
import { ResearchTopicCard } from '@/components/research/ResearchTopicCard';
import { researchProseComponents } from '@/components/research/researchProse';
import { research, getResearchProject } from '@/lib/research';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const series = getResearchProject(params.slug);
  if (!series) return {};
  const url = `${SITE.url}/research/${series.slug}`;
  return {
    title: series.title,
    description: series.teaser,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: series.title,
      description: series.teaser,
    },
    twitter: {
      card: 'summary_large_image',
      title: series.title,
      description: series.teaser,
    },
  };
}

export default async function ResearchSeriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const series = getResearchProject(params.slug);
  if (!series) notFound();

  // Optional blog-style intro body. When present, the author interleaves
  // <Topic slug="..." /> tags between prose; otherwise we auto-render the list.
  let Body: React.ComponentType<{ components?: Record<string, unknown> }> | null =
    null;
  try {
    const mod = await import(`@/content/research/${params.slug}/index.mdx`);
    Body = mod.default;
  } catch {
    Body = null;
  }

  // <Topic slug="..." /> renders the same card UI as the auto list, numbered by
  // the topic's position in the series so ordering stays consistent.
  const Topic = ({ slug }: { slug: string }) => {
    const index = series.topics.findIndex((t) => t.slug === slug);
    if (index === -1) return null;
    return (
      <ResearchTopicCard
        seriesSlug={series.slug}
        topic={series.topics[index]}
        index={index}
        className="my-8"
      />
    );
  };

  const seriesUrl = `${SITE.url}/research/${series.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    '@id': seriesUrl,
    url: seriesUrl,
    name: series.title,
    description: series.teaser,
    keywords: series.tags.join(', '),
    inLanguage: 'en-US',
    author: { '@type': 'Person', '@id': `${SITE.url}/#person`, name: SITE.name },
    hasPart: series.topics.map((t, i) => ({
      '@type': 'BlogPosting',
      position: i + 1,
      url: `${seriesUrl}/${t.slug}`,
      headline: t.title,
      description: t.teaser,
      datePublished: t.publishedAt,
      dateModified: t.updatedAt ?? t.publishedAt,
    })),
  };

  return (
    <div className="pt-12 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="wide">
        <BackLink fallbackHref="/research">Research</BackLink>

        <div className="mt-10 mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            Series · {series.year}
          </p>
          <h1 className="text-display font-medium tracking-tight">
            {series.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-subtle leading-relaxed max-w-2xl">
            {series.teaser}
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {series.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        {Body ? (
          <>
            <div className="hairline mb-16" />
            <div className="text-fg/90 leading-relaxed">
              <Body components={{ ...researchProseComponents, Topic }} />
            </div>
          </>
        ) : series.topics.length > 0 ? (
          <div className="space-y-0">
            {series.topics.map((t, i) => (
              <ResearchTopicCard
                key={t.slug}
                seriesSlug={series.slug}
                topic={t}
                index={i}
                delay={Math.min(i * 0.04, 0.2)}
              />
            ))}
          </div>
        ) : (
          <p className="border-t border-border pt-10 text-subtle italic">
            Articles for this series are coming soon.
          </p>
        )}
      </Container>
    </div>
  );
}
