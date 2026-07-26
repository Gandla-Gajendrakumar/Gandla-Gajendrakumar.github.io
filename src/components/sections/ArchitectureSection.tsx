"use client";

import { SectionHeading } from "@/components/ui";
import { useInView } from "@/hooks/useIntersectionObserver";
import { architectureFlow } from "@/data/portfolio";
import styles from "./sections.module.css";

export function ArchitectureSection() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section id="architecture" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="DATA ENGINEERING × GENAI"
          title="How the data becomes intelligence."
          subtitle="Enterprise sources flow through trusted engineering into a semantic and retrieval layer that powers LLMs, agents and automation — all the way to a decision."
        />

        <div ref={ref} className={`${styles.archFlow} ${inView ? styles.archIn : ""}`}>
          {architectureFlow.map((node, i) => (
            <div
              key={node}
              className={styles.archNode}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <span className={styles.archIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.archLabel}>{node}</span>
              {i < architectureFlow.length - 1 && (
                <span className={styles.archConnector} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
