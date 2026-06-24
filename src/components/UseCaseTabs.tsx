"use client";

import Reveal from "./Reveal";

interface SectorCard {
  id: string;
  label: string;
  icon: string;
  challenge: string;
  solutions: string[];
  metrics: { label: string; value: string }[];
}

const SECTORS: SectorCard[] = [
  {
    id: "finance",
    label: "Banca & Seguros",
    icon: "🏦",
    challenge: "Conformidade Regulatória Estrita & BYOD Externo - auditores e peritos necessitam de aceder a dados sensíveis de clientes sob regras GDPR e PCI-DSS.",
    solutions: [
      "Acesso Agentless (ZTNA) a apps web sem instalar software no PC do parceiro",
      "DLP Ativo bloqueia envio de dados bancários (PCI) para repositórios não autorizados",
    ],
    metrics: [
      { label: "Conformidade", value: "GDPR/PCI" },
      { label: "Acesso BYOD", value: "Protegido" },
    ],
  },
  {
    id: "retail",
    label: "Retalho & Distribuição",
    icon: "🏪",
    challenge: "Conectividade de lojas, POS e quiosques - reduzir latência do POS para faturação e gestão de stocks em tempo real sem perdas de transação.",
    solutions: [
      "SD-WAN + 5G Backup: transações de POS sempre online com failover instantâneo",
      "Descarregamento local: tráfego de pagamento otimizado diretamente ao destino",
    ],
    metrics: [
      { label: "Latência POS", value: "< 15ms" },
      { label: "Uptime Lojas", value: "99.99%" },
    ],
  },
  {
    id: "healthcare",
    label: "Saúde & Clínicas",
    icon: "🏥",
    challenge: "Proteção de registos clínicos e acesso médico móvel - acesso rápido a fichas de pacientes via tablets com validação de postura prévia.",
    solutions: [
      "Postura de Dispositivo ZTNA: autoriza acesso apenas com antivírus ativo no tablet",
      "Isolamento de sessão: bloqueia malware impedindo contaminação da rede hospitalar",
    ],
    metrics: [
      { label: "Risco de Fuga", value: "Minimizado" },
      { label: "Login Médico", value: "< 3s" },
    ],
  },
  {
    id: "corporate",
    label: "Serviços & Escritórios",
    icon: "🏢",
    challenge: "Escritórios híbridos, performance M365 e Shadow IT - garantir chamadas Teams rápidas sem VPN e controlar fugas de IP em ferramentas de IA.",
    solutions: [
      "Fim da VPN: ligações diretas otimizadas para Teams, Office 365 e Salesforce",
      "Governo GenAI (CASB): auditoria e bloqueio de uploads de dados internos em ChatGPT",
    ],
    metrics: [
      { label: "Menos Chamadas TI", value: "95%" },
      { label: "Controlo de IA", value: "Ativo" },
    ],
  },
];

export default function UseCaseTabs() {
  return (
    <section id="casos-de-uso" className="px-4 sm:px-6 py-20 bg-[#000000]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Reveal className="text-center mb-14" variant="up">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">
            Valor prático por indústria
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Como respondemos aos desafios regulatórios, operacionais e de segurança em cada setor.
          </p>
        </Reveal>

        {/* Grid — all sectors visible at once */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {SECTORS.map((sector, idx) => (
            <Reveal key={sector.id} variant="up" staggerIndex={idx}>
              <div className="group bg-surface-3/20 border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-white/15 transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{sector.icon}</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {sector.label}
                    </h3>
                  </div>
                </div>

                {/* Challenge */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono font-bold text-vodafone tracking-wider uppercase block mb-2">
                    🎯 Desafio
                  </span>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {sector.challenge}
                  </p>
                </div>

                {/* Solutions */}
                <div className="mb-4 flex-1">
                  <span className="text-[10px] font-mono font-bold text-text-muted tracking-wider uppercase block mb-2">
                    ✅ Solução SASE
                  </span>
                  <ul className="space-y-2">
                    {sector.solutions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                        <span className="text-accent-green mt-0.5 shrink-0">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5 mt-auto">
                  {sector.metrics.map((m) => (
                    <div key={m.label} className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-base sm:text-lg font-extrabold text-vodafone block leading-none">
                        {m.value}
                      </span>
                      <span className="text-[9px] text-text-muted uppercase tracking-wider mt-1 block">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
