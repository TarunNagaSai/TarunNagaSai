'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Mobile-only hero. Full-bleed portrait that dissolves as the user starts
 * scrolling while the heading rises up over it. Desktop uses the static
 * side-by-side layout in the page itself (this is `lg:hidden`).
 */
export function MobileHero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Play out over roughly the first third of a screen of scrolling.
  // The image counter-scrolls 1:1 so it appears pinned in place while it
  // zooms out and fades into the background; the content scrolls up over it.
  const imageY = useTransform(scrollY, [0, 300], [0, 300]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const imageScale = useTransform(scrollY, [0, 300], [1, 0.92]);

  return (
    <div className="lg:hidden -mx-6 sm:-mx-8 -mt-12 mb-10">
      <motion.div
        style={reduce ? undefined : { opacity: imageOpacity, scale: imageScale, y: imageY }}
        className="relative z-0 aspect-[4/5] w-full origin-center [mask-image:linear-gradient(to_bottom,black_55%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      >
        <Image
          src="/tarun.png"
          alt="Tarun NagaSai"
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
      </motion.div>
      <div className="relative z-10 -mt-32 px-6 sm:px-8">
        <p className="font-mono text-xs text-muted tracking-wider uppercase mb-3">
          About
        </p>
        <h1 className="text-display font-medium tracking-tight">
          Hi, I'm Tarun<span className="text-accent">.</span>
        </h1>
      </div>
    </div>
  );
}
