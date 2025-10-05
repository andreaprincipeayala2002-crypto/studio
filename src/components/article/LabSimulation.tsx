'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Beaker, Dna, FileText, FlaskConical, Loader2, Mouse, Rocket, Zap, ChevronRight } from 'lucide-react';

const simulationSteps = [
    {
        icon: Rocket,
        title: 'Fase 1: Misión STS-131',
        description: 'Preparamos nuestro modelo animal (ratones) y lo enviamos en una misión de 15 días a bordo del transbordador espacial para estudiar los efectos de la microgravedad en el tejido cardíaco.',
        buttonText: 'Comenzar Misión',
    },
    {
        icon: Mouse,
        title: 'Fase 2: Recuperación de Muestras',
        description: 'Tras 15 días en órbita, los ratones regresan. Procedemos a la recolección de los ventrículos cardíacos para su posterior análisis genético.',
        buttonText: 'Analizar Muestras',
    },
    {
        icon: Dna,
        title: 'Fase 3: Análisis de Expresión Génica',
        description: 'Usamos PCR cuantitativa para medir los niveles de 168 genes clave. Nos centraremos en dos áreas críticas: el estrés oxidativo y el ciclo celular.',
        buttonText: 'Ver Resultados',
    },
    {
        icon: Zap,
        title: 'Resultados: Estrés Oxidativo',
        description: 'El análisis revela un desequilibrio preocupante. El corazón está bajo ataque y sus defensas están bajas.',
        results: [
            { gene: 'Nox1', change: '↑ 6.6x', meaning: 'Aumento drástico de especies reactivas de oxígeno (ROS).', status: 'bad' },
            { gene: 'Nfe2l2', change: '↓ 2.4x', meaning: 'Reducción de las defensas antioxidantes.', status: 'bad' },
            { gene: 'Ptgs2', change: '↓ 3.4x', meaning: 'Alteración de la respuesta inflamatoria.', status: 'bad' },
        ],
        buttonText: 'Siguiente Análisis',
    },
    {
        icon: Beaker,
        title: 'Resultados: Ciclo Celular',
        description: 'Observamos cambios significativos en los genes que regulan cómo las células cardíacas crecen y se dividen, sugiriendo una respuesta al estrés.',
        results: [
            { gene: 'Cdkn1a (p21)', change: '↑ 6.8x', meaning: 'Fuerte frenado del ciclo celular, posible daño.', status: 'bad' },
            { gene: 'Myc', change: '↑ 3.9x', meaning: 'Intento de control de la proliferación celular.', status: 'neutral' },
            { gene: 'Tnf', change: '↓ 9.9x', meaning: 'Supresión masiva de la respuesta inflamatoria.', status: 'bad' },
        ],
        buttonText: 'Ver Conclusiones',
    },
    {
        icon: FileText,
        title: 'Conclusiones del Estudio',
        description: 'Nuestros hallazgos demuestran que el vuelo espacial induce un estrés oxidativo persistente y altera la regulación celular en el corazón. Esto es crucial para proteger a los astronautas en futuras misiones a la Luna y Marte.',
        buttonText: 'Finalizar Simulación',
    }
];

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export default function LabSimulation() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(prev => (prev + 1) % simulationSteps.length);
  };

  const currentStep = simulationSteps[step];
  const Icon = currentStep.icon;

  return (
    <div className="my-12">
        <h2 className="text-3xl font-bold text-center mb-6 glow">Simulación de Laboratorio</h2>
        <Card className="apple-glass overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                >
                    <CardHeader className="flex flex-row items-start gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                           <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">{currentStep.title}</CardTitle>
                            <CardDescription className="text-lg mt-1">{currentStep.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {currentStep.results && (
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                {currentStep.results.map(result => (
                                    <div key={result.gene} className={`p-4 rounded-lg bg-black/30 border ${result.status === 'bad' ? 'border-destructive/50' : 'border-white/10'}`}>
                                        <div className="flex justify-between items-baseline">
                                            <p className="font-bold text-lg">{result.gene}</p>
                                            <p className={`font-bold text-xl ${result.status === 'bad' ? 'text-destructive' : 'text-amber-400'}`}>{result.change}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{result.meaning}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                         <Button onClick={handleNext} className="mt-6 w-full md:w-auto" size="lg">
                            {currentStep.buttonText} <ChevronRight className="ml-2"/>
                        </Button>
                    </CardContent>
                </motion.div>
            </AnimatePresence>
        </Card>
    </div>
  );
}
