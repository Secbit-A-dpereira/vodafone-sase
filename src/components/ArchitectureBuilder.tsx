"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import BrailleField from "./BrailleField";

interface BlockDef {
  id: string; label: string; shortLabel: string; icon: string;
  color: string; zone: "acesso" | "core" | "destinos";
  description: string; example: string;
  connections: { to: string; label: string; color: string }[];
}

const BLOCKS: BlockDef[] = [
  { id: "agent", label: "Agente FortiClient", shortLabel: "FortiClient", icon: "💻", color: "#00b4d8", zone: "acesso",
    description: "Software instalado no computador que redireciona o tráfego para a nuvem FortiSASE.",
    example: "Um colaborador em casa acede ao M365 — o FortiClient verifica a identidade e encripta a ligação.",
    connections: [{ to: "sse", label: "Túnel IPsec", color: "#00b4d8" }] },
  { id: "agentless", label: "Acesso Agentless (Browser)", shortLabel: "Browser", icon: "🌐", color: "#00b4d8", zone: "acesso",
    description: "Extensão de browser que protege o acesso sem instalar software.",
    example: "Um consultor externo acede ao portal de RH — a extensão bloqueia downloads não autorizados.",
    connections: [{ to: "sse", label: "SWG Proxy", color: "#00b4d8" }] },
  { id: "sdwan-branch", label: "Loja / Filial (SD-WAN)", shortLabel: "SD-WAN", icon: "🏢", color: "#00b4d8", zone: "acesso",
    description: "FortiGate SD-WAN na loja que liga equipamentos à nuvem com failover automático.",
    example: "Uma loja com 10 TPAs — o FortiGate prioriza tráfego entre Internet e Datacenter.",
    connections: [{ to: "sse", label: "SD-WAN", color: "#e60000" }] },
  { id: "mobile", label: "Telemóvel / BYOD", shortLabel: "Móvel", icon: "📱", color: "#00b4d8", zone: "acesso",
    description: "Acesso seguro de dispositivos móveis com ou sem agente.",
    example: "Um comercial no terreno acede ao CRM — dados nunca saem do perímetro seguro.",
    connections: [{ to: "sse", label: "VPN Mobile", color: "#00b4d8" }] },
  { id: "sse", label: "FortiSASE Cloud", shortLabel: "SASE Cloud", icon: "🛡️", color: "#e60000", zone: "core",
    description: "Nuvem de segurança Fortinet gerida pela Vodafone. Firewall, DLP, ZTNA, CASB.",
    example: "200 colaboradores acedem à Internet — a FortiSASE decide o que permitir ou bloquear.",
    connections: [
      { to: "internet", label: "SIA", color: "#00b4d8" },
      { to: "saas", label: "SSA", color: "#06D6A0" },
      { to: "public-cloud", label: "SPA", color: "#e60000" },
      { to: "private-cloud", label: "SPA", color: "#e60000" }
    ] },
  { id: "internet", label: "Internet (Navegação)", shortLabel: "Internet", icon: "🌍", color: "#06D6A0", zone: "destinos",
    description: "Acesso à Internet com bloqueio de sites maliciosos.",
    example: "Um colaborador tenta aceder a phishing — bloqueado antes de carregar.",
    connections: [] },
  { id: "saas", label: "M365 / Salesforce", shortLabel: "SaaS", icon: "☁️", color: "#06D6A0", zone: "destinos",
    description: "Acesso seguro a apps cloud com controlo de partilha e DLP.",
    example: "Partilha de documento confidencial no Teams com externos — DLP bloqueia.",
    connections: [] },
  { id: "public-cloud", label: "AWS / Azure", shortLabel: "Cloud Púb.", icon: "☁️", color: "#06D6A0", zone: "destinos",
    description: "Acesso privado a clouds sem expor IPs públicos.",
    example: "50 lojas acedem a app na AWS — tráfego vai direto para a VPC.",
    connections: [] },
  { id: "private-cloud", label: "Datacenter", shortLabel: "Datacenter", icon: "🗄️", color: "#06D6A0", zone: "destinos",
    description: "Acesso privado ao datacenter com túnel IPsec dedicado.",
    example: "100 utilizadores acedem ao ERP SAP — túnel privado dedicado.",
    connections: [] },
];

const SCENARIOS = [
  { name: "Home Office", icon: "🏠", desc: "Colaborador remoto", blocks: [{ id:"agent", x:55, y:125 }, { id:"sse", x:335, y:125 }, { id:"internet", x:615, y:60 }, { id:"saas", x:615, y:190 }] },
  { name: "Loja Retalho", icon: "🏪", desc: "Filial com TPAs", blocks: [{ id:"sdwan-branch", x:55, y:125 }, { id:"sse", x:335, y:125 }, { id:"internet", x:615, y:60 }, { id:"private-cloud", x:615, y:190 }] },
  { name: "Consultor", icon: "👤", desc: "Parceiro externo", blocks: [{ id:"agentless", x:55, y:125 }, { id:"sse", x:335, y:125 }, { id:"private-cloud", x:615, y:125 }] },
  { name: "Cloud-First", icon: "☁️", desc: "Apps na cloud", blocks: [{ id:"agent", x:55, y:75 }, { id:"mobile", x:55, y:175 }, { id:"sse", x:335, y:125 }, { id:"saas", x:615, y:75 }, { id:"public-cloud", x:615, y:175 }] },
  { name: "Completa", icon: "🏢", desc: "Tudo incluído", blocks: [{ id:"agent", x:55, y:45 }, { id:"sdwan-branch", x:55, y:125 }, { id:"mobile", x:55, y:205 }, { id:"sse", x:335, y:125 }, { id:"internet", x:615, y:45 }, { id:"saas", x:615, y:125 }, { id:"private-cloud", x:615, y:205 }] },
  { name: "Livre", icon: "🎨", desc: "Do zero", blocks: [] },
];

const ZONES = [
  { key: "acesso", label: "ACESSO", bg: "#00b4d8", range: [0, 280] as [number, number] },
  { key: "core", label: "SASE CORE", bg: "#e60000", range: [280, 560] as [number, number] },
  { key: "destinos", label: "DESTINOS", bg: "#06D6A0", range: [560, 840] as [number, number] },
];

interface Connection { from: number; to: number; label: string; color: string; }

export default function ArchitectureBuilder() {
  const [placed, setPlaced] = useState<{ id: string; x: number; y: number }[]>([]);
  const [scenario, setScenario] = useState("Completa");
  const [selected, setSelected] = useState<number | null>(null);
  const [showPalette, setShowPalette] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Load initial scenario on mount
  useEffect(() => {
    loadScenario("Completa");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getDef = (id: string) => BLOCKS.find(b => b.id === id);

  const loadScenario = useCallback((name: string) => {
    setScenario(name); setConnections([]);
    const s = SCENARIOS.find(s => s.name === name);
    if (s) setPlaced(s.blocks.map(b => ({ ...b })));
    setSelected(null);
  }, []);

  const addBlock = useCallback((block: BlockDef) => {
    const existing = placed.filter(p => p.id.startsWith(block.id));
    const zone = ZONES.find(z => z.key === block.zone);
    const center = zone ? (zone.range[0] + zone.range[1] - 170) / 2 : 40;
    setPlaced(prev => [...prev, { id: block.id, x: center, y: 60 + existing.length * 50 }]);
    setScenario("Livre");
  }, [placed]);

  const removeBlock = useCallback((idx: number) => {
    setPlaced(prev => prev.filter((_, i) => i !== idx));
    setConnections(prev => prev.filter(c => c.from !== idx && c.to !== idx));
    setSelected(null);
  }, []);

  const onPointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  // Block drag start
  const onBlockPointerDown = useCallback((e: React.PointerEvent, idx: number) => {
    if ((e.target as HTMLElement).closest('[data-port]')) return;
    e.preventDefault();
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    if (!placed[idx]) return;
    setDragging(idx);
    offsetRef.current = { x: e.clientX - placed[idx].x, y: e.clientY - placed[idx].y };
    if (scenario !== "Livre") setScenario("Livre");
  }, [placed, scenario]);

  const clearAll = useCallback(() => {
    setPlaced([]); setConnections([]);
    setScenario("Livre"); setSelected(null);
  }, []);

  // Canvas pointer move
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    // Handle block dragging
    if (dragging === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const placedBlock = placed[dragging];
    if (!placedBlock) return;
    const def = getDef(placedBlock.id);
    if (!def) return;
    const zone = ZONES.find(z => z.key === def.zone);
    if (!zone) return;
    const rawX = e.clientX - offsetRef.current.x;
    const clampedX = Math.max(zone.range[0], Math.min(rawX, zone.range[1] - 170));
    const y = Math.max(0, Math.min(e.clientY - offsetRef.current.y, rect.height - 70));
    setPlaced(prev => prev.map((b, i) => i === dragging ? { ...b, x: clampedX, y } : b));
  }, [dragging, placed]);

  // Merge predefined + manual connections
  const allConnections: Connection[] = [
    ...connections,
    ...placed.flatMap((block, idx) => {
      const def = getDef(block.id);
      if (!def) return [];
      return def.connections.map(conn => {
        const targetIdx = placed.findIndex(p => getDef(p.id)?.id === conn.to);
        if (targetIdx < 0) return null;
        return { from: idx, to: targetIdx, label: conn.label, color: conn.color } as Connection;
      }).filter(Boolean) as Connection[];
    }),
  ];

  const hasCore = placed.some(p => getDef(p.id)?.zone === "core");

  return (
    <section className="relative bg-[#000000] min-h-screen py-20 sm:py-24 overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-mono text-vodafone bg-vodafone/10 px-3 py-1.5 rounded mb-3">CONSTRUTOR INTERATIVO</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Monte a sua arquitetura SASE</h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Escolha um cenário, arraste os blocos e clique para ver o que cada componente faz.
          </p>
        </div>

        {/* Scenarios */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {SCENARIOS.map(s => (
            <button key={s.name} onClick={() => loadScenario(s.name)}
              className={`px-4 py-3 rounded-xl border text-left transition-all ${
                scenario === s.name
                  ? "bg-vodafone/15 border-vodafone/40 text-white shadow-lg shadow-vodafone/10"
                  : "bg-white/[0.03] border-white/8 text-text-secondary hover:border-white/20"
              }`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.icon}</span>
                <div>
                  <div className={`text-sm font-bold ${scenario === s.name ? "text-white" : "text-text-primary"}`}>{s.name}</div>
                  <div className="text-xs text-text-secondary/80 max-w-[120px]">{s.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar */}
          <div className="lg:w-56 shrink-0 order-2 lg:order-1">
            <div className="sticky top-24 space-y-4">
              <button onClick={() => setShowPalette(!showPalette)}
                className="w-full py-3 rounded-xl bg-vodafone/15 border border-vodafone/30 text-sm font-bold text-white uppercase tracking-wider hover:bg-vodafone/20 transition-all">
                {showPalette ? "← Fechar" : "+ Adicionar bloco"}
              </button>

              <div className={`space-y-4 transition-all duration-300 ${showPalette ? "opacity-100 max-h-[600px]" : "opacity-0 max-h-0 overflow-hidden lg:opacity-100 lg:max-h-[600px]"}`}>
                {ZONES.map(zone => (
                  <div key={zone.key}>
                    <h4 className="text-xs font-bold tracking-wider mb-2 px-1 uppercase" style={{ color: zone.bg }}>{zone.label}</h4>
                    {BLOCKS.filter(b => b.zone === zone.key).map(block => (
                      <button key={block.id} onClick={() => addBlock(block)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-vodafone/30 hover:bg-white/[0.06] transition-all text-left w-full mb-1">
                        <span className="text-lg">{block.icon}</span>
                        <span className="text-sm font-semibold text-text-secondary">{block.shortLabel}</span>
                      </button>
                    ))}
                  </div>
                ))}
                <button onClick={clearAll} className="w-full py-2.5 rounded-xl text-sm text-text-muted border border-white/5 hover:border-red-500/40 hover:text-red-400 transition-all">✕ Limpar tudo</button>
              </div>

              {placed.length > 0 && (
                <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <div className="text-sm text-text-primary font-mono font-bold">{placed.length} bloco{placed.length !== 1 ? "s" : ""}</div>
                  {!hasCore && <div className="text-xs text-amber-400 mt-1 font-medium">⚠ Falta o SASE Core</div>}
                </div>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div ref={canvasRef}
            className="flex-1 relative min-h-[400px] lg:min-h-[450px] rounded-2xl border border-white/8 overflow-x-auto overflow-y-hidden order-1 lg:order-2"
            onPointerMove={onPointerMove} onPointerUp={onPointerUp} style={{ touchAction: "auto" }}>
            {/* Mobile scroll hint */}
            <div className="lg:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-[10px] text-text-muted font-mono uppercase tracking-widest animate-pulse">
              ← Deslize →
            </div>

            {/* Zone bg */}
            {ZONES.map(zone => (
              <div key={zone.key} className="absolute inset-y-0 pointer-events-none border-r border-white/[0.04]"
                style={{ left: zone.range[0], width: zone.range[1] - zone.range[0], background: `linear-gradient(180deg, ${zone.bg}06, transparent)` }}>
                <div className="text-xs font-bold tracking-wider text-center mt-3 uppercase select-none" style={{ color: `${zone.bg}55` }}>{zone.label}</div>
              </div>
            ))}

            {/* Empty */}
            {placed.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center"><p className="text-base text-text-muted mb-1 font-medium">Canvas vazio</p><p className="text-sm text-text-muted/50">Escolha um cenário ou adicione blocos</p></div>
              </div>
            )}

            {/* Empty */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {allConnections.map((conn, ci) => {
                const from = placed[conn.from];
                const to = placed[conn.to];
                if (!from || !to) return null;
                const isSel = selected === conn.from || selected === conn.to;
                const x1 = from.x + 170;
                const y1 = from.y + 35;
                const x2 = to.x;
                const y2 = to.y + 35;
                const mx = (x1 + x2) / 2;
                const my = (y1 + y2) / 2;
                return (
                  <g key={`conn-${ci}`}>
                    <path d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                      fill="none" stroke={conn.color}
                      strokeWidth={isSel ? 3.5 : 2}
                      strokeOpacity={isSel ? 0.7 : 0.35}
                      strokeDasharray={isSel ? "none" : "6,4"} />
                    <rect x={mx - 18} y={my - 10} width={36} height={20} rx={5}
                      fill={isSel ? "#1a1a28" : "#0a0a0e"} fillOpacity={isSel ? 1 : 0.7} />
                    <text x={mx} y={my + 1} textAnchor="middle" fill={conn.color}
                      fontSize="10" fontWeight="bold" fontFamily="monospace"
                      opacity={isSel ? 1 : 0.5}>{conn.label}</text>
                  </g>
                );
              })}
            </svg>

            {/* Blocks with ports */}
            {placed.map((block, idx) => {
              const def = getDef(block.id);
              if (!def) return null;
              const isSelected = selected === idx;
              return (
                <div key={`${block.id}-${idx}`} className="absolute" style={{ left: block.x, top: block.y, zIndex: 20 }}>
                  {/* Block body */}
                  <div
                    className={`rounded-xl flex items-center select-none transition-all cursor-grab ${
                      isSelected ? "ring-2 ring-white/60 shadow-xl" : "hover:ring-1 hover:ring-white/20"
                    }`}
                    style={{
                      width: 170, height: 70,
                      background: "linear-gradient(135deg, rgba(22,22,30,0.98), rgba(14,14,20,0.98))",
                      borderLeft: `4px solid ${def.color}`,
                      border: `1px solid ${isSelected ? `${def.color}88` : `${def.color}25`}`,
                      touchAction: "none",
                    }}
                    onPointerDown={(e) => onBlockPointerDown(e, idx)}
                    onClick={() => setSelected(isSelected ? null : idx)}
                  >
                    <div className="flex items-center gap-3 px-3.5 w-full">
                      <span className="text-xl shrink-0">{def.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-white leading-tight truncate">{def.shortLabel}</div>
                        <div className="text-[11px] text-text-muted leading-tight truncate mt-0.5">
                          {def.zone === "acesso" ? "Quem acede" : def.zone === "core" ? "Motor SASE" : "Onde acede"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected !== null && placed[selected] && (() => {
          const def = getDef(placed[selected].id);
          if (!def) return null;
          const zone = ZONES.find(z => z.key === def.zone);
          const connCount = allConnections.filter(c => c.from === selected || c.to === selected).length;
          return (
            <div className="mt-4 p-5 sm:p-6 rounded-2xl border border-white/8 bg-white/[0.02] animate-fade-in-up max-w-2xl mx-auto">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{def.icon}</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{def.label}</h3>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: zone?.bg }}>{zone?.label}</span>
                  </div>
                </div>
                <button onClick={() => removeBlock(selected)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-text-muted hover:text-red-400 transition-all shrink-0">✕</button>
              </div>
              <p className="text-sm text-text-secondary/90 leading-relaxed">{def.description}</p>
              <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/8 border-l-4" style={{ borderLeftColor: def.color }}>
                <div className="text-xs font-bold mb-1" style={{ color: def.color }}>💡 Exemplo real</div>
                <p className="text-xs text-text-primary/80 leading-relaxed">{def.example}</p>
              </div>
              {connCount > 0 && <div className="mt-3 text-xs text-text-secondary">{connCount} ligação{connCount !== 1 ? "ões" : ""}</div>}
            </div>
          );
        })()}

        <div className="lg:hidden mt-4 text-center">
          <button onClick={() => setShowPalette(!showPalette)}
            className="text-sm text-vodafone font-mono tracking-wider font-bold">
            {showPalette ? "← Fechar" : "+ Adicionar bloco"}
          </button>
        </div>

        <BrailleField count={18} />
      </div>
    </section>
  );
}
