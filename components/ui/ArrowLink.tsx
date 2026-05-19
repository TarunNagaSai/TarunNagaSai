import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function ArrowLink({ href, children, external, className }: ArrowLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const Component = external ? 'a' : Link;
  const props = external
    ? { href, target: '_blank', rel: 'noreferrer' }
    : { href };

  return (
    <Component
      {...(props as any)}
      className={cn(
        'group inline-flex items-center gap-1.5 text-fg hover:text-accent transition-colors',
        className,
      )}
    >
      <span className="border-b border-transparent group-hover:border-accent transition-colors">
        {children}
      </span>
      <Icon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Component>
  );
}
