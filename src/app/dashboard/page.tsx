import KnowledgeEngine from "@/components/dashboard/KnowledgeEngine";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-stone-400">
          Motor de Conocimiento
        </h1>
        <p className="text-lg md:text-xl text-stone-300 mt-4 max-w-3xl mx-auto">
          Analiza tus resultados, identifica áreas de mejora y utiliza herramientas de IA para profundizar tu comprensión de la biología espacial.
        </p>
      </div>
      <KnowledgeEngine />
    </div>
  );
}
