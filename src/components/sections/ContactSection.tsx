import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { contactLinks, profile } from "@/data/portfolio";
import styles from "./sections.module.css";

const icons = { mail: Mail, linkedin: Linkedin, github: Github } as const;

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className={styles.contactInner}>
          <span className="eyebrow">
            <span className={styles.slash}>//</span> CONTACT
          </span>
          <h2 className={styles.contactTitle}>Let&apos;s build something that ships.</h2>
          <p className={styles.contactCopy}>
            I&apos;m open to selected opportunities involving Generative AI products, enterprise
            data platforms, BI modernisation, intelligent automation, technical leadership,
            consulting, teaching and collaborative product development.
          </p>

          <div className={styles.contactLinks}>
            {contactLinks.map((c) => {
              const Icon = icons[c.icon];
              const external = c.icon !== "mail";
              return (
                <a
                  key={c.label}
                  href={c.href}
                  className={styles.contactLink}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className={styles.contactIcon}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className={styles.contactMeta}>
                    <span className={styles.contactLabel}>{c.label}</span>
                    <span className={styles.contactValue}>{c.value}</span>
                  </span>
                  <ArrowUpRight size={18} className={styles.contactArrow} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className={styles.footerTag}>{profile.role}</span>
        </div>
      </footer>
    </section>
  );
}
