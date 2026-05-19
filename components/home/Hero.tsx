'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SITE } from '@/lib/site';

export function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };
  const ease = [0.16, 1, 0.3, 1];

  return (
    <section className="pt-20 sm:pt-28 pb-24 sm:pb-32 relative">
      <Container size="wide">
        <div className="flex items-center gap-3 mb-10">
          <span className="hairline w-12" />
          <span className="font-mono text-xs text-muted tracking-wider uppercase">
            Hyderabad, India · Available for work
          </span>
        </div>

        <motion.h1
          initial={initial}
          animate={animate}
          transition={{ duration: 0.9, ease }}
          className="text-3xl sm:text-5xl md:text-display font-medium tracking-tight leading-[1.1] md:leading-[0.95] max-w-5xl"
        >
          <span className="whitespace-nowrap">
            Agentic AI <span className="text-accent">Engineer</span>
            <span className="text-muted">,</span>
          </span>
          <br />
          <span className="whitespace-nowrap">
            full-stack developer<span className="text-accent">.</span>
          </span>
        </motion.h1>

        <motion.p
          initial={initial}
          animate={animate}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="mt-10 max-w-2xl text-lg sm:text-xl text-subtle leading-relaxed"
        >
          I Help Companies to build Agentic AI, Generative AI solutions and Mobile apps to solve real-world problems and boost their productivity.
        </motion.p>

        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-3 sm:gap-y-4 sm:gap-x-10 font-mono text-xs text-muted"
        >
          <Stat label="of Engineering Software" value={SITE.stats.yearsBuilding} />
          <Stat label="apps on app stores" value={SITE.stats.appsOnAppStores} animate startDelay={700} />
          <Stat label="websites built" value={SITE.stats.websitesBuilt} animate startDelay={850} />
          <Stat label="AI project" value={SITE.stats.aiProjects} animate startDelay={1000} />
        </motion.div>
      </Container>
    </section>
  );
}

interface StatProps {
  label: string;
  value: string;
  animate?: boolean;
  startDelay?: number;
}

function Stat({ label, value, animate, startDelay = 0 }: StatProps) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="text-fg text-xl font-mono font-medium tabular-nums">
        {animate ? (
          <AnimatedNumber value={value} startDelay={startDelay} />
        ) : (
          value
        )}
      </span>
      <span className="uppercase tracking-wider">{label}</span>
    </span>
  );
}

function AnimatedNumber({
  value,
  duration = 3000,
  startDelay = 0,
}: {
  value: string;
  duration?: number;
  startDelay?: number;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }

    const match = value.match(/^(\d+)(\D*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const finalNum = match[1];
    const suffix = match[2];
    const digits = finalNum.length;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const startTimer = setTimeout(() => {
      if (cancelled) return;
      const startedAt = performance.now();

      const tick = () => {
        if (cancelled) return;
        const elapsed = performance.now() - startedAt;
        const progress = Math.min(elapsed / duration, 1);

        if (progress >= 1) {
          setDisplay(value);
          return;
        }

        const rand = Math.floor(Math.random() * Math.pow(10, digits))
          .toString()
          .padStart(digits, '0');
        setDisplay(rand + suffix);

        // Ease-out: updates start fast (~45ms) and slow toward the end (~260ms)
        const eased = 1 - Math.pow(1 - progress, 3);
        const next = 45 + eased * 215;
        timeoutId = setTimeout(tick, next);
      };

      tick();
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [value, duration, startDelay, reduce]);

  return <>{display}</>;
}
