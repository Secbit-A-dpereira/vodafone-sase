import TechnicalKB from "@/components/TechnicalKB";
import FAQSection from "@/components/FAQSection";

export default function RecursosPage() {
  return (
    <main className="min-h-screen">
      {/* Video Section */}
      <section className="px-4 sm:px-6 py-20 bg-surface">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary mb-3">
              Bloquear acessos a ferramentas AI
            </h2>
            <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
              Veja na prática como o Vodafone Business SASE protege a sua organização contra fugas de informação em motores de IA pública.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-2 overflow-hidden">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto max-h-[80vh]"
            >
              <source src="/videos/video1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Video 2 Section */}
      <section className="px-4 sm:px-6 pb-20 bg-surface">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary mb-3">
              Acesso Agentless
            </h2>
            <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
              Conexão segura sem instalação de software — extensão de browser que redireciona tráfego para o Secure Web Gateway com proteção DLP e isolamento de sessão.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-2 overflow-hidden">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto max-h-[80vh]"
            >
              <source src="/videos/video2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Video 3 Section */}
      <section className="px-4 sm:px-6 pb-20 bg-surface">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary mb-3">
              Bloquear envio de ficheiros para AI
            </h2>
            <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
              Impede o upload de documentos confidenciais para plataformas de IA pública com controlo granular por categoria e política DLP automática.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-2 overflow-hidden">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto max-h-[80vh]"
            >
              <source src="/videos/video3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <TechnicalKB />
      <FAQSection />
    </main>
  );
}