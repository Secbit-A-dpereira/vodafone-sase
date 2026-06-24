"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const BENEFICIOS = [
  {
    title: "Governança e conformidade",
    short: "Governança",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    points: [
      "Controlo rigoroso e granular de todos os acessos.",
      "Conformidade nativa sem impactar o atrito operacional."
    ]
  },
  {
    title: "Segurança on-net e off-net",
    short: "Segurança",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    points: [
      "Proteção ubíqua e consistente em qualquer rede.",
      "Arquitetura cloud-native de baixíssima latência."
    ]
  },
  {
    title: "Mobilidade sem atrito",
    short: "Mobilidade",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    points: [
      "Ligações seguras e otimizadas para o utilizador remoto.",
      "Foco total na experiência de quem executa o trabalho."
    ]
  },
  {
    title: "Eficiência operacional",
    short: "Eficiência",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 3v18h18" />
        <polyline points="18.7 8 12 14.7 8.8 11.5 3 17.3" />
      </svg>
    ),
    points: [
      "Modelo Gerido 24/7 que liberta as suas equipas.",
      "Alocação estratégica de recursos no core do negócio."
    ]
  },
  {
    title: "Abstração da complexidade",
    short: "Simplificação",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2z" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    points: [
      "Consolidação de múltiplas funções de rede e segurança.",
      "Mitigação de overhead administrativo e técnico."
    ]
  }
];

export default function BusinessBenefits() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="beneficios-negocio" className="px-4 sm:px-6 py-24 bg-[#000000] border-t border-white/5">
      <div className="mx-auto max-w-5xl">
        
        {/* Apple Header */}
        <Reveal className="text-center mb-12" variant="up">
          <span className="text-xs lg:text-sm font-bold text-vodafone tracking-wider uppercase block mb-3 font-mono">
            BENEFICIOS EM 5 DOMÍNIOS
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            O seu negócio resiliente e protegido
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Como a solução Vodafone Business SASE resolve desfios críticos da infraestrutura moderna.
          </p>
        </Reveal>

        {/* Mobile slide toggles */}
        <div className="flex justify-start items-center border-b border-border/40 pb-3 mb-6 overflow-x-auto no-scrollbar md:hidden gap-1.5 -mx-2 px-2">
          {BENEFICIOS.map((b, idx) => (
            <button
              key={b.title}
              onClick={() => setActiveTab(idx)}
              className={`shrink-0 text-[10px] font-bold py-2 px-2.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === idx
                  ? "bg-vodafone text-white shadow-md shadow-vodafone/30"
                  : "text-text-secondary bg-white/5 border border-white/5"
              }`}
            >
              {b.short}
            </button>
          ))}
        </div>

        {/* Apple grids */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
          {BENEFICIOS.map((b, idx) => (
            <Reveal
              key={b.title}
              variant="up"
              staggerIndex={idx}
              className={`block ${idx === activeTab ? "" : "hidden md:block"}`}
            >
              <div
                className={`h-full rounded-2xl border bg-white/5 p-5 flex flex-col justify-between transition-all duration-300 card-mobbin shimmer-hover press min-h-[200px] ${
                  idx === activeTab ? "border-vodafone/40 bg-vodafone/10" : "border-white/5 bg-white/5"
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-vodafone/10 flex items-center justify-center text-vodafone mb-6">
                    {b.icon}
                  </div>
                  <h3 className="font-bold text-text-primary text-sm leading-tight mb-4 min-h-[36px] flex items-center">
                    {b.title}
                  </h3>
                  <ul className="space-y-3 pt-4 border-t border-white/5">
                    {b.points.map((pt, index) => (
                      <li key={index} className="flex items-start gap-2 text-[10px] text-text-secondary leading-relaxed font-light text-left">
                        <span className="text-vodafone text-xs select-none">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
