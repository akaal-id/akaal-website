"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, Megaphone, Heart, TrendingUp } from "lucide-react";
import {
  ABOUT_LABEL,
  ABOUT_STATEMENT_EMPHASIS,
  ABOUT_STATEMENT_LEAD,
  ABOUT_CARD_IMAGE,
  ABOUT_PILLARS,
  buildAboutStatementInnerHTML,
} from "@/content/about";
import styles from "./about.module.css";

gsap.registerPlugin(ScrollTrigger);

const PILLAR_ICONS = [Crown, Megaphone, Heart, TrendingUp] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    el.innerHTML = buildAboutStatementInnerHTML(styles.word, styles.emphasisWord);

    const wordEls = el.querySelectorAll<HTMLSpanElement>(`.${styles.word}`);
    gsap.set(wordEls, { color: "#222" });

    const tween = gsap.to(wordEls, {
      color: "#c4c4c4",
      stagger: 0.04,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center center",
        scrub: 1.5,
      },
    });

    const cardEls = section.querySelectorAll<HTMLElement>(`.${styles.card}`);
    gsap.set(cardEls, {
      autoAlpha: 0,
      y: 28,
      scale: 0.98,
      filter: "blur(8px)",
    });

    const cardsTween = gsap.to(cardEls, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.16,
      scrollTrigger: {
        trigger: section,
        start: "top 58%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      cardsTween.scrollTrigger?.kill();
      cardsTween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.about} aria-label="About">
      <div className={styles.grid}>
        <span className={styles.label}>{ABOUT_LABEL}</span>
        <p ref={textRef} className={styles.statement}>
          {ABOUT_STATEMENT_LEAD}{" "}
          <em className={styles.emphasisWord}>{ABOUT_STATEMENT_EMPHASIS}</em>
        </p>

        <div className={styles.cards} aria-label="About highlights">
          {ABOUT_PILLARS.map((card, index) => {
            const Icon = PILLAR_ICONS[index];
            return (
              <article key={card.title} className={styles.card}>
                <div className={styles.cardMedia} aria-hidden="true">
                  <img
                    className={styles.cardMediaImage}
                    src={ABOUT_CARD_IMAGE}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <div className={styles.cardMediaOverlay} />
                </div>
                <div className={styles.cardIcon} aria-hidden="true">
                  <Icon size={16} strokeWidth={2} />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardSub}>{card.sub}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
