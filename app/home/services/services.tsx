"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./services.module.css";

gsap.registerPlugin(ScrollTrigger);

const ECOSYSTEM_ITEMS = [
  {
    id: "creative",
    label: "AKAAL Creative",
    number: "01",
    desc: "Brand strategy, identity systems, and visual storytelling crafted to build recognition, trust, and long-term relevance.",
    href: "https://akaal.id",
    image: "/images/vision-bg.png",
    cardImage: "/images/lab.png",
  },
  {
    id: "studio",
    label: "AKAAL Studio",
    number: "02",
    desc: "Creative campaigns, production workflows, and content execution designed to keep your brand consistent and culturally resonant.",
    href: "https://akaal.id",
    image: "/images/vision-bg.png",
    cardImage: "/images/lab.png",
  },
  {
    id: "Labs",
    label: "AKAAL Labs",
    number: "03",
    desc: "Product design, web development, and technical implementation that transform ideas into scalable digital experiences.",
    href: "https://akaal.id",
    image: "/images/vision-bg.png",
    cardImage: "/images/lab.png",
  },
  {
    id: "hegira",
    label: "Hegira.id",
    number: "04",
    desc: "Strategic growth initiatives and ecosystem partnerships that unlock new market opportunities and measurable business value.",
    href: "https://hegira.id",
    image: "/images/vision-bg.png",
    cardImage: "/images/vision-bg.png",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lerpPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleRowMouseMove = useCallback(
    (e: React.MouseEvent, index: number) => {
      const row = rowRefs.current[index];
      const glow = glowRefs.current[index];
      if (!row || !glow) return;

      const rect = row.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.transform = `translate(${x - 160}px, ${y - 160}px)`;
      glow.style.opacity = "1";

      mousePos.current = { x: e.clientX, y: e.clientY };
    },
    [],
  );

  const handleRowEnter = useCallback(
    (e: React.MouseEvent, index: number) => {
      setActiveIndex(index);
      mousePos.current = { x: e.clientX, y: e.clientY };
      lerpPos.current = { x: e.clientX + 24, y: e.clientY - 170 };
    },
    [],
  );

  const handleRowLeave = useCallback((index: number) => {
    setActiveIndex(null);
    const glow = glowRefs.current[index];
    if (glow) glow.style.opacity = "0";
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      lerpPos.current.x = lerp(
        lerpPos.current.x,
        mousePos.current.x + 24,
        0.1,
      );
      lerpPos.current.y = lerp(
        lerpPos.current.y,
        mousePos.current.y - 170,
        0.1,
      );

      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${lerpPos.current.x}px, ${lerpPos.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll<HTMLElement>(`.${styles.row}`);
    if (!rows.length) return;

    // Reset rows every mount so navigation never leaves them invisible.
    gsap.set(rows, { clearProps: "opacity,transform" });

    const tl = gsap.timeline({ paused: true });
    tl.from(rows, {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      immediateRender: false,
    });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
    });

    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= window.innerHeight * 0.8) {
      tl.play();
      st.kill();
    }

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={styles.services}
      aria-label="Ecosystem"
    >
      <div className={styles.header}>
        <span className={styles.label}>[ecosystem]</span>
        <h2 className={styles.Title}>Our Services & Products</h2>
      </div>

      <div className={styles.rows}>
        {ECOSYSTEM_ITEMS.map((service, index) => (
          <a
            key={service.id}
            href={service.href}
            target="_blank"
            rel="noreferrer"
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            className={`${styles.row} ${activeIndex === index ? styles.rowActive : ""}`}
            onMouseEnter={(e) => handleRowEnter(e, index)}
            onMouseLeave={() => handleRowLeave(index)}
            onMouseMove={(e) => handleRowMouseMove(e, index)}
          >
            <div
              className={styles.rowMedia}
              style={{ backgroundImage: `url(${service.image})` }}
              aria-hidden="true"
            />
            <div
              ref={(el) => {
                glowRefs.current[index] = el;
              }}
              className={styles.glow}
              aria-hidden="true"
            />
            <span className={styles.number}>{service.number}</span>
            <h3 className={styles.title}>{service.label}</h3>
            <span className={styles.desc}>{service.desc}</span>
            <span className={styles.arrow}>↗</span>
          </a>
        ))}
      </div>

      <div
        ref={previewRef}
        className={`${styles.preview} ${activeIndex !== null ? styles.previewVisible : ""}`}
        aria-hidden="true"
      >
        {ECOSYSTEM_ITEMS.map((service, index) => (
          <div
            key={service.id}
            className={`${styles.previewImage} ${activeIndex === index ? styles.previewImageActive : ""}`}
            style={{ backgroundImage: `url(${service.cardImage})` }}
          />
        ))}
      </div>
    </section>
  );
}
