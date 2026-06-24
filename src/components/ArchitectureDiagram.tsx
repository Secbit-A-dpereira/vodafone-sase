"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function ArchitectureDiagram() {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(true);

  const handleActivate = (element: string) => {
    setActiveElement(element);
    setShowHint(false);
  };

  return (
    <section id="arquitetura" className="px-4 sm:px-6 py-24 bg-[#000000] border-t border-white/5 relative overflow-hidden">

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Apple Style Header */}
        <Reveal className="text-center mb-16" variant="up">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Arquitetura SASE
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Integração de uma rede SD-WAN com segurança uniforme (SSE) gerida sob um único sistema operativo (FortiOS).
          </p>
        </Reveal>

        {/* Dynamic, interactive animated SVG */}
        <div className="w-full bg-surface-3/30 border border-white/5 rounded-[32px] p-4 sm:p-8 shadow-2xl relative overflow-hidden">

          {/* Floating hint overlay — shows until first click */}
          {showHint && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-none">
              <div className="bg-vodafone/90 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-vodafone/30 animate-fade-in-up flex items-center gap-1.5 whitespace-nowrap">
                <span>👆</span>
                <span>Toque nos blocos para explorar</span>
              </div>
            </div>
          )}

          {/* Mobile: horizontal swipe to explore the full diagram. Desktop: native scale. */}
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto no-scrollbar">
          <svg
            className="w-[820px] sm:w-full h-auto text-white select-none sm:max-w-5xl mx-auto block"
            viewBox="0 0 1000 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* STYLES & ANIMATIONS */}
            <defs>
              {/* Glowing gradients */}
              <radialGradient id="os-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e60000" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#e60000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0056b3" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>

              {/* Pulsing light flowing paths */}
              <style>
                {`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -40;
                    }
                  }
                  .flow-line {
                    stroke-dasharray: 8, 8;
                    animation: dash 1.5s linear infinite;
                  }
                  .node-hover {
                    cursor: pointer;
                    pointer-events: all;
                  }
                  .node-hover rect, .node-hover circle {
                    transition: all 0.3s ease;
                  }
                  .node-hover:hover rect {
                    fill: rgba(25, 25, 35, 0.95);
                    stroke: #e60000;
                  }
                  .node-hover:hover circle {
                    stroke: #e60000;
                  }
                  .pulse-glow {
                    animation: pulse 2s ease-in-out infinite;
                  }
                  @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.9; }
                    50% { transform: scale(1.03); opacity: 1; }
                  }
                `}
              </style>
            </defs>

            {/* 1. FLOW LINES (Data packets animation from left to central SASE OS, and to right clouds) */}
            {/* Input to Loop flows */}
            <path d="M 240,120 H 330" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path className="flow-line" d="M 240,120 H 330" stroke="#00b4d8" strokeWidth="2.5" />

            <path d="M 240,250 H 320" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path className="flow-line" d="M 240,250 H 320" stroke="#00b4d8" strokeWidth="2.5" />

            <path d="M 240,380 H 330" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path className="flow-line" d="M 240,380 H 330" stroke="#00b4d8" strokeWidth="2.5" />

            {/* Central Loop to Module list flow */}
            <path d="M 470,250 H 570" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path className="flow-line" d="M 470,250 H 570" stroke="#e60000" strokeWidth="2.5" />

            {/* Modules to Right Clouds flows */}
            <path d="M 750,110 H 840" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path className="flow-line" d="M 750,110 H 840" stroke="#06d6a0" strokeWidth="2.5" />

            <path d="M 750,210 H 840" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path className="flow-line" d="M 750,210 H 840" stroke="#06d6a0" strokeWidth="2.5" />

            <path d="M 750,310 H 840" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path className="flow-line" d="M 750,310 H 840" stroke="#06d6a0" strokeWidth="2.5" />

            <path d="M 750,410 H 840" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path className="flow-line" d="M 750,410 H 840" stroke="#06d6a0" strokeWidth="2.5" />


            {/* 2. LEFT SIDE INPUTS CARD BLOCKS */}
            {/* Card 1: Remote Users */}
            <g className="node-hover" onClick={() => handleActivate("remote-users")} onTouchEnd={() => handleActivate("remote-users")} pointerEvents="all">
              {/* Generous touch target padding */}
              <rect x="20" y="60" width="240" height="120" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <rect x="40" y="80" width="200" height="80" rx="16" fill="rgba(15,15,20,0.85)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <circle cx="75" cy="120" r="22" fill="#1b1b22" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="75" y="124" textAnchor="middle" fill="#ffffff" fontSize="14" pointerEvents="none">💻</text>
              <text x="115" y="115" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="start" pointerEvents="none">Agent & Agentless</text>
              <text x="115" y="132" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="start" pointerEvents="none">Remote Users</text>
            </g>

            {/* Card 2: Branch/Campus */}
            <g className="node-hover" onClick={() => handleActivate("sdwan-branch")} onTouchEnd={() => handleActivate("sdwan-branch")} pointerEvents="all">
              {/* Generous touch target padding */}
              <rect x="20" y="190" width="240" height="120" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <rect x="40" y="210" width="200" height="80" rx="16" fill="rgba(15,15,20,0.85)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <circle cx="75" cy="250" r="22" fill="#1b1b22" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="75" y="254" textAnchor="middle" fill="#ffffff" fontSize="14" pointerEvents="none">🏢</text>
              <text x="115" y="245" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="start" pointerEvents="none">SD-WAN Branch</text>
              <text x="115" y="262" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="start" pointerEvents="none">Branch & Campus</text>
            </g>

            {/* Card 3: Thin Edge */}
            <g className="node-hover" onClick={() => handleActivate("thin-edge")} onTouchEnd={() => handleActivate("thin-edge")} pointerEvents="all">
              {/* Generous touch target padding */}
              <rect x="20" y="320" width="240" height="120" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <rect x="40" y="340" width="200" height="80" rx="16" fill="rgba(15,15,20,0.85)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <circle cx="75" cy="380" r="22" fill="#1b1b22" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="75" y="384" textAnchor="middle" fill="#ffffff" fontSize="14" pointerEvents="none">📶</text>
              <text x="115" y="375" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="start" pointerEvents="none">AP / Extender</text>
              <text x="115" y="392" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="start" pointerEvents="none">Thin Edge Hardware</text>
            </g>


            {/* 3. CENTER PIECE: UNIFIED SASE INFINITY LOOP */}
            {/* Left Lobe (SSE / FortiSASE) - Glowing Loop */}
            <path
              d="M 400,250 C 400,160 330,120 380,120 C 430,120 400,250 400,250 C 400,250 430,380 380,380 C 330,380 400,340 400,250"
              stroke="#0056b3"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
            {/* Right Lobe (SD-WAN / FortiGate) - Glowing Loop */}
            <path
              d="M 400,250 C 400,160 470,120 420,120 C 370,120 400,250 400,250 C 400,250 370,380 420,380 C 470,380 400,340 400,250"
              stroke="#00b4d8"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* SSE Upper Node Circle */}
            <g className="node-hover" onClick={() => handleActivate("sse-core")} onTouchEnd={() => handleActivate("sse-core")} pointerEvents="all">
              {/* Generous touch target padding */}
              <circle cx="400" cy="160" r="50" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <circle cx="400" cy="160" r="32" fill="#12121a" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              <text x="400" y="152" textAnchor="middle" fill="#00b4d8" fontSize="12" fontWeight="bold" pointerEvents="none">SSE</text>
              <text x="400" y="167" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="sans-serif" pointerEvents="none">FortiSASE</text>
            </g>

            {/* SD-WAN Lower Node Circle */}
            <g className="node-hover" onClick={() => handleActivate("sdwan-core")} onTouchEnd={() => handleActivate("sdwan-core")} pointerEvents="all">
              {/* Generous touch target padding */}
              <circle cx="400" cy="340" r="50" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <circle cx="400" cy="340" r="32" fill="#12121a" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              <text x="400" y="332" textAnchor="middle" fill="#00b4d8" fontSize="11" fontWeight="bold" pointerEvents="none">SD-WAN</text>
              <text x="400" y="347" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="sans-serif" pointerEvents="none">FortiGate</text>
            </g>

            {/* Central Unified OS Core Circle */}
            <g className="node-hover" onClick={() => handleActivate("os-core")} onTouchEnd={() => handleActivate("os-core")} pointerEvents="all">
              {/* Generous touch target padding */}
              <circle cx="400" cy="250" r="45" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <circle cx="400" cy="250" r="28" fill="url(#os-glow)" className="pulse-glow" />
              <circle cx="400" cy="250" r="20" fill="#e60000" stroke="#ffffff" strokeWidth="1.5" />
              <text x="400" y="254" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif" pointerEvents="none">OS</text>
            </g>

            {/* Unified SASE text label */}
            <text x="400" y="425" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="extrabold" tracking-wider="true">Unified SASE</text>


            {/* 4. RIGHT SIDE: DETAILED SASE SECURITY SERVICES BOX */}
            <g className="node-hover" onClick={() => handleActivate("security-box")} onTouchEnd={() => handleActivate("security-box")} pointerEvents="all">
              {/* Generous touch target padding */}
              <rect x="550" y="20" width="220" height="460" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              {/* Cyan outline SASE box */}
              <rect x="570" y="40" width="180" height="420" rx="20" fill="rgba(10,10,12,0.8)" stroke="#00b4d8" strokeWidth="2" />
              
              {/* Service list rows */}
              <g transform="translate(585, 60)" pointerEvents="none">
                <text x="25" y="15" fill="#ffffff" fontSize="9" fontWeight="bold">FWaaS, SWG</text>
                <text x="0" y="15" fill="#00b4d8" fontSize="10">🔥</text>

                <text x="25" y="55" fill="#ffffff" fontSize="9" fontWeight="bold">Universal ZTNA</text>
                <text x="0" y="55" fill="#00b4d8" fontSize="10">🛡️</text>

                <text x="25" y="95" fill="#ffffff" fontSize="9" fontWeight="bold">CASB, SSPM</text>
                <text x="0" y="95" fill="#00b4d8" fontSize="10">☁️</text>

                <text x="25" y="135" fill="#ffffff" fontSize="9" fontWeight="bold">DLP</text>
                <text x="0" y="135" fill="#00b4d8" fontSize="10">🔒</text>

                <text x="25" y="175" fill="#ffffff" fontSize="9" fontWeight="bold">Sandbox</text>
                <text x="0" y="175" fill="#00b4d8" fontSize="10">📦</text>

                <text x="25" y="215" fill="#ffffff" fontSize="9" fontWeight="bold">Browser ext.</text>
                <text x="0" y="215" fill="#00b4d8" fontSize="10">🌐</text>

                <text x="25" y="255" fill="#ffffff" fontSize="9" fontWeight="bold">GenAI Security</text>
                <text x="0" y="255" fill="#00b4d8" fontSize="10">🤖</text>

                <text x="25" y="295" fill="#ffffff" fontSize="9" fontWeight="bold">DEM</text>
                <text x="0" y="295" fill="#00b4d8" fontSize="10">📊</text>

                <text x="25" y="335" fill="#ffffff" fontSize="9" fontWeight="bold">SD-WAN / SPA</text>
                <text x="0" y="335" fill="#00b4d8" fontSize="10">⚡</text>

                <text x="25" y="375" fill="#ffffff" fontSize="9" fontWeight="bold">FortiAI Assist</text>
                <text x="0" y="375" fill="#00b4d8" fontSize="10">💬</text>
              </g>

              {/* Botão AI no canto inferior do box */}
              <circle cx="735" cy="435" r="16" fill="#00b4d8" stroke="#ffffff" strokeWidth="1" pointerEvents="none" />
              <text x="735" y="439" textAnchor="middle" fill="#ffffff" fontSize="11" pointerEvents="none">🤖</text>
            </g>


            {/* 5. FAR RIGHT: DESTINATION CLOUDS */}
            {/* Internet Cloud */}
            <g className="node-hover" onClick={() => handleActivate("internet")} onTouchEnd={() => handleActivate("internet")} pointerEvents="all">
              {/* Generous touch target padding */}
              <rect x="820" y="50" width="160" height="100" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <rect x="840" y="70" width="120" height="60" rx="16" fill="rgba(15,15,20,0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x="900" y="95" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">Internet</text>
              <text x="900" y="112" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="bold" className="font-mono" pointerEvents="none">SIA</text>
            </g>

            {/* SaaS Cloud */}
            <g className="node-hover" onClick={() => handleActivate("saas")} onTouchEnd={() => handleActivate("saas")} pointerEvents="all">
              {/* Generous touch target padding */}
              <rect x="820" y="150" width="160" height="100" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <rect x="840" y="170" width="120" height="60" rx="16" fill="rgba(15,15,20,0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x="900" y="195" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">SaaS (M365, SF)</text>
              <text x="900" y="212" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="bold" className="font-mono" pointerEvents="none">SSA</text>
            </g>

            {/* Public Cloud */}
            <g className="node-hover" onClick={() => handleActivate("public-cloud")} onTouchEnd={() => handleActivate("public-cloud")} pointerEvents="all">
              {/* Generous touch target padding */}
              <rect x="820" y="250" width="160" height="100" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <rect x="840" y="270" width="120" height="60" rx="16" fill="rgba(15,15,20,0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x="900" y="295" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">Public Cloud</text>
              <text x="900" y="312" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="bold" className="font-mono" pointerEvents="none">SPA (AWS/Azure)</text>
            </g>

            {/* Private Cloud */}
            <g className="node-hover" onClick={() => handleActivate("private-cloud")} onTouchEnd={() => handleActivate("private-cloud")} pointerEvents="all">
              {/* Generous touch target padding */}
              <rect x="820" y="350" width="160" height="100" fill="transparent" pointerEvents="all" className="cursor-pointer" />
              <rect x="840" y="370" width="120" height="60" rx="16" fill="rgba(15,15,20,0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x="900" y="395" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">Private Cloud</text>
              <text x="900" y="412" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="bold" className="font-mono" pointerEvents="none">SPA (Datacenter)</text>
            </g>

          </svg>
          </div>

          {/* Hint that the diagram is swipeable on mobile */}
          <p className="sm:hidden text-center text-[10px] text-text-muted uppercase tracking-widest font-mono mt-3">
            ← Deslize para explorar →
          </p>

          {/* Dynamic contextual detail card below the interactive diagram */}
          <div className="mt-6 p-4 rounded-2xl border border-white/5 bg-surface-2/60 text-center min-h-[50px] flex items-center justify-center">
            {activeElement ? (
              <p className="text-xs text-text-secondary leading-relaxed animate-fade-in-up">
                {activeElement === "remote-users" && "👥 Agent & Agentless: Acesso seguro e auditado para colaboradores internos e terceiros (BYOD) via FortiClient ou extensão Browser."}
                {activeElement === "sdwan-branch" && "🏢 SD-WAN Branch: Conetividade inteligente e failover 5G para lojas físicas e escritórios distribuídos."}
                {activeElement === "thin-edge" && "📶 AP/Extender Thin Edge: Extensão da segurança SASE diretamente na borda física sem hardware pesado."}
                {activeElement === "sse-core" && "🌐 SSE Core (FortiSASE): O motor inteligente de segurança em cloud, contendo firewall, ZTNA, proxies web e inspeção de dados."}
                {activeElement === "sdwan-core" && "⚡ SD-WAN (FortiGate): O motor de rede para gerir links e rotas de conetividade dinâmica."}
                {activeElement === "os-core" && "🛡️ FortiOS: O Sistema Operativo unificado que garante a fusão de rede e segurança sob o mesmo painel de controlo."}
                {activeElement === "security-box" && "🔒 Serviços SASE: Módulos corporativos geridos, contendo DLP, antivírus, sandbox, segurança GenAI e prevenção avançada."}
                {activeElement === "internet" && "🌍 Internet (SIA): Tráfego de navegação web totalmente protegido de esquemas de phishing e malwares."}
                {activeElement === "saas" && "📦 SaaS (SSA): Acesso contextual e DLP para ferramentas de cloud cruciais da empresa (M365, Salesforce)."}
                {activeElement === "public-cloud" && "☁️ Public Cloud (SPA): Acesso privado seguro a ambientes AWS, Azure e Google Cloud."}
                {activeElement === "private-cloud" && "🗄️ Private Cloud (SPA): Proteção na conectividade com os Datacenters e bases de dados físicas da empresa."}
              </p>
            ) : (
              <span className="text-xs text-text-muted italic select-none">
                💡 Clique em qualquer bloco do diagrama acima para ver os detalhes da arquitetura SASE.
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
