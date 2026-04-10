"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceData } from "@/content/services/creative";
import styles from "./manifesto.module.css";

gsap.registerPlugin(ScrollTrigger);

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildWordSpans(text: string, wordClass: string): string {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => `<span class="${wordClass}">${escapeHtml(w)} </span>`)
    .join("");
}

type ManifestoProps = {
  data: ServiceData["manifesto"];
};

export default function Manifesto({ data }: ManifestoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const labelEl = section.querySelector<HTMLElement>(`.${styles.label}`);

    if (labelEl) {
      gsap.set(labelEl, { autoAlpha: 0, y: 22 });
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
      });
    }

    el.innerHTML = buildWordSpans(data.text, styles.word);

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

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section)
        .forEach((st) => st.kill());
    };
  }, [data.text]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Creative manifesto"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.label}>{data.label}</p>
        <blockquote className={styles.body}>
          <p ref={textRef} className={styles.text}>
            {data.text}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
