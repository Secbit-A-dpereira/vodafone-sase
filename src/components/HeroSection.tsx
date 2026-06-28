"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import BrailleField from "./BrailleField";

const SLIDES = [
  {
    tag: "CONECTIVIDADE & SEGURANÇA",
    title: "Sempre ligados Sempre seguros",
    desc: "Utilizadores e dados seguros em todo o lado.",
    bg: "bg-[radial-gradient(circle_at_center,_var(--color-vodafone-glow)_0%,_transparent_75%)]"
  },
  {
    tag: "MINIMIZAR IMPACTOS",
    title: "Identidade e o Contexto como fatores decisão",
    desc: "Credênciais de acesso não servem mais como um controlo de segurança",
    bg: "bg-[radial-gradient(circle_at_center,_var(--color-vodafone-glow)_0%,_transparent_75%)]"
  },
  {
    tag: "A OFERTA INTEGRADA",
    title: "Solução chave-na-mão",
    desc: "O negócio é consigo, a segurança é connosco. Ao seu lado 24/7",
    bg: "bg-[radial-gradient(circle_at_center,_var(--color-vodafone-glow)_0%,_transparent_75%)]"
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const touchStartRef = useRef(0);
  const SLIDE_DURATION = 10000;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay slides every 10 seconds with progress bar
  useEffect(() => {
    const startTime = Date.now();
    const slideTimer = setInterval(nextSlide, SLIDE_DURATION);
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);
    return () => {
      clearInterval(slideTimer);
      clearInterval(progressTimer);
    };
  }, [current, nextSlide]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }, [nextSlide, prevSlide]);

  return (
    <section
      id="hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 pt-24 pb-12 overflow-hidden select-none bg-[#000000]"
    >
      {/* 2. Soft Red Glow Backdrop Waves */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.22] bg-[radial-gradient(circle_at_center,_var(--color-vodafone-glow)_0%,_transparent_70%)]" />
 <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_50%,_var(--color-surface)_100%)] pointer-events-none" />

      {/* 2.5 Central readability vignette: keeps the canvas visible at the
           edges but darkens the middle band where the headline + body sit. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 48%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* 3. CENTER PIECE: Extremely Premium Centered Layout (Reference Look & Feel) */}
      <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center justify-between min-h-[72vh] w-full">
        
        {/* Hero Title (Massive typography, beautiful centered layout) */}
        <div className="my-auto flex flex-col items-center justify-center max-w-3xl px-2">
        {/* Tag above title */}
        <div className="animate-fade-in-up mb-2 sm:mb-3">
          <span className="text-[10px] sm:text-xs font-extrabold text-vodafone tracking-[0.25em] uppercase block font-mono">
            {SLIDES[current].tag}
          </span>
        </div>
          <h1 className="text-[34px] sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-5 select-none font-sans drop-shadow-2xl animate-fade-in-up">
            {SLIDES[current].title}
          </h1>

          {/* Subtitle description */}
          <p className="text-xs sm:text-base md:text-lg text-text-secondary/85 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md animate-fade-in-up">
            {SLIDES[current].desc}
          </p>



          {/* Vodafone + Fortinet co-branding */}
          <div className="mt-8 animate-fade-in-up flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Serviço totalmente gerido</span>
              <span className="text-xs font-bold text-vodafone tracking-wider">Vodafone Business</span>
              <span className="text-border-light text-[10px] mx-0.5">·</span>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">tecnologia</span>
              <span className="text-xs font-bold text-fortinet tracking-wider">Fortinet</span>
            </div>
          </div>
          <div className="flex gap-1.5 mt-6 justify-center w-full max-w-xs mx-auto animate-fade-in-up">
            {SLIDES.map((_, idx) => (
              <div
                key={idx}
                className="h-1 rounded-full bg-white/10 overflow-hidden transition-all duration-500 ease-in-out"
                style={{ flex: idx === current ? 1 : 0.35 }}
              >
                <div
                  className="h-full rounded-full bg-vodafone transition-all duration-75 ease-linear"
                  style={{ width: idx === current ? `${progress}%` : "0%" }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll-down CTA — fixed at bottom of hero, fades on scroll */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 z-10 pointer-events-none overflow-hidden transition-opacity duration-500"
        style={{ opacity: Math.max(0, 1 - scrollY / 100) }}
      >
        {/* Semi-circle glow from corner to corner */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(230,0,0,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-fade-in-up text-center">
          <span className="text-sm sm:text-base text-white tracking-wider font-light drop-shadow-lg">
            ↓ Descubra os setores que já estão a adotar este serviço
          </span>
        </div>
      </div>
      <BrailleField count={30} />
    </section>
  );
}
