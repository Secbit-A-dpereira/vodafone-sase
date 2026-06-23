"use client";

import { useState, useEffect } from "react";
import Reveal from "./Reveal";

interface UseCase {
  name: string;
  description: string;
  tech: string;
  protocols: string;
  agent: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  useCases: UseCase[];
}

const CATEGORIES: Category[] = [
  {
    id: "sia",
    label: "Secure Internet Access",
    icon: "🌐",
    color: "#00b4d8",
    description:
      "Acesso seguro à internet para utilizadores remotos e sites, através de agente FortiClient, FortiExtender ou FortiAP.",
    useCases: [
      {
        name: "Agente FortiClient",
        description: "Acesso remoto seguro à internet utilizando o agente FortiClient em modo endpoint. Todo o tráfego é inspecionado pelos PoPs globais da FortiSASE.",
        tech: "FortiClient (endpoint mode)",
        protocols: "TCP & UDP",
        agent: "Obrigatório",
      },
      {
        name: "Extensão Browser (Agentless)",
        description: "Acesso seguro sem agente via a instalação de um agente no browser. Ideal para dispositivos de terceiros não geridos.",
        tech: "FortiSASE Browser ext.",
        protocols: "TCP & UDP",
        agent: "Não",
      },
      {
        name: "Site via FortiExtender",
        description: "Extensão LAN da FortiSASE utilizando FortiExtender como thin edge físico para sites remotos sem infraestrutura FortiGate.",
        tech: "FortiExtender (LAN extension)",
        protocols: "TCP & UDP",
        agent: "Dispositivo físico",
      },
      {
        name: "Site via FortiAP",
        description: "Acesso seguro via Access Point FortiAP gerido pela FortiSASE, usando túnel CAPWAP + IPsec encriptado.",
        tech: "FortiAP (CAPWAP + IPsec)",
        protocols: "TCP & UDP",
        agent: "Dispositivo físico",
      },
    ],
  },
  {
    id: "spa",
    label: "Secure Private Access",
    icon: "🔒",
    color: "#e60000",
    description: "Acesso privado a aplicações corporativas on-premises ou em cloud, com suporte ZTNA, SD-WAN e NGFW.",
    useCases: [
      {
        name: "ZTNA (Zero Trust Network Access)",
        description: "Acesso direto (caminho mais curto) a aplicações TCP privadas atrás do FortiGate ZTNA gateway. Requer FortiClient no endpoint para postura, tags e certificados.",
        tech: "FortiGate ZTNA access proxy",
        protocols: "TCP apenas",
        agent: "Obrigatório (FortiClient)",
      },
      {
        name: "SD-WAN Private Access",
        description: "Acesso privado a aplicações TCP e UDP através de rede hub-and-spoke FortiGate SD-WAN. Oferece redundância de datacenter e failover automático.",
        tech: "FortiGate SD-WAN (hub-and-spoke)",
        protocols: "TCP & UDP",
        agent: "Não (baseado em dispositivo)",
      },
      {
        name: "NGFW Private Access",
        description: "Acesso privado a aplicações UDP e suporte a utilizadores sem agente, utilizando o FortiGate NGFW como hub SPA autónomo.",
        tech: "FortiGate NGFW (standalone hub)",
        protocols: "TCP & UDP",
        agent: "Opcional (agentless OK)",
      },
    ],
  },
  {
    id: "ssa",
    label: "Secure SaaS Access",
    icon: "☁️",
    color: "#06d6a0",
    description: "Controlo de acesso e proteção de dados para aplicações SaaS como M365 e Salesforce, via API ou inspeção inline.",
    useCases: [
      {
        name: "FortiCASB (Cloud/API)",
        description: "Inspeção profunda de aplicações SaaS via API cloud. Permite análise detalhada e reporting sem interferir no fluxo de tráfego.",
        tech: "FortiCASB Cloud/API",
        protocols: "Application-layer",
        agent: "Não (API-based)",
      },
      {
        name: "Inline-CASB",
        description: "Controlo de acesso SaaS inline com inspeção SSL profunda. Filtro Web com inserção de headers HTTP e Application Control para permitir, analisar ou bloquear.",
        tech: "FortiSASE Inline-CASB + SSL Deep Inspection",
        protocols: "Application-layer",
        agent: "Não (inline)",
      },
    ],
  },
  {
    id: "combinado",
    label: "SIA & SPA Combinado",
    icon: "⚡",
    color: "#ff9f00",
    description: "Acesso combinado à internet e a aplicações privadas para utilizadores baseados em sites, utilizando FortiGate SD-WAN ou IPsec Branch On-ramp.",
    useCases: [
      {
        name: "Site via FortiGate SD-WAN",
        description: "Extensão LAN da FortiSASE utilizando FortiGate como secure edge. Acesso simultâneo à internet (SIA) e aplicações privadas (SPA).",
        tech: "FortiGate SD-WAN (LAN extension)",
        protocols: "TCP & UDP",
        agent: "Dispositivo físico",
      },
      {
        name: "Branch On-ramp (IPsec)",
        description: "Acesso seguro à internet para sites utilizando túnel IPsec para Branch On-ramp. Ideal para filiais com hardware IPsec existente.",
        tech: "IPsec Branch On-ramp",
        protocols: "TCP & UDP",
        agent: "Dispositivo físico",
      },
    ],
  },
];

/* ───── Responsive hook ───── */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ───── MOBILE DIAGRAMS (stacked vertically) ───── */

function MobileSIADiagram() {
  return (
    <svg viewBox="0 0 360 500" fill="none" className="w-full h-auto">
      <defs>
        <marker id="m-arr-sia" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.35)" />
        </marker>
      </defs>
      <rect width="360" height="500" rx="12" fill="rgba(10,10,14,0.6)" />
      <text x="180" y="22" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="2">SIA — ACESSO INTERNET</text>

      {/* Row 1: Users */}
      <rect x="10" y="35" width="340" height="90" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="180" y="50" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">UTILIZADORES</text>
      <rect x="18" y="58" width="100" height="55" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(91,155,213,0.3)" />
      <text x="68" y="78" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">💻 Agente</text>
      <text x="68" y="95" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">FortiClient</text>
      <rect x="128" y="58" width="100" height="55" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(91,155,213,0.3)" />
      <text x="178" y="78" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🌐 Agentless</text>
      <text x="178" y="95" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">SWG / Browser</text>
      <rect x="238" y="58" width="102" height="55" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(91,155,213,0.3)" />
      <text x="289" y="78" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">📶 Site</text>
      <text x="289" y="95" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Extender/AP</text>

      {/* Arrow down */}
      <line x1="180" y1="130" x2="180" y2="155" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#m-arr-sia)" strokeDasharray="3,3" />

      {/* Row 2: FortiSASE Cloud */}
      <rect x="10" y="160" width="340" height="145" rx="8" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.15)" />
      <rect x="20" y="168" width="320" height="22" rx="4" fill="rgba(218,41,28,0.12)" />
      <text x="180" y="183" textAnchor="middle" fill="#DA291C" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1">FORTISASE CLOUD</text>

      <rect x="18" y="198" width="105" height="40" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="70" y="214" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">🔒 FWaaS</text>
      <text x="70" y="228" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">NGFW + IPS</text>

      <rect x="130" y="198" width="105" height="40" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="182" y="214" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">🌐 SWG</text>
      <text x="182" y="228" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Web Proxy</text>

      <rect x="242" y="198" width="100" height="40" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="292" y="214" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">🛡️ ZTNA</text>
      <text x="292" y="228" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Access Proxy</text>

      <rect x="18" y="245" width="105" height="40" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="70" y="261" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">📦 Sandbox</text>
      <text x="70" y="275" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Anti-Malware</text>

      <rect x="130" y="245" width="210" height="40" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="235" y="261" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">⚡ FortiGuard Threat Intel</text>
      <text x="235" y="275" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">IPS · DNS · C&C · Antibotnet</text>

      {/* Arrow down */}
      <line x1="180" y1="310" x2="180" y2="335" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#m-arr-sia)" strokeDasharray="3,3" />

      {/* Row 3: Destinos */}
      <rect x="10" y="340" width="340" height="85" rx="8" fill="rgba(0,0,0,0.3)" stroke="rgba(91,155,213,0.1)" />
      <text x="180" y="356" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">DESTINOS</text>
      <rect x="18" y="363" width="98" height="50" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="67" y="383" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🌍 Internet</text>
      <text x="67" y="398" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Navegação Web</text>
      <rect x="126" y="363" width="98" height="50" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="175" y="383" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">☁️ SaaS</text>
      <text x="175" y="398" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">M365 · Salesforce</text>
      <rect x="234" y="363" width="108" height="50" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="288" y="383" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🏢 Sites</text>
      <text x="288" y="398" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Acesso Privado</text>

      {/* Legend */}
      <rect x="18" y="435" width="324" height="45" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
      <text x="180" y="450" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="monospace" letterSpacing="1">ACESSO</text>
      <circle cx="50" cy="462" r="3" fill="#00b4d8" />
      <text x="58" y="466" fill="rgba(255,255,255,0.4)" fontSize="7">FortiClient</text>
      <circle cx="170" cy="462" r="3" fill="#06D6A0" />
      <text x="178" y="466" fill="rgba(255,255,255,0.4)" fontSize="7">SWG (Agentless)</text>
      <circle cx="285" cy="462" r="3" fill="#DA291C" />
      <text x="293" y="466" fill="rgba(255,255,255,0.4)" fontSize="7">Site</text>

      {/* SIA badge */}
      <rect x="295" y="12" width="55" height="16" rx="4" fill="rgba(0,180,216,0.15)" />
      <text x="322" y="24" textAnchor="middle" fill="#00b4d8" fontSize="7" fontWeight="bold">4 CASOS</text>
    </svg>
  );
}

function MobileSPADiagram() {
  return (
    <svg viewBox="0 0 360 500" fill="none" className="w-full h-auto">
      <defs>
        <marker id="m-arr-spa" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.35)" />
        </marker>
      </defs>
      <rect width="360" height="500" rx="12" fill="rgba(10,10,14,0.6)" />
      <text x="180" y="22" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="2">SPA — ACESSO PRIVADO</text>

      {/* Row 1: Users */}
      <rect x="10" y="35" width="340" height="80" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="180" y="48" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">UTILIZADORES</text>
      <rect x="16" y="54" width="76" height="50" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(144,99,205,0.3)" />
      <text x="54" y="72" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">💻 Agente</text>
      <text x="54" y="88" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">FortiClient</text>
      <rect x="100" y="54" width="76" height="50" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(144,99,205,0.3)" />
      <text x="138" y="72" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🌐 Agentless</text>
      <text x="138" y="88" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">SWG/Browser</text>
      <rect x="184" y="54" width="76" height="50" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(144,99,205,0.3)" />
      <text x="222" y="72" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🏢 Site</text>
      <text x="222" y="88" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">SD-WAN</text>
      <rect x="268" y="54" width="76" height="50" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(144,99,205,0.3)" />
      <text x="306" y="72" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">📱 Móvel</text>
      <text x="306" y="88" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">BYOD</text>

      {/* Arrow down */}
      <line x1="180" y1="120" x2="180" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#m-arr-spa)" strokeDasharray="3,3" />

      {/* Row 2: FortiSASE Core */}
      <rect x="10" y="150" width="340" height="115" rx="8" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.15)" />
      <rect x="20" y="158" width="320" height="22" rx="4" fill="rgba(218,41,28,0.12)" />
      <text x="180" y="173" textAnchor="middle" fill="#DA291C" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1">FORTISASE CORE</text>
      <rect x="18" y="188" width="108" height="30" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="72" y="203" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">🔐 Autenticação</text>
      <text x="72" y="213" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6">SAML · MFA</text>
      <rect x="134" y="188" width="100" height="30" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="184" y="203" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">🛡️ Postura</text>
      <text x="184" y="213" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6">ZTNA Tags</text>
      <rect x="242" y="188" width="100" height="30" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="292" y="203" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">🔒 Tunnel</text>
      <text x="292" y="213" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6">IPsec · Proxy</text>
      <rect x="18" y="225" width="100" height="30" rx="5" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="68" y="240" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">📊 Analytics</text>
      <text x="68" y="250" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6">FortiAnalyzer</text>

      {/* Arrow down */}
      <line x1="180" y1="270" x2="180" y2="295" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#m-arr-spa)" strokeDasharray="3,3" />

      {/* Row 3: Methods */}
      <rect x="10" y="300" width="340" height="95" rx="8" fill="rgba(0,0,0,0.2)" stroke="rgba(144,99,205,0.1)" />
      <text x="180" y="315" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">MÉTODOS DE ACESSO PRIVADO</text>
      <rect x="16" y="322" width="104" height="30" rx="5" fill="rgba(144,99,205,0.08)" stroke="rgba(144,99,205,0.3)" />
      <text x="68" y="337" textAnchor="middle" fill="#B388FF" fontSize="8" fontWeight="bold">🛡️ ZTNA</text>
      <text x="68" y="347" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6">TCP only</text>
      <rect x="128" y="322" width="104" height="30" rx="5" fill="rgba(91,155,213,0.08)" stroke="rgba(91,155,213,0.3)" />
      <text x="180" y="337" textAnchor="middle" fill="#5B9BD5" fontSize="8" fontWeight="bold">⚡ SD-WAN</text>
      <text x="180" y="347" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6">TCP+UDP</text>
      <rect x="240" y="322" width="104" height="30" rx="5" fill="rgba(218,41,28,0.08)" stroke="rgba(218,41,28,0.3)" />
      <text x="292" y="337" textAnchor="middle" fill="#DA291C" fontSize="8" fontWeight="bold">🔥 NGFW</text>
      <text x="292" y="347" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6">UDP+Agentless</text>

      {/* Destinations */}
      <rect x="16" y="360" width="328" height="28" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(6,214,160,0.1)" />
      <text x="180" y="375" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7">Destinos: ☁️ AWS/Azure  |  🏢 Datacenter  |  🏪 Filiais  |  📱 VPN</text>

      {/* SPA badge */}
      <rect x="295" y="12" width="55" height="16" rx="4" fill="rgba(218,41,28,0.15)" />
      <text x="322" y="24" textAnchor="middle" fill="#DA291C" fontSize="7" fontWeight="bold">3 CASOS</text>

      {/* Protocol matrix at bottom */}
      <rect x="10" y="405" width="340" height="65" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
      <text x="180" y="420" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace" letterSpacing="1">MATRIZ DE PROTOCOLOS</text>
      <rect x="38" y="430" width="90" height="14" rx="3" fill="rgba(144,99,205,0.25)" />
      <text x="83" y="440" textAnchor="middle" fill="#B388FF" fontSize="7">{ } TCP</text>
      <rect x="135" y="430" width="90" height="14" rx="3" fill="rgba(91,155,213,0.25)" />
      <text x="180" y="440" textAnchor="middle" fill="#5B9BD5" fontSize="7">{ } TCP + UDP</text>
      <rect x="232" y="430" width="90" height="14" rx="3" fill="rgba(218,41,28,0.25)" />
      <text x="277" y="440" textAnchor="middle" fill="#DA291C" fontSize="7">{ } UDP + Agentless</text>
      <text x="180" y="462" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6">ZTNA (TCP) | SD-WAN (TCP+UDP) | NGFW (UDP+Agentless)</text>
    </svg>
  );
}

function MobileSSADiagram() {
  return (
    <svg viewBox="0 0 360 480" fill="none" className="w-full h-auto">
      <defs>
        <marker id="m-arr-ssa" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.35)" />
        </marker>
      </defs>
      <rect width="360" height="480" rx="12" fill="rgba(10,10,14,0.6)" />
      <text x="180" y="22" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="2">SSA — ACESSO SAAS</text>

      {/* Row 1: Users */}
      <rect x="10" y="35" width="340" height="70" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="180" y="48" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">UTILIZADORES</text>
      <rect x="16" y="54" width="98" height="42" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(6,214,160,0.25)" />
      <text x="65" y="70" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">💻 Desktop</text>
      <text x="65" y="85" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7">Win · Mac</text>
      <rect x="122" y="54" width="98" height="42" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(6,214,160,0.25)" />
      <text x="171" y="70" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">📱 Móvel</text>
      <text x="171" y="85" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7">iOS · Android</text>
      <rect x="228" y="54" width="114" height="42" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(6,214,160,0.25)" />
      <text x="285" y="70" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🌐 Web</text>
      <text x="285" y="85" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7">Browser · OT</text>

      {/* Arrow */}
      <line x1="180" y1="108" x2="180" y2="133" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#m-arr-ssa)" strokeDasharray="3,3" />

      {/* FortiSASE */}
      <rect x="10" y="138" width="340" height="95" rx="8" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.15)" />
      <rect x="20" y="146" width="320" height="22" rx="4" fill="rgba(218,41,28,0.12)" />
      <text x="180" y="161" textAnchor="middle" fill="#DA291C" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1">FORTISASE + INSPEÇÃO</text>
      <rect x="18" y="176" width="105" height="22" rx="4" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="70" y="191" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">🔒 SSL Deep Inspect</text>
      <rect x="130" y="176" width="105" height="22" rx="4" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="182" y="191" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">📋 App Control</text>
      <rect x="242" y="176" width="100" height="22" rx="4" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="292" y="191" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">🌐 Web Filter</text>
      <rect x="18" y="205" width="324" height="20" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(91,155,213,0.2)" />
      <text x="180" y="219" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7">Header Insertion · CASB Inline</text>

      {/* Split arrows */}
      <line x1="130" y1="238" x2="130" y2="263" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#m-arr-ssa)" strokeDasharray="3,3" />
      <line x1="230" y1="238" x2="230" y2="263" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#m-arr-ssa)" strokeDasharray="3,3" />

      {/* Two CASB paths */}
      <rect x="10" y="268" width="165" height="80" rx="8" fill="rgba(6,214,160,0.04)" stroke="rgba(6,214,160,0.2)" />
      <rect x="18" y="275" width="148" height="18" rx="3" fill="rgba(6,214,160,0.1)" />
      <text x="92" y="288" textAnchor="middle" fill="#06D6A0" fontSize="7" fontWeight="bold">☁️ FortiCASB (API)</text>
      <text x="92" y="308" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Out-of-band</text>
      <text x="92" y="322" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6">Shadow IT · Reporting</text>
      <text x="92" y="337" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6">Sem bloqueio inline</text>

      <rect x="185" y="268" width="165" height="80" rx="8" fill="rgba(218,41,28,0.04)" stroke="rgba(218,41,28,0.2)" />
      <rect x="193" y="275" width="148" height="18" rx="3" fill="rgba(218,41,28,0.1)" />
      <text x="267" y="288" textAnchor="middle" fill="#DA291C" fontSize="7" fontWeight="bold">🛡️ Inline-CASB</text>
      <text x="267" y="308" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">In-band (tempo real)</text>
      <text x="267" y="322" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6">Bloqueio inline</text>
      <text x="267" y="337" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6">Deep SSL</text>

      {/* Destinations */}
      <rect x="10" y="358" width="340" height="95" rx="8" fill="rgba(0,0,0,0.3)" stroke="rgba(6,214,160,0.1)" />
      <text x="180" y="374" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">SAAS APPS</text>
      <rect x="18" y="381" width="102" height="30" rx="5" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.15)" />
      <text x="69" y="398" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">📧 M365</text>
      <rect x="128" y="381" width="102" height="30" rx="5" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.15)" />
      <text x="179" y="398" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">📊 Salesforce</text>
      <rect x="238" y="381" width="102" height="30" rx="5" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.15)" />
      <text x="289" y="398" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">💬 Teams</text>
      <rect x="18" y="416" width="322" height="28" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
      <text x="179" y="434" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6">🟢 API-CASB: Auditoria  |  🔴 Inline: Bloqueio tempo real</text>
    </svg>
  );
}

function MobileCombinedDiagram() {
  return (
    <svg viewBox="0 0 360 480" fill="none" className="w-full h-auto">
      <defs>
        <marker id="m-arr-comb" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.35)" />
        </marker>
      </defs>
      <rect width="360" height="480" rx="12" fill="rgba(10,10,14,0.6)" />
      <text x="180" y="22" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="2">SIA + SPA COMBINADO</text>

      {/* Row 1: Sites */}
      <rect x="10" y="35" width="340" height="85" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="180" y="48" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">SITES / FILIAIS</text>
      <rect x="14" y="54" width="158" height="55" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(255,159,0,0.35)" />
      <text x="93" y="72" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🏢 FortiGate</text>
      <text x="93" y="88" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">SD-WAN Secure Edge</text>
      <text x="93" y="102" textAnchor="middle" fill="#FF9F00" fontSize="6" fontWeight="bold">LAN Extension</text>
      <rect x="180" y="54" width="162" height="55" rx="6" fill="rgba(25,30,50,0.85)" stroke="rgba(144,99,205,0.35)" />
      <text x="261" y="72" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🔐 IPsec</text>
      <text x="261" y="88" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Branch On-ramp</text>
      <text x="261" y="102" textAnchor="middle" fill="#B388FF" fontSize="6" fontWeight="bold">HW existente</text>

      {/* Arrow */}
      <line x1="180" y1="123" x2="180" y2="148" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#m-arr-comb)" strokeDasharray="3,3" />

      {/* FortiSASE PoP */}
      <rect x="10" y="153" width="340" height="100" rx="8" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.15)" />
      <rect x="20" y="161" width="320" height="22" rx="4" fill="rgba(218,41,28,0.12)" />
      <text x="180" y="176" textAnchor="middle" fill="#DA291C" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1">FORTISASE POP</text>
      <rect x="16" y="190" width="78" height="24" rx="4" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="55" y="205" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">🔒 FWaaS+SWG</text>
      <rect x="100" y="190" width="78" height="24" rx="4" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="139" y="205" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">🛡️ ZTNA+SPA</text>
      <rect x="184" y="190" width="78" height="24" rx="4" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="223" y="205" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">☁️ CASB+DLP</text>
      <rect x="268" y="190" width="78" height="24" rx="4" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="307" y="205" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">📊 Analytics</text>
      <rect x="16" y="220" width="326" height="24" rx="4" fill="rgba(25,30,50,0.5)" stroke="rgba(255,159,0,0.2)" />
      <text x="179" y="235" textAnchor="middle" fill="#FF9F00" fontSize="8" fontWeight="bold">⚡ Um túnel — tráfego SIA + SPA simultâneo</text>

      {/* Split arrows */}
      <line x1="90" y1="258" x2="90" y2="283" stroke="rgba(0,180,216,0.3)" strokeWidth="1.5" markerEnd="url(#m-arr-comb)" strokeDasharray="3,3" />
      <line x1="270" y1="258" x2="270" y2="283" stroke="rgba(144,99,205,0.3)" strokeWidth="1.5" markerEnd="url(#m-arr-comb)" strokeDasharray="3,3" />

      {/* SIA Destinations */}
      <rect x="10" y="288" width="165" height="80" rx="8" fill="rgba(0,180,216,0.04)" stroke="rgba(0,180,216,0.15)" />
      <rect x="18" y="294" width="40" height="16" rx="3" fill="rgba(0,180,216,0.15)" />
      <text x="38" y="306" textAnchor="middle" fill="#00b4d8" fontSize="7" fontWeight="bold">SIA</text>
      <text x="62" y="306" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Secure Internet</text>
      <rect x="18" y="315" width="70" height="20" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.15)" />
      <text x="53" y="329" textAnchor="middle" fill="#fff" fontSize="7">🌍 Internet</text>
      <rect x="94" y="315" width="70" height="20" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.15)" />
      <text x="129" y="329" textAnchor="middle" fill="#fff" fontSize="7">☁️ SaaS</text>
      <rect x="45" y="340" width="88" height="20" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.15)" />
      <text x="89" y="354" textAnchor="middle" fill="#fff" fontSize="7">🌐 Navegação Web</text>

      {/* SPA Destinations */}
      <rect x="185" y="288" width="165" height="80" rx="8" fill="rgba(144,99,205,0.04)" stroke="rgba(144,99,205,0.15)" />
      <rect x="193" y="294" width="40" height="16" rx="3" fill="rgba(144,99,205,0.15)" />
      <text x="213" y="306" textAnchor="middle" fill="#B388FF" fontSize="7" fontWeight="bold">SPA</text>
      <text x="237" y="306" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Secure Private</text>
      <rect x="193" y="315" width="70" height="20" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(144,99,205,0.2)" />
      <text x="228" y="329" textAnchor="middle" fill="#fff" fontSize="7">🏢 DC</text>
      <rect x="269" y="315" width="70" height="20" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(144,99,205,0.2)" />
      <text x="304" y="329" textAnchor="middle" fill="#fff" fontSize="7">☁️ Cloud</text>
      <rect x="225" y="340" width="88" height="20" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(144,99,205,0.2)" />
      <text x="269" y="354" textAnchor="middle" fill="#fff" fontSize="7">🏪 Filiais · 📱 VPN</text>

      {/* Summary */}
      <rect x="10" y="380" width="340" height="70" rx="8" fill="rgba(255,159,0,0.04)" stroke="rgba(255,159,0,0.12)" />
      <text x="180" y="398" textAnchor="middle" fill="#FF9F00" fontSize="8" fontWeight="bold">🔑 SIMPLIFICAÇÃO</text>
      <text x="180" y="415" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7">Um único equipamento (FortiGate ou IPsec)</text>
      <text x="180" y="432" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Tráfego Internet + Acesso Privado num túnel só</text>
      <text x="180" y="445" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6">Sem hardware duplicado · Gestão centralizada</text>
    </svg>
  );
}

/* ───── DESKTOP DIAGRAMS (horizontal flow) ───── */

function DesktopSIADiagram() {
  return (
    <svg viewBox="0 0 1000 380" fill="none" className="w-full h-auto">
      <defs>
        <linearGradient id="sia-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#195EB4" />
          <stop offset="1" stopColor="#5B9BD5" />
        </linearGradient>
        <linearGradient id="sia-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DA291C" />
          <stop offset="1" stopColor="#E65A4F" />
        </linearGradient>
        <linearGradient id="sia-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#06D6A0" />
          <stop offset="1" stopColor="#34DBAF" />
        </linearGradient>
        <filter id="sia-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#195EB4" floodOpacity="0.5" />
        </filter>
        <marker id="arrow-sia" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>

      <rect width="1000" height="380" rx="16" fill="rgba(10,10,14,0.6)" />
      <text x="500" y="30" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="4">SECURE INTERNET ACCESS — TOPOLOGIA DE REFERÊNCIA</text>

      {/* LEFT: Remote Users */}
      <rect x="20" y="60" width="160" height="280" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
      <text x="100" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">UTILIZADORES</text>
      <rect x="35" y="95" width="130" height="50" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="100" y="115" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">💻 Agente</text>
      <text x="100" y="132" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">FortiClient</text>
      <rect x="35" y="155" width="130" height="50" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="100" y="175" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">🌐 Agentless</text>
      <text x="100" y="192" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">SWG / Browser</text>
      <rect x="35" y="215" width="130" height="50" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.3)" />
      <text x="100" y="235" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">📶 Site</text>
      <text x="100" y="252" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">Extender / AP</text>

      <line x1="190" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-sia)" strokeDasharray="4,4" />

      {/* CENTER: FortiSASE Cloud */}
      <rect x="260" y="55" width="240" height="280" rx="12" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.2)" strokeWidth="1.5" filter="url(#sia-glow)" />
      <rect x="270" y="65" width="220" height="35" rx="6" fill="rgba(218,41,28,0.15)" />
      <text x="380" y="82" textAnchor="middle" fill="#DA291C" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="2">FORTISASE CLOUD</text>
      <rect x="280" y="110" width="95" height="55" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="327" y="128" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🔒 FWaaS</text>
      <text x="327" y="145" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">NGFW + IPS</text>
      <rect x="385" y="110" width="95" height="55" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="432" y="128" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🌐 SWG</text>
      <text x="432" y="145" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Web Proxy</text>
      <rect x="280" y="175" width="95" height="55" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="327" y="193" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🛡️ ZTNA</text>
      <text x="327" y="210" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Access Proxy</text>
      <rect x="385" y="175" width="95" height="55" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="432" y="193" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">📦 Sandbox</text>
      <text x="432" y="210" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Anti-Malware</text>
      <rect x="280" y="240" width="200" height="55" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="380" y="258" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">⚡ FortiGuard Threat Intelligence</text>
      <text x="380" y="275" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">IPS · DNS Filter · C&C · Antibotnet</text>

      <line x1="510" y1="180" x2="570" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-sia)" strokeDasharray="4,4" />

      {/* RIGHT: Destinations */}
      <rect x="580" y="60" width="150" height="280" rx="12" fill="rgba(0,0,0,0.3)" stroke="rgba(91,155,213,0.15)" />
      <text x="655" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">DESTINOS</text>
      <rect x="590" y="95" width="130" height="55" rx="8" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.3)" />
      <text x="655" y="115" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🌍 Internet</text>
      <text x="655" y="132" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Navegação Web</text>
      <rect x="590" y="160" width="130" height="55" rx="8" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.3)" />
      <text x="655" y="180" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">☁️ SaaS</text>
      <text x="655" y="197" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">M365 · Salesforce</text>
      <rect x="590" y="225" width="130" height="55" rx="8" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.3)" />
      <text x="655" y="245" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🏢 Sites</text>
      <text x="655" y="262" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Acesso Privado</text>
      <rect x="535" y="170" width="30" height="20" rx="4" fill="rgba(0,180,216,0.2)" />
      <text x="550" y="184" textAnchor="middle" fill="#00b4d8" fontSize="8" fontWeight="bold">SIA</text>

      {/* Legend */}
      <rect x="720" y="300" width="260" height="60" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
      <text x="850" y="318" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" letterSpacing="2">LEGENDA DE ACESSO</text>
      <circle cx="740" cy="335" r="4" fill="#00b4d8" />
      <text x="750" y="339" fill="rgba(255,255,255,0.5)" fontSize="9">FortiClient (Agente)</text>
      <circle cx="855" cy="335" r="4" fill="#06D6A0" />
      <text x="865" y="339" fill="rgba(255,255,255,0.5)" fontSize="8">SWG / Site (Agentless)</text>
    </svg>
  );
}

function DesktopSPADiagram() {
  return (
    <svg viewBox="0 0 1000 380" fill="none" className="w-full h-auto">
      <defs>
        <marker id="arrow-spa" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>
      <rect width="1000" height="380" rx="16" fill="rgba(10,10,14,0.6)" />
      <text x="500" y="30" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="4">SECURE PRIVATE ACCESS — TOPOLOGIA DE REFERÊNCIA</text>
      <rect x="20" y="55" width="150" height="300" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
      <text x="95" y="75" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">UTILIZADORES</text>
      <rect x="30" y="90" width="130" height="45" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(144,99,205,0.3)" />
      <text x="95" y="110" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">💻 Agente</text>
      <text x="95" y="125" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">FortiClient</text>
      <rect x="30" y="145" width="130" height="45" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(144,99,205,0.3)" />
      <text x="95" y="165" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">🌐 Agentless</text>
      <text x="95" y="180" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">SWG / Browser</text>
      <rect x="30" y="200" width="130" height="45" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(144,99,205,0.3)" />
      <text x="95" y="220" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">🏢 Site</text>
      <text x="95" y="235" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">SD-WAN Branch</text>
      <rect x="30" y="255" width="130" height="45" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(144,99,205,0.3)" />
      <text x="95" y="275" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">📱 Móvel</text>
      <text x="95" y="290" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">BYOD / Telemóvel</text>
      <line x1="180" y1="190" x2="230" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-spa)" strokeDasharray="4,4" />
      <rect x="240" y="55" width="180" height="300" rx="12" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.2)" />
      <rect x="250" y="65" width="160" height="30" rx="6" fill="rgba(218,41,28,0.15)" />
      <text x="330" y="84" textAnchor="middle" fill="#DA291C" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">FORTISASE CORE</text>
      <rect x="250" y="105" width="160" height="45" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="330" y="122" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🔐 Autenticação</text>
      <text x="330" y="137" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">SAML 2.0 · MFA · SSO</text>
      <rect x="250" y="160" width="160" height="45" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="330" y="177" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🛡️ Postura</text>
      <text x="330" y="192" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">ZTNA Tags · EMS</text>
      <rect x="250" y="215" width="160" height="45" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="330" y="232" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🔒 Encaminhamento</text>
      <text x="330" y="247" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">IPsec · Proxy · Tunnel</text>
      <rect x="250" y="270" width="160" height="45" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="330" y="287" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">📊 Logs & Analytics</text>
      <text x="330" y="302" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">FortiAnalyzer</text>
      <line x1="430" y1="190" x2="490" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-spa)" strokeDasharray="4,4" />
      <text x="560" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">MÉTODOS DE ACESSO PRIVADO</text>
      <rect x="500" y="95" width="130" height="60" rx="8" fill="rgba(144,99,205,0.08)" stroke="rgba(144,99,205,0.4)" />
      <text x="565" y="115" textAnchor="middle" fill="#B388FF" fontSize="10" fontWeight="bold">ZTNA Access</text>
      <text x="565" y="132" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Proxy · TCP only</text>
      <text x="565" y="145" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">⚡ Caminho direto</text>
      <rect x="640" y="95" width="130" height="60" rx="8" fill="rgba(91,155,213,0.08)" stroke="rgba(91,155,213,0.4)" />
      <text x="705" y="115" textAnchor="middle" fill="#5B9BD5" fontSize="10" fontWeight="bold">SD-WAN</text>
      <text x="705" y="132" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Hub & Spoke</text>
      <text x="705" y="145" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">🏢 Redundância DC</text>
      <rect x="780" y="95" width="130" height="60" rx="8" fill="rgba(218,41,28,0.08)" stroke="rgba(218,41,28,0.4)" />
      <text x="845" y="115" textAnchor="middle" fill="#DA291C" fontSize="10" fontWeight="bold">NGFW</text>
      <text x="845" y="132" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Standalone SPA</text>
      <text x="845" y="145" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">🌐 UDP · Agentless</text>
      <rect x="500" y="170" width="410" height="45" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
      <text x="705" y="187" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="2">MATRIZ DE PROTOCOLOS</text>
      <rect x="520" y="197" width="100" height="12" rx="3" fill="rgba(144,99,205,0.3)" />
      <text x="570" y="206" textAnchor="middle" fill="#B388FF" fontSize="7">{ } TCP</text>
      <rect x="640" y="197" width="100" height="12" rx="3" fill="rgba(91,155,213,0.3)" />
      <text x="690" y="206" textAnchor="middle" fill="#5B9BD5" fontSize="7">{ } TCP + UDP</text>
      <rect x="760" y="197" width="100" height="12" rx="3" fill="rgba(218,41,28,0.3)" />
      <text x="810" y="206" textAnchor="middle" fill="#DA291C" fontSize="7">{ } UDP + Agentless</text>
      <rect x="500" y="230" width="410" height="70" rx="10" fill="rgba(0,0,0,0.3)" stroke="rgba(91,155,213,0.15)" />
      <text x="705" y="248" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="2">DESTINOS PRIVADOS</text>
      <rect x="515" y="255" width="90" height="35" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="560" y="272" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">☁️ AWS</text>
      <text x="560" y="283" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Azure · GCP</text>
      <rect x="615" y="255" width="90" height="35" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="660" y="272" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">🏢 DC</text>
      <text x="660" y="283" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Datacenter</text>
      <rect x="715" y="255" width="90" height="35" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="760" y="272" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">🏪 Sucursal</text>
      <text x="760" y="283" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Rede Privada</text>
      <rect x="815" y="255" width="85" height="35" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="857" y="272" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">📱 VPN</text>
      <text x="857" y="283" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Legacy</text>
      <rect x="500" y="310" width="410" height="28" rx="6" fill="rgba(218,41,28,0.08)" stroke="rgba(218,41,28,0.15)" />
      <text x="705" y="328" textAnchor="middle" fill="#DA291C" fontSize="9" fontWeight="bold" fontFamily="monospace">TODOS OS ACESSOS SPA — TCP, UDP, AGENTES E SEM AGENTE</text>
    </svg>
  );
}

function DesktopSSADiagram() {
  return (
    <svg viewBox="0 0 1000 380" fill="none" className="w-full h-auto">
      <defs>
        <marker id="arrow-ssa" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>
      <rect width="1000" height="380" rx="16" fill="rgba(10,10,14,0.6)" />
      <text x="500" y="30" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="4">SECURE SAAS ACCESS — TOPOLOGIA DE REFERÊNCIA</text>
      <rect x="20" y="55" width="140" height="290" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
      <text x="90" y="75" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">UTILIZADORES</text>
      <rect x="30" y="90" width="120" height="45" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(6,214,160,0.3)" />
      <text x="90" y="110" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">💻 Desktop</text>
      <text x="90" y="125" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Windows · Mac</text>
      <rect x="30" y="145" width="120" height="45" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(6,214,160,0.3)" />
      <text x="90" y="165" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">📱 Móvel</text>
      <text x="90" y="180" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">iOS · Android</text>
      <rect x="30" y="200" width="120" height="45" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(6,214,160,0.3)" />
      <text x="90" y="220" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🌐 Web</text>
      <text x="90" y="235" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Browser · OT</text>
      <line x1="170" y1="190" x2="220" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-ssa)" strokeDasharray="4,4" />
      <rect x="230" y="55" width="200" height="290" rx="12" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.2)" />
      <rect x="240" y="65" width="180" height="30" rx="6" fill="rgba(218,41,28,0.15)" />
      <text x="330" y="84" textAnchor="middle" fill="#DA291C" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">FORTISASE</text>
      <rect x="240" y="105" width="180" height="45" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="330" y="122" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🔒 SSL Deep Inspection</text>
      <text x="330" y="137" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">TLS 1.3 · Certificados</text>
      <rect x="240" y="160" width="180" height="45" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="330" y="177" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">📋 Application Control</text>
      <text x="330" y="192" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Allow · Monitor · Block</text>
      <rect x="240" y="215" width="180" height="45" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="330" y="232" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🌐 Web Filter + CASB</text>
      <text x="330" y="247" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Header Insertion</text>
      <line x1="440" y1="130" x2="490" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-ssa)" strokeDasharray="4,4" />
      <line x1="440" y1="240" x2="490" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-ssa)" strokeDasharray="4,4" />
      <rect x="500" y="80" width="210" height="100" rx="10" fill="rgba(6,214,160,0.05)" stroke="rgba(6,214,160,0.3)" />
      <rect x="510" y="88" width="190" height="24" rx="4" fill="rgba(6,214,160,0.12)" />
      <text x="605" y="104" textAnchor="middle" fill="#06D6A0" fontSize="9" fontWeight="bold">☁️ FortiCASB (API-Based)</text>
      <text x="605" y="125" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">Out-of-band</text>
      <text x="605" y="140" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Shadow IT · Reporting</text>
      <text x="605" y="155" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Análise · Reporting</text>
      <rect x="500" y="195" width="210" height="100" rx="10" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.3)" />
      <rect x="510" y="203" width="190" height="24" rx="4" fill="rgba(218,41,28,0.12)" />
      <text x="605" y="219" textAnchor="middle" fill="#DA291C" fontSize="9" fontWeight="bold">🛡️ FortiSASE Inline-CASB</text>
      <text x="605" y="240" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">In-band (tempo real)</text>
      <text x="605" y="255" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Bloqueio inline</text>
      <text x="605" y="270" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Deep SSL Inspection</text>
      <line x1="720" y1="130" x2="770" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-ssa)" strokeDasharray="4,4" />
      <line x1="720" y1="240" x2="770" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-ssa)" strokeDasharray="4,4" />
      <rect x="780" y="55" width="200" height="290" rx="12" fill="rgba(0,0,0,0.3)" stroke="rgba(6,214,160,0.15)" />
      <text x="880" y="75" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">SAAS APPS</text>
      <rect x="790" y="90" width="180" height="40" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="880" y="115" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">📧 Microsoft 365</text>
      <rect x="790" y="140" width="180" height="40" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="880" y="165" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">📊 Salesforce</text>
      <rect x="790" y="190" width="180" height="40" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="880" y="215" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">💬 Teams · Slack</text>
      <rect x="790" y="240" width="180" height="40" rx="6" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="880" y="265" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">📈 Tableau · PowerBI</text>
      <rect x="500" y="310" width="480" height="30" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
      <text x="580" y="330" textAnchor="middle" fill="#06D6A0" fontSize="8">🟢 API-CASB: Descoberta, shadow IT, auditoria</text>
      <text x="820" y="330" textAnchor="middle" fill="#DA291C" fontSize="8">🔴 Inline-CASB: Bloqueio em tempo real, inspeção SSL</text>
    </svg>
  );
}

function DesktopCombinedDiagram() {
  return (
    <svg viewBox="0 0 1000 380" fill="none" className="w-full h-auto">
      <defs>
        <marker id="arrow-comb" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>
      <rect width="1000" height="380" rx="16" fill="rgba(10,10,14,0.6)" />
      <text x="500" y="30" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="4">SIA & SPA COMBINADO — TOPOLOGIA DE REFERÊNCIA</text>
      <rect x="20" y="55" width="160" height="295" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
      <text x="100" y="75" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">SITES / FILIAIS</text>
      <rect x="30" y="90" width="140" height="80" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(255,159,0,0.4)" />
      <text x="100" y="110" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">🏢 FortiGate</text>
      <text x="100" y="127" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">SD-WAN Secure Edge</text>
      <text x="100" y="142" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">TCP · UDP · Redundância</text>
      <text x="100" y="157" textAnchor="middle" fill="#FF9F00" fontSize="7" fontWeight="bold">LAN Extension</text>
      <rect x="30" y="185" width="140" height="80" rx="8" fill="rgba(25,30,50,0.8)" stroke="rgba(144,99,205,0.4)" />
      <text x="100" y="205" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">🔐 IPsec</text>
      <text x="100" y="222" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Branch On-ramp</text>
      <text x="100" y="237" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Túnel IPsec/IKEv2</text>
      <text x="100" y="252" textAnchor="middle" fill="#B388FF" fontSize="7" fontWeight="bold">Hardware existente</text>
      <rect x="30" y="280" width="140" height="55" rx="8" fill="rgba(25,30,50,0.6)" stroke="rgba(91,155,213,0.2)" />
      <text x="100" y="298" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">📶 Thin Edge</text>
      <text x="100" y="314" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">FortiExtender · FortiAP</text>
      <line x1="190" y1="200" x2="240" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" markerEnd="url(#arrow-comb)" strokeDasharray="4,4" />
      <rect x="250" y="55" width="200" height="295" rx="12" fill="rgba(218,41,28,0.05)" stroke="rgba(218,41,28,0.2)" />
      <rect x="260" y="65" width="180" height="30" rx="6" fill="rgba(218,41,28,0.15)" />
      <text x="350" y="84" textAnchor="middle" fill="#DA291C" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">FORTISASE POP</text>
      <rect x="260" y="105" width="180" height="40" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="350" y="122" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🔒 FWaaS + SWG</text>
      <text x="350" y="136" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Segurança Internet</text>
      <rect x="260" y="155" width="180" height="40" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="350" y="172" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🛡️ ZTNA + SPA</text>
      <text x="350" y="186" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Acesso Privado</text>
      <rect x="260" y="205" width="180" height="40" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="350" y="222" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">☁️ CASB + DLP</text>
      <text x="350" y="236" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">SaaS Protection</text>
      <rect x="260" y="255" width="180" height="40" rx="6" fill="rgba(25,30,50,0.8)" stroke="rgba(91,155,213,0.4)" />
      <text x="350" y="272" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">📊 FortiAnalyzer</text>
      <text x="350" y="286" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Logs · Analytics</text>
      <line x1="460" y1="140" x2="520" y2="140" stroke="rgba(0,180,216,0.3)" strokeWidth="1.5" markerEnd="url(#arrow-comb)" strokeDasharray="4,4" />
      <line x1="460" y1="220" x2="520" y2="220" stroke="rgba(144,99,205,0.3)" strokeWidth="1.5" markerEnd="url(#arrow-comb)" strokeDasharray="4,4" />
      <text x="730" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">ACESSO SIMULTÂNEO</text>
      <rect x="530" y="90" width="400" height="90" rx="10" fill="rgba(0,180,216,0.05)" stroke="rgba(0,180,216,0.2)" />
      <rect x="540" y="98" width="50" height="18" rx="4" fill="rgba(0,180,216,0.2)" />
      <text x="565" y="111" textAnchor="middle" fill="#00b4d8" fontSize="8" fontWeight="bold">SIA</text>
      <text x="600" y="111" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Secure Internet Access</text>
      <rect x="545" y="125" width="80" height="22" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="585" y="140" textAnchor="middle" fill="#fff" fontSize="8">🌍 Internet</text>
      <rect x="635" y="125" width="80" height="22" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="675" y="140" textAnchor="middle" fill="#fff" fontSize="8">☁️ SaaS</text>
      <rect x="725" y="125" width="80" height="22" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="765" y="140" textAnchor="middle" fill="#fff" fontSize="8">📧 M365</text>
      <rect x="815" y="125" width="100" height="22" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(6,214,160,0.2)" />
      <text x="865" y="140" textAnchor="middle" fill="#fff" fontSize="8">🌐 Navegação Web</text>
      <rect x="530" y="195" width="400" height="90" rx="10" fill="rgba(144,99,205,0.05)" stroke="rgba(144,99,205,0.2)" />
      <rect x="540" y="203" width="50" height="18" rx="4" fill="rgba(144,99,205,0.2)" />
      <text x="565" y="216" textAnchor="middle" fill="#B388FF" fontSize="8" fontWeight="bold">SPA</text>
      <text x="600" y="216" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Secure Private Access</text>
      <rect x="545" y="230" width="90" height="22" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(144,99,205,0.3)" />
      <text x="590" y="245" textAnchor="middle" fill="#fff" fontSize="8">🏢 Datacenter</text>
      <rect x="645" y="230" width="90" height="22" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(144,99,205,0.3)" />
      <text x="690" y="245" textAnchor="middle" fill="#fff" fontSize="8">☁️ AWS/Azure</text>
      <rect x="745" y="230" width="80" height="22" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(144,99,205,0.3)" />
      <text x="785" y="245" textAnchor="middle" fill="#fff" fontSize="8">🏪 Filiais</text>
      <rect x="835" y="230" width="80" height="22" rx="4" fill="rgba(25,30,50,0.6)" stroke="rgba(144,99,205,0.3)" />
      <text x="875" y="245" textAnchor="middle" fill="#fff" fontSize="8">📱 VPN</text>
      <rect x="530" y="300" width="400" height="35" rx="8" fill="rgba(255,159,0,0.06)" stroke="rgba(255,159,0,0.2)" />
      <text x="600" y="322" textAnchor="middle" fill="#FF9F00" fontSize="9" fontWeight="bold">⚡ Tráfego SIA e SPA simultâneo pela FortiSASE</text>
      <text x="870" y="322" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">1x IPsec</text>
    </svg>
  );
}

/* ───── Responsive Diagram Selector ───── */

function CategoryDiagram({ id }: { id: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    switch (id) {
      case "sia": return <MobileSIADiagram />;
      case "spa": return <MobileSPADiagram />;
      case "ssa": return <MobileSSADiagram />;
      case "combinado": return <MobileCombinedDiagram />;
      default: return null;
    }
  }

  switch (id) {
    case "sia": return <DesktopSIADiagram />;
    case "spa": return <DesktopSPADiagram />;
    case "ssa": return <DesktopSSADiagram />;
    case "combinado": return <DesktopCombinedDiagram />;
    default: return null;
  }
}

/* ───── Main component ───── */

export default function FortiSASEUseCases() {
  const [activeCategory, setActiveCategory] = useState<string>("sia");

  const active = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  return (
    <section className="px-4 sm:px-6 py-24 bg-[#000000] border-t border-white/5 relative overflow-hidden">

      <div className="mx-auto max-w-6xl relative z-10">
        <Reveal className="text-center mb-12" variant="up">
          <span className="text-xs font-bold text-vodafone tracking-wider uppercase block mb-3 font-mono">
            GUIAS DE ARQUITETURAS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Casos de uso SASE
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
            Diagramas de topologia de rede
          </p>
        </Reveal>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "bg-white/10 border-white/20 text-white shadow-lg"
                  : "bg-white/[0.03] border-white/5 text-text-secondary hover:border-white/10 hover:text-text-primary"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="text-[10px] text-text-muted ml-1">({cat.useCases.length})</span>
            </button>
          ))}
        </div>

        {/* Responsive SVG Diagram */}
        <Reveal variant="up" className="mb-8">
          <CategoryDiagram id={activeCategory} />
        </Reveal>

        {/* Category Description */}
        <Reveal className="mb-8" variant="up">
          <div
            className="p-4 rounded-2xl border border-white/5 bg-surface-2/60 text-center"
            style={{ borderLeftColor: active.color, borderLeftWidth: 3 }}
          >
            <p className="text-sm text-text-secondary leading-relaxed">{active.description}</p>
          </div>
        </Reveal>

        {/* Use Cases Grid */}
        <div className="grid gap-4 sm:gap-6">
          {active.useCases.map((uc, idx) => (
            <Reveal key={idx} variant="up" staggerIndex={idx}>
              <div className="group bg-surface-3/20 border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-white/15 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: active.color }} />
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{uc.name}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{uc.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-col sm:gap-1.5 sm:min-w-[160px] shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Tecnologia</span>
                      <span className="text-[11px] font-medium text-white ml-auto sm:ml-0 sm:text-right">{uc.tech}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Protocolos</span>
                      <span className={`text-[11px] font-bold ml-auto sm:ml-0 sm:text-right ${uc.protocols === "TCP apenas" ? "text-yellow-400" : "text-green-400"}`}>{uc.protocols}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Agente</span>
                      <span className="text-[11px] font-medium ml-auto sm:ml-0 sm:text-right text-text-secondary">{uc.agent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-10" variant="up">
          <p className="text-[10px] text-text-muted font-mono tracking-wider">
            Fonte:{" "}
            <a href="https://docs.fortinet.com/document/fortisase/latest/architecture-guide/891466/common-fortisase-use-cases" target="_blank" rel="noopener noreferrer" className="text-vodafone hover:underline">
              FortiSASE Architecture Guide — Fortinet Document Library
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
