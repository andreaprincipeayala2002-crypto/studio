import KnowledgeEngine from "@/components/dashboard/KnowledgeEngine";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter glow">
          Knowledge Engine
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Analyze NASA's space biology research data and interact with AI-powered tools to deepen your understanding.
        </p>
      </div>
      <KnowledgeEngine />
    </div>
  );
}
