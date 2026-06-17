'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackLinkProps {
  fallbackHref: string;
  children: React.ReactNode;
  className?: string;
}

export function BackLink({ fallbackHref, children, className }: BackLinkProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        'group inline-flex items-center gap-1.5 text-fg hover:text-accent transition-colors',
        className,
      )}
    >
      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
      <span className="border-b border-transparent group-hover:border-accent transition-colors">
        {children}
      </span>
    </button>
  );
}
