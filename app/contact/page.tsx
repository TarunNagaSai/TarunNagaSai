import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SITE, mailto } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch — open to freelance and full-time work.',
};

const LINKS = [
  { label: 'Email', value: SITE.display.email, href: mailto, primary: true },
  { label: 'LinkedIn', value: SITE.display.linkedin, href: SITE.social.linkedin },
  { label: 'X', value: SITE.display.x, href: SITE.social.x },
  { label: 'GitHub', value: SITE.display.github, href: SITE.social.github },
  // { label: 'Substack', value: SITE.display.substack, href: SITE.social.substack },
];

export default function ContactPage() {
  return (
    <div className="pt-12 pb-16">
      <Container size="wide">
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            Hire me
          </p>
          <h1 className="text-display font-medium tracking-tight">
            Let's build something<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-subtle leading-relaxed max-w-2xl">
            Best way to reach me is email. I reply within a day, usually within
            an hour during business hours in India.
          </p>
        </div>

        <Reveal>
          <a
            href={mailto}
            className="group block border-y border-border py-12 -mx-6 sm:-mx-8 px-6 sm:px-8 hover:bg-border/30 transition-colors"
          >
            <div className="flex items-center justify-between gap-4 sm:gap-6">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
                  Email
                </p>
                <p className="text-xl sm:text-4xl font-medium tracking-tight text-fg group-hover:text-accent transition-colors break-all">
                  {SITE.display.email}
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </div>
          </a>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-12 gap-10">
          <Reveal className="sm:col-span-4 md:col-span-3">
            <p className="font-mono text-xs text-muted tracking-wider uppercase">
              Elsewhere
            </p>
          </Reveal>
          <div className="sm:col-span-8 md:col-span-9 space-y-0">
            {LINKS.filter((l) => !l.primary).map((link, i) => (
              <Reveal key={link.href} delay={i * 0.05}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 sm:gap-6 py-6 border-t border-border hover:border-accent transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 min-w-0 flex-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted sm:w-20 shrink-0">
                      {link.label}
                    </span>
                    <span className="text-base sm:text-xl text-fg group-hover:text-accent transition-colors break-all">
                      {link.value}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
