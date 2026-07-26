import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, TechnologyTag } from "@/components/ui";
import { projects } from "@/data/portfolio";
import styles from "./sections.module.css";

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="FEATURED PROJECTS"
          title="What I build."
          subtitle="Migration intelligence, multi-model reasoning, applied AI and predictive analytics — data engineering that ships as product."
        />

        <div className={styles.projectGrid}>
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              className={`${styles.projectCard} ${p.featured ? styles.projectFeatured : ""}`}
              delay={i * 0.04}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
                aria-label={`${p.title} — open project`}
              >
                <div className={styles.projectHead}>
                  <span className={styles.projectCategory}>{p.category}</span>
                  <ArrowUpRight size={20} className={styles.projectArrow} aria-hidden="true" />
                </div>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <p className={styles.projectDesc}>{p.description}</p>
                {p.flow && <p className={styles.projectFlow}>{p.flow}</p>}
                <div className={styles.projectTags}>
                  {p.tags.map((t) => (
                    <TechnologyTag key={t}>{t}</TechnologyTag>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
