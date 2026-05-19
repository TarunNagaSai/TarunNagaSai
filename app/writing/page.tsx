import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { articles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Long-form engineering writing — AI pipelines, mobile architecture, and reflections on how to think.',
};

export default function WritingPage() {
  return (
    <div className="pt-12 pb-16">
      <Container size="wide">
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            Writing
          </p>
          <h1 className="text-display font-medium tracking-tight">
            Notes from the work<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-subtle leading-relaxed max-w-2xl">
            Long-form pieces on what I've learned shipping production systems —
            AI pipelines, Flutter architecture, and the harder-to-name things
            about working with AI day-to-day.
          </p>
        </div>

        <ul className="space-y-0">
          {articles.map((a, i) => (
            <Reveal key={a.href} as="li" delay={Math.min(i * 0.04, 0.2)}>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="group block border-t border-border py-10"
              >
                <div className="grid grid-cols-12 gap-4 sm:gap-8">
                  <div className="col-span-12 sm:col-span-1 font-mono text-xs text-muted pt-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="col-span-12 sm:col-span-9 max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg group-hover:text-accent transition-colors">
                      {a.title}
                    </h2>
                    <p className="mt-4 text-subtle leading-relaxed">{a.teaser}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {a.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-10 sm:col-span-1 font-mono text-xs text-muted pt-2">
                    {a.date}
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex items-start justify-end pt-2">
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16 max-w-prose font-mono text-xs text-muted">
          More writing on{' '}
          <a
            href="https://medium.com/@tarunnagasai007"
            target="_blank"
            rel="noreferrer"
            className="text-fg hover:text-accent transition-colors border-b border-border hover:border-accent pb-0.5"
          >
            Medium →
          </a>
        </div>
      </Container>
    </div>
  );
}
