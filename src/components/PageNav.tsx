"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";
import { NAV_ITEMS } from "@/config/navigation";

export default function PageNav() {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/+$/, "") || "/";

  const currentIdx = NAV_ITEMS.findIndex((p) => p.href === currentPath);
  if (currentIdx === -1) return null;

  const prev = currentIdx > 0 ? NAV_ITEMS[currentIdx - 1] : null;
  const next = currentIdx < NAV_ITEMS.length - 1 ? NAV_ITEMS[currentIdx + 1] : null;

  return (
    <Reveal variant="fade" className="border-t border-white/[0.03]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-2 text-[12px] font-medium text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">{prev.label}</span>
            <span className="sm:hidden">Anterior</span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex items-center gap-2 text-[12px] font-medium text-white/40 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">{next.label}</span>
            <span className="sm:hidden">Seguinte</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </Reveal>
  );
}
