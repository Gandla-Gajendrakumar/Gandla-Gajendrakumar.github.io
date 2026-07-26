import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui";
import { currentFocus } from "@/data/portfolio";
import styles from "./sections.module.css";

export function CurrentFocusSection() {
  return (
    <section id="focus" className="section">
      <div className="container">
        <SectionHeading eyebrow="CURRENT FOCUS" title="Shipping with AI." />

        <div className={styles.focusGrid}>
          <Reveal className={styles.focusChips} stagger>
            {currentFocus.map((f) => (
              <span key={f} className={styles.focusChip}>
                {f}
              </span>
            ))}
          </Reveal>

          <Reveal className={styles.terminal} y={40}>
            <div className={styles.terminalBar} aria-hidden="true">
              <span />
              <span />
              <span />
              <em>now.json</em>
            </div>
            {/* Readable, real content — not fabricated CLI output. */}
            <pre className={styles.terminalBody}>
              <code>{`{
  "role": "Lead Data Engineer × GenAI Builder",
  "building": [
    "AI-native data products",
    "LLM-powered enterprise applications",
    "RAG + multi-agent systems"
  ],
  "modernising": {
    "bi": "Tableau → Power BI (automated)",
    "pipelines": "SQL → PySpark on Databricks"
  },
  "open_to": "select Data · BI · GenAI work"
}`}</code>
            </pre>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
