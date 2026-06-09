"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { ChevronDown } from "lucide-react";
import styles from "./floater.module.css";

const CIRCLE_R = 45;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

const SCROLL_AT_TOP = 16;
const SCROLL_LEAVE_TOP = 48;

const LERP_FACTOR = 0.12;

export default function Floater() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/app/admin");

  const [isScrolled, setIsScrolled] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const latestRef = useRef({ scrollY: 0, maxScroll: 0 });
  const displayProgressRef = useRef(0);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const updateFromScroll = (scrollY: number, maxScroll: number) => {
      latestRef.current = { scrollY, maxScroll };

      let nextScrolled = isScrolledRef.current;
      if (scrollY < SCROLL_AT_TOP) nextScrolled = false;
      else if (scrollY > SCROLL_LEAVE_TOP) nextScrolled = true;

      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }
    };

    const updateFromWindow = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      updateFromScroll(scrollY, maxScroll);
    };

    if (lenis) {
      const onLenisScroll = (instance: NonNullable<typeof lenis>) => {
        updateFromScroll(instance.scroll, instance.limit);
      };

      onLenisScroll(lenis);
      lenis.on("scroll", onLenisScroll);

      const onResize = () => onLenisScroll(lenis);
      window.addEventListener("resize", onResize);

      return () => {
        lenis.off("scroll", onLenisScroll);
        window.removeEventListener("resize", onResize);
      };
    }

    updateFromWindow();
    window.addEventListener("scroll", updateFromWindow, { passive: true });
    window.addEventListener("resize", updateFromWindow);
    return () => {
      window.removeEventListener("scroll", updateFromWindow);
      window.removeEventListener("resize", updateFromWindow);
    };
  }, [lenis]);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const { scrollY, maxScroll } = latestRef.current;
      const target =
        maxScroll > 0
          ? Math.min(Math.max(scrollY / maxScroll, 0), 1)
          : 0;
      const current = displayProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.0005) {
        displayProgressRef.current = target;
        setDisplayProgress(target);
      } else {
        const next = current + diff * LERP_FACTOR;
        displayProgressRef.current = next;
        setDisplayProgress(next);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (isAdminRoute) return null;

  const handleClick = () => {
    if (!isScrolled) return;
    if (lenis) {
      lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const strokeDasharray = `${displayProgress * CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`;

  return (
    <button
      type="button"
      className={styles.floater}
      onClick={handleClick}
      aria-label={isScrolled ? "Scroll to top" : "Scroll progress"}
      title={isScrolled ? "Scroll to top" : "Scroll progress"}
    >
      <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden>
        <circle
          className={styles.ringTrack}
          cx="50"
          cy="50"
          r={CIRCLE_R}
          fill="none"
        />
        <circle
          className={styles.ringProgress}
          cx="50"
          cy="50"
          r={CIRCLE_R}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={0}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span
        className={`${styles.icon} ${isScrolled ? styles.iconUp : ""}`}
        aria-hidden
      >
        <ChevronDown size={24} strokeWidth={2} />
      </span>
    </button>
  );
}
