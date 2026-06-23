"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Normalize pathname for active-menu comparison (handles trailingSlash: true)
  const currentPath = pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 border-b z-[9999] ${
        scrolled && !menuOpen
          ? "bg-[#000000]/95 backdrop-blur-md border-white/5 shadow-lg shadow-black/80"
          : menuOpen
            ? "bg-[#000000] border-white/10"
            : "bg-[#000000]/85 backdrop-blur-md border-white/5 md:bg-transparent md:backdrop-blur-none md:border-transparent md:border-b-0"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-left shrink-0"
        >
          <div className="flex items-center gap-1.5">
            {/* Vodafone speechmark icon */}
            <svg className="w-6 h-6 shrink-0 text-vodafone" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0A12 12 0 0 0 0 12A12 12 0 0 0 12 24A12 12 0 0 0 24 12A12 12 0 0 0 12 0M16.25 1.12C16.57 1.12 16.9 1.15 17.11 1.22C14.94 1.67 13.21 3.69 13.22 6C13.22 6.05 13.22 6.11 13.23 6.17C16.87 7.06 18.5 9.25 18.5 12.28C18.54 15.31 16.14 18.64 12.09 18.65C8.82 18.66 5.41 15.86 5.39 11.37C5.38 8.4 7 5.54 9.04 3.85C11.04 2.19 13.77 1.13 16.25 1.12Z"/>
            </svg>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-text-primary uppercase tracking-wider leading-none">vodafone</span>
              <span className="text-xs font-semibold text-text-primary uppercase tracking-wider leading-none">business</span>
            </div>
          </div>
          <span className="text-border-light font-light text-sm mx-1">|</span>
          <div className="flex items-center gap-0.5">
            <span className="text-text-primary text-sm font-semibold">SASE</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[10px] font-bold transition-all duration-200 uppercase tracking-widest px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-white bg-vodafone/15 shadow-[0_0_12px_rgba(230,0,0,0.25)] border border-vodafone/20"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 active:scale-90 transition-transform"
            aria-label="Abrir menu"
          >
            <span
              className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </header>

    {menuOpen && (
      <div className="fixed inset-0 top-16 bottom-0 z-[9998] bg-[#000000]/98 md:hidden overflow-y-auto transition-all duration-300 backdrop-blur-md">
        <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold text-vodafone tracking-[0.2em] uppercase">Menu</span>
          <span className="text-text-muted text-[11px] font-mono">·</span>
          <span className="text-text-secondary text-[11px] font-mono uppercase tracking-wider">Navegação rápida</span>
        </div>
        <nav className="flex flex-col gap-2.5 pt-4 px-4 pb-8">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full py-4 px-5 text-left text-sm font-extrabold uppercase tracking-widest transition-all rounded-2xl border active:scale-[0.98] flex items-center min-h-[52px] ${
                  isActive
                    ? "text-vodafone bg-vodafone/10 border-vodafone/30 shadow-[0_0_12px_rgba(230,0,0,0.15)]"
                    : "text-white bg-white/[0.03] border-white/5 hover:border-white/10"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    )}
    </>
  );
}
