"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DURATION = 1.15;

const viewport = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -6% 0px",
} as const;

type ScrollLayerRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger when several images enter the viewport together */
  delay?: number;
};

/**
 * Scroll-only reveal: two color layers wipe right → left to uncover the image.
 * Does not run on first paint unless the block scrolls into view.
 */
export function ScrollLayerReveal({ children, className, delay = 0 }: ScrollLayerRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn("absolute inset-0", className)}>{children}</div>;
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ scale: 1.07, x: "4%" }}
        whileInView={{ scale: 1, x: "0%" }}
        viewport={viewport}
        transition={{ duration: DURATION, delay: delay + 0.22, ease: EASE }}
      >
        {children}
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 bg-background will-change-transform"
        initial={{ x: "0%" }}
        whileInView={{ x: "-101%" }}
        viewport={viewport}
        transition={{ duration: DURATION * 0.95, delay: delay + 0.1, ease: EASE }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-card will-change-transform"
        initial={{ x: "0%" }}
        whileInView={{ x: "-101%" }}
        viewport={viewport}
        transition={{ duration: DURATION * 0.95, delay, ease: EASE }}
        aria-hidden
      />
    </div>
  );
}
