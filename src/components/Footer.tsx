"use client";

export default function Footer() {

  return (
    <footer className="relative overflow-hidden bg-[#000000] pt-14 sm:pt-24">
      {/* Tagline */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center pb-6 sm:pb-8">
        <p className="text-[9px] sm:text-[11px] lg:text-sm text-white/40 font-mono tracking-wider">
          Vodafone Business SASE - 2026 Vodafone Open Day
        </p>
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
