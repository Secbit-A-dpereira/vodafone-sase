"use client";

import { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const KB_ACCORDIONS: AccordionItem[] = [
  {
    title: "Agente FortiClient: ZTNA & postura dinâmica",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    content: `O FortiClient fornece telemetria e validação contínua de postura para ZTNA (Zero Trust Network Access).

• Telemetria Contínua: Recolhe estado do sistema (OS, patches ativos, antivírus, assinaturas, certificados e processos ativos).
• Security Posture Tagging (ZTNA Tags): Regras lógicas no painel central classificam o dispositivo dinamicamente (Ex: "AV-Active", "WIN11-Latest-Patched").
• Validação Dinâmica: O FortiGate Access Proxy (enforcement point) avalia as tags ativas em tempo real. Se o utilizador desativar o antivírus ou falhar a conformidade, as tags são revogadas e o acesso às aplicações privadas é bloqueado em poucos segundos.
• Conectividade Híbrida: Suporta encapsulamento seguro ZTNA para aplicações específicas e fallback automático para túneis VPN SSL/IPSec tradicionais se necessário.`,
  },
  {
    title: "Acesso Agentless & Secure Browser",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 5-5 5 5 0 0 0-5-5z" />
      </svg>
    ),
    content: `Permite estender a conectividade SASE de forma segura a parceiros externos, consultores ou dispositivos pessoais (BYOD) sem necessidade de instalação de software.

• Portal de Marcadores ZTNA: Acesso seguro por browser a aplicações web internas e privadas através de túneis encriptados por sessão.
• Proxy Auto-Configuration (PAC): O tráfego de navegação web (Secure Web Gateway/SWG) é redirecionado de forma transparente utilizando ficheiros PAC alojados na cloud SASE.
• Extensão Secure Browser (Chrome/Edge): Garante isolamento profundo no browser contra phishing de hora zero, injeção de scripts maliciosos e exfiltração de dados (DLP no browser, como bloqueio de copy/paste e downloads não aprovados).
• Autenticação SSO: Integração total com SAML 2.0 (Azure AD/Entra ID, Okta, Google Workspace) para controlo restrito de identidade antes do acesso.`,
  },
  {
    title: "SSPM: SaaS Security Posture Management",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    content: `Integrado nativamente com a tecnologia líder Suridata para garantir a conformidade e proteção do stack moderno de aplicações SaaS.

• Deteção de Desvio (Configuration Drift): Deteta automaticamente desvios nas configurações de segurança em ferramentas como M365, Salesforce e ServiceNow, prevenindo vulnerabilidades ativas.
• Postura de Acesso e Identidades: Análise detalhada de utilizadores inativos, permissões excessivas, partilhas públicas de ficheiros e tokens OAuth/plugins de terceiros associados a contas corporativas.
• Governação de IA Generativa (GenAI): Identificação em tempo real de acessos a motores públicos de IA e extensões não aprovadas, reduzindo o risco de fugas de propriedade intelectual.
• DLP & DSPM Integrado: Motor avançado de proteção que faz scanning de dados em repouso e em trânsito, aplicando regras PCI-DSS, GDPR e LGPD para bloquear ficheiros com dados confidenciais ou bancários.`,
  },
  {
    title: "SD-WAN gerido & conectividade híbrida",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    ),
    content: `Conectividade inteligente e otimizada que unifica as sucursais e escritórios físicos da sua organização com a cloud do SASE.

• Encaminhamento Baseado em Aplicação (Application Steering): Identifica e prioriza aplicações empresariais críticas e SaaS sobre tráfego web geral.
• WAN Link Load Balancing: Avaliação dinâmica da latência e perda de pacotes em múltiplos links WAN físicos redundantes (Fibra primária, Backup 4G/5G).
• Descarregamento de Segurança Local: Encaminha tráfego de internet não crítico de forma segura diretamente da sucursal sem sobrecarregar a rede interna central (backhauling), reduzindo o jitter de voz.`,
  },
  {
    title: "Inspeção Deep SSL & cifras TLS",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    content: `Descodificação e inspeção profunda de tráfego HTTPS cifrado sem comprometer o desempenho do utilizador.

• TLS 1.3 Suportado nativamente com cifras modernas: TLS_AES_256_GCM_SHA384 e TLS_CHACHA20_POLY1305_SHA256.
• Cifras TLS 1.2: ECDHE-RSA-AES256-GCM-SHA384, ECDHE-RSA-AES128-GCM-SHA256, curvas elípticas X25519 e prime256v1.
• Integração de HSM: Suporte a módulos FIPS 140-2 Level 3 para armazenamento seguro de chaves privadas de descodificação.
• Bypass Técnico Inteligente: Tráfego para serviços SaaS altamente confiáveis (classificados pela base de inteligência FortiGuard) é descarregado diretamente sem inspeção profunda de pacotes, garantindo baixa latência.`,
  },
];

export default function TechnicalKB() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="documentacao" className="px-4 sm:px-6 py-20 bg-surface">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary mb-3">
            Documentação técnica SASE
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            Explore as especificações de conectividade e segurança incorporadas na solução gerida Vodafone Business SASE.
          </p>
        </div>

        <div className="space-y-4">
          {KB_ACCORDIONS.map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface-2 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-surface-3/50"
              >
                <div className="flex items-center gap-3">
                  <span className={`transition-colors duration-200 ${expandedIndex === i ? "text-vodafone" : "text-text-muted"}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-text-primary">{item.title}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-text-muted transition-transform duration-200 shrink-0 ${
                    expandedIndex === i ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {expandedIndex === i && (
                <div className="px-5 pb-5 pt-1 border-t border-border/40 animate-fade-in-up">
                  <pre className="text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-wrap font-sans">
                    {item.content}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
