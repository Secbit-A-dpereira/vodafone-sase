"use client";

import { useState, useRef } from "react";
import BrailleField from "./BrailleField";

interface VideoResource {
  id: string;
  title: string;
  description: string;
  duration: string;
  file: string;
  thumbnail?: string;
}

const VIDEOS: VideoResource[] = [
  {
    id: "video1",
    title: "Visão Geral Vodafone Business SASE",
    description: "Conheça a plataforma SASE da Vodafone Business, powered by Fortinet. Como unificamos conectividade e segurança num único serviço gerido.",
    duration: "5:32",
    file: "/videos/video1.mp4",
  },
  {
    id: "video2",
    title: "Secure Internet Access (SIA)",
    description: "Demonstração do acesso seguro à internet com proteção contra ameaças, DLP e isolamento de navegação.",
    duration: "2:15",
    file: "/videos/video2.mp4",
  },
  {
    id: "video3",
    title: "Secure Private Access (SPA)",
    description: "Acesso privado a aplicações críticas com ZTNA, SD-WAN e firewall avançada — sem expor a rede interna.",
    duration: "4:10",
    file: "/videos/video3.mp4",
  },
];

export default function VideoResources() {
  const [playing, setPlaying] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const togglePlay = (id: string) => {
    // Pause all other videos
    Object.entries(videoRefs.current).forEach(([vid, el]) => {
      if (vid !== id && el) {
        el.pause();
      }
    });

    if (playing === id) {
      videoRefs.current[id]?.pause();
      setPlaying(null);
    } else {
      videoRefs.current[id]?.play();
      setPlaying(id);
    }
  };

  return (
    <section
      id="recursos-video"
      className="relative bg-[#000000] py-20 sm:py-24 overflow-hidden"
    >
      {/* Section header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-mono text-vodafone bg-vodafone/10 px-2 py-1 rounded mb-3">
            VÍDEOS E DEMONSTRAÇÕES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Veja o SASE em ação
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Demonstrações práticas da plataforma Vodafone Business SASE. Clique para reproduzir.
          </p>
        </div>

        {/* Video grid — single column on mobile, 2 columns on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-vodafone/30 transition-all duration-500"
            >
              {/* Video element */}
              <div className="relative aspect-video bg-[#050508] overflow-hidden">
                <video
                  ref={(el) => { videoRefs.current[video.id] = el; }}
                  src={video.file}
                  className="w-full h-full object-contain"
                  playsInline
                  preload="metadata"
                  onEnded={() => setPlaying(null)}
                  onPlay={() => setPlaying(video.id)}
                  onPause={() => setPlaying(null)}
                />

                {/* Play overlay */}
                {playing !== video.id && (
                  <button
                    onClick={() => togglePlay(video.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-opacity opacity-0 group-hover:opacity-100"
                    aria-label={`Reproduzir ${video.title}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-vodafone/90 flex items-center justify-center shadow-lg shadow-vodafone/30 transition-transform group-hover:scale-110">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}

                {/* Default state (no hover) - show minimal play button */}
                {playing !== video.id && (
                  <button
                    onClick={() => togglePlay(video.id)}
                    className="absolute inset-0 flex items-center justify-center sm:hidden"
                    aria-label={`Reproduzir ${video.title}`}
                  >
                    <div className="w-14 h-14 rounded-full bg-vodafone/80 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}

                {/* Playing indicator */}
                {playing === video.id && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-white font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-vodafone animate-pulse" />
                    A reproduzir
                  </div>
                )}

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 text-[10px] text-text-secondary font-mono">
                  {video.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug">
                  {video.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Vodafone subtle branding */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 flex items-center gap-1.5">
                <svg className="w-3 h-3 text-vodafone shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0A12 12 0 0 0 0 12A12 12 0 0 0 12 24A12 12 0 0 0 24 12A12 12 0 0 0 12 0M16.25 1.12C16.57 1.12 16.9 1.15 17.11 1.22C14.94 1.67 13.21 3.69 13.22 6C13.22 6.05 13.22 6.11 13.23 6.17C16.87 7.06 18.5 9.25 18.5 12.28C18.54 15.31 16.14 18.64 12.09 18.65C8.82 18.66 5.41 15.86 5.39 11.37C5.38 8.4 7 5.54 9.04 3.85C11.04 2.19 13.77 1.13 16.25 1.12Z"/>
                </svg>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Vodafone Business</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BrailleField count={18} />
    </section>
  );
}
