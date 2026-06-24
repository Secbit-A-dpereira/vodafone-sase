"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const PILARES = [
  {
    title: "Prevenção contra Fugas",
    subtitle: "Data Loss Prevention",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    points: [
      { label: "Fuga de Informação", desc: "Bloqueia ações sensíveis como copiar/colar (copy/paste), impressão de páginas e uploads em portais não autorizados." },
      { label: "Marcas de Água", desc: "Aplica dinamicamente marcas de água sobre o conteúdo de aplicações críticas para evitar capturas físicas do ecrã." },
      { label: "Controlo de Descarregamento", desc: "Impede o download de dados confidenciais para o armazenamento local de dispositivos unmanaged." }
    ]
  },
  {
    title: "Governação de GenAI",
    subtitle: "SaaS & AI Governance",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    points: [
      { label: "Filtro de GenAI", desc: "Protege dados confidenciais contra a submissão acidental em ferramentas como ChatGPT ou Microsoft Copilot." },
      { label: "Proteção Web Ativa", desc: "Filtro de URL inteligente para barrar acessos a esquemas de phishing e domínios maliciosos em tempo real." },
      { label: "Acessos Condicionais", desc: "Impõe políticas de autenticação e acesso contextual às aplicações cloud e SaaS da organização." }
    ]
  },
  {
    title: "Adoção Sem Atrito",
    subtitle: "Unmanaged Devices",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    points: [
      { label: "Facilidade de Rollout", desc: "Instalação instantânea no Chrome, Edge ou Firefox, dispensando privilégios administrativos no sistema operativo." },
      { label: "Privacidade Total", desc: "Protege apenas o tráfego das abas corporativas, sem tocar nas atividades privadas do utilizador." },
      { label: "Menor Atrito de TI", desc: "Fornece um ambiente empresarial protegido para colaboradores terceiros e BYOD com extrema facilidade de onboarding." }
    ]
  }
];

export default function SecureBrowserSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="securebrowser-agente" className="px-4 sm:px-6 py-20 bg-surface">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Title */}
        <Reveal className="text-center mb-10" variant="up">
          <span className="inline-block text-xs lg:text-sm font-mono text-vodafone bg-vodafone/10 px-2.5 py-1 rounded mb-3">
            SEGURANÇA WEB SEM AGENTE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center tracking-tight leading-tight">
            Proteção SASE em qualquer browser
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A extensão <strong>Fortinet Secure Browser</strong> adiciona controlos robustos de proteção corporativa diretamente no browser atual do utilizador. Ideal para máquinas pessoais (BYOD) e parceiros externos, garante conformidade SASE e DLP avançada de forma ágil e sem atrito.
          </p>
        </Reveal>

        {/* Mobile View: Slide Toggles */}
        <div className="flex justify-start items-center border-b border-border/40 pb-3 mb-6 md:hidden gap-1.5 -mx-2 px-2 overflow-x-auto no-scrollbar">
          {PILARES.map((pilar, idx) => (
            <button
              key={pilar.title}
              onClick={() => setActiveTab(idx)}
              className={`shrink-0 text-[10px] font-bold py-2 px-2.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === idx
                  ? "bg-vodafone text-white shadow-md shadow-vodafone/30"
                  : "text-text-secondary bg-white/5 border border-white/5"
              }`}
            >
              {pilar.title}
            </button>
          ))}
        </div>

        {/* Core Pillars Grid / Presentation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PILARES.map((pilar, idx) => (
            <Reveal key={pilar.title} variant="up" delay={idx * 100} className={`block ${idx === activeTab ? "" : "hidden md:block"}`}>
              <div
                className={`h-full rounded-2xl border bg-surface-3 p-5 flex flex-col justify-between transition-all duration-300 ${
                  idx === activeTab ? "border-vodafone bg-surface-3" : "border-border bg-surface-3/50"
                }`}>
              <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-vodafone/10 flex items-center justify-center text-vodafone shrink-0">
                      {pilar.icon}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-text-muted uppercase tracking-wider block leading-none">
                        {pilar.subtitle}
                      </span>
                      <h3 className="text-base font-bold text-text-primary mt-1 leading-none">
                        {pilar.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-border/30">
                    {pilar.points.map((pt) => (
                      <div key={pt.label} className="text-left">
                        <h4 className="text-xs font-bold text-text-primary flex items-center gap-2 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-vodafone" />
                          {pt.label}
                        </h4>
                        <p className="text-[11px] text-text-secondary leading-relaxed pl-3.5">
                          {pt.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rodapé Informativo */}
        <div className="mt-8 p-4 rounded-xl border border-border bg-surface-3/40 flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-white bg-surface-4 px-2.5 py-1 rounded shrink-0 uppercase tracking-wider leading-none">
            Secure Browser 
          </span>
          <p className="text-[10px] text-text-secondary leading-relaxed">
            Sendo totalmente gerido e integrado na plataforma cloud do <strong className="text-white">Vodafone Business SASE</strong>, o Secure Browser Extension permite aplicar regras de segurança de acessos e de navegação segura numa única extensão no browser que não requer permissões administrativas para instalar.
          </p>
        </div>

      </div>
    </section>
  );
}
