import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, TechnologyTag } from "@/components/ui";
import { skillGroups } from "@/data/portfolio";
import styles from "./sections.module.css";

export function StackSection() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="EXPERTISE & TECHNOLOGY"
          title="Four disciplines, one stack."
          subtitle="From raw enterprise sources to reasoning agents — the capabilities that connect data engineering with generative AI."
        />

        <div className={styles.stackGrid}>
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} className={styles.stackCard} delay={i * 0.05}>
              <span className={styles.stackFlow}>{group.flow}</span>
              <h3 className={styles.stackTitle}>{group.title}</h3>
              <div className={styles.stackTags}>
                {group.skills.map((s) => (
                  <TechnologyTag key={s}>{s}</TechnologyTag>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
