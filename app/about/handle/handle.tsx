"use client";

import { useState } from "react";
import styles from "./handle.module.css";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Creative Journey",
    description: "From mood boards to prototypes - we make ideas tangible.",
  },
  {
    number: "02",
    title: "Marketing Journey",
    description: "Omnichannel campaigns that blend storytelling and ROI.",
  },
  {
    number: "03",
    title: "Branding Journey",
    description:
      "Building emotional connections through logos, voice, and visual ecosystems.",
  },
];

export default function Handle() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.section} aria-label="How Akaal handles your brand">
      <div
        className={`${styles.bgLayer} ${styles.bgCreative} ${hoveredIndex === 0 ? styles.bgActive : ""}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.bgLayer} ${styles.bgMarketing} ${hoveredIndex === 1 ? styles.bgActive : ""}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.bgLayer} ${styles.bgBranding} ${hoveredIndex === 2 ? styles.bgActive : ""}`}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>How AKAAL Handle Your Brand</p>
          
          <p className={styles.intro}>
            AKAAL helps brands grow through creative journeys, strategic marketing, and memorable
            branding systems that move people and performance forward.
          </p>
        </header>

        <div className={styles.steps}>
          {PROCESS_STEPS.map((step, index) => (
            <article
              key={step.number}
              className={`${styles.stepRow} ${
                hoveredIndex !== null && hoveredIndex !== index ? styles.stepRowDimmed : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
            >
              <p className={styles.num}>{step.number}</p>
              <h3 className={`${styles.title} ${hoveredIndex === index ? styles.titleActive : ""}`}>
                {step.title}
              </h3>
              <p className={styles.desc}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
