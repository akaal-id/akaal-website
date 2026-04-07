"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./finale-cta.module.css";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_WORDS = ["Let's", "build", "what's", "next."];

const MAX_PULL = 22;
const MAGNET_RADIUS = 200;

type V3 = [number, number, number];

const CUBE_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

function cubeVertices(half: number): V3[] {
  return [
    [-half, -half, -half],
    [half, -half, -half],
    [half, half, -half],
    [-half, half, -half],
    [-half, -half, half],
    [half, -half, half],
    [half, half, half],
    [-half, half, half],
  ];
}

function rotateVertex(v: V3, rx: number, ry: number): V3 {
  const [x, y, z] = v;
  const x1 = x * Math.cos(ry) - z * Math.sin(ry);
  const z1 = x * Math.sin(ry) + z * Math.cos(ry);
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
  return [x1, y2, z2];
}

function project(
  v: V3,
  w: number,
  h: number,
  dist: number
): { x: number; y: number; z: number } {
  const [x, y, z] = v;
  const scale = dist / (dist + z);
  return { x: w * 0.5 + x * scale, y: h * 0.5 + y * scale, z };
}

export default function FinaleCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const targetRot = useRef({ x: 0.12, y: -0.18 });
  const currentRot = useRef({ x: 0.12, y: -0.18 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resetMagnetic = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const onMagneticMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const wrap = magneticRef.current;
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > MAGNET_RADIUS || dist < 0.5) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const strength = 1 - dist / MAGNET_RADIUS;
      const nx = (dx / dist) * MAX_PULL * strength;
      const ny = (dy / dist) * MAX_PULL * strength;
      setOffset({ x: nx, y: ny });
    },
    [reduceMotion]
  );

  const onSectionPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetRot.current = {
        x: 0.1 + ny * 0.38,
        y: -0.2 + nx * 0.52,
      };
    },
    [reduceMotion]
  );

  const onCtaPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLAnchorElement>) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    },
    []
  );

  const onCtaEnter = useCallback(() => {
    setCursorActive(true);
  }, []);

  const onCtaLeave = useCallback(() => {
    setCursorActive(false);
  }, []);

  /* Canvas wireframe grid */
  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = section.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const half = 8;
    const spacing = 58;
    const perspective = 1180;
    const vertsBase = cubeVertices(15);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = (t: number) => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      ctx2d.clearRect(0, 0, w, h);

      const idle = t * 0.00012;
      const crx = lerp(
        currentRot.current.x,
        targetRot.current.x + Math.sin(idle) * 0.035,
        0.06
      );
      const cry = lerp(
        currentRot.current.y,
        targetRot.current.y + Math.cos(idle * 0.9) * 0.028,
        0.06
      );
      currentRot.current.x = crx;
      currentRot.current.y = cry;

      const rx = crx;
      const ry = cry;

      ctx2d.lineWidth = 1;
      ctx2d.strokeStyle = "rgba(255, 255, 255, 0.07)";
      ctx2d.beginPath();

      for (let gx = -half; gx <= half; gx++) {
        for (let gz = -half; gz <= half; gz++) {
          const ox = gx * spacing;
          const oz = gz * spacing;
          const oy = Math.sin(gx * 0.08 + gz * 0.06 + idle * 0.4) * 6;

          for (const edge of CUBE_EDGES) {
            const a = vertsBase[edge[0]];
            const b = vertsBase[edge[1]];
            const va: V3 = [a[0] + ox, a[1] + oy, a[2] + oz];
            const vb: V3 = [b[0] + ox, b[1] + oy, b[2] + oz];
            const ra = rotateVertex(va, rx, ry);
            const rb = rotateVertex(vb, rx, ry);
            const pa = project(ra, w, h, perspective);
            const pb = project(rb, w, h, perspective);
            if (pa.z > -perspective + 40 && pb.z > -perspective + 40) {
              ctx2d.moveTo(pa.x, pa.y);
              ctx2d.lineTo(pb.x, pb.y);
            }
          }
        }
      }

      ctx2d.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  /* Headline stagger — GSAP + ScrollTrigger */
  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll<HTMLElement>("[data-gateway-word]");
    gsap.set(words, { yPercent: 108, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.95,
      ease: "power4.out",
      stagger: 0.09,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!reduceMotion || !sectionRef.current) return;
    const words =
      sectionRef.current.querySelectorAll<HTMLElement>("[data-gateway-word]");
    gsap.set(words, { yPercent: 0, opacity: 1 });
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="gateway-heading"
      onPointerMove={onSectionPointerMove}
    >
      <div className={styles.canvas} aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>

      <div className={styles.shell}>
        <h2 id="gateway-heading" className={styles.headline}>
          {HEADLINE_WORDS.map((word) => (
            <span key={word} className={styles.headlineWord}>
              <span className={styles.headlineInner} data-gateway-word>
                {word}
              </span>
            </span>
          ))}
        </h2>

        <div
          ref={magneticRef}
          className={styles.magneticZone}
          onPointerMove={onMagneticMove}
          onPointerLeave={resetMagnetic}
          onPointerCancel={resetMagnetic}
        >
          <a
            href="mailto:admin@akaal.id?subject=Project%20Inquiry"
            className={styles.ctaLink}
            aria-label="Start project — opens email to Akaal"
            onPointerEnter={onCtaEnter}
            onPointerLeave={onCtaLeave}
            onPointerMove={onCtaPointerMove}
          >
            <span
              className={styles.assembly}
              style={
                {
                  "--mx": `${offset.x}px`,
                  "--my": `${offset.y}px`,
                } as CSSProperties
              }
            >
              <span className={styles.frame} aria-hidden="true" />
              <span className={styles.innerGlass}>
                <span className={styles.cubeStage} aria-hidden="true">
                  <span className={styles.cube}>
                    <span className={styles.face} />
                    <span className={styles.face} />
                    <span className={styles.face} />
                    <span className={styles.face} />
                    <span className={styles.face} />
                    <span className={styles.face} />
                  </span>
                </span>
                <span>START PROJECT ↗</span>
              </span>
            </span>
          </a>
        </div>
      </div>

      <div
        className={styles.customCursor}
        data-active={cursorActive ? "true" : "false"}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
        }}
        aria-hidden="true"
      >
        READY?
      </div>
    </section>
  );
}
