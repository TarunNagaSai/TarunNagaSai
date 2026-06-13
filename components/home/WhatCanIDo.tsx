import { Container } from '../layout/Container';
import { Reveal } from '../ui/Reveal';
import { ArrowLink } from '../ui/ArrowLink';

export function MyServicesSnippet() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-3">
            <p className="font-mono text-xs text-muted tracking-wider uppercase">
              What I can do for you?
            </p>
          </Reveal>
          <Reveal className="md:col-span-9 max-w-2xl" delay={0.05}>
            <p className="text-2xl sm:text-3xl font-medium leading-snug tracking-tight text-fg">
              I bridge the gap between AI and User by architecting complete software lifecycle.
            </p>
            <p className="mt-8 text-base sm:text-lg text-subtle leading-relaxed text-justify">
              Building an AI is just one side of the story. For it to reach
              users, it needs a product around it. The app, the backend, the
              interface, the database, the security, the production monitoring and the continues deployments. I build that whole journey.
            </p>
            <div className="mt-10">
              <ArrowLink href="/services">All Services</ArrowLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
