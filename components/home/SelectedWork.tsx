import { Container } from '../layout/Container';
import { Reveal } from '../ui/Reveal';
import { ArrowLink } from '../ui/ArrowLink';
import { ProjectCard } from '../work/ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';

export function SelectedWork() {
  const featured = getFeaturedProjects();

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <Container size="wide">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
              Client Work
            </p>
            <h2 className="text-h2 font-medium tracking-tight">
              Projects I've shipped<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="hidden sm:block">
            <ArrowLink href="/work">All work</ArrowLink>
          </div>
        </div>

        <div>
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <ArrowLink href="/work">All work</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
