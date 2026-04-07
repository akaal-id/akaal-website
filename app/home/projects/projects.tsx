"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button/button";
import styles from "./projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "hegira",
    title: "Hegira — Brand Identity System",
    category: "BRANDING",
    image: "/projects/photo-1.jpg",
    href: "#",
    hero: true,
  },
  {
    id: "akaal-web",
    title: "AKAAL — WebGL Experience",
    category: "WEB DEV",
    image: "/projects/photo-2.jpg",
    href: "#",
    hero: false,
  },
  {
    id: "traveloka",
    title: "Traveloka — Design System",
    category: "PRODUCT",
    image: "/projects/photo-3.jpg",
    href: "#",
    hero: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(`.${styles.card}`);
    gsap.set(cards, { opacity: 0, y: 48, scale: 0.97 });

    const tl = gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.14,
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
      id="featured-works"
      ref={sectionRef}
      className={styles.projects}
      aria-label="Featured Works"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>[featured works]</span>
        </div>

        <div className={styles.grid} role="list">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.href}
              className={`${styles.card} ${project.hero ? styles.cardHero : ""}`}
              role="listitem"
            >
              <img
                className={styles.cardImage}
                src={project.image}
                alt={project.title}
                loading="lazy"
                draggable={false}
              />

              <div className={styles.panel}>
                <span className={styles.panelCategory}>
                  [ {project.category} ]
                </span>
                <div className={styles.panelInfo}>
                  <h3 className={styles.panelTitle}>{project.title}</h3>
                  <span className={styles.panelArrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.footer}>
          <Button href="/works" variant="simple">
            View All Works
          </Button>
        </div>
      </div>
    </section>
  );
}
