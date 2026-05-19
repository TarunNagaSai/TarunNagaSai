import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/work/ProjectCard';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects — AI pipelines, mobile apps, and systems work.',
};

export default function WorkPage() {
  return (
    <div className="pt-12 pb-16">
      <Container size="wide">
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            Work
          </p>
          <h1 className="text-display font-medium tracking-tight">
            Everything I've built<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-subtle leading-relaxed max-w-2xl">
            From production AI pipelines to apps on the App Store — and the
            experimental work in between. Click any project to read the full story.
          </p>
        </div>

        <div>
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.04, 0.2)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
