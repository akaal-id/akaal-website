"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceData } from "@/content/services/creative";
import styles from "./capabilities.module.css";

gsap.registerPlugin(ScrollTrigger);

type CapabilitiesProps = {
  capabilities: ServiceData["capabilities"];
};

export default function Capabilities({ capabilities }: CapabilitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerEl = section.querySelector<HTMLElement>(`.${styles.header}`);
    const rowEls = section.querySelectorAll<HTMLElement>(`.${styles.row}`);

    if (headerEl) {
      gsap.set(headerEl, { autoAlpha: 0, y: 22 });
    }
    gsap.set(rowEls, { autoAlpha: 0, y: 50 });

    const tweens: gsap.core.Tween[] = [];

    if (headerEl) {
      tweens.push(
        gsap.to(headerEl, {
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

    tweens.push(
      gsap.to(rowEls, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
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
    <section ref={sectionRef} className={styles.section} aria-label="Our capabilities">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>[ capabilities ]</span>
        </div>
        <div className={styles.rows}>
          {capabilities.map((cap, i) => (
            <div key={cap.title} className={styles.row}>
              <span className={styles.number}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{cap.title}</h3>
              <span className={styles.desc}>{cap.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
