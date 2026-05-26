"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { X } from "lucide-react";

const rings = [
  { scale: 1, inner: 0.72, href: "#works", label: "portfolio", dark: true },
  { scale: 0.72, inner: 0.48, href: "#about", label: "team", dark: false },
  { scale: 0.48, inner: 0.28, href: "#contact", label: "contact", dark: true },
  { scale: 0.28, inner: 0.15, href: "/" as const, label: "home", dark: false },
] as const;

const centerScale = 0.15;

const OPEN_DURATION = 1.15;
const STAGGER = 0.13;
const EASE_IN: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

const HOVER_SPRING = { type: "spring" as const, stiffness: 90, damping: 22, mass: 1.1 };
const WAVE_SPRING = { type: "spring" as const, stiffness: 70, damping: 20, mass: 1.2 };

function labelTopPercent(outerScale: number, innerScale: number): string {
  const pct = ((outerScale - innerScale) / (4 * outerScale)) * 100;
  const clamped = Math.min(42, Math.max(5, pct));
  return `${clamped}%`;
}

const ringVariants: Variants = {
  hidden: (i: number) => ({
    scale: 0,
    opacity: 0,
    transition: { duration: OPEN_DURATION * 0.78, delay: i * STAGGER, ease: EASE_OUT },
  }),
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: OPEN_DURATION, delay: (rings.length - 1 - i) * STAGGER, ease: EASE_IN },
  }),
};

const centerVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
    transition: { duration: OPEN_DURATION * 0.78, delay: rings.length * STAGGER, ease: EASE_OUT },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: OPEN_DURATION * 0.95, delay: 0, ease: EASE_IN },
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.4 } },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const SHELL_EXIT_DELAY = OPEN_DURATION * 0.78 + rings.length * STAGGER + 0.1;

const labelClass = (dark: boolean) =>
  `pointer-events-none absolute left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-semibold lowercase tracking-wide leading-none ${
    dark ? "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]" : "text-black [text-shadow:0_1px_0_rgba(255,255,255,0.95)]"
  }`;

/** Subtle wave: hovered ring lifts most; neighbors ease in with delay. */
function waveScale(ringIndex: number, hovered: number | null): number {
  if (hovered === null) return 1;
  const dist = Math.abs(ringIndex - hovered);
  if (dist === 0) return 1.045;
  if (dist === 1) return 1.018;
  if (dist === 2) return 1.008;
  return 1;
}

export function BottomNav() {
  const [open, setOpen] = useState(false);
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);
  const panelId = useId();

  const close = useCallback(() => {
    setOpen(false);
    setHoveredRing(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const navOuterStyle = {
    ["--nav-outer" as string]: "clamp(268px, 62vw, 460px)",
  } as CSSProperties;

  return (
    <>
      {/* Anchor: menu + trigger share one center (icon spot), not viewport bottom edge */}
      <div
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center md:bottom-10"
        style={navOuterStyle}
      >
        <div
          className="relative overflow-visible"
          style={{
            width: "var(--nav-outer)",
            height: "calc(var(--nav-outer) * 0.5 + 1.75rem)",
          }}
        >
          <AnimatePresence>
            {open ? (
              <motion.div
                key="bottom-nav-layer"
                className="pointer-events-none absolute inset-0 overflow-visible"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: SHELL_EXIT_DELAY, duration: 0.3 } }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                onMouseLeave={() => setHoveredRing(null)}
              >
                {rings.map(({ scale, inner, href, label: labelText, dark }, idx) => {
                  const size = `calc(var(--nav-outer) * ${scale})`;
                  const top = labelTopPercent(scale, inner);
                  const fontSize = "clamp(0.72rem, calc(var(--nav-outer) * 0.052), 0.98rem)";
                  const ringBody = `relative flex h-full w-full items-center justify-center rounded-full overflow-visible ${
                    dark ? "bg-background ring-2 ring-white/20" : "bg-white shadow-md ring-2 ring-black/25"
                  }`;
                  const labelNode = (
                    <motion.span
                      className={labelClass(dark)}
                      style={{ top, fontSize }}
                      animate={{
                        y: hoveredRing === idx ? -2 : 0,
                        scale: hoveredRing === idx ? 1.06 : 1,
                      }}
                      transition={WAVE_SPRING}
                    >
                      {labelText}
                    </motion.span>
                  );
                  const targetScale = waveScale(idx, hoveredRing);

                  const ringLink =
                    href === "/" ? (
                      <Link href="/" onClick={close} className={`pointer-events-auto ${ringBody}`}>
                        {labelNode}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        onClick={close}
                        className={`pointer-events-auto ${ringBody}`}
                        aria-label={labelText}
                      >
                        {labelNode}
                      </a>
                    );

                  return (
                    <div
                      key={href + labelText}
                      className="pointer-events-none absolute left-1/2 bottom-0 z-0 -translate-x-1/2 translate-y-1/2"
                      style={{ width: size, height: size }}
                    >
                      <motion.div
                        className="h-full w-full will-change-transform"
                        style={{ transformOrigin: "50% 50%" }}
                        custom={idx}
                        variants={ringVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onHoverStart={() => setHoveredRing(idx)}
                        onHoverEnd={() => setHoveredRing((h) => (h === idx ? null : h))}
                      >
                        <motion.div
                          className="h-full w-full"
                          style={{ transformOrigin: "50% 50%" }}
                          animate={{ scale: targetScale }}
                          transition={{
                            ...WAVE_SPRING,
                            delay: hoveredRing === null ? 0 : Math.abs(idx - hoveredRing) * 0.07,
                          }}
                        >
                          {ringLink}
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}

                <div
                  className="pointer-events-none absolute left-1/2 bottom-0 z-[80] -translate-x-1/2 translate-y-1/2"
                  style={{
                    width: `calc(var(--nav-outer) * ${centerScale})`,
                    height: `calc(var(--nav-outer) * ${centerScale})`,
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={close}
                    aria-label="Close menu"
                    variants={centerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{ transformOrigin: "50% 50%" }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={HOVER_SPRING}
                      className="pointer-events-auto flex h-full w-full items-center justify-center rounded-full bg-background text-white shadow-md ring-2 ring-white/20"
                  >
                    <X className="h-[38%] w-[38%]" strokeWidth={2.5} />
                  </motion.button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label="Open navigation menu"
            aria-hidden={open}
            onClick={() => setOpen(true)}
            tabIndex={open ? -1 : 0}
            className={`absolute left-1/2 bottom-0 z-[70] flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg ring-1 ring-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:h-16 md:w-16 ${
              open ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{ transformOrigin: "50% 50%" }}
          >
            <span className="relative flex h-9 w-9 items-center justify-center md:h-10 md:w-10" aria-hidden>
              <span className="absolute inset-0 rounded-full border-2 border-black/80" />
              <span className="absolute inset-[5px] rounded-full border border-black/50 md:inset-[6px]" />
              <span className="absolute inset-[10px] rounded-full border border-black/35 md:inset-[11px]" />
              <span className="absolute inset-[14px] rounded-full bg-background md:inset-[15px]" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.button
            key="nav-backdrop"
            type="button"
            aria-label="Dismiss menu"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[40] cursor-default bg-black/[0.06]"
            onClick={close}
          />
        ) : null}
      </AnimatePresence>

      <div
        id={panelId}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="Site navigation"
        className="sr-only"
      />
    </>
  );
}
