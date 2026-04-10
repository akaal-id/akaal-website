"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PortofolioItem } from "@/content/portofolio";
import PortofolioCard from "@/components/portofolioCard";
import styles from "./showcase.module.css";

gsap.registerPlugin(ScrollTrigger);

type ShowcaseProps = {
  projects: PortofolioItem[];
};

export default function Showcase({ projects }: ShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerEl = section.querySelector<HTMLElement>(`.${styles.header}`);
    const cardEls = section.querySelectorAll<HTMLElement>(`.${styles.grid} > *`);

    if (headerEl) {
      gsap.set(headerEl, { autoAlpha: 0, y: 22 });
    }
    gsap.set(cardEls, { autoAlpha: 0, y: 28, scale: 0.98, filter: "blur(8px)" });

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
      gsap.to(cardEls, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.16,
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
    <section ref={sectionRef} className={styles.section} aria-label="Selected work">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>[ Selected Work ]</p>
        </div>
        <div className={styles.grid} role="list">
          {projects.map((project) => (
            <PortofolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
