import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-[10.5px] tracking-wide uppercase',
        'px-2 py-1 border border-border text-subtle rounded-sm',
        className,
      )}
    >
      {children}
    </span>
  );
}
