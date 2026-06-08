"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewsroomCard from "@/components/newsroomCard";
import type { NewsroomListItem } from "@/content/newsroom";
import styles from "./newsroom.module.css";

gsap.registerPlugin(ScrollTrigger);

const NEWSROOM_ITEMS: NewsroomListItem[] = [
  {
    id: "1",
    slug: "akaal-digital-platform-launch",
    image: "/images/lab.png",
    headerText:
      "AKAAL Launches New Digital Experience Platform for Enterprise Clients",
    category: "PRESS",
    createdAt: "2026-04-02T00:00:00Z",
    href: "/newsroom/akaal-digital-platform-launch",
  },
  {
    id: "2",
    slug: "indo-pacific-rebrand-case-study",
    image: "/images/lab.png",
    headerText:
      "Behind the Rebrand: How We Transformed Indo Pacific's Visual Identity",
    category: "CASE STUDY",
    createdAt: "2026-02-18T00:00:00Z",
    href: "/newsroom/indo-pacific-rebrand-case-study",
  },
  {
    id: "3",
    slug: "akaal-labs-ai-content-suite",
    image: "/images/lab.png",
    headerText: "AKAAL Labs Introduces AI-Powered Content Automation Suite",
    category: "PRODUCT",
    createdAt: "2026-01-05T00:00:00Z",
    href: "/newsroom/akaal-labs-ai-content-suite",
  },
];

export default function Newsroom() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-newsroom-card]");
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
          <h2 className={styles.title}>Latest Newsroom</h2>
        </div>

        <div className={styles.grid}>
          {NEWSROOM_ITEMS.slice(0, 2).map((item, index) => (
            <NewsroomCard key={item.id} item={item} isWide={index === 0} />
          ))}

          <a
            href="/newsroom"
            className={`${styles.card} ${styles.cardCta}`}
            data-newsroom-card=""
          >
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

          {NEWSROOM_ITEMS.slice(2).map((item) => (
            <NewsroomCard key={item.id} item={item} isWide />
          ))}
        </div>
      </div>
    </section>
  );
}
