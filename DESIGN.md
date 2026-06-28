---
name: Vodafone Business SASE
description: Dark editorial design system — minimalista Faizur. Preto + Vodafone red. Premium matte finish.
version: "alpha"
colors:
  primary: "#ffffff"
  vodafone: "#e60000"
  vodafone-dark: "#b30000"
  vodafone-glow: "#e6000040"
  fortinet: "#ed1c24"
  surface: "#000000"
  surface-2: "#08080c"
  surface-3: "#0f0f14"
  surface-4: "#151520"
  border: "rgba(255, 255, 255, 0.06)"
  border-light: "rgba(255, 255, 255, 0.12)"
  text-primary: "#ffffff"
  text-secondary: "#a0a0ab"
  text-muted: "#52525b"
  accent-green: "#06d6a0"
  accent-cyan: "#00b4d8"
typography:
  heading-section:
    fontFamily: "Vodafone Rg, Vodafone Lt, Vodafone, Outfit, Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.025em"
  heading-hero:
    fontFamily: "Vodafone Rg, Vodafone Lt, Vodafone, Outfit, Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.025em"
    lineHeight: 1.08
  body:
    fontFamily: "Vodafone Rg, Vodafone Lt, Vodafone, Outfit, Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 300
    lineHeight: 1.65
  tag:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontWeight: 800
    letterSpacing: "0.25em"
    textTransform: uppercase
  tag-section:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontWeight: 700
    letterSpacing: "0.08em"
    textTransform: uppercase
  branding-label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontWeight: 400
    letterSpacing: "0.1em"
    textTransform: uppercase
  branding-company:
    fontWeight: 700
    letterSpacing: "0.05em"
  tab-label:
    fontWeight: 700
    letterSpacing: "0.05em"
    textTransform: uppercase
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  full: "9999px"
spacing:
  section-y: "6rem"
  section-x-mobile: "16px"
  section-x-desktop: "24px"
  card-inner: "20px"
  tag-gap: "8px"
components:
  section-tag:
    textColor: "{colors.vodafone}"
    typography: tag-section
  section-heading:
    textColor: "{colors.text-primary}"
    typography: heading-section
  button-primary:
    backgroundColor: "{colors.vodafone}"
    textColor: "{colors.text-primary}"
    typography: tab-label
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.vodafone-dark}"
    textColor: "{colors.text-primary}"
    typography: tab-label
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card-gloss:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    borderColor: "rgba(255, 255, 255, 0.08)"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-inner}"
  card-gloss-hover:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    borderColor: "rgba(230, 0, 0, 0.3)"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-inner}"
  pill-inactive:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    borderColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.text-secondary}"
    typography: tab-label
    rounded: "{rounded.full}"
    padding: "8px 16px"
  pill-active:
    backgroundColor: "rgba(230, 0, 0, 0.12)"
    borderColor: "rgba(230, 0, 0, 0.4)"
    textColor: "{colors.vodafone}"
    typography: tab-label
    rounded: "{rounded.full}"
    padding: "8px 16px"
  branding-badge:
    backgroundColor: "rgba(230, 0, 0, 0.08)"
    borderColor: "rgba(230, 0, 0, 0.15)"
    typography: branding-label
    rounded: "{rounded.full}"
    padding: "6px 16px"
  progress-bar-track:
    backgroundColor: "rgba(255, 255, 255, 0.10)"
    rounded: "{rounded.full}"
  progress-bar-fill:
    backgroundColor: "{colors.vodafone}"
    rounded: "{rounded.full}"
  accent-icon:
    backgroundColor: "rgba(230, 0, 0, 0.10)"
    textColor: "{colors.vodafone}"
    rounded: "{rounded.md}"
    size: "40px"
---

## Overview

**Minimalismo editorial Faizur.** Fundo preto puro, tipografia premium, Vodafone red como única cor de destaque. A UI evoca uma publicação de luxo — amplo espaço negativo, hierarquia tipográfica extrema, micro-interações subtis. Nunca "ocupado" ou corporativo genérico.

## Colors

Paleta ancorada em preto absoluto com uma única accent color (Vodafone red). Fortinet red (`#ed1c24`) é secundário e usado apenas em co-branding.

- **Vodafone red (`#e60000`):** A cor de acção. Tags, badges, CTAs, barras de progresso, bordas de hover. NUNCA diluir com gradientes berrantes.
- **Surface (`#000000`):** Fundo preto puro. Não usar cinza escuro como substituto.
- **Superfícies elevadas:** `#08080c` → `#0f0f14` → `#151520`. Escala de 4 níveis para cards, overlays, tooltips.
- **Bordas:** `rgba(255,255,255,0.06)` default, `0.12` para light. Sempre semi-transparentes.
- **Texto:** Branco puro para headings, `#a0a0ab` para corpo, `#52525b` para muted/placeholders.
- **Accent colors:** Verde (`#06d6a0`) e cyan (`#00b4d8`) reservados para diagramas de rede e indicadores de status.

## Typography

Stack: `Vodafone Rg` → `Vodafone Lt` → `Outfit` → `Inter` → system-ui. Monospace: `JetBrains Mono`.

- **Section headings:** `text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight`. NUNCA alterar as classes base/mobile. Aumentos APENAS em `lg:` (≥1024px).
- **Hero heading:** `text-[34px] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.08]`.
- **Body:** `font-light` (`300`), cor `text-secondary`. `leading-relaxed` para parágrafos.
- **Tags:** Monospace, `text-xs lg:text-sm` (mobile/desktop), `tracking-[0.25em] uppercase`, sempre centradas acima do título.
- **Base font:** `16px` mobile, `18px` desktop (`lg:` breakpoint). Body `0.9375rem` (15px).

## Layout

- **Largura máxima:** `max-w-5xl` para secções de conteúdo, `max-w-4xl` para hero.
- **Padding de secção:** Mobile `16px`, desktop `24px` (via `px-4 sm:px-6`). Vertical `py-24`.
- **Scroll:** `scroll-behavior: smooth` com `scroll-padding-top: 4.5rem`.
- **Mobile touch targets:** `min-height: 44px` em botões abaixo de `md:`.
- **Barras de progresso** (não dots) para carrosséis. Barra ativa expande (`flex: 1`), inativas colapsam (`flex: 0.35`).
- **Grid > flex-wrap** para layouts de cards. Evitar wrap imprevisível.

## Elevation & Depth

- Fundo preto absoluto com glow waves Vodafone ultra-sutis (opacidade máx `0.035`).
- Cards usam `backdrop-filter: blur(12px)` + borda `rgba(255,255,255,0.08)` + shadow inset.
- Hover: glow Vodafone subtil (`0 12px 40px -8px rgba(230,0,0,0.2)`).
- A animação `bg-drift` (35s ease-in-out infinite alternate) move as ondas de fundo.

## Shapes

- Cards: `rounded-2xl` (16px) padrão, glass cards `rounded-[1.25rem]` (20px).
- Badges e pills: `rounded-full`.
- Ícones de acção: `rounded-xl` (12px), container 40×40px com fundo `rgba(230,0,0,0.10)`.
- Bordas: 1px solid, sempre semi-transparentes. NUNCA bordas opacas.

## Components

### Section structure
```
<span tag> → mono, vodafone red, uppercase, tracking-wide
<h2>      → text-3xl sm:text-5xl lg:text-6xl font-extrabold
<p>       → text-sm sm:text-base lg:text-lg text-secondary font-light
```

### Branding badge
Badge Vodafone + Fortinet: `rounded-full`, fundo `rgba(230,0,0,0.08)`, texto mono `text-xs lg:text-sm`. Formato: "Serviço totalmente gerido · **Vodafone Business** · tecnologia · **Fortinet**". NUNCA "Distribuído por" nem "Parceiro estratégico".

### Glass cards (card-mobbin)
`rounded-[1.25rem]`, `bg-white/[0.04]`, `border-white/[0.08]`, `backdrop-blur-[12px]`. Hover: border `rgba(230,0,0,0.3)`, shadow Vodafone, `-translate-y-[2px]`.

### Pills (pill-mobbin)
Tabs/filtros: `rounded-full`, `text-xs font-bold tracking-[0.05em] uppercase`. Inactive: `bg-white/[0.03]`. Active: `bg-vodafone/[0.12]`, border `rgba(230,0,0,0.4)`.

### Progress bars
Hero carousel: track `bg-white/10 h-1 rounded-full`, fill `bg-vodafone`. Barra ativa `flex: 1`, inativas `flex: 0.35`.

## Do's and Don'ts

✅ **DO:**
- Fundo preto puro (`#000000`), nunca cinza escuro como substituto
- Vodafone red como ÚNICA accent color de UI
- Font sizes maiores APENAS em `lg:` breakpoint
- Mono para tags e labels técnicas
- Progress bars (não dots) para carrosséis
- Grid em vez de flex-wrap para cards
- `font-light` para body text
- Micro-interações subtis (shimmer, press, fade-in-up)

❌ **DON'T:**
- "Distribuído por" ou "Parceiro estratégico" no branding
- Referências a livros, autores ou "Book Example" na UI
- Gradientes berrantes com Vodafone red
- Aumentar font sizes base/mobile — só mexer em `lg:`
- Dots para indicadores de slide
- Bordas opacas ou cores sólidas para separadores
- Flex-wrap para layouts de grid
- Conteúdo placeholder genérico ("Lorem ipsum")
