"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ABOUT_MISSION_ITEMS,
  ABOUT_MISSION_LEAD,
  ABOUT_MISSION_PILL,
  ABOUT_VISION_PILL,
  ABOUT_VISION_TEXT,
  VISION_BG_IMAGE,
} from "@/content/about";
import styles from "./vision-mission.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const visionEl = section.querySelector<HTMLElement>(`.${styles.visionBlock}`);
    const missionHeaderEl = section.querySelector<HTMLElement>(
      `.${styles.missionInVision} .${styles.missionHeader}`
    );
    const missionCardEls = section.querySelectorAll<HTMLElement>(`.${styles.missionCard}`);

    if (visionEl) {
      gsap.set(visionEl, { autoAlpha: 0, y: 28, filter: "blur(8px)" });
    }
    if (missionHeaderEl) {
      gsap.set(missionHeaderEl, { autoAlpha: 0, y: 22 });
    }
    gsap.set(missionCardEls, { autoAlpha: 0, y: 20 });

    const visionTween = visionEl
      ? gsap.to(visionEl, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visionEl,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })
      : null;

    const missionTween = gsap.to([missionHeaderEl, ...missionCardEls].filter(Boolean), {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: section.querySelector(`.${styles.missionInVision}`),
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      visionTween?.scrollTrigger?.kill();
      visionTween?.kill();
      missionTween.scrollTrigger?.kill();
      missionTween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Vision and mission">
      <div className={styles.inner}>
        <header
          className={styles.visionBlock}
          style={{ backgroundImage: `url(${VISION_BG_IMAGE})` }}
        >
          <div className={styles.pullquoteWrap}>
            <p className={styles.labelVision}>{ABOUT_VISION_PILL}</p>
            <div className={styles.pullquoteGlow} aria-hidden />
            <blockquote className={styles.pullquote}>
              <p>{ABOUT_VISION_TEXT}</p>
            </blockquote>
          </div>

          <div className={styles.missionInVision}>
            <div className={styles.missionHeader}>
              <p className={styles.labelMission}>{ABOUT_MISSION_PILL}</p>
              {/* <p className={styles.missionLead}>{ABOUT_MISSION_LEAD}</p> */}
            </div>
            <div className={styles.missionCards}>
              {ABOUT_MISSION_ITEMS.map((item) => (
                <article key={item.title} className={styles.missionCard}>
                  <h3 className={styles.missionCardTitle}>{item.title}</h3>
                  <p className={styles.missionCardBody}>{item.sub}</p>
                </article>
              ))}
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
