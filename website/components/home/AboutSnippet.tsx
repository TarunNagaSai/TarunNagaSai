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
              About
            </p>
          </Reveal>
          <Reveal className="md:col-span-9 max-w-2xl" delay={0.05}>
            <p className="text-2xl sm:text-3xl font-medium leading-snug tracking-tight text-fg">
              I sit at a rare crossroads. Most engineers can build the app, or the
              AI behind it — I do both, on the same project, by myself.
            </p>
            <p className="mt-8 text-base sm:text-lg text-subtle leading-relaxed">
              Four years of Flutter taught me how to ship apps that millions of
              people can rely on. A year of LLM pipeline work taught me how to make
              GPUs translate sacred text without ever distorting a single word. I
              like problems where both halves matter.
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
