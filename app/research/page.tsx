import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ResearchCard } from '@/components/research/ResearchCard';
import { research } from '@/lib/research';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Experimental work — agentic systems, language runtimes, and the questions I am exploring next.',
};

export default function ResearchPage() {
  return (
    <div className="pt-12 pb-16">
      <Container size="wide">
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            Research
          </p>
          <h1 className="text-display font-medium tracking-tight">
            What I'm exploring next<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-subtle leading-relaxed max-w-2xl">
            Side investigations into the systems behind the systems — agent loops
            built from scratch, garbage collectors, and language runtimes. Less
            polished than the production work, but where the next chapter starts.
          </p>
        </div>

        <div>
          {research.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.04, 0.2)}>
              <ResearchCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
