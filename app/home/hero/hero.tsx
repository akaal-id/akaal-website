"use client";

import { animate } from "animejs";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button/button";
import styles from "./hero.module.css";

const TITLE_LINE_1: { text: string; emphasize?: boolean }[] = [
  { text: "Be" },
  { text: "the" },
  { text: "GameChanger", emphasize: true },
  { text: "With" },
];

const TITLE_LINE_2: { text: string; emphasize?: boolean }[] = [
  { text: "One" },
  { text: "Stop" },
  { text: "Digi-Solution", emphasize: true },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const heroRootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const root = heroRootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-hero-em]");
    if (!targets.length) return;

    const anim = animate(targets, {
      opacity: [0.9, 1],
      duration: 2800,
      loop: true,
      alternate: true,
      ease: "inOutSine",
      delay: 1100,
    });

    return () => {
      anim.revert();
    };
  }, [reduceMotion]);

  const wordTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.55, ease: easeOut };

  const wordHidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 28, filter: "blur(10px)" };

  const wordVisible = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  const stagger = reduceMotion ? 0 : 0.07;
  const delayChildren = reduceMotion ? 0 : 0.12;

  return (
    <>
      <section
        ref={heroRootRef}
        className={styles.heroSection}
        aria-label="Hero"
      >
        <div className={styles.heroGridBackground} aria-hidden="true" />
        <div className={styles.heroVisualStack} aria-hidden="true">
          <img
            className={styles.VisualFirst}
            src="/images/visual1.svg"
            alt=""
            draggable={false}
          />
          <img
            className={styles.VisualSecond}
            src="/images/visual2.svg"
            alt=""
            draggable={false}
          />
          <img
            className={styles.VisualThird}
            src="/images/visual3.svg"
            alt=""
            draggable={false}
          />
        </div>
        <div className={styles.heroAmbient} aria-hidden="true">
          <div className={`${styles.heroOrb} ${styles.heroOrb1}`} />
          <div className={`${styles.heroOrb} ${styles.heroOrb2}`} />
          <div className={`${styles.heroOrb} ${styles.heroOrb3}`} />
        </div>

        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTextStop}>
              <motion.span
                className={styles.heroTitleBlock}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: stagger,
                      delayChildren,
                    },
                  },
                }}
              >
                {TITLE_LINE_1.map(({ text, emphasize }) => (
                  <motion.span
                    key={`l1-${text}`}
                    className={styles.heroWord}
                    variants={{
                      hidden: wordHidden,
                      visible: {
                        ...wordVisible,
                        transition: wordTransition,
                      },
                    }}
                  >
                    {emphasize ? (
                      <em data-hero-em>{text}</em>
                    ) : (
                      text
                    )}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span
                className={styles.heroTitleBlock}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: stagger,
                      delayChildren:
                        delayChildren + stagger * TITLE_LINE_1.length,
                    },
                  },
                }}
              >
                {TITLE_LINE_2.map(({ text, emphasize }) => (
                  <motion.span
                    key={`l2-${text}`}
                    className={styles.heroWord}
                    variants={{
                      hidden: wordHidden,
                      visible: {
                        ...wordVisible,
                        transition: wordTransition,
                      },
                    }}
                  >
                    {emphasize ? (
                      <em data-hero-em>{text}</em>
                    ) : (
                      text
                    )}
                  </motion.span>
                ))}
              </motion.span>
            </span>
          </h1>
          <motion.div
            className={styles.bottomContainer}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { delay: 0.55, duration: 0.65, ease: easeOut }
            }
          >
            <div className={styles.bottomContentWrapper}>
              <p className={styles.heroSubtitle}>
                With AKAAL, transform your business with innovative digital
                solutions designed to help you grow faster. From branding and
                digital marketing to AI-powered automation, we provide
                everything you need to take your business to the next level.
              </p>
              <div className={styles.heroActions}>
                <Button type="button">Start Your Project</Button>
                <Button type="button" variant="simple">
                  About Us
                </Button>
              </div>
            </div>
            <motion.button
              type="button"
              className={styles.scrollDown}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? {} : { opacity: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { delay: 0.95, duration: 0.5, ease: easeOut }
              }
              whileHover={
                reduceMotion ? undefined : { scale: 1.03, opacity: 0.95 }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              Scroll Down
              <svg
                className={`${styles.scrollChevron} ${styles.scrollChevronAnimated}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
