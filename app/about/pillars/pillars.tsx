"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, Megaphone, Heart, TrendingUp } from "lucide-react";
import { ABOUT_CARD_IMAGE, ABOUT_PILLARS } from "@/content/about";
import shared from "@/app/home/about/about.module.css";
import styles from "./pillars.module.css";

gsap.registerPlugin(ScrollTrigger);

const PILLAR_ICONS = [Crown, Megaphone, Heart, TrendingUp] as const;

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cardEls = section.querySelectorAll<HTMLElement>(`.${shared.card}`);
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
      cardsTween.scrollTrigger?.kill();
      cardsTween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.pillars} aria-label="About pillars">
      <div className={shared.grid}>
        <div className={shared.cards} aria-label="About highlights">
          {ABOUT_PILLARS.map((card, index) => {
            const Icon = PILLAR_ICONS[index];
            return (
              <article key={card.title} className={shared.card}>
                <div className={shared.cardMedia} aria-hidden="true">
                  <img
                    className={shared.cardMediaImage}
                    src={ABOUT_CARD_IMAGE}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <div className={shared.cardMediaOverlay} />
                </div>
                <div className={shared.cardIcon} aria-hidden="true">
                  <Icon size={16} strokeWidth={2} />
                </div>
                <h3 className={shared.cardTitle}>{card.title}</h3>
                <p className={shared.cardSub}>{card.sub}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
