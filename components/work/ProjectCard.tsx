'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { Tag } from '../ui/Tag';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="border-t border-border pt-8 pb-10 grid grid-cols-12 gap-4 sm:gap-8"
      >
        <div className="col-span-12 sm:col-span-1 font-mono text-xs text-muted pt-2">
          {project.number}
        </div>

        <div className="col-span-12 sm:col-span-7">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-muted">— {project.tagline}</span>
          </div>

          <p className="mt-4 text-subtle leading-relaxed max-w-2xl">
            {project.blurb}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <div className="col-span-6 sm:col-span-2 font-mono text-xs text-muted pt-2">
          <div>{project.year}</div>
          <div className="mt-1 text-subtle">{project.status}</div>
        </div>

        <div className="col-span-6 sm:col-span-2 flex items-start justify-end pt-2">
          <span className="inline-flex items-center gap-1 font-mono text-xs text-muted group-hover:text-accent transition-colors">
            view
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="col-span-12 sm:col-start-2 sm:col-span-11">
          <motion.div
            variants={{
              rest: { scaleX: 0, opacity: 0 },
              hover: { scaleX: 1, opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="h-px bg-accent mt-2"
          />
        </div>
      </motion.div>
    </Link>
  );
}
