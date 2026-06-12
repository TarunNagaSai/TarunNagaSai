import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'What I Can Do',
  description: 'Services and capabilities offered by Tarun NagaSai.',
};

export default function ServicesPage() {
  return (
    <div className="pt-12 pb-16">
      <Container size="wide">
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            Services
          </p>
          <h1 className="text-display font-medium tracking-tight">
            What I can do<span className="text-accent">?</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-subtle leading-relaxed max-w-2xl">
            I deliver the complete lifecycle. The intelligence, the product
            around it, and the systems underneath in a secured way. So an idea becomes
            something people actually use.
          </p>
        </div>

        <div>
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <div className="border-t border-border pt-8 pb-10 grid grid-cols-12 gap-4 sm:gap-8">
                <div className="col-span-12 sm:col-span-1 font-mono text-xs text-muted pt-2">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="col-span-12 sm:col-span-7">
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg">
                    {service.title}
                  </h2>
                  <p className="mt-3 font-mono text-xs text-muted tracking-wide uppercase">
                    {service.tagline}
                  </p>
                  <p className="mt-4 text-subtle leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-4 pt-2">
                  <ul className="space-y-2">
                    {service.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="text-sm text-subtle leading-relaxed"
                      >
                        <span className="text-accent mr-2" aria-hidden="true">
                          —
                        </span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <section className="mt-32 border-t border-border pt-16">
          <Reveal>
            <p className="font-mono text-xs text-muted tracking-wider uppercase mb-6">
              Get in touch
            </p>
            <h2 className="text-h1 font-medium tracking-tight max-w-3xl">
              Have an idea worth building<span className="text-accent">?</span>{' '}
              <span className="text-subtle">Let&apos;s talk.</span>
            </h2>
            <p className="mt-8 text-lg text-subtle max-w-2xl leading-relaxed">
              Tell me what you&apos;re trying to build and where it stands — I
              reply within 24 hours.
            </p>
            <div className="mt-12">
              <ArrowLink href="/contact">Contact me</ArrowLink>
            </div>
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
