import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui";
import { experience } from "@/data/portfolio";
import styles from "./sections.module.css";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="PROFESSIONAL EXPERIENCE"
          title="From DBA to Data Leader."
          subtitle="A decade-plus progression across database administration, BI, analytics and data-engineering leadership."
        />

        <div className={styles.timeline}>
          <span className={styles.timelineLine} aria-hidden="true" />
          {experience.map((role, i) => (
            <Reveal key={i} className={styles.timelineItem} as="div" y={30}>
              <span className={styles.timelineDot} aria-hidden="true" />
              <div className={styles.timelineContent}>
                <span className={styles.timelinePeriod}>{role.period}</span>
                <h3 className={styles.timelineRole}>{role.role}</h3>
                <p className={styles.timelineCompany}>{role.company}</p>
                <ul className={styles.timelineFocus}>
                  {role.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
