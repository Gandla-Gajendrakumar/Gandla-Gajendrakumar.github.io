"use client";

import { useLayoutEffect, type DependencyList } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Runs a GSAP setup inside a gsap.context and reverts it on cleanup — killing
 * every tween/ScrollTrigger the callback created. ponytail: a 12-line local
 * hook instead of the @gsap/react dependency.
 */
export function useGSAP(setup: () => void, deps: DependencyList = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(setup);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
