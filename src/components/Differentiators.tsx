"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    title: "Modelo de negócio unificado",
    short: "Modelo",
    desc: "Consolidamos licenciamento, tecnologia e serviços num modelo \"As-a-Service\". Uma única fatura, sem custos ocultos ou fragmentação de fornecedores.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    title: "Escalabilidade por utilizador",
    short: "Escalabilidade",
    desc: "Custo previsível baseado no número de utilizadores. Pague apenas pelo que utiliza, permitindo um planeamento financeiro ágil e sem desperdício de CAPEX.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Gestão e suporte 24/7",
    short: "Suporte 24/7",
    desc: "Proposta \"Turnkey\" que inclui o setup inicial, configuração da arquitetura e suporte contínuo por especialistas em cibersegurança.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  }
];

export default function Differentiators() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="diferenciadores" className="px-4 sm:px-6 py-24 bg-[#000000] border-t border-white/5">
      <div className="mx-auto max-w-5xl">
        
        {/* Apple Header */}
        <Reveal className="text-center mb-12" variant="up">
          <span className="text-xs lg:text-sm font-bold text-vodafone tracking-wider uppercase block mb-3 font-mono">
            PORQUÊ A VODAFONE?
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Os nossos pontos diferenciadores
          </h2>
        </Reveal>

        {/* Mobile slide toggles */}
        <div className="flex justify-start items-center border-b border-border/40 pb-3 mb-6 overflow-x-auto no-scrollbar md:hidden gap-1.5 -mx-2 px-2">
          {ITEMS.map((item, idx) => (
            <button
              key={item.title}
              onClick={() => setActiveTab(idx)}
              className={`shrink-0 text-[10px] font-bold py-2 px-2.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === idx
                  ? "bg-vodafone text-white shadow-md shadow-vodafone/30"
                  : "text-text-secondary bg-white/5 border border-white/5"
              }`}
            >
              {item.short}
            </button>
          ))}
        </div>

        {/* Presentation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {ITEMS.map((item, idx) => (
            <Reveal key={item.title} variant="up" staggerIndex={idx} className={`block ${idx === activeTab ? "" : "hidden md:block"}`}>
              <div
                className={`h-full rounded-2xl border bg-white/5 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 card-mobbin shimmer-hover press ${
                  idx === activeTab ? "border-vodafone/40 bg-vodafone/10" : "border-white/5 bg-white/5"
                }`}>
              <div className="text-left">
                  <div className="w-12 h-12 rounded-2xl bg-vodafone/10 flex items-center justify-center text-vodafone mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-text-primary text-base sm:text-lg leading-tight mb-4 min-h-[44px] flex items-center">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light pt-4 border-t border-white/5">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
