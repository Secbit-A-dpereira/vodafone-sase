"use client";

import Reveal from "./Reveal";

export default function WhatIsSASE() {
  return (
    <section id="o-que-e-sase" className="px-4 sm:px-6 py-24 bg-[#000000] border-t border-white/5">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <Reveal className="text-center mb-12" variant="up">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            O que é Vodafone Business SASE?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed font-light max-w-2xl mx-auto">
            Acesso seguro e controlado a aplicações, web e rede privadas - em qualquer localização ou dispositivo.
          </p>
        </Reveal>

        {/* SVG Equation Diagram */}
        <div className="w-full bg-surface-3/30 border border-white/5 rounded-[32px] p-4 sm:p-8 shadow-2xl relative overflow-hidden">

          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto no-scrollbar">
          <svg
            className="w-[760px] sm:w-full h-auto text-white select-none sm:max-w-5xl mx-auto block"
            viewBox="0 0 1000 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Equação visual: Plataforma Tecnológica mais Gestão de Segurança resulta em Unified SASE"
          >
            <defs>
              <radialGradient id="result-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e60000" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#e60000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="vodafone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e60000" />
                <stop offset="100%" stopColor="#ff5544" />
              </linearGradient>
              <style>{`
                .node-frame { transition: all 0.3s ease; }
                .hover-block { cursor: pointer; }
                .hover-block:hover .node-frame {
                  fill: rgba(230, 0, 0, 0.06);
                  stroke: rgba(230, 0, 0, 0.45);
                }
                .hover-block:hover .item-bg {
                  stroke-width: 1.5;
                }
                .pulse-glow {
                  animation: result-pulse 2.5s ease-in-out infinite;
                  transform-origin: 850px 200px;
                }
                @keyframes result-pulse {
                  0%, 100% { transform: scale(1); opacity: 0.45; }
                  50% { transform: scale(1.12); opacity: 0.95; }
                }
                .flow-line {
                  stroke-dasharray: 6, 6;
                  animation: flow-dash 1.5s linear infinite;
                }
                @keyframes flow-dash { to { stroke-dashoffset: -24; } }
              `}</style>
            </defs>

            {/* === BLOCK 1: PLATAFORMA TECNOLÓGICA === */}
            <g className="hover-block">
              <rect
                className="node-frame"
                x="40" y="80" width="260" height="240"
                rx="20"
                fill="rgba(15,15,20,0.6)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text x="170" y="118" textAnchor="middle" fill="#e60000" fontSize="10" fontWeight="bold" letterSpacing="2" fontFamily="monospace">PLATAFORMA</text>
              <text x="170" y="138" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold" letterSpacing="1.5">TECNOLÓGICA</text>

              {/* Item: Cloud Security */}
              <g transform="translate(70, 175)">
                <circle className="item-bg" cx="15" cy="15" r="15" fill="rgba(230, 0, 0, 0.1)" stroke="rgba(230, 0, 0, 0.35)" strokeWidth="1" />
                <path d="M15 8 L22 11 L22 17 C22 19.5 19 22 15 23 C11 22 8 19.5 8 17 L8 11 Z" stroke="#e60000" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <text x="45" y="14" fill="#ffffff" fontSize="11" fontWeight="600">Cloud Security</text>
                <text x="45" y="26" fill="rgba(255,255,255,0.5)" fontSize="9">FWaaS · SWG</text>
              </g>

              {/* Item: Zero Trust */}
              <g transform="translate(70, 220)">
                <circle className="item-bg" cx="15" cy="15" r="15" fill="rgba(0, 180, 216, 0.1)" stroke="rgba(0, 180, 216, 0.35)" strokeWidth="1" />
                <circle cx="12" cy="15" r="4" stroke="#00b4d8" strokeWidth="1.5" fill="none" />
                <line x1="16" y1="15" x2="24" y2="15" stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="22" y1="15" x2="22" y2="19" stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="19" y1="15" x2="19" y2="18" stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round" />
                <text x="45" y="14" fill="#ffffff" fontSize="11" fontWeight="600">Zero Trust</text>
                <text x="45" y="26" fill="rgba(255,255,255,0.5)" fontSize="9">Universal ZTNA</text>
              </g>

              {/* Item: SaaS Protection */}
              <g transform="translate(70, 265)">
                <circle className="item-bg" cx="15" cy="15" r="15" fill="rgba(6, 214, 160, 0.1)" stroke="rgba(6, 214, 160, 0.35)" strokeWidth="1" />
                <path d="M8 19 C6 19 4 17 4 15 C4 13 6 11 8 12 C8 9 11 7 14 8 C16 8 18 9.5 18 12 C20 12 22 13 22 16 C22 18 20 19 18 19 Z" stroke="#06d6a0" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <text x="45" y="14" fill="#ffffff" fontSize="11" fontWeight="600">SaaS Protection</text>
                <text x="45" y="26" fill="rgba(255,255,255,0.5)" fontSize="9">CASB · DLP</text>
              </g>
            </g>

            {/* === PLUS OPERATOR === */}
            <g>
              <circle cx="350" cy="200" r="30" fill="rgba(0,0,0,0.6)" stroke="#e60000" strokeWidth="2" />
              <text x="350" y="200" textAnchor="middle" dominantBaseline="central" fill="#e60000" fontSize="32" fontWeight="900" fontFamily="sans-serif">+</text>
            </g>

            {/* === BLOCK 2: GESTÃO DE SEGURANÇA === */}
            <g className="hover-block">
              <rect
                className="node-frame"
                x="400" y="80" width="260" height="240"
                rx="20"
                fill="rgba(15,15,20,0.6)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text x="530" y="118" textAnchor="middle" fill="#e60000" fontSize="10" fontWeight="bold" letterSpacing="2" fontFamily="monospace">GESTÃO DE</text>
              <text x="530" y="138" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold" letterSpacing="1.5">SEGURANÇA</text>

              {/* Item: Suporte 24/7 */}
              <g transform="translate(430, 175)">
                <circle className="item-bg" cx="15" cy="15" r="15" fill="rgba(230, 0, 0, 0.1)" stroke="rgba(230, 0, 0, 0.35)" strokeWidth="1" />
                <circle cx="15" cy="12" r="3" stroke="#e60000" strokeWidth="1.5" fill="none" />
                <path d="M9 20 C9 17 11 15 15 15 C19 15 21 17 21 20" stroke="#e60000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <text x="45" y="14" fill="#ffffff" fontSize="11" fontWeight="600">Suporte 24/7</text>
                <text x="45" y="26" fill="rgba(255,255,255,0.5)" fontSize="9">Quando mais precisa</text>
              </g>

              {/* Item: Implementação */}
              <g transform="translate(430, 220)">
                <circle className="item-bg" cx="15" cy="15" r="15" fill="rgba(0, 180, 216, 0.1)" stroke="rgba(0, 180, 216, 0.35)" strokeWidth="1" />
                <path d="M15 7 V15 L20 20" stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round" />
                <text x="45" y="14" fill="#ffffff" fontSize="11" fontWeight="600">Implementação</text>
                <text x="45" y="26" fill="rgba(255,255,255,0.5)" fontSize="9">Apoio na integração</text>
              </g>

              {/* Item: Gestão */}
              <g transform="translate(430, 265)">
                <circle className="item-bg" cx="15" cy="15" r="15" fill="rgba(6, 214, 160, 0.1)" stroke="rgba(6, 214, 160, 0.35)" strokeWidth="1" />
                <path d="M9 21 L12 18 L15 21 L18 15" stroke="#06d6a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="45" y="14" fill="#ffffff" fontSize="11" fontWeight="600">Gestão</text>
                <text x="45" y="26" fill="rgba(255,255,255,0.5)" fontSize="9">Apoio por especialistas</text>
              </g>
            </g>

            {/* === EQUALS OPERATOR === */}
            <g>
              <line x1="715" y1="190" x2="740" y2="190" stroke="#e60000" strokeWidth="3" strokeLinecap="round" />
              <line x1="715" y1="210" x2="740" y2="210" stroke="#e60000" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* === BLOCK 3: UNIFIED SASE RESULT === */}
            <g>
              {/* Animated glow background */}
              <circle className="pulse-glow" cx="850" cy="200" r="75" fill="url(#result-glow)" />

              {/* Hexagon outer */}
              <polygon
                points="850,125 915,162 915,238 850,275 785,238 785,162"
                fill="rgba(230, 0, 0, 0.05)"
                stroke="url(#vodafone-grad)"
                strokeWidth="2"
              />

              {/* Inner Vodafone speechmark */}
              <g transform="translate(820, 168)">
                <circle cx="30" cy="30" r="26" fill="#e60000" opacity="0.12" />
                <path
                  d="M12 0A12 12 0 0 0 0 12A12 12 0 0 0 12 24A12 12 0 0 0 24 12A12 12 0 0 0 12 0M16.25 1.12C16.57 1.12 16.9 1.15 17.11 1.22C14.94 1.67 13.21 3.69 13.22 6C13.22 6.05 13.22 6.11 13.23 6.17C16.87 7.06 18.5 9.25 18.5 12.28C18.54 15.31 16.14 18.64 12.09 18.65C8.82 18.66 5.41 15.86 5.39 11.37C5.38 8.4 7 5.54 9.04 3.85C11.04 2.19 13.77 1.13 16.25 1.12Z"
                  fill="#e60000"
                  transform="scale(2.5)"
                />
              </g>

              {/* Label */}
              <text x="850" y="330" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="900" letterSpacing="1.5">VODAFONE</text>
              <text x="850" y="350" textAnchor="middle" fill="#e60000" fontSize="16" fontWeight="900" letterSpacing="1.5">BUSINESS SASE</text>
            </g>

            {/* === FLOWING DATA LINES === */}
            <path className="flow-line" d="M 300 200 H 320" stroke="#e60000" strokeWidth="2" opacity="0.6" />
            <path className="flow-line" d="M 380 200 H 400" stroke="#e60000" strokeWidth="2" opacity="0.6" />
            <path className="flow-line" d="M 660 200 H 710" stroke="#e60000" strokeWidth="2" opacity="0.6" />
            <path className="flow-line" d="M 740 200 H 785" stroke="#e60000" strokeWidth="2" opacity="0.6" />
          </svg>
          </div>

          <p className="sm:hidden text-center text-[10px] text-text-muted uppercase tracking-widest font-mono mt-3">
            ← Deslize para explorar →
          </p>

          {/* Caption */}
          <div className="mt-6 text-center">
            <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed font-light italic">
              Plataforma tecnológica cloud-native <span className="text-vodafone font-semibold not-italic">+</span> Operação gerida 24/7
              <span className="text-vodafone font-semibold not-italic"> = </span>
              uma solução SASE unificada e gerida pela Vodafone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
