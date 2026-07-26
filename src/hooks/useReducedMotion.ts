"use client";

import { useEffect, useState } from "react";

/**
 * Reduced-motion = OS setting OR a dev-only manual override. The override lets
 * us exercise every JS motion path (intro timeline, Reveal, particles) in the
 * browser without touching OS accessibility settings.
 */

const KEY = "gg-force-reduced";
const listeners = new Set<() => void>();
let forced = false;

if (typeof window !== "undefined") {
  try {
    forced = localStorage.getItem(KEY) === "1";
  } catch {
    /* private mode */
  }
  // NOTE: don't touch the DOM here — mutating <html> before hydration causes a
  // mismatch. The attribute is applied from an effect (see DevMotionToggle).
}

export function getForcedReducedMotion(): boolean {
  return forced;
}

export function setForcedReducedMotion(value: boolean): void {
  forced = value;
  try {
    localStorage.setItem(KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (typeof document !== "undefined") {
    document.documentElement.toggleAttribute("data-force-reduced", value);
  }
  listeners.forEach((l) => l());
}

/** Tracks prefers-reduced-motion (or the dev override), updating on change. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches || forced);
    update();
    mq.addEventListener("change", update);
    listeners.add(update);
    return () => {
      mq.removeEventListener("change", update);
      listeners.delete(update);
    };
  }, []);

  return reduced;
}
