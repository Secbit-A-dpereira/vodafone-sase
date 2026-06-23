"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import BrailleField from "./BrailleField";

const SLIDES = [
  {
    tag: "CONECTIVIDADE & SEGURANÇA",
    title: "Vodafone Business Secure Access Service Edge",
    desc: "Conectividade sem limites, segurança em todo o lado.",
    bg: "bg-[radial-gradient(circle_at_center,_var(--color-vodafone-glow)_0%,_transparent_75%)]"
  },
  {
    tag: "MINIMIZAR FUGAS",
    title: "O novo perímetro de segurança é a identidade e o contexto",
    desc: "Proteja o acesso à Internet e à informação sensível. Evite a fuga de dados",
    bg: "bg-[radial-gradient(circle_at_center,_var(--color-vodafone-glow)_0%,_transparent_75%)]"
  },
  {
    tag: "A OFERTA INTEGRADA",
    title: "Solução chave-na-mão",
    desc: "Desenhamos, instalamos e gerimos toda a infraestrutura de segurança e rede. Suporte técnico dedicado 24/7 pela Vodafone.",
    bg: "bg-[radial-gradient(circle_at_center,_var(--color-vodafone-glow)_0%,_transparent_75%)]"
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStartRef = useRef(0);
  const SLIDE_DURATION = 10000;

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

  // Full-bleed high-DPI SASE network particles backdrop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      setupNodes();
    };
    window.addEventListener("resize", handleResize);

    interface SaseNode {
      x: number;
      y: number;
      label: string;
      role: "input" | "hub" | "output";
      radius: number;
      pulse: number;
      icon: string;
    }

    interface Packet {
      x: number;
      y: number;
      from: SaseNode;
      to: SaseNode;
      progress: number;
      speed: number;
      color: string;
    }

    const nodes: SaseNode[] = [];
    const packets: Packet[] = [];

    const setupNodes = () => {
      nodes.length = 0;
      const isMobile = width < 768;

      // Center Hub
      nodes.push({
        x: width / 2,
        y: height * 0.42,
        label: "SASE CORE",
        role: "hub",
        radius: isMobile ? 32 : 44,
        pulse: 0,
        icon: "🛡️"
      });

      // Left Inputs (Net inputs)
      const leftX = isMobile ? width * 0.12 : width * 0.22;
      nodes.push({
        x: leftX,
        y: height * 0.22,
        label: "SD-WAN",
        role: "input",
        radius: isMobile ? 14 : 18,
        pulse: 0,
        icon: "🏪"
      });
      nodes.push({
        x: leftX,
        y: height * 0.42,
        label: "Móvel",
        role: "input",
        radius: isMobile ? 14 : 18,
        pulse: 0,
        icon: "📱"
      });
      nodes.push({
        x: leftX,
        y: height * 0.62,
        label: "HQ",
        role: "input",
        radius: isMobile ? 14 : 18,
        pulse: 0,
        icon: "🏢"
      });

      // Right Outputs (Clouds)
      const rightX = isMobile ? width * 0.88 : width * 0.78;
      nodes.push({
        x: rightX,
        y: height * 0.22,
        label: "SaaS",
        role: "output",
        radius: isMobile ? 14 : 18,
        pulse: 0,
        icon: "☁️"
      });
      nodes.push({
        x: rightX,
        y: height * 0.42,
        label: "Cloud",
        role: "output",
        radius: isMobile ? 14 : 18,
        pulse: 0,
        icon: "📦"
      });
      nodes.push({
        x: rightX,
        y: height * 0.62,
        label: "Internet",
        role: "output",
        radius: isMobile ? 14 : 18,
        pulse: 0,
        icon: "🌍"
      });
    };

    setupNodes();

    const spawnPacket = () => {
      const inputs = nodes.filter(n => n.role === "input");
      const outputs = nodes.filter(n => n.role === "output");
      const hub = nodes.find(n => n.role === "hub");
      if (!hub || inputs.length === 0 || outputs.length === 0) return;

      if (Math.random() > 0.5) {
        const from = inputs[Math.floor(Math.random() * inputs.length)];
        packets.push({
          x: from.x,
          y: from.y,
          from,
          to: hub,
          progress: 0,
          speed: 0.005 + Math.random() * 0.007,
          color: "rgba(230, 0, 0, 0.7)"
        });
      } else {
        const to = outputs[Math.floor(Math.random() * outputs.length)];
        packets.push({
          x: hub.x,
          y: hub.y,
          from: hub,
          to,
          progress: 0,
          speed: 0.005 + Math.random() * 0.007,
          color: "rgba(0, 180, 216, 0.7)"
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle flow paths
      nodes.forEach(node => {
        const hub = nodes.find(n => n.role === "hub");
        if (hub && node.role !== "hub") {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
          ctx.lineWidth = 1;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(hub.x, hub.y);
          ctx.stroke();
        }
      });

      // Update and draw flowing packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        p.x = p.from.x + (p.to.x - p.from.x) * p.progress;
        p.y = p.from.y + (p.to.y - p.from.y) * p.progress;

        ctx.beginPath();
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, width < 768 ? 6 : 9);
        glow.addColorStop(0, p.color);
        glow.addColorStop(0.3, p.color);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.arc(p.x, p.y, width < 768 ? 6 : 9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw all tech nodes
      nodes.forEach(node => {
        node.pulse += 0.012;

        if (node.role === "hub") {
          const r = node.radius + (node.pulse % 1) * (width < 768 ? 40 : 70);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(230, 0, 0, ${0.25 * (1 - (node.pulse % 1))})`;
          ctx.lineWidth = 1;
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = "rgba(8, 8, 12, 0.9)";
          ctx.strokeStyle = "rgba(230, 0, 0, 0.25)";
          ctx.lineWidth = 2;
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.font = `${width < 768 ? "18px" : "24px"} Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.icon, node.x, node.y);

          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.font = `bold ${width < 768 ? "7px" : "9px"} font-mono`;
          ctx.fillText(node.label, node.x, node.y + node.radius + (width < 768 ? 10 : 14));
        } else {
          ctx.beginPath();
          ctx.fillStyle = "rgba(10, 10, 14, 0.85)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
          ctx.lineWidth = 1;
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.font = `${width < 768 ? "11px" : "14px"} Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.icon, node.x, node.y);

          ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
          ctx.font = `${width < 768 ? "6px" : "8px"} font-mono`;
          ctx.fillText(node.label, node.x, node.y + node.radius + (width < 768 ? 8 : 12));
        }
      });

      if (packets.length < 15 && Math.random() < 0.09) spawnPacket();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[96vh] flex items-center justify-center px-4 sm:px-8 pt-24 pb-12 overflow-hidden select-none bg-[#000000]"
    >
      {/* 1. Immersive Network Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.32]"
      />

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

          {/* CTA hint */}
          <div className="mt-4 animate-fade-in-up">
            <span className="text-[11px] text-text-muted tracking-wider">↓ Descubra como proteger a sua empresa</span>
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
      <BrailleField count={30} />
    </section>
  );
}
