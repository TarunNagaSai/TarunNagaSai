'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './Container';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 pt-8 pb-6">
      <Container size="wide">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm tracking-tight text-fg hover:text-accent transition-colors"
          >
            tarun nagasai
          </Link>
          <ul className="flex items-center gap-7 sm:gap-9 font-mono text-sm">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative transition-colors',
                      active ? 'text-accent' : 'text-subtle hover:text-fg',
                    )}
                  >
                    {item.label.toLowerCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
