import { Container } from '../layout/Container';
import { Reveal } from '../ui/Reveal';
import { ArrowLink } from '../ui/ArrowLink';

export function AboutSnippet() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-3">
            <p className="font-mono text-xs text-muted tracking-wider uppercase">
              Who am I ?
            </p>
          </Reveal>
          <Reveal className="md:col-span-9 max-w-2xl" delay={0.05}>
            <p className="text-2xl sm:text-3xl font-medium leading-snug tracking-tight text-fg">
              I believe software can reach into almost any domain, and I want to use it to build things that matter.
            </p>
            <p className="mt-8 text-base sm:text-lg text-subtle leading-relaxed text-justify">
              What started with gadgets and Flutter in 2021 grew into backend
              systems, and more recently into AI. Along the way I learned that a
              perfect product isn't one that's free of errors. It's one that handles
              them without falling apart. I'm here to keep exploring and building.
            </p>
            <div className="mt-10">
              <ArrowLink href="/about">More about me</ArrowLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
