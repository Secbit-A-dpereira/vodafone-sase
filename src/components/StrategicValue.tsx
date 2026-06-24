"use client";

import Image from "next/image";
import Reveal from "./Reveal";

const VALORES = [
  {
    title: "Co-criação de soluções",
    desc: "Trabalhamos em estreita colaboração para desenhar arquiteturas de segurança que se adaptam exatamente às necessidades do seu negócio.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Tecnologia Vodafone Business SASE",
    desc: "Plataforma modular e líder de mercado, permitindo selecionar o conjunto ideal de serviços para uma solução totalmente personalizada.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    title: "Foco no core business",
    desc: "Entregamos o VB SASE como um serviço gerido, libertando a sua equipa da complexidade técnica para se focar no crescimento da empresa.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }
];

export default function StrategicValue() {
  return (
    <section id="parceria-valor" className="px-4 sm:px-6 py-24 bg-[#000000] border-t border-white/5">
      <div className="mx-auto max-w-5xl">
        
        {/* Apple Header */}
        <Reveal className="text-center mb-16" variant="up">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight flex flex-wrap items-center justify-center gap-3 text-center">
            A sua estratégia com o parceiro certo
            <svg className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 text-vodafone" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0A12 12 0 0 0 0 12A12 12 0 0 0 12 24A12 12 0 0 0 24 12A12 12 0 0 0 12 0M16.25 1.12C16.57 1.12 16.9 1.15 17.11 1.22C14.94 1.67 13.21 3.69 13.22 6C13.22 6.05 13.22 6.11 13.23 6.17C16.87 7.06 18.5 9.25 18.5 12.28C18.54 15.31 16.14 18.64 12.09 18.65C8.82 18.66 5.41 15.86 5.39 11.37C5.38 8.4 7 5.54 9.04 3.85C11.04 2.19 13.77 1.13 16.25 1.12Z"/>
            </svg>
          </h2>
        </Reveal>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Column 1: Three Pillars List */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {VALORES.map((val, idx) => (
              <Reveal key={val.title} variant="up" staggerIndex={idx}className="block">
                <div className="flex items-start gap-4 p-5 rounded-2xl border-white/5 card-mobbin bg-white/5 shimmer-hover press">
                  <div className="w-10 h-10 rounded-xl bg-vodafone/10 flex items-center justify-center text-vodafone shrink-0">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary text-sm sm:text-base leading-tight mb-1.5">
                      {val.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-light">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Column 2: Sleek Generated Photo of Cyber Security strategic partnership meeting */}
          <div className="lg:col-span-6 rounded-2xl border-white/5 overflow-hidden aspect-[4/3] shadow-2xl relative group card-mobbin shimmer-hover">
            <Image
              src="/strategic-partnership.png"
              alt="Parceria Estratégica Vodafone Business SASE"
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
              <span className="text-[10px] font-mono font-bold text-vodafone tracking-wider uppercase mb-1">
                Planeamento e Implementação
              </span>
              <h4 className="text-white text-xs font-semibold">
                Configuração alinhada com os seus requisitos
              </h4>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
