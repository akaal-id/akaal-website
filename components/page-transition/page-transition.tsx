"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import styles from "./page-transition.module.css";

type TransitionState = {
  pendingHref: string | null;
  isAnimating: boolean;
  readyResolver: (() => void) | null;
  readyTimeout: ReturnType<typeof setTimeout> | null;
};

const CELL_SIZE = 56;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const overlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const stateRef = useRef<TransitionState>({
    pendingHref: null,
    isAnimating: false,
    readyResolver: null,
    readyTimeout: null,
  });

  const buildGrid = () => {
    const grid = gridRef.current;
    if (!grid) return;

    const cols = Math.max(8, Math.ceil(window.innerWidth / CELL_SIZE));
    const rows = Math.max(8, Math.ceil(window.innerHeight / CELL_SIZE));
    const totalCells = cols * rows;

    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.innerHTML = "";

    const fragment = document.createDocumentFragment();
    const cells: HTMLDivElement[] = [];
    for (let i = 0; i < totalCells; i += 1) {
      const cell = document.createElement("div");
      cell.className = styles.gridItem;
      fragment.appendChild(cell);
      cells.push(cell);
    }

    grid.appendChild(fragment);
    cellsRef.current = cells;
    gsap.set(cells, { opacity: 0, scale: 0, backgroundColor: "#0a0a0a" });
  };

  const revealOverlay = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.style.visibility = "visible";
    overlay.style.pointerEvents = "auto";
  };

  const hideOverlay = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
  };

  const waitForNextPage = async () =>
    new Promise<void>((resolve) => {
      stateRef.current.readyResolver = resolve;
    });

  const resolveRouteReady = () => {
    if (stateRef.current.readyTimeout) {
      clearTimeout(stateRef.current.readyTimeout);
      stateRef.current.readyTimeout = null;
    }
    stateRef.current.readyResolver?.();
    stateRef.current.readyResolver = null;
  };

  const runTransition = async (nextHref: string) => {
    const { isAnimating } = stateRef.current;
    if (isAnimating) return;

    stateRef.current.isAnimating = true;
    buildGrid();
    revealOverlay();

    const cells = cellsRef.current;

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        hideOverlay();
        stateRef.current.isAnimating = false;
      },
    });

    timeline.to(cells, {
      opacity: 1,
      scale: 1.08,
      duration: 0.5,
      ease: "expo.inOut",
      stagger: { from: "end", grid: "auto", amount: 0.55, ease: "power3.inOut" },
    });

    timeline.call(() => {
      router.push(nextHref);
    });

    timeline.addPause("+=0", () => {
      void waitForNextPage().then(() => {
        timeline.play();
      });
    });

    timeline.to(cells, {
      opacity: 0,
      scale: 0,
      duration: 0.45,
      ease: "expo.inOut",
      stagger: { from: "end", grid: "auto", amount: 0.5, ease: "power3.inOut" },
    });
  };

  useEffect(() => {
    buildGrid();
    hideOverlay();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!stateRef.current.isAnimating) buildGrid();
      }, 100);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      const nextUrl = `${url.pathname}${url.search}`;
      if (nextUrl === currentUrl) return;

      event.preventDefault();
      if (stateRef.current.isAnimating) return;

      stateRef.current.pendingHref = url.pathname + url.search + url.hash;
      void runTransition(stateRef.current.pendingHref);

      // Failsafe: never leave timeline paused if route-ready hook is missed.
      stateRef.current.readyTimeout = setTimeout(() => {
        resolveRouteReady();
      }, 2200);
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
    };
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!stateRef.current.pendingHref) return;
    stateRef.current.pendingHref = null;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolveRouteReady();
      });
    });
  }, [pathname, searchParams]);

  useEffect(
    () => () => {
      if (stateRef.current.readyTimeout) {
        clearTimeout(stateRef.current.readyTimeout);
      }
    },
    [],
  );

  return (
    <div id="page-transition" className={styles.pageTransition} ref={overlayRef} aria-hidden="true">
      <div className={styles.gridContainer} ref={gridRef} />
    </div>
  );
}
