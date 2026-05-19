'use client';

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
          className="text-display font-medium tracking-tight max-w-5xl"
        >
          AI systems engineer<span className="text-muted">,</span>
          <br />
          full-stack developer<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={initial}
          animate={animate}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="mt-10 max-w-2xl text-lg sm:text-xl text-subtle leading-relaxed"
        >
          I build the AI brain — and the apps people actually use to talk to it.
          From GPU inference pipelines to Flutter apps on the App Store, I ship the
          whole thing end-to-end.
        </motion.p>

        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-xs text-muted"
        >
          <Stat label="years building" value={SITE.stats.yearsBuilding} />
          <Stat label="apps on app stores" value={SITE.stats.appsOnAppStores} />
          <Stat label="websites built" value={SITE.stats.websitesBuilt} />
          <Stat label="AI project" value={SITE.stats.aiProjects} />
        </motion.div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="text-fg text-xl font-mono font-medium">{value}</span>
      <span className="uppercase tracking-wider">{label}</span>
    </span>
  );
}
