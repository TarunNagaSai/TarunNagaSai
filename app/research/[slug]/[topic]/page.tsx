import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { BackLink } from '@/components/ui/BackLink';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { research, getResearchTopic } from '@/lib/research';
import { getResearchReadingMinutes } from '@/lib/mdx';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return research.flatMap((r) =>
    r.topics.map((t) => ({ slug: r.slug, topic: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; topic: string };
}): Promise<Metadata> {
  const found = getResearchTopic(params.slug, params.topic);
  if (!found) return {};
  const { series, topic } = found;
  const url = `${SITE.url}/research/${series.slug}/${topic.slug}`;
  return {
    title: `${topic.title} — ${series.title}`,
    description: topic.teaser,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${topic.title} — ${series.title}`,
      description: topic.teaser,
      publishedTime: topic.publishedAt,
      modifiedTime: topic.updatedAt ?? topic.publishedAt,
      authors: [SITE.name],
      tags: series.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.title} — ${series.title}`,
      description: topic.teaser,
    },
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: { slug: string; topic: string };
}) {
  const found = getResearchTopic(params.slug, params.topic);
  if (!found) notFound();
  const { series, topic } = found;

  let Content: React.ComponentType | null = null;
  try {
    const mod = await import(
      `@/content/research/${params.slug}/${params.topic}.mdx`
    );
    Content = mod.default;
  } catch {
    Content = null;
  }

  const readingMinutes = await getResearchReadingMinutes(
    params.slug,
    params.topic,
  );

  const currentIndex = series.topics.findIndex((t) => t.slug === params.topic);
  const next =
    currentIndex < series.topics.length - 1
      ? series.topics[currentIndex + 1]
      : null;

  const url = `${SITE.url}/research/${series.slug}/${topic.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    mainEntityOfPage: url,
    url,
    headline: topic.title,
    description: topic.teaser,
    datePublished: topic.publishedAt,
    dateModified: topic.updatedAt ?? topic.publishedAt,
    image: `${url}/opengraph-image`,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'CreativeWorkSeries',
      name: series.title,
      url: `${SITE.url}/research/${series.slug}`,
    },
    keywords: series.tags.join(', '),
    author: { '@type': 'Person', '@id': `${SITE.url}/#person`, name: SITE.name },
    publisher: { '@id': `${SITE.url}/#person` },
  };

  return (
    <article className="pt-12 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="wide">
        <BackLink fallbackHref={`/research/${series.slug}`}>
          {series.title}
        </BackLink>

        <header className="mt-10 mb-16 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            {series.title} · {String(currentIndex + 1).padStart(2, '0')} ·{' '}
            <time dateTime={topic.publishedAt}>
              {new Date(topic.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            {readingMinutes ? <> · {readingMinutes} min read</> : null}
          </p>
          <h1 className="text-display font-medium tracking-tight">
            {topic.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-subtle leading-relaxed max-w-2xl">
            {topic.teaser}
          </p>
        </header>

        <div className="hairline mb-16" />
        <div className="prose-custom">
          {Content ? (
            <Content />
          ) : (
            <p className="text-subtle italic">
              This article is coming soon. Check back shortly.
            </p>
          )}
        </div>
      </Container>

      <div className="mt-32 py-16 border-t border-border">
        <Container size="wide">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            {next ? (
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
                  Next in series
                </p>
                <h3 className="text-h2 font-medium tracking-tight line-clamp-1">
                  <Link
                    href={`/research/${series.slug}/${next.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {next.title} <span className="text-muted">→</span>
                  </Link>
                </h3>
                <p className="mt-3 text-subtle line-clamp-2">{next.teaser}</p>
              </div>
            ) : (
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
                  End of series
                </p>
                <h3 className="text-h2 font-medium tracking-tight line-clamp-1">
                  <Link
                    href={`/research/${series.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    Back to {series.title} <span className="text-muted">→</span>
                  </Link>
                </h3>
              </div>
            )}
            <ArrowLink href="/research" className="shrink-0">
              All research
            </ArrowLink>
          </div>
        </Container>
      </div>
    </article>
  );
}
