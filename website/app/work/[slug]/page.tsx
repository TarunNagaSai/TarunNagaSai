import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { CaseStudyHeader } from '@/components/work/CaseStudyHeader';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { projects, getProject } from '@/lib/projects';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.blurb,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  let Content: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/projects/${params.slug}.mdx`);
    Content = mod.default;
  } catch {
    Content = null;
  }

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      <CaseStudyHeader project={project} />

      <Container size="wide">
        <div className="hairline mb-16" />
        <div className="prose-custom">
          {Content ? (
            <Content />
          ) : (
            <p className="text-subtle italic">
              Case study coming soon. Reach out if you want to hear the full story.
            </p>
          )}
        </div>
      </Container>

      <div className="mt-32 py-16 border-t border-border">
        <Container size="wide">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
                Next
              </p>
              <h3 className="text-h2 font-medium tracking-tight">
                <Link
                  href={`/work/${next.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {next.title} <span className="text-muted">→</span>
                </Link>
              </h3>
              <p className="mt-3 text-subtle">{next.tagline}</p>
            </div>
            <ArrowLink href="/work">All work</ArrowLink>
          </div>
        </Container>
      </div>
    </article>
  );
}
