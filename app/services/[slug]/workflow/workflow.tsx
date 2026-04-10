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

    const labelEl = section.querySelector<HTMLElement>(`.${styles.label}`);
    const stepEls = section.querySelectorAll<HTMLElement>(`.${styles.step}`);
    const railEl = section.querySelector<HTMLElement>(`.${styles.railLine}`);

    if (labelEl) {
      gsap.set(labelEl, { autoAlpha: 0, y: 22 });
    }
    gsap.set(stepEls, { autoAlpha: 0, y: 28, filter: "blur(8px)" });
    if (railEl) {
      gsap.set(railEl, { scaleY: 0, transformOrigin: "top" });
    }

    const tweens: gsap.core.Tween[] = [];

    if (labelEl) {
      tweens.push(
        gsap.to(labelEl, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        })
      );
    }

    if (railEl) {
      tweens.push(
        gsap.to(railEl, {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })
      );
    }

    tweens.push(
      gsap.to(stepEls, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
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
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Our process">
      <div className={styles.inner}>
        <p className={styles.label}>[ How We Work ]</p>
        <div className={styles.timeline}>
          <div className={styles.rail} aria-hidden="true">
            <div className={styles.railLine} />
          </div>
          <div className={styles.steps}>
            {workflow.map((step) => (
              <article key={step.step} className={styles.step}>
                <div className={styles.stepDot} aria-hidden="true" />
                <p className={styles.stepNumber}>{step.step}</p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
