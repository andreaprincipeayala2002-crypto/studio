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
import { Award, RotateCw, Map, XCircle, CheckCircle, Rocket, Asteroid } from 'lucide-react';
import type { AnswerRecord } from './QuizClient';
import { cn } from '@/lib/utils';

interface ScoreModalProps {
  isOpen: boolean;
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
  answerHistory: AnswerRecord[];
  missionSuccess: boolean;
}

export default function ScoreModal({
  isOpen,
  score,
  totalQuestions,
  onRestart,
  onGoHome,
  answerHistory,
  missionSuccess
}: ScoreModalProps) {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-xl bg-card/80 backdrop-blur-lg border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            {missionSuccess ? <Award className="h-8 w-8 text-primary" /> : <Asteroid className="h-8 w-8 text-destructive" />}
            {missionSuccess ? '¡Misión Cumplida!' : '¡Misión Fallida!'}
          </DialogTitle>
          <DialogDescription>
             Has completado tu evaluación de biología espacial. Aquí están tus resultados.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center border-r border-border pr-4">
                <p className="text-lg text-muted-foreground">Obtuviste</p>
                <p className="text-6xl font-bold text-primary-foreground my-2">
                    {score} / {totalQuestions}
                </p>
                <p className={cn("text-2xl font-semibold", missionSuccess ? "text-accent" : "text-destructive")}>
                    {percentage}%
                </p>
            </div>
            
            <div className='pl-4'>
                <h4 className="font-semibold text-center mb-2">Resumen de Respuestas</h4>
                <ScrollArea className="h-48 pr-4">
                    <ul className="space-y-3">
                        {answerHistory.map((record, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                                {record.isCorrect ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                                )}
                                <div>
                                    <p className="font-medium leading-snug">{record.question.question}</p>
                                    {!record.isCorrect && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Tu respuesta: "{record.question.options[record.selectedAnswerIndex]}"
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </div>
        </div>

        <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button variant="outline" onClick={onGoHome}>
            <Map className="mr-2 h-4 w-4" />
            Volver al Mapa
          </Button>
          <Button onClick={onRestart}>
            <RotateCw className="mr-2 h-4 w-4" />
            Reintentar Misión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
