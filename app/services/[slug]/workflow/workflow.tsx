"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceData } from "@/content/services/creative";
import styles from "./workflow.module.css";

gsap.registerPlugin(ScrollTrigger);

type WorkflowProps = {
  workflow: ServiceData["workflow"];
};

export default function Workflow({ workflow }: WorkflowProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerEls = section.querySelectorAll<HTMLElement>(
      `.${styles.headerEyebrow}, .${styles.headerTitle}, .${styles.headerLead}`
    );
    const cardEls = section.querySelectorAll<HTMLElement>(`.${styles.card}`);
    const progressEl = section.querySelector<HTMLElement>(`.${styles.progressFill}`);

    gsap.set(headerEls, { autoAlpha: 0, y: 24 });
    gsap.set(cardEls, { autoAlpha: 0, y: 32 });
    if (progressEl) {
      gsap.set(progressEl, { scaleX: 0, transformOrigin: "left" });
    }

    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.to(headerEls, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      })
    );

    if (progressEl) {
      tweens.push(
        gsap.to(progressEl, {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        })
      );
    }

    tweens.push(
      gsap.to(cardEls, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: { each: 0.1, from: "start" },
        scrollTrigger: {
          trigger: section,
          start: "top 62%",
          toggleActions: "play none none reverse",
        },
      })
    );

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [workflow.length]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="workflow-heading"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.headerEyebrow}>[ How we work ]</p>
          <div className={styles.headerText}>
            <h2 id="workflow-heading" className={styles.headerTitle}>
              Process built for clarity
            </h2>
            <p className={styles.headerLead}>
              Four connected phases — each step informs the next so strategy,
              craft, and growth stay aligned.
            </p>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressFill} />
          </div>
          <ol className={styles.phaseStrip} aria-label="Phase numbers">
            {workflow.map((s) => (
              <li key={s.step} className={styles.phaseItem}>
                <span className={styles.phaseDot} />
                <span className={styles.phaseNum}>{s.step}</span>
              </li>
            ))}
          </ol>
        </header>

        <div className={styles.grid}>
          {workflow.map((step, index) => (
            <article key={step.step} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardIndex} aria-hidden="true">
                  {step.step}
                </span>
                <span className={styles.cardPhase}>
                  Phase {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardBody}>{step.description}</p>
              {index < workflow.length - 1 && (
                <span className={styles.cardLink} aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
