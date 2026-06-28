import BrailleField from "./BrailleField";
import AnimatedCounter from "./AnimatedCounter";

// Trust strip — social proof layer that lives right under the hero.
// Refined for premium feel: Vodafone + Fortinet co-branding, stronger trust signals.

const VERTICALS = [
  {
    name: "Banca & Seguros",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Retalho & Distribuição",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Saúde & Clínicas",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 21s-7-4.5-7-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-7 11-7 11h-4Z" strokeLinejoin="round" />
        <path d="M9 11h2v-2h2v2h2v2h-2v2h-2v-2H9v-2Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Indústria & Produção",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 21V10l5 3V10l5 3V10l5 3v8H3ZM7 17h2M11 17h2M15 17h2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Serviços & Consultoria",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2ZM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Sector Público",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-6 9 6M9 10h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "99.99%", label: "SLA contratual de disponibilidade SASE" },
  { value: "24/7", label: "Suporte técnico dedicado Vodafone" },
  { value: "170+", label: "PoPs espalhadas pela Europa, Ásia, Américas" },
];

const SECURITY_BADGES = [
  { label: "ISO 27001", desc: "Certificado" },
  { label: "RGPD", desc: "Conforme" },
  { label: "NIS2", desc: "Diretiva UE" },
  { label: "SOC 2", desc: "Tipo II" },
];

export default function TrustStrip() {
  return (
    <section
      id="trust-strip"
      aria-label="Prova social e sectores servidos"
      className="relative bg-[#000000] border-y border-white/5 overflow-hidden"
    >
      {/* Vodafone + Fortinet co-branding badge */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 sm:pt-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase tracking-widest font-mono">
            <span className="text-vodafone font-bold">Vodafone Business</span>
            <span className="text-border-light mx-1">×</span>
            <span className="text-fortinet font-bold">Fortinet</span>
          </div>
          <span className="hidden sm:inline-block w-px h-4 bg-white/10" />
          <span className="hidden sm:inline-block text-[10px] text-text-muted font-mono tracking-wider">
            Serviço totalmente gerido
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-10 sm:pb-14">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            A escolha de empresas líderes em sectores críticos
          </h2>
        </div>

        {/* Vertical chips row — symmetrical grid */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-10 max-w-2xl mx-auto">
          {VERTICALS.map((v) => (
            <li
              key={v.name}
              className="group flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-vodafone/40 hover:bg-white/[0.05] transition-all duration-300 w-full"
            >
              <span className="text-text-secondary group-hover:text-vodafone transition-colors">
                {v.icon}
              </span>
              <span className="text-[11px] sm:text-xs lg:text-sm font-semibold text-text-secondary group-hover:text-white tracking-wide transition-colors">
                {v.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-[#000000] p-5 sm:p-6 text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-1">
                {s.value === "99.99%" ? (
                  <><AnimatedCounter target={99.99} decimals={2} suffix="%" duration={2500} /></>
                ) : s.value === "24/7" ? (
                  <><AnimatedCounter target={24} duration={2000} /><span className="text-vodafone/60 text-xl">/</span><AnimatedCounter target={7} duration={2000} /></>
                ) : (
                  <><AnimatedCounter target={170} duration={2000} suffix="+" /></>
                )}
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-text-secondary leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Security certification badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {SECURITY_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] sm:text-xs lg:text-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green shrink-0" />
              <span className="font-bold text-white">{badge.label}</span>
              <span className="text-text-muted">·</span>
              <span className="text-text-secondary">{badge.desc}</span>
            </div>
          ))}
        </div>

        {/* Compliance line */}
        <p className="text-center text-[10px] sm:text-xs lg:text-sm text-text-muted font-mono tracking-wider uppercase mt-6">
          Compatível com RGPD · ISO/IEC 27001 · NIS2 — Auditoria contínua
        </p>
      </div>
    <BrailleField count={18} />
    </section>
  );
}
