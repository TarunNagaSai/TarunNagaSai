import { Container } from '../layout/Container';
import { Reveal } from '../ui/Reveal';
import { ArrowUpRight } from 'lucide-react';
import { SITE, mailto } from '@/lib/site';

export function ContactStrip() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <Container size="wide">
        <Reveal>
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-6">
            Get in touch
          </p>
          <h2 className="text-h1 font-medium tracking-tight max-w-3xl">
            Have an idea worth building<span className="text-accent">?</span>{' '}
            <span className="text-subtle">Let's talk.</span>
          </h2>
          <p className="mt-8 text-lg text-subtle max-w-2xl leading-relaxed">
            Open to freelance projects in AI pipeline engineering, Flutter, and
            full-stack product work. Reply time: under 24 hours.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <a
              href={mailto}
              className="group inline-flex items-center gap-2 text-xl sm:text-2xl font-medium text-fg hover:text-accent transition-colors"
            >
              <span className="border-b border-border group-hover:border-accent transition-colors pb-0.5">
                {SITE.display.email}
              </span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 font-mono text-xs text-muted">
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors uppercase tracking-wider"
            >
              github
            </a>
            <span className="hairline w-6" />
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors uppercase tracking-wider"
            >
              linkedin
            </a>
            <span className="hairline w-6" />
            <a
              href={SITE.social.medium}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors uppercase tracking-wider"
            >
              medium
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
