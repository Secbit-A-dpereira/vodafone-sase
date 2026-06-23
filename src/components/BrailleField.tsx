"use client";

import { useEffect, useRef } from "react";

const BRAILLE =
  "⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿";

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

/**
 * BrailleField — injects N braille characters randomly positioned inside
 * its parent's bounding box. Each character slowly morphs to a different
 * braille dot pattern every few seconds.
 *
 * PERFECT FOR: sprinkling braille inside a section with `overflow: hidden`.
 *
 * @param count  Number of braille characters (default 12)
 * @param opacity Char opacity (default 0.50)
 * @param morphMin  Min ms between morphs (default 1500)
 * @param morphMax  Max ms between morphs (default 5000)
 */
export default function BrailleField({
  count = 12,
  opacity = 0.22,
  morphMin = 400,
  morphMax = 1400,
}: {
  count?: number;
  opacity?: number;
  morphMin?: number;
  morphMax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !container.parentElement) return;

    const parent = container.parentElement;
    const pw = parent.clientWidth;
    const ph = parent.clientHeight;
    if (!pw || !ph) return;

    // Position N characters randomly within the parent
    const chars: HTMLSpanElement[] = [];
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.textContent = BRAILLE[rand(0, BRAILLE.length - 1)];
      span.style.position = "absolute";
      span.style.left = `${rand(5, 92)}%`;
      span.style.top = `${rand(5, 92)}%`;
      span.style.fontSize = `${rand(10, 16)}px`;
      span.style.fontWeight = "300";
      span.style.color = "#ffffff";
      span.style.opacity = String(opacity * (0.5 + Math.random() * 0.5));
      span.style.pointerEvents = "none";
      span.style.userSelect = "none";
      span.style.transform = `rotate(${rand(-15, 15)}deg)`;
      span.style.willChange = "contents";
      container.appendChild(span);
      chars.push(span);
    }

    // Morphing loop
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (span: HTMLSpanElement) => {
      const t = setTimeout(
        () => {
          if (!document.body.contains(span)) return;
          span.textContent = BRAILLE[rand(0, BRAILLE.length - 1)];
          schedule(span);
        },
        rand(morphMin, morphMax)
      );
      timers.push(t);
    };
    chars.forEach(schedule);

    return () => {
      timers.forEach(clearTimeout);
      container.innerHTML = "";
    };
  }, [count, opacity, morphMin, morphMax]);

  return <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden" />;
}