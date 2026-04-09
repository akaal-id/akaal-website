"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ABOUT_LABEL,
  ABOUT_STATEMENT_EMPHASIS,
  ABOUT_STATEMENT_LEAD,
  buildAboutStatementInnerHTML,
} from "@/content/about";
import shared from "@/app/home/about/about.module.css";
import styles from "./hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    el.innerHTML = buildAboutStatementInnerHTML(shared.word, shared.emphasisWord);

    const wordEls = el.querySelectorAll<HTMLSpanElement>(`.${shared.word}`);
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

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="About">
      <div className={styles.heroGridBackground} aria-hidden="true" />
      <div className={styles.grid}>
        <span className={shared.label}>{ABOUT_LABEL}</span>
        <p ref={textRef} className={shared.statement}>
          {ABOUT_STATEMENT_LEAD}{" "}
          <em className={shared.emphasisWord}>{ABOUT_STATEMENT_EMPHASIS}</em>
        </p>
      </div>
      <div className={styles.subWrapper}>
        <p className={styles.subText}>
          We build trust and strengthen brand identity. By combining cutting-edge technology with
          creative innovation, we enhance the effectiveness and reach of transformative campaigns.
          Our commitment to understanding each unique need ensures that every solution we deliver
          creates real impact, resonates with your audience, and drives sustainable growth.
        </p>
      </div>
    </section>
  );
}
