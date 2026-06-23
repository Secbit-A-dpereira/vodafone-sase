"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import BrailleField from "./BrailleField";

const FAQS = [
  {
    q: "O que diferencia o ZTNA de uma VPN tradicional?",
    a: "A VPN tradicional, tipicamente, concede acesso total à rede interna, gerando uma exposição a ataques, como por exemplo, moivmentação lateral. O Vodafone Business SASE utiliza ZTNA (Zero Trust Network Access): onde valida continuamente o dispositivo (postura do SO, antivírus, patches), a identidade (MFA via SAML 2.0) e concede acesso estrito apenas à aplicação solicitada."
  },
  {
    q: "Como é constituida a SBOM(Sofware Bill of Materials)?",
    a: "É um modelo baseado no número de utilizadores multiplicado por mensalidades de 12/24/36. Inclui licenciamento SASE, suporte técnico dedicado Portugal e gestão da aplicação."
  },
  {
    q: "É necessário substituir a nossa infraestrutura de rede atual?",
    a: "Não. A solução foi desenhada para coexistir de forma híbrida: pode iniciar apenas com extensão Secure Browser (Chrome/Edge) para BYOD sem alteração física. A migração de VPN tradicional para ZTNA é faseada, sem cutover. Suporta túneis IPsec/IKEv2 e SSL VPN como fallback durante a transição."
  },
  {
    q: "Quanto tempo demora o processo de implementação operacional?",
    a: "Assessment + pilot (2-3 semanas): 50 utilizadores, 2-3 lojas/sites. Rollout faseado (4-8 semanas): ondas de 50-100 utilizadores por semana, com cutover em fim-de-semana. Total típico: 6-10 semanas para 100-500 utilizadores. Via Secure Browser Extension (BYOD apenas): rollout inicial em <5 dias úteis."
  },
  {
    q: "A privacidade dos colaboradores é salvaguardada em BYOD?",
    a: "Sim. O agente FortiClient e a extensão Secure Browser (Chrome/Edge) filtram exclusivamente tráfego para domínios e aplicações corporativas (M365, Salesforce, ServiceNow, etc.). A navegação pessoal permanece isolada e privada. Políticas DLP aplicam-se apenas a ficheiros classificados como confidenciais (PCI-DSS, RGPD)."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="px-4 sm:px-6 py-24 bg-[#000000] border-t border-white/5">
      <div className="mx-auto max-w-3xl">
        {/* Apple Title */}
        <Reveal className="text-center mb-16" variant="up">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
            Esclareça as questões essenciais sobre custos, implementação e privacidade da solução SASE.
          </p>
        </Reveal>

        {/* Dynamic Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <Reveal key={idx} variant="up" delay={idx * 100} className="block">
                <div
                  className="rounded-2xl border border-white/5 bg-surface-3/30 transition-all duration-300 overflow-hidden"
                >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 hover:bg-surface-3/50 transition-colors"
                >
                  <span className="text-sm font-bold text-text-primary leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-vodafone bg-vodafone/5 border-vodafone/30" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[200px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="p-6 text-xs sm:text-sm text-text-secondary leading-relaxed font-light text-left">
                    {faq.a}
                  </p>
                </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    <BrailleField count={20} />
    </section>
  );
}
