"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LOGO_HOLD_MS = 1400;

const logoContainer = {
  hidden: { opacity: 0, scale: 0.72 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.95, ease: EASE },
  },
};

const logoLine = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.2 + i * 0.14, ease: EASE },
  }),
};

const ring = (delay: number) => ({
  hidden: { scale: 0.45, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.05, delay, ease: EASE },
  },
});

/**
 * Plays on every page reload: logo zooms in (taz + investments), then
 * a slow circular opening reveals the site from the center outward.
 */
export function SiteOpening() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    setActive(true);
    document.body.style.overflow = "hidden";

    const revealTimer = window.setTimeout(() => setReveal(true), LOGO_HOLD_MS);

    return () => {
      window.clearTimeout(revealTimer);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  const finish = useCallback(() => {
    document.body.style.overflow = "";
    setActive(false);
  }, []);

  if (!active) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      initial={false}
      animate={{
        clipPath: reveal ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
      }}
      transition={{ duration: 1.65, ease: EASE }}
      onAnimationComplete={() => {
        if (reveal) finish();
      }}
      aria-hidden
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[min(52vmin,400px)] w-[min(52vmin,400px)] rounded-full bg-accent/20 blur-[90px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: reveal ? 0 : 0.9, scale: reveal ? 0.8 : 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial="hidden"
        animate={reveal ? "hidden" : "show"}
      >
        <motion.div
          className="absolute h-[min(48vmin,380px)] w-[min(48vmin,380px)] rounded-full border border-white/12"
          variants={ring(0.1)}
        />
        <motion.div
          className="absolute h-[min(40vmin,300px)] w-[min(40vmin,300px)] rounded-full border border-white/10"
          variants={ring(0.22)}
        />
        <motion.div
          className="absolute h-[min(32vmin,240px)] w-[min(32vmin,240px)] rounded-full border border-white/[0.07]"
          variants={ring(0.34)}
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center text-white"
        variants={logoContainer}
        initial="hidden"
        animate={reveal ? "hidden" : "show"}
      >
        <motion.div
          className="flex flex-col items-center"
          animate={{
            opacity: reveal ? 0 : 1,
            scale: reveal ? 0.88 : 1,
            y: reveal ? -12 : 0,
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.span
            className="font-display text-[clamp(2.75rem,13vw,5.5rem)] font-bold leading-none tracking-tight"
            variants={logoLine}
            custom={0}
          >
            taz
          </motion.span>
          <motion.span
            className="mt-3 text-[clamp(0.7rem,2.4vw,1rem)] font-semibold uppercase tracking-[0.34em] text-white/75"
            variants={logoLine}
            custom={1}
          >
            investments
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
