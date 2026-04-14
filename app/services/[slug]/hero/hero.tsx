"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ServiceData } from "@/content/services/creative";
import styles from "./hero.module.css";

type HeroProps = {
  data: ServiceData["hero"];
};

export default function Hero({ data }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const crest = section.querySelector<HTMLElement>(`.${styles.crest}`);
    const headlineInner = section.querySelector<HTMLElement>(`.${styles.headlineInner}`);

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.15,
    });

    if (crest) {
      gsap.set(crest, { autoAlpha: 0, scale: 1.5, filter: "blur(16px)" });
      tl.to(crest, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power2.out",
      }, 0);
    }

    if (headlineInner) {
      gsap.set(headlineInner, { yPercent: 110 });
      tl.to(headlineInner, {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
      }, 0.8);
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="service-headline">
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <img
            className={styles.crest}
            src={data.logo}
            alt=""
            draggable={false}
            aria-hidden="true"
          />
        </div>
        <h1 id="service-headline" className={styles.headline}>
          <span className={styles.headlineInner}>{data.headline}</span>
        </h1>
      </div>
    </section>
  );
}
