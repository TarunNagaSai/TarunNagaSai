import { Container } from './Container';
import { SITE } from '@/lib/site';

const SOCIALS = [
  { label: 'github', href: SITE.social.github },
  { label: 'linkedin', href: SITE.social.linkedin },
  { label: 'medium', href: SITE.social.medium },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 pb-12 pt-12 border-t border-border">
      <Container size="wide">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted">
          <span>© {year} — tarun nagasai</span>
          <span className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </Container>
    </footer>
  );
}
