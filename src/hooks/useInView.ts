"use client";

import { useEffect, useRef, useState, RefObject } from "react";

/**
 * Single-element IntersectionObserver hook.
 * - rootMargin "-10% 0px" so the element is considered "in view" only when it
 *   has actually scrolled into the user's reading area, not just touched the
 *   viewport edge.
 * - Once visible, stays visible (unobserve) so re-scrolling doesn't re-trigger.
 * - SSR-safe (returns false until mounted on client).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If reduced motion, already handled in initial state
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        }
      },
      options
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
