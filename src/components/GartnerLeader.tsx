"use client";

export default function GartnerLeader() {
  return (
    <section id="lider-gartner" className="px-4 sm:px-6 py-20 bg-surface">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-mono text-vodafone bg-vodafone/10 px-2 py-1 rounded mb-3">
            FORTINET RECONHECIDO COMO LÍDER NO MERCARDO
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Single-Vendor SASE
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A convergência técnica da infraestrutura assenta no reconhecimento contínuo e liderança nos quadrantes de segurança do Gartner.
          </p>
        </div>

        {/* 2-Column Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Column 1: Magic Quadrant CSS Graphic (Gartner) */}
          <div className="lg:col-span-6 rounded-2xl border border-border bg-surface-3/40 p-5 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-border/40 pb-2">
              <span className="text-[10px] font-bold text-text-primary tracking-wider uppercase font-mono">
                Gartner® Magic Quadrant™
              </span>
              <span className="text-[9px] text-text-muted font-mono leading-none">
                Plataformas SASE (Junho 2025)
              </span>
            </div>

            {/* Quadrant grid map in CSS */}
            <div className="relative aspect-square w-full max-w-[360px] mx-auto border border-border/60 bg-surface-2/40 grid grid-cols-2 grid-rows-2">

              {/* Quadrant 1: Challengers */}
              <div className="border-r border-b border-border/30 p-2 flex flex-col justify-between relative">
                <span className="text-[7px] font-bold text-text-muted uppercase tracking-wider font-mono">
                  Challengers
                </span>
              </div>

              {/* Quadrant 2: Leaders (Vibrant Highlights) */}
              <div className="border-b border-border/30 p-2 bg-vodafone/5 flex flex-col justify-between relative">
                <span className="text-[7px] font-bold text-vodafone uppercase tracking-wider font-mono">
                  Leaders
                </span>

                {/* Dot coordinates representing Gartner Leaders */}
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-3">
                  <div className="flex items-center gap-1.5 self-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                    <span className="text-[9px] text-text-secondary font-semibold font-mono">Palo Alto</span>
                  </div>
                  <div className="flex items-center gap-1.5 self-start pl-4 border border-vodafone/40 bg-vodafone/10 px-2 py-0.5 rounded-full shadow-lg shadow-vodafone/10 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-vodafone" />
                    <span className="text-[10px] text-vodafone font-extrabold font-mono">Fortinet</span>
                  </div>
                  <div className="flex items-center gap-1.5 self-end pr-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                    <span className="text-[9px] text-text-secondary font-semibold font-mono">Netskope</span>
                  </div>
                </div>
              </div>

              {/* Quadrant 3: Niche Players */}
              <div className="border-r border-border/30 p-2 flex flex-col justify-between relative">
                <span className="text-[7px] font-bold text-text-muted uppercase tracking-wider font-mono">
                  Niche Players
                </span>
              </div>

              {/* Quadrant 4: Visionaries */}
              <div className="p-2 flex flex-col justify-between relative">
                <span className="text-[7px] font-bold text-text-muted uppercase tracking-wider font-mono">
                  Visionaries
                </span>
              </div>

            </div>

            <div className="text-[8px] text-text-muted font-mono mt-4 leading-relaxed text-center">
              Avaliação estrutural com base na Completude de Visão → e Capacidade de Execução ↑
            </div>
          </div>

          {/* Column 2: Business & Technical Highlights */}
          <div className="lg:col-span-6 space-y-6 text-left relative">
            
            <div className="p-5 rounded-2xl border-l-4 border-vodafone border border-border bg-surface-3">
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                A <strong>Fortinet</strong> destaca-se como o único fabricante reconhecido simultaneamente em <strong>quatro relatórios críticos</strong> do Quadrante Mágico do Gartner (SD-WAN, SSE, Enterprise Wired/Wireless LAN e SASE Platforms).
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-vodafone/10 flex items-center justify-center text-vodafone shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm sm:text-base leading-tight mb-1">
                    Sistema operacional único (FortiOS)
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Todas as capacidades de rede e segurança correm nativamente sob a mesma firewall de nova geração na cloud, reduzindo drasticamente a latência de inspeção.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-vodafone/10 flex items-center justify-center text-vodafone shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm sm:text-base leading-tight mb-1">
                    Inteligência de ameaças FortiGuard Labs
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Análise comportamental contínua e mitigação automatizada de ataques e vulnerabilidades de dia zero baseada em Inteligência Artificial.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
