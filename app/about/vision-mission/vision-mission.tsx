"use client";

import { useEffect, useRef, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const visionEl = section.querySelector<HTMLElement>(`.${styles.visionBlock}`);
    const headerEl = section.querySelector<HTMLElement>(`.${styles.missionHeader}`);
    const missionEls = section.querySelectorAll<HTMLElement>(`.${styles.missionRow}`);

    if (visionEl) {
      gsap.set(visionEl, { autoAlpha: 0, y: 28, filter: "blur(8px)" });
    }
    if (headerEl) {
      gsap.set(headerEl, { autoAlpha: 0, y: 22 });
    }
    gsap.set(missionEls, { autoAlpha: 0, y: 20 });

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

    const missionTween = gsap.to([headerEl, ...missionEls].filter(Boolean), {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: section.querySelector(`.${styles.missionBlock}`),
        start: "top 72%",
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

          {/* <div className={styles.pullquoteWrap}>
            <p className={styles.labelMission}>{ABOUT_MISSION_PILL}</p>
            <div className={styles.pullquoteGlow} aria-hidden />
            <blockquote className={styles.pullquot}>
              <p>{ABOUT_MISSION_LEAD}</p>
            </blockquote>
          </div> */}
          
        </header>

        {/* <div className={styles.missionBlock}>
          <div className={styles.missiongrid}>
            <div className={styles.missionHeader}>
              <p className={styles.labelMission}>{ABOUT_MISSION_PILL}</p>
              <p className={styles.missionLead}>{ABOUT_MISSION_LEAD}</p>
            </div>
            <ol className={styles.missionList}>
              {ABOUT_MISSION_ITEMS.map((item, index) => {
                const isActive = activeIndex === index;
                const itemId = `mission-item-${index}`;
                const panelId = `mission-panel-${index}`;

                return (
                  <li
                    key={item.title}
                    className={`${styles.missionRow} ${isActive ? styles.missionRowActive : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.missionTrigger}
                      onClick={() => setActiveIndex((prev) => (prev === index ? null : index))}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      id={itemId}
                    >
                      <span className={styles.missionIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className={styles.missionTitle}>{item.title}</h3>
                    </button>
                    <div
                      className={`${styles.missionBody} ${isActive ? styles.missionBodyOpen : ""}`}
                      id={panelId}
                      role="region"
                      aria-labelledby={itemId}
                    >
                      <p className={styles.missionSub}>{item.sub}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div> */}
      </div>
    </section>
  );
}
