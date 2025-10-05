'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, CheckCircle, HeartPulse, BrainCircuit, Shield, Activity, Droplet, Ship, Dna, Telescope, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const missionSteps = [
  {
    type: 'intro',
    title: 'Análisis Cardiovascular en Microgravedad',
    text: 'Esta simulación revisa los efectos de los vuelos espaciales en el sistema cardiovascular y las contramedidas actuales. Tu misión es procesar y comprender los hallazgos clave.',
    buttonText: 'Comenzar Análisis Fisiológico',
    icon: HeartPulse,
  },
  {
    type: 'info',
    title: 'Fase 1: Efectos Fisiológicos Documentados',
    points: [
      {
        title: 'Redistribución de Fluidos',
        icon: Droplet,
        items: [
          'Desplazamiento de ~2L de fluidos hacia la cabeza.',
          'Disminución del volumen plasmático (10-15%) en 24-48h.',
        ],
      },
      {
        title: 'Cambios Cardíacos',
        icon: HeartPulse,
        items: ['Reducción de la masa cardíaca (atrofia).', 'Alteraciones en la función diastólica.'],
      },
       {
        title: 'Adaptaciones Vasculares',
        icon: Dna,
        items: ['Disminución de la compliance arterial.', 'Alteración de la función endotelial.'],
      },
    ],
    buttonText: 'Evaluar Contramedidas',
  },
  {
    type: 'info',
    title: 'Fase 2: Contramedidas Evaluadas',
     points: [
      {
        title: 'Ejercicio Físico',
        icon: Activity,
        items: [
          'Combinación de ejercicio aeróbico y de resistencia.',
          'Uso de dispositivos especializados como CEVIS y ARED.',
          'Mitiga pero no previene completamente la atrofia.',
        ],
      },
      {
        title: 'Manipulación de Fluidos y Nutrición',
        icon: FlaskConical,
        items: ['Suplementación hídrica antes del reingreso.', 'Uso de antioxidantes y omega-3.'],
      },
    ],
    buttonText: 'Identificar Problemas No Resueltos',
  },
   {
    type: 'info',
    title: 'Fase 3: Brechas de Conocimiento',
    points: [
        {
            title: 'Mecanismos y Diferencias Individuales',
            icon: BrainCircuit,
            items: [
                'Los mecanismos moleculares específicos no se comprenden del todo.',
                'Existe una alta variabilidad en cómo responde cada astronauta.',
            ],
        },
        {
            title: 'Limitaciones de las Contramedidas',
            icon: Shield,
            items: [
                'La efectividad para prevenir la atrofia es solo parcial.',
                'La implementación logística en el espacio es compleja.',
            ],
        },
    ],
    buttonText: 'Analizar Implicaciones Futuras',
  },
  {
    type: 'final',
    title: '¡Análisis Completado!',
    text: 'Has procesado los datos clave sobre la salud cardiovascular en el espacio. La investigación continua es esencial para la seguridad en misiones de larga duración a la Luna y Marte. Los hallazgos también son relevantes para la medicina en la Tierra, especialmente en geriatría y rehabilitación.',
    icon: CheckCircle,
    buttonText: 'Volver al Mapa Galáctico',
  },
];

export default function MissionGliese581gPage() {
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = missionSteps[stepIndex];

  const handleNextStep = () => {
    setStepIndex(prev => Math.min(prev + 1, missionSteps.length - 1));
  };
  
  const getIcon = (IconComponent: React.ElementType, props: any = {}) => {
    return <IconComponent {...props} />;
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
          className="w-full max-w-3xl"
        >
          <Card className="apple-glass">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {getIcon(currentStep.icon, {className: "h-10 w-10 text-primary"})}
              </div>
              <CardTitle className="text-3xl font-bold glow">{currentStep.title}</CardTitle>
              {currentStep.type !== 'info' && <CardDescription className="text-lg mt-2">{currentStep.text}</CardDescription>}
            </CardHeader>
            <CardContent>
              {currentStep.type === 'info' && 'points' in currentStep && (
                <div className="space-y-6 text-left">
                  {currentStep.points.map((point, pIndex) => (
                    <div key={pIndex}>
                       <h3 className="font-bold text-xl flex items-center gap-2 mb-2 text-primary-foreground">
                        {getIcon(point.icon, {className: "h-5 w-5 text-accent"})}
                        {point.title}
                       </h3>
                       <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                           {point.items.map((item, iIndex) => (
                               <li key={iIndex}>{item}</li>
                           ))}
                       </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                {currentStep.type === 'final' ? (
                     <Button asChild size="lg" className="w-full">
                        <Link href="/">
                            {currentStep.buttonText} <Ship className="ml-2" />
                        </Link>
                    </Button>
                ) : (
                    'buttonText' in currentStep && (
                        <Button onClick={handleNextStep} size="lg" className="w-full">
                            {currentStep.buttonText} <ChevronRight className="ml-2" />
                        </Button>
                    )
                )}
              </div>
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
