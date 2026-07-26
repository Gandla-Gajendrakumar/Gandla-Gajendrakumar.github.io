"use client";

import styles from "./VideoIntro.module.css";

export function ScrollIndicator({ targetId = "about" }: { targetId?: string }) {
  const go = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button type="button" className={styles.scroll} onClick={go} aria-label="Scroll to explore">
      <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
      <span className={styles.scrollLine} aria-hidden="true" />
    </button>
  );
}
