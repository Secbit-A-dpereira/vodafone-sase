"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const PILARES = [
  {
    title: "Universal ZTNA",
    subtitle: "Zero Trust Access",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 10 10" opacity="0.3" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    points: [
      { label: "Túneis Automáticos", desc: "Conexão encriptada e transparente por aplicação, eliminando a exposição total da rede." },
      { label: "Verificação Contínua", desc: "Valida a identidade do utilizador (MFA) e a postura do dispositivo a cada sessão ativa." },
      { label: "Transição Suave", desc: "Permite migrar de VPNs tradicionais para regras granulares de ZTNA ao seu próprio ritmo." }
    ]
  },
  {
    title: "VPN Flexível",
    subtitle: "Remote Access",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    points: [
      { label: "IPsec & SSL VPN", desc: "Conetividade segura \"Sempre Ligada\" (Always-on) para garantir acesso a infraestruturas legacy. Suporta Windows 10/11, macOS 12+, iOS 15+, Android 10+ e Linux (Ubuntu 20.04+, RHEL 8+)." },
      { label: "Verificação de Postura", desc: "Bloqueia conexões VPN se o dispositivo perder os padrões de segurança exigidos." },
      { label: "Controlo de Conteúdo", desc: "Filtragem web e proteção de DNS integradas diretamente na sessão remota do utilizador." }
    ]
  },
  {
    title: "Proteção EPP/APT",
    subtitle: "Endpoint Protection",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    points: [
      { label: "Antivírus de Nova Geração", desc: "Defesa baseada em Inteligência Artificial para deter malware e ataques de ransomware." },
      { label: "Gestão de Vulnerabilidades", desc: "Varreduras automáticas nos terminais para detetar e corrigir falhas de segurança em softwares." },
      { label: "Integração Sandbox", desc: "Envio em tempo real de ficheiros suspeitos para análise na nuvem (Cloud Sandbox)." }
    ]
  }
];

export default function FortiClientSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="forticlient-agente" className="px-4 sm:px-6 py-20 bg-surface-2 border-y border-border">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Title */}
        <Reveal className="text-center mb-10" variant="up">
          <span className="inline-block text-xs font-mono text-vodafone bg-vodafone/10 px-2.5 py-1 rounded mb-3">
            AGENTE DE SEGURANÇA
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
            Segurança total com FortiClient
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
            O <strong>FortiClient</strong> é um agente modular leve que simplifica a segurança das máquinas de trabalho. Consolida conetividade cifrada, postura do equipamento e defesa ativa numa única solução gerida centralmente.
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
            Security Fabric
          </span>
          <p className="text-[10px] text-text-secondary leading-relaxed">
            O agente partilha dados de telemetria em tempo real com toda a arquitetura corporativa, permitindo que firewalls FortiGate e/ou clouds SSE apliquem políticas de segurança adaptativas com base no risco dinâmico de cada utilizador.
          </p>
        </div>

      </div>
    </section>
  );
}
