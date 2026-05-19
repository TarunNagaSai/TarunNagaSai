'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container } from './Container';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="relative z-50 pt-8 pb-6">
      <Container size="wide">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm tracking-tight text-fg hover:text-accent transition-colors"
          >
            Tarun Naga sai
          </Link>

          <ul className="hidden sm:flex items-center gap-7 sm:gap-9 font-mono text-sm">
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

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="sm:hidden -mr-2 p-2 text-fg hover:text-accent transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="sm:hidden fixed inset-0 z-50 bg-bg overflow-y-auto"
          >
            <Container size="wide">
              <div className="flex items-center justify-between pt-8 pb-6">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm tracking-tight text-fg"
                >
                  Tarun Naga sai
                </Link>
                <motion.button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  initial={reduce ? false : { opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: 0.05 }}
                  className="-mr-2 p-2 text-fg hover:text-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </Container>
            <Container size="wide">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: reduce
                      ? {}
                      : { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                }}
                className="mt-12 flex flex-col gap-2 font-mono"
              >
                {NAV.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <motion.li
                      key={item.href}
                      variants={{
                        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: EASE },
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'block py-4 text-2xl tracking-tight transition-colors',
                          active ? 'text-accent' : 'text-fg hover:text-accent',
                        )}
                      >
                        {item.label.toLowerCase()}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
