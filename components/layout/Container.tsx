import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'prose' | 'default' | 'wide';
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-6 sm:px-8',
        size === 'prose' && 'max-w-prose',
        size === 'default' && 'max-w-5xl',
        size === 'wide' && 'max-w-6xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
