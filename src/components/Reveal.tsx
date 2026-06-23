"use client";

import { ReactNode, CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  /** Animation variant */
  variant?: "up" | "fade" | "scale" | "left" | "right" | "stagger";
  /** ms delay before animation starts */
  delay?: number;
  /** Tailwind class */
  className?: string;
  /** Optional HTML tag */
  as?: "div" | "section" | "li" | "article" | "span";
  /** Optional inline style */
  style?: CSSProperties;
  /** Stagger index (auto-calculates delay when > 0) */
  staggerIndex?: number;
}

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
  style,
  staggerIndex,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  // If staggerIndex provided, auto-calculate delay
  const finalDelay = staggerIndex !== undefined ? staggerIndex * 80 : delay;

  const baseTransform =
    variant === "up"
      ? "translate3d(0,30px,0)"
      : variant === "left"
      ? "translate3d(-30px,0,0)"
      : variant === "right"
      ? "translate3d(30px,0,0)"
      : variant === "scale"
      ? "scale(0.93)"
      : "translate3d(0,0,0)";

  const inlineStyle: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0) scale(1)" : baseTransform,
    transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${finalDelay}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${finalDelay}ms`,
    willChange: inView ? "auto" : "opacity, transform",
    ...style,
  };

  return (
    // @ts-expect-error -- dynamic tag
    <Tag ref={ref} className={className} style={inlineStyle}>
      {children}
    </Tag>
  );
}
