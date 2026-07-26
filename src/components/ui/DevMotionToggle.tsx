"use client";

import { useEffect, useState } from "react";
import {
  useReducedMotion,
  getForcedReducedMotion,
  setForcedReducedMotion,
} from "@/hooks/useReducedMotion";

/**
 * Development-only widget to force reduced-motion on/off without changing OS
 * settings. Rendered only when NODE_ENV !== "production".
 */
export function DevMotionToggle() {
  const reduced = useReducedMotion();
  const [forced, setForced] = useState(false);

  // Sync state + the <html> attribute from persisted value, post-hydration.
  useEffect(() => {
    const value = getForcedReducedMotion();
    setForced(value);
    document.documentElement.toggleAttribute("data-force-reduced", value);
  }, []);

  const toggle = () => {
    const next = !getForcedReducedMotion();
    setForcedReducedMotion(next);
    setForced(next);
  };

  const label = forced ? "ON · forced" : reduced ? "ON · OS" : "OFF";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={forced}
      title="Dev only: force prefers-reduced-motion"
      style={{
        position: "fixed",
        left: "1rem",
        bottom: "3.75rem",
        zIndex: 3000,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0.8rem",
        borderRadius: "999px",
        border: "1px solid var(--border-strong)",
        background: "var(--glass-strong)",
        backdropFilter: "blur(12px)",
        color: "var(--text)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.02em",
        cursor: "pointer",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: forced ? "var(--amber)" : "var(--text-dim)",
        }}
      />
      Reduced motion: {label}
    </button>
  );
}
