'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { Container } from '../layout/Container';
import { Tag } from '../ui/Tag';

interface CaseStudyHeaderProps {
  project: Project;
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  const router = useRouter();

  return (
    <header className="pt-16 sm:pt-24 pb-16">
      <Container size="wide">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="font-mono text-xs text-muted mb-6 flex items-center gap-3">
          <span>{project.number}</span>
          <span className="hairline w-8" />
          <span className="uppercase tracking-wider">{project.status}</span>
          <span className="hairline w-8" />
          <span>{project.year}</span>
        </div>

        <h1 className="text-display font-medium tracking-tight max-w-5xl">
          {project.title}
          <span className="text-accent">.</span>
        </h1>

        <p className="mt-8 text-xl sm:text-2xl text-subtle leading-snug max-w-3xl">
          {project.tagline}
        </p>

        <p className="mt-8 text-base text-fg/85 leading-relaxed max-w-2xl text-justify">
          {project.blurb}
        </p>

        <div className="mt-10 flex flex-wrap gap-1.5 max-w-3xl">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {project.links && project.links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-fg hover:text-accent transition-colors border-b border-border hover:border-accent pb-0.5"
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
