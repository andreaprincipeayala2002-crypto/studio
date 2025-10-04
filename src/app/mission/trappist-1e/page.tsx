'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Telescope, FlaskConical, AlertTriangle, ChevronRight, Loader2, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

const missionSteps = [
  {
    type: 'intro',
    title: 'Misión TRAPPIST-1e: Análisis Atmosférico',
    text: 'Tu objetivo es usar el espectrógrafo del Telescopio Espacial James Webb (JWST) para analizar la atmósfera de TRAPPIST-1e, un exoplaneta rocoso en la zona habitable, en busca de biofirmas.',
    buttonText: 'Comenzar Calibración',
  },
  {
    type: 'action',
    title: 'Fase 1: Calibrar Espectrógrafo',
    text: 'Alinea los espejos del JWST y calibra el espectrógrafo de infrarrojo cercano (NIRSpec) para observar TRAPPIST-1e. Este proceso tomará unos segundos.',
    actionText: 'Iniciar Calibración',
    duration: 3000,
    nextStep: 'Fase 2: Adquirir Datos',
  },
  {
    type: 'question',
    title: 'Fase 2: Detectar Gases Clave',
    text: 'El espectrógrafo ha capturado la luz de la estrella TRAPPIST-1 que atraviesa la atmósfera del planeta. ¿Qué combinación de gases sería la biofirma más convincente?',
    options: [
      { text: 'Altas concentraciones de Nitrógeno (N₂) y Argón (Ar)', isCorrect: false, feedback: 'Incorrecto. El N₂ es abundante en la Tierra, pero por sí solo no es una biofirma clara. El Argón es un gas noble.' },
      { text: 'Presencia simultánea de Oxígeno (O₂) y Metano (CH₄)', isCorrect: true, feedback: '¡Correcto! El oxígeno y el metano son químicamente incompatibles y se destruirían mutuamente. Su presencia conjunta sugiere un proceso activo (como la vida) que los repone constantemente.' },
      { text: 'Vapor de agua (H₂O) y Dióxido de Carbono (CO₂)', isCorrect: false, feedback: 'Incorrecto. Aunque son esenciales para la vida tal como la conocemos, estos gases también pueden ser producidos por procesos geológicos.' },
    ],
  },
  {
    type: 'action',
    title: 'Fase 3: Analizar Datos de Tránsito',
    text: 'Procesando los datos de múltiples tránsitos de TRAPPIST-1e para confirmar las detecciones y descartar falsos positivos. Esto mejorará la relación señal-ruido.',
    actionText: 'Comenzar Análisis',
    duration: 4000,
    nextStep: 'Resultados del Análisis',
  },
  {
    type 'final',
    title: '¡Misión Cumplida!',
    text: '¡Análisis completado! Has detectado una fuerte señal de O₂ y CH₄ en la atmósfera de TRAPPIST-1e. Aunque no es una prueba definitiva de vida, es una de las biofirmas más prometedoras encontradas hasta la fecha. Has enviado los datos a la Tierra para su verificación.',
    buttonText: 'Volver al Mapa Galáctico',
  }
];

type Option = {
  text: string;
  isCorrect: boolean;
  feedback: string;
};

export default function TrappistMissionPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentStep = missionSteps[stepIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading && currentStep.type === 'action') {
      const duration = currentStep.duration || 3000;
      setProgress(0);
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progressValue = Math.min((elapsedTime / duration) * 100, 100);
        setProgress(progressValue);
      }, 100);

      timer = setTimeout(() => {
        setIsLoading(false);
        setStepIndex(prev => prev + 1);
        clearInterval(interval);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isLoading, stepIndex, currentStep]);

  const handleNextStep = () => {
    if (currentStep.type === 'action') {
      setIsLoading(true);
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  const handleOptionSelect = (option: Option, index: number) => {
    setSelectedOption(index);
    setFeedback({ text: option.feedback, correct: option.isCorrect });

    if (option.isCorrect) {
      setTimeout(() => {
        setStepIndex(prev => prev + 1);
        setFeedback(null);
        setSelectedOption(null);
      }, 2500);
    }
  };

  const getIcon = () => {
    if (currentStep.type === 'final') return <Award className="h-10 w-10 text-yellow-400" />;
    if (currentStep.title.includes('Fase 1')) return <Telescope className="h-10 w-10 text-primary" />;
    if (currentStep.title.includes('Fase 2')) return <FlaskConical className="h-10 w-10 text-primary" />;
    if (currentStep.title.includes('Fase 3')) return <Loader2 className="h-10 w-10 text-primary" />;
    return <Check className="h-10 w-10 text-primary" />;
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="apple-glass">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">{getIcon()}</div>
              <CardTitle className="text-3xl font-bold glow">{currentStep.title}</CardTitle>
              <CardDescription className="text-lg mt-2">{currentStep.text}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && currentStep.type === 'action' && (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">{currentStep.nextStep}...</p>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {currentStep.type === 'question' && (
                <div className="space-y-4">
                  {(currentStep.options as Option[]).map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      className={`w-full justify-start text-left h-auto py-3 ${selectedOption === index ? (option.isCorrect ? 'border-green-500' : 'border-red-500') : ''}`}
                      onClick={() => handleOptionSelect(option, index)}
                      disabled={selectedOption !== null}
                    >
                      {option.text}
                    </Button>
                  ))}
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg text-center ${feedback.correct ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}
                    >
                      {feedback.text}
                    </motion.div>
                  )}
                </div>
              )}

              {!isLoading && (currentStep.type === 'intro' || currentStep.type === 'action') && (
                <Button onClick={handleNextStep} size="lg" className="w-full">
                  {currentStep.actionText || currentStep.buttonText} <ChevronRight className="ml-2" />
                </Button>
              )}

              {currentStep.type === 'final' && (
                <Button asChild size="lg" className="w-full">
                  <Link href="/">
                    {currentStep.buttonText} <Map className="ml-2" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <Button variant="link" asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al mapa galáctico
        </Link>
      </Button>
    </div>
  );
}