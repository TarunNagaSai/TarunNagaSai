import { Container } from '../layout/Container';
import { Reveal } from '../ui/Reveal';
import { ArrowLink } from '../ui/ArrowLink';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedArticles } from '@/lib/articles';

export function FeaturedWriting() {
  const articles = getFeaturedArticles();

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <Container size="wide">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
              Writing
            </p>
            <h2 className="text-h2 font-medium tracking-tight">
              Notes & case studies<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="hidden sm:block">
            <ArrowLink href="/writing">All writing</ArrowLink>
          </div>
        </div>

        <ul className="space-y-0">
          {articles.map((a, i) => (
            <Reveal key={a.href} as="li" delay={i * 0.05}>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="group block border-t border-border py-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                  <div className="flex-1 max-w-3xl">
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-fg group-hover:text-accent transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-subtle leading-relaxed">{a.teaser}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 font-mono text-xs">
                    <span className="text-muted">{a.date}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 sm:hidden">
          <ArrowLink href="/writing">All writing</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
