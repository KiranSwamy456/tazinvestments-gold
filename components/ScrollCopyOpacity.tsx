"use client";

import { useEffect } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * 0 = muted, 1 = full white. Based on how far the element’s top has moved up the viewport.
 */
function fillForRect(rect: DOMRect, vh: number): number {
  if (rect.bottom < 0) return 1;
  if (rect.top > vh) return 0;

  const start = vh * 1.02;
  const end = vh * 0.1;

  if (rect.top <= end) return 1;
  if (rect.top >= start) return 0;

  const linear = clamp((start - rect.top) / (start - end), 0, 1);
  return Math.pow(linear, 1.85);
}

const BLOCK_ROOT_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,blockquote,figcaption,label,th,td,dt,dd,address,summary,caption,time,kbd,samp,var,pre,code,li,[data-scroll-text-block],[data-scroll-link-text]";

function collectFillRoots(container: ParentNode): HTMLElement[] {
  const blocks = Array.from(container.querySelectorAll<HTMLElement>(BLOCK_ROOT_SELECTOR));
  const roots = blocks.filter((el) => {
    if (el.matches("li") && el.querySelector(":scope > a")) return false;
    const ancestor = el.parentElement?.closest(BLOCK_ROOT_SELECTOR);
    return !(ancestor && ancestor !== el && blocks.includes(ancestor as HTMLElement));
  });

  container.querySelectorAll<HTMLElement>("span").forEach((span) => {
    if (span.closest("h1,h2,h3,h4,h5,h6,[data-scroll-text],a,button")) return;
    if (span.querySelector("span")) return;
    if (roots.includes(span)) return;
    roots.push(span);
  });

  container.querySelectorAll<HTMLElement>("li > a").forEach((a) => roots.push(a));

  container.querySelectorAll<HTMLElement>("a:not([data-solid-control])").forEach((a) => {
    if (a.parentElement?.matches("li")) return;
    if (!roots.includes(a)) roots.push(a);
  });

  container.querySelectorAll<HTMLElement>("[data-scroll-text]").forEach((el) => {
    if (!roots.includes(el)) roots.push(el);
  });

  container.querySelectorAll<HTMLElement>("blockquote footer, blockquote cite").forEach((el) => {
    if (!roots.includes(el)) roots.push(el);
  });

  return roots;
}

function applyFill(el: HTMLElement, vh: number) {
  const fill = fillForRect(el.getBoundingClientRect(), vh);
  el.style.setProperty("--text-fill", String(fill));
}

function updateTextFills() {
  const vh = window.innerHeight;

  document.querySelectorAll<HTMLElement>("main > section[data-scroll-tone]").forEach((section) => {
    collectFillRoots(section).forEach((el) => applyFill(el, vh));
  });

  const footer = document.querySelector<HTMLElement>(".min-h-screen > footer");
  if (footer) {
    collectFillRoots(footer).forEach((el) => applyFill(el, vh));
  }
}

export function ScrollCopyOpacity() {
  useEffect(() => {
    let raf = 0;

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateTextFills();
      });
    };

    updateTextFills();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
