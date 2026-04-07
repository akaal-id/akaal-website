import styles from "./marquee.module.css";

const CHUNK =
  "TECHNICAL. CREATIVE. IMMERSIVE. ENGINEERED. STRATEGIC. DIGITAL. AVANT-GARDE. ";

/** Enough repeats per half-track to comfortably exceed viewport width. */
const SEGMENT = CHUNK.repeat(8);

export default function Marquee() {
  return (
    <section
      className={styles.section}
      aria-label="Capabilities marquee"
    >
      <div className={styles.line}>
        <div className={`${styles.track} ${styles.trackToRight}`}>
          <span className={`${styles.segment} ${styles.outline}`}>{SEGMENT}</span>
          <span className={`${styles.segment} ${styles.outline}`}>{SEGMENT}</span>
        </div>
      </div>
      <div className={styles.line}>
        <div className={`${styles.track} ${styles.trackToLeft}`}>
          <span className={`${styles.segment} ${styles.solid}`}>{SEGMENT}</span>
          <span className={`${styles.segment} ${styles.solid}`}>{SEGMENT}</span>
        </div>
      </div>
    </section>
  );
}
