"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  /** Stagger children (direct element children) instead of the wrapper itself. */
  stagger?: boolean;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "ul" | "li";
}

/**
 * Fade + rise on scroll into view. Reduced-motion users get instant visibility.
 * All tweens are scoped to a gsap.context and reverted on unmount.
 */
export function Reveal({
  children,
  stagger = false,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? el.children : el;
    gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  }, [reduced, stagger, delay, y]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className} style={{ opacity: reduced ? 1 : undefined }}>
      {children}
    </Tag>
  );
}

// Refresh triggers after fonts/layout settle — cheap safety against mispositioned starts.
if (typeof window !== "undefined") {
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
