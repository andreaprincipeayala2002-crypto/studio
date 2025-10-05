'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Award, RotateCw, Map, XCircle, CheckCircle, Rocket, BookDown } from 'lucide-react';
import type { AnswerRecord } from './QuizClient';
import { cn } from '@/lib/utils';
import Link from 'next/link';


// Custom SVG for Asteroid as lucide-react does not have one.
const AsteroidIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.238 6.51a3.022 3.022 0 0 0-3.447-3.447L3 10.825l10.825-7.762.001-2.053a.5.5 0 0 1 .832-.373l2.78 2.085a.5.5 0 0 1 .01.765l-2.086 2.781a.5.5 0 0 1-.764-.01l-2.052.001Z" />
      <path d="M10.825 3 4.162 8.57a3.022 3.022 0 0 0 0 4.275l7.558 7.558a3.022 3.022 0 0 0 4.275 0L21 15.242a3.022 3.022 0-0 0 0-4.275l-5.557-6.666" />
      <path d="m9 15 6-6" />
    </svg>
);

interface ScoreModalProps {
  isOpen: boolean;
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
  answerHistory: AnswerRecord[];
  missionSuccess: boolean;
  allCorrect: boolean;
}

export default function ScoreModal({
  isOpen,
  score,
  totalQuestions,
  onRestart,
  onGoHome,
  answerHistory,
  missionSuccess,
  allCorrect,
}: ScoreModalProps) {
  if (!isOpen) return null;

  const scorePercentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onGoHome}>
      <DialogContent className="sm:max-w-2xl apple-glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-3xl">
            {missionSuccess ? (
                <Rocket className="h-8 w-8 text-accent" />
            ) : (
                <AsteroidIcon className="h-8 w-8 text-destructive" />
            )}
            {missionSuccess ? '¡Misión Exitosa!' : '¡Misión Fallida!'}
          </DialogTitle>
          <DialogDescription className="text-lg">
            Tu puntaje final es <span className="font-bold text-primary">{score}</span> de <span className="font-bold">{totalQuestions}</span> ({scorePercentage.toFixed(0)}%).
          </DialogDescription>
        </DialogHeader>
        
        {allCorrect && (
            <div className="p-4 bg-green-500/20 text-green-300 rounded-lg text-center">
                <p className="font-bold">¡Felicidades! Te has ganado un libro por tu conocimiento excepcional.</p>
                {/* 
                  Para cambiar el archivo del libro:
                  1. Crea una carpeta llamada 'public' en la raíz de tu proyecto si no existe.
                  2. Sube tu archivo PDF a esa carpeta (ej: 'libro-bioespacial.pdf').
                  3. El enlace será simplemente '/libro-bioespacial.pdf'.
                */}
                <Button asChild variant="link" className="text-white mt-2">
                    <a href="/libro-bioespacial.pdf" target="_blank" rel="noopener noreferrer">
                        <BookDown className="mr-2 h-4 w-4" />
                        Descargar Libro
                    </a>
                </Button>
            </div>
        )}

        <div className="my-4">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <Award />
                Resumen de la Misión
            </h3>
            <ScrollArea className="h-60 w-full rounded-md border border-white/10 p-4 bg-black/20">
                <ul className="space-y-4">
                    {answerHistory.map((record, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <div>
                                {record.isCorrect ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                ): (
                                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold">{record.question.question}</p>
                                <p className={cn(
                                    "text-sm",
                                    record.isCorrect ? 'text-green-400' : 'text-red-400'
                                )}>
                                    Tu respuesta: {record.question.options[record.selectedAnswerIndex]}
                                </p>
                                {!record.isCorrect && (
                                     <p className="text-sm text-green-400">
                                        Respuesta correcta: {record.question.options[record.question.correctAnswerIndex]}
                                     </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>

        <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button onClick={onRestart} variant="outline">
            <RotateCw className="mr-2 h-4 w-4" />
            Reiniciar Cuestionario
          </Button>
          <Button onClick={onGoHome}>
            <Map className="mr-2 h-4 w-4" />
            Volver al Mapa Galáctico
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
