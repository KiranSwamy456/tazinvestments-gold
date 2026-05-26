"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollLayerReveal } from "@/components/ScrollLayerReveal";
import { cn } from "@/lib/utils";

const SLIDE_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const SLIDE_DURATION = 0.82;

type ImageHoverBlockProps = {
  children: React.ReactNode;
  aspectClassName: string;
  revealDelay?: number;
  caption?: React.ReactNode;
  overlay?: React.ReactNode;
  overlayPosition?: "top" | "bottom";
  className?: string;
  imageHoverClassName?: string;
};

/**
 * Hover: copy slides up and tucks under the image edge (clipped), then fades — not an instant hide.
 */
export function ImageHoverBlock({
  children,
  aspectClassName,
  revealDelay = 0,
  caption,
  overlay,
  overlayPosition = "bottom",
  className,
  imageHoverClassName,
}: ImageHoverBlockProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("flex flex-col", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative z-20">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-2xl bg-muted shadow-[0_1px_0_0_hsl(var(--background))]",
            aspectClassName
          )}
        >
          <ScrollLayerReveal delay={revealDelay}>
            <motion.div
              className={cn("relative h-full w-full", imageHoverClassName)}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.85, ease: SLIDE_EASE }}
            >
              {children}
            </motion.div>
          </ScrollLayerReveal>

          {/* Bottom edge line — reads as text sliding “into” the image */}
          {caption ? (
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px origin-center bg-white/25"
              animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.45, ease: SLIDE_EASE }}
              aria-hidden
            />
          ) : null}

          {overlay ? (
            <motion.div
              className={cn(
                "absolute left-4 z-30",
                overlayPosition === "top" ? "top-4" : "bottom-4"
              )}
              animate={{
                y: hovered ? (overlayPosition === "top" ? "-120%" : "120%") : "0%",
                opacity: hovered ? 0 : 1,
              }}
              transition={{
                y: { duration: SLIDE_DURATION, ease: SLIDE_EASE },
                opacity: { duration: 0.5, delay: hovered ? 0.28 : 0, ease: SLIDE_EASE },
              }}
            >
              {overlay}
            </motion.div>
          ) : null}
        </div>
      </div>

      {caption ? (
        <div className="relative z-10 -mt-10 overflow-hidden pt-10">
          {/* Fade under the image lip */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-background via-background/80 to-transparent"
            aria-hidden
          />
          <motion.div
            className="relative will-change-transform"
            animate={{ y: hovered ? "-100%" : "0%" }}
            transition={{ duration: SLIDE_DURATION, ease: SLIDE_EASE }}
          >
            <motion.div
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{
                duration: 0.55,
                delay: hovered ? 0.32 : 0,
                ease: SLIDE_EASE,
              }}
            >
              {caption}
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
