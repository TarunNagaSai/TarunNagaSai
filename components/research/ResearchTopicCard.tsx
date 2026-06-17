import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import type { ResearchTopic } from '@/lib/research';

interface ResearchTopicCardProps {
  seriesSlug: string;
  topic: ResearchTopic;
  /** 0-based position in the series — drives the NN label. */
  index: number;
  delay?: number;
  className?: string;
}

/**
 * The canonical research-topic card. Used both for the auto-generated list on
 * the series root and inline inside the root's MDX body via the <Topic /> tag,
 * so the UI stays identical in both places.
 */
export function ResearchTopicCard({
  seriesSlug,
  topic,
  index,
  delay = 0,
  className,
}: ResearchTopicCardProps) {
  return (
    <Reveal delay={delay} className={className}>
      <Link
        href={`/research/${seriesSlug}/${topic.slug}`}
        className="group block border-t border-border py-10"
      >
        <div className="grid grid-cols-12 gap-4 sm:gap-8">
          <div className="col-span-12 sm:col-span-1 font-mono text-xs text-muted pt-2">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="col-span-12 sm:col-span-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg group-hover:text-accent transition-colors">
              {topic.title}
            </h2>
            <p className="mt-4 text-subtle leading-relaxed">{topic.teaser}</p>
          </div>

          <div className="col-span-12 sm:col-span-1 flex items-start justify-end pt-2">
            <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
