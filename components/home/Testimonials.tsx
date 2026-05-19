'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Reveal } from '../ui/Reveal';
import { cn } from '@/lib/utils';
import { testimonials } from '@/lib/testimonials';

const ROTATE_MS = 6500;
const EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const reduce = useReducedMotion();
  const total = testimonials.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const regionRef = useRef<HTMLDivElement | null>(null);

  const longest = useMemo(
    () =>
      testimonials.reduce(
        (acc, t) => (t.quote.length > acc.quote.length ? t : acc),
        testimonials[0],
      ),
    [],
  );

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (reduce || paused || !tabVisible || total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, tabVisible, total, index]);

  const goTo = (i: number) => setIndex(((i % total) + total) % total);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const active = testimonials[index];

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <Container size="wide">
        <Reveal>
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-h2 font-medium tracking-tight">
            What people say<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
          onKeyDown={onKeyDown}
          className="mt-12 sm:mt-16"
        >
          <div className="relative">
            {/* Invisible spacer using the longest quote — reserves height
                so cross-fade between quotes of different lengths doesn't
                jump layout. */}
            <div
              aria-hidden="true"
              className="invisible pointer-events-none"
            >
              <SlideBody quote={longest.quote} name={longest.name} role={longest.role} />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}`}
                aria-live={paused ? 'polite' : 'off'}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="absolute inset-0"
              >
                <SlideBody quote={active.quote} name={active.name} role={active.role} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center gap-1">
            {testimonials.map((_, i) => {
              const isActive = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group inline-flex items-center justify-center w-8 h-8"
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-all duration-500',
                      isActive
                        ? 'w-6 bg-accent'
                        : 'w-1.5 bg-border group-hover:bg-muted',
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function SlideBody({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <div className="max-w-3xl">
      <span
        aria-hidden="true"
        className="block font-mono text-4xl sm:text-5xl text-muted leading-none mb-4 select-none"
      >
        &ldquo;
      </span>
      <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-snug tracking-tight text-fg">
        {quote}
      </p>
      <div className="mt-8 flex items-center gap-4">
        <span className="hairline w-8 shrink-0" />
        <div className="font-mono text-xs uppercase tracking-wider">
          <span className="text-fg">{name}</span>
          <span className="text-subtle"> · {role}</span>
        </div>
      </div>
    </div>
  );
}
