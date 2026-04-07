"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./newsroom.module.css";

gsap.registerPlugin(ScrollTrigger);

const NEWS = [
  {
    id: "1",
    date: "02.04.2026",
    tag: "PRESS",
    headline:
      "AKAAL Launches New Digital Experience Platform for Enterprise Clients",
    image: "/images/lab.png",
    href: "#",
  },
  {
    id: "2",
    date: "18.02.2026",
    tag: "CASE STUDY",
    headline:
      "Behind the Rebrand: How We Transformed Indo Pacific's Visual Identity",
    image: "/images/lab.png",
    href: "#",
  },
  {
    id: "3",
    date: "05.01.2026",
    tag: "PRODUCT",
    headline: "AKAAL Labs Introduces AI-Powered Content Automation Suite",
    image: "/images/lab.png",
    href: "#",
  },
];

export default function Newsroom() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(`.${styles.card}`);
    gsap.set(cards, { opacity: 0, y: 30 });

    const tl = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="newsroom"
      ref={sectionRef}
      className={styles.newsroom}
      aria-label="Newsroom"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>[newsroom]</span>
          <h2 className={styles.title}>Latest News</h2>
        </div>

        <div className={styles.grid}>
          {/* Row 1: wide card + normal card */}
          {NEWS.slice(0, 2).map((item, i) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.card} ${i === 0 ? styles.cardWide : ""}`}
            >
              <div className={styles.cardMediaWrap}>
                <img
                  className={styles.cardImage}
                  src={item.image}
                  alt=""
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>
                  [ {item.date} ] /// {item.tag}
                </span>
                <h3 className={styles.cardHeadline}>{item.headline}</h3>
                <div className={styles.cardAction}>
                  <span className={styles.cardActionText}>Read Article</span>
                  <span className={styles.cardActionArrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}

          {/* Row 2: CTA card + wide card */}
          <a href="/newsroom" className={`${styles.card} ${styles.cardCta}`}>
            <div className={styles.ctaInner}>
              <span className={styles.ctaText}>View More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.ctaArrow}
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </a>

          {NEWS.slice(2).map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.card} ${styles.cardWide}`}
            >
              <div className={styles.cardMediaWrap}>
                <img
                  className={styles.cardImage}
                  src={item.image}
                  alt=""
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>
                  [ {item.date} ] /// {item.tag}
                </span>
                <h3 className={styles.cardHeadline}>{item.headline}</h3>
                <div className={styles.cardAction}>
                  <span className={styles.cardActionText}>Read Article</span>
                  <span className={styles.cardActionArrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
