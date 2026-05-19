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
  { label: 'GitHub', value: SITE.display.github, href: SITE.social.github },
  { label: 'LinkedIn', value: SITE.display.linkedin, href: SITE.social.linkedin },
  { label: 'Medium', value: SITE.display.medium, href: SITE.social.medium },
  { label: 'Substack', value: SITE.display.substack, href: SITE.social.substack },
];

export default function ContactPage() {
  return (
    <div className="pt-12 pb-16">
      <Container size="wide">
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            Contact
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
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
                  Email
                </p>
                <p className="text-2xl sm:text-4xl font-medium tracking-tight text-fg group-hover:text-accent transition-colors break-all">
                  {SITE.display.email}
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </div>
          </a>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-3">
            <p className="font-mono text-xs text-muted tracking-wider uppercase">
              Elsewhere
            </p>
          </Reveal>
          <div className="md:col-span-9 space-y-0">
            {LINKS.filter((l) => !l.primary).map((link, i) => (
              <Reveal key={link.href} delay={i * 0.05}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-6 py-6 border-t border-border hover:border-accent transition-colors"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted w-20 shrink-0">
                      {link.label}
                    </span>
                    <span className="text-lg sm:text-xl text-fg group-hover:text-accent transition-colors">
                      {link.value}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-32 border-t border-border pt-16 max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs text-muted tracking-wider uppercase mb-6">
              Available for
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-fg">
              <div>
                <p className="font-medium">AI pipeline engineering</p>
                <p className="mt-2 text-subtle text-sm">
                  vLLM, custom DAGs, GPU orchestration, RAG systems.
                </p>
              </div>
              <div>
                <p className="font-medium">Flutter mobile work</p>
                <p className="mt-2 text-subtle text-sm">
                  Production apps, native bridging, offline-first architecture.
                </p>
              </div>
              <div>
                <p className="font-medium">Full-stack product builds</p>
                <p className="mt-2 text-subtle text-sm">
                  Backend (NestJS, Laravel) + frontend + mobile, end-to-end.
                </p>
              </div>
              <div>
                <p className="font-medium">Technical consulting</p>
                <p className="mt-2 text-subtle text-sm">
                  Architecture reviews, AI feasibility, system design.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
