import type { ReactNode } from "react";
import styles from "./ui.module.css";

/* Small presentational atoms grouped in one file — ponytail: no one-component-per-file sprawl. */

export function Button({
  children,
  href,
  variant = "primary",
  onClick,
  ...rest
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${styles.button} ${variant === "primary" ? styles.primary : styles.secondary}`;
  if (href) {
    return (
      <a className={cls} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export function TechnologyTag({ children }: { children: ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}

export function StatusBadge({ label }: { label: string }) {
  return (
    <span className={styles.status}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div className={styles.heading}>
      {eyebrow && (
        <span className={`eyebrow ${styles.headingEyebrow}`}>
          <span className={styles.slash}>//</span> {eyebrow}
        </span>
      )}
      <h2 className={styles.headingTitle} id={id}>
        {title}
      </h2>
      {subtitle && <p className={styles.headingSub}>{subtitle}</p>}
    </div>
  );
}
