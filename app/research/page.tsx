import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
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

        <ul className="space-y-0">
          {research.map((r, i) => (
            <Reveal key={r.slug} as="li" delay={Math.min(i * 0.04, 0.2)}>
              <div className="group block border-t border-border py-10">
                <div className="grid grid-cols-12 gap-4 sm:gap-8">
                  <div className="col-span-12 sm:col-span-1 font-mono text-xs text-muted pt-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="col-span-12 sm:col-span-9 max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg group-hover:text-accent transition-colors">
                      {r.title}
                    </h2>
                    <p className="mt-4 text-subtle leading-relaxed">{r.teaser}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {r.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-10 sm:col-span-1 font-mono text-xs text-muted pt-2">
                    {r.year}
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex items-start justify-end pt-2">
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </div>
  );
}
