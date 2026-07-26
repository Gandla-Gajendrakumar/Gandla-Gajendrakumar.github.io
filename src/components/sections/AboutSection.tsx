import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui";
import { profile, education } from "@/data/portfolio";
import styles from "./sections.module.css";

const infoCards = [
  { label: "Based in", value: profile.location },
  { label: "Education", value: education[0].degree },
  { label: "Education", value: education[1].degree },
  { label: "Languages", value: profile.languages },
  { label: "Availability", value: "Open to selected opportunities" },
  { label: "Currently", value: "Building AI-native data products" },
];

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="ABOUT"
          title="From pipelines to prompts."
          subtitle="More than a decade turning complex enterprise data into platforms, analytics and — increasingly — intelligent, AI-native systems."
        />

        <div className={styles.aboutGrid}>
          <Reveal className={styles.aboutCopy}>
            <p>
              I lead Data Engineering, BI and Analytics work across enterprise environments —
              architecting cloud data platforms, modernising Tableau estates into Power BI, and
              rebuilding SQL-heavy pipelines on Databricks, Spark and PySpark.
            </p>
            <p>
              My focus now is where that foundation meets Generative AI: LLM-powered applications,
              retrieval-augmented generation, multi-agent systems and intelligent automation —
              building AI-native, data-centric products that move trusted intelligence to where
              decisions are made.
            </p>
            <p className={styles.aboutSpan}>CPG · Retail · Healthcare · Pharmaceutical · Enterprise Data</p>
          </Reveal>

          <Reveal className={styles.portrait} y={40}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.portraitImg}
              src="/images/portrait.png"
              alt="Gandla Gajendra Kumar at his desk"
              loading="lazy"
            />
            <span className={styles.portraitTag}>Lead Data Engineer × GenAI Builder</span>
          </Reveal>
        </div>

        <Reveal className={styles.infoGrid} stagger>
          {infoCards.map((c, i) => (
            <div key={i} className={styles.infoCard}>
              <span className={styles.infoLabel}>{c.label}</span>
              <span className={styles.infoValue}>{c.value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
