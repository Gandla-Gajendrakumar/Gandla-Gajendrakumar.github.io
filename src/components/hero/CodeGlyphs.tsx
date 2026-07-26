import styles from "./VideoIntro.module.css";

// Decorative code-motif glyphs scattered over the right side of the hero,
// echoing the source portfolio. Purely atmospheric — hidden from a11y tree.
const GLYPHS: { text: string; top?: string; right?: string; bottom?: string; size?: string; delay: number }[] = [
  { text: "{ data }", top: "16%", right: "6%", delay: 0 },
  { text: "</>", top: "30%", right: "24%", size: "1.1rem", delay: 1.2 },
  { text: "<LLM/>", top: "50%", right: "9%", delay: 2.1 },
  { text: "//agent", top: "66%", right: "26%", delay: 0.6 },
  { text: "#API →", top: "42%", right: "40%", delay: 1.6 },
  { text: "vector", bottom: "16%", right: "10%", delay: 2.6 },
  { text: "{ ... }", top: "24%", right: "44%", size: "0.72rem", delay: 3.1 },
  { text: "RAG()", bottom: "28%", right: "38%", delay: 1 },
];

export function CodeGlyphs() {
  return (
    <div className={styles.glyphs} aria-hidden="true">
      {GLYPHS.map((g, i) => (
        <span
          key={i}
          className={styles.glyph}
          style={{
            top: g.top,
            right: g.right,
            bottom: g.bottom,
            fontSize: g.size,
            animationDelay: `${g.delay}s`,
          }}
        >
          {g.text}
        </span>
      ))}
    </div>
  );
}
