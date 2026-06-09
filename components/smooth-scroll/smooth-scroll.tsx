"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = {
  autoRaf: false,
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  anchors: { offset: -96 },
} as const;

const ANCHOR_OFFSET = -96;

function LenisGSAPConnector() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  return null;
}

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const hash = window.location.hash;
    if (hash) {
      lenis.scrollTo(hash, { offset: ANCHOR_OFFSET });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname, lenis]);

  return null;
}

type SmoothScrollProps = {
  children: React.ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/app/admin");

  if (isAdminRoute || reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisGSAPConnector />
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
