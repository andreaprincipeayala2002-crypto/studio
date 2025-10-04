import KnowledgeEngine from "@/components/dashboard/KnowledgeEngine";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter glow">
          Motor de Conocimiento
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Analiza datos de investigación de biología espacial de la NASA e interactúa con herramientas de IA para profundizar tu comprensión.
        </p>
      </div>
      <KnowledgeEngine />
    </div>
  );
}
