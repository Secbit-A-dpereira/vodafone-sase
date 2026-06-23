import TechnicalKB from "@/components/TechnicalKB";
import FAQSection from "@/components/FAQSection";
import ASCIIVideoPlayer from "@/components/ASCIIVideoPlayer";

export default function RecursosPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            Vídeo
          </h1>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Bloquear Perguntas ao AI</h2>
          <ASCIIVideoPlayer />
        </div>

        <TechnicalKB />
        <FAQSection />
      </section>
    </main>
  );
}
