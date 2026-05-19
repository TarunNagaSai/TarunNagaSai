import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <div className="pt-24 pb-32">
      <Container size="wide">
        <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
          404
        </p>
        <h1 className="text-display font-medium tracking-tight">
          Not here<span className="text-accent">.</span>
        </h1>
        <p className="mt-8 text-lg text-subtle max-w-prose">
          The page you were looking for doesn't exist, or it moved. Head back
          home and start over.
        </p>
        <Link
          href="/"
          className="mt-12 inline-block font-mono text-sm text-fg hover:text-accent transition-colors border-b border-border hover:border-accent pb-0.5"
        >
          ← back home
        </Link>
      </Container>
    </div>
  );
}
