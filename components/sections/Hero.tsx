"use client";

import { useCallback, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { investmentImages } from "@/lib/investmentMedia";

const SPRING = { stiffness: 120, damping: 22, mass: 0.8 };
const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const REVEAL_DURATION = 1.5;

const line = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.35 + i * 0.12, ease: REVEAL_EASE },
  }),
};

function HeroVisual({ className, sizes }: { className?: string; sizes: string }) {
  return (
    <div className={className}>
      <div className="relative aspect-square w-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Rings expand inside → out */}
        <motion.div
          className="absolute inset-[-6%] rounded-full border border-white/[0.12] shadow-[inset_0_0_60px_rgba(255,255,255,0.06)]"
          style={{ transform: "translateZ(40px)" }}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: REVEAL_DURATION, delay: 0.28, ease: REVEAL_EASE }}
        />
        <motion.div
          className="absolute inset-[-2%] rounded-full border-2 border-white/10 bg-gradient-to-br from-white/[0.08] via-transparent to-black/50"
          style={{ transform: "translateZ(24px)" }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: REVEAL_DURATION, delay: 0.14, ease: REVEAL_EASE }}
        />

        {/* Circular mask opens from center; image zooms in */}
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-full shadow-2xl ring-1 ring-white/10"
          style={{ transform: "translateZ(0px)" }}
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(71% at 50% 50%)" }}
          transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 0.68 }}
            animate={{ scale: 1 }}
            transition={{ duration: REVEAL_DURATION * 1.08, ease: REVEAL_EASE }}
          >
            <Image
              src={investmentImages.hero}
              alt="Markets and portfolio context"
              fill
              priority
              className="object-cover"
              sizes={sizes}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), SPRING);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), SPRING);
  const moveX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-36, 36]), SPRING);
  const moveY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-28, 28]), SPRING);
  const glowX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-50, 50]), { ...SPRING, stiffness: 80 });
  const glowY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-40, 40]), { ...SPRING, stiffness: 80 });

  const innerRotate = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), SPRING);
  const transform = useMotionTemplate`translateX(${moveX}px) translateY(${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY]
  );

  const onLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section
      ref={sectionRef}
      data-hero
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden px-6 pb-28 pt-20 md:px-12 md:pb-32 [perspective:1400px]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[5%] top-[38%] z-0 h-[min(55vw,520px)] w-[min(55vw,520px)] rounded-full bg-accent/25 blur-[100px]"
        style={{ x: glowX, y: glowY }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: REVEAL_EASE }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[18%] top-[42%] z-0 h-[min(40vw,380px)] w-[min(40vw,380px)] rounded-full bg-white/[0.04] blur-[80px]"
        style={{ x: glowY, y: glowX }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: REVEAL_EASE }}
      />

      {/* Desktop — load reveal + cursor parallax */}
      <motion.div
        className="pointer-events-none absolute right-[4%] top-1/2 z-[1] hidden w-[min(44vw,540px)] -translate-y-1/2 md:block"
        style={{ transform, rotate: innerRotate, transformStyle: "preserve-3d" }}
      >
        <HeroVisual sizes="(max-width: 768px) 80vw, 540px" />
      </motion.div>

      {/* Mobile — same inside-out zoom, no tilt */}
      <div className="pointer-events-none relative z-[1] mx-auto mb-10 w-[min(72vw,320px)] md:hidden">
        <HeroVisual sizes="80vw" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end">
        <motion.h1
          className="mb-10 font-display text-[clamp(3rem,11vw,9.5rem)] font-medium leading-[0.88] tracking-tight text-white md:mb-14"
          initial="hidden"
          animate="visible"
        >
          <motion.span className="block" variants={line} custom={0}>
            Investment
          </motion.span>
          <motion.span className="block" variants={line} custom={1}>
            office
          </motion.span>
          <motion.span className="mt-2 flex items-center gap-4 md:mt-4 md:gap-8" variants={line} custom={2}>
            <motion.span
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/[0.04] md:h-20 md:w-20"
              whileHover={{ scale: 1.06, borderColor: "rgba(255,255,255,0.45)" }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Play className="h-5 w-5 translate-x-[2px] fill-current md:h-8 md:w-8" />
            </motion.span>
            for founders
          </motion.span>
        </motion.h1>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease: REVEAL_EASE }}
              className="max-w-xs text-xs font-semibold uppercase tracking-widest text-white md:text-sm"
            >
              Seed & Series A capital for operators building real revenue
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7, ease: REVEAL_EASE }}
              className="max-w-[220px] text-left text-xs font-semibold uppercase tracking-widest text-white md:text-right md:text-sm"
            >
              Trusted by 150+ founders, family offices & institutional LPs
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
