"use client";

import { useState, useEffect, useRef } from "react";

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.4;
const STEP = 0.1;
const DEFAULT_SCALE = 1;

export default function Footer() {
  const [scale, setScale] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("font-scale");
      if (stored) {
        const v = parseFloat(stored);
        if (!isNaN(v) && v >= MIN_SCALE && v <= MAX_SCALE) return v;
      }
    }
    return DEFAULT_SCALE;
  });

  const appliedRef = useRef(false);
  useEffect(() => {
    if (!appliedRef.current) {
      appliedRef.current = true;
      document.documentElement.style.setProperty("--font-scale", String(scale));
    }
  }, [scale]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(scale));
    localStorage.setItem("font-scale", String(scale));
  }, [scale]);

  const increase = () => setScale(s => Math.min(s + STEP, MAX_SCALE));
  const decrease = () => setScale(s => Math.max(s - STEP, MIN_SCALE));
  const reset = () => setScale(DEFAULT_SCALE);

  return (
    <footer className="relative overflow-hidden bg-[#000000] pt-14 sm:pt-24">
      {/* Tagline + Font size controls */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center pb-6 sm:pb-8">
        <p className="text-[9px] sm:text-[11px] text-white/40 font-mono tracking-wider mb-4">
          Vodafone Business SASE - 2026 Vodafone Open Day
        </p>

        {/* Font size controls */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono">
          <button
            onClick={decrease}
            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 text-text-secondary hover:text-white hover:border-white/20 transition-all active:scale-90"
            aria-label="Diminuir tamanho da letra"
          >
            A−
          </button>
          <button
            onClick={reset}
            className="px-3 h-8 rounded-lg bg-white/[0.04] border border-white/10 text-text-secondary hover:text-white hover:border-white/20 transition-all active:scale-90 text-[10px]"
            aria-label="Repor tamanho da letra"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={increase}
            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 text-text-secondary hover:text-white hover:border-white/20 transition-all active:scale-90"
            aria-label="Aumentar tamanho da letra"
          >
            A+
          </button>
        </div>
      </div>

      {/* VB SASE — large, naturally positioned, cropped only by page bottom */}
      <div className="relative overflow-visible pointer-events-none select-none text-center">
        <h2
          className="text-[clamp(3rem,35vw,20rem)] sm:text-[clamp(4rem,20vw,18rem)] font-extrabold text-white/[0.07] tracking-tight leading-[0.8] -mb-[0.2em]"
        >
          <span className="block sm:inline">VB </span><span className="block sm:inline">SASE</span>
        </h2>
      </div>
    </footer>
  );
}
