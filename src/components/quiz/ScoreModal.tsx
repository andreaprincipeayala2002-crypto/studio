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
import { Award, RotateCw } from 'lucide-react';

interface ScoreModalProps {
  isOpen: boolean;
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
}

export default function ScoreModal({
  isOpen,
  score,
  totalQuestions,
  onRestart,
  onGoHome,
}: ScoreModalProps) {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-lg border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <Award className="h-8 w-8 text-primary" />
            Mission Complete!
          </DialogTitle>
          <DialogDescription>
            You have completed your space biology assessment. Here are your results.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
            <p className="text-lg text-muted-foreground">You scored</p>
            <p className="text-6xl font-bold text-primary-foreground my-2">
                {score} / {totalQuestions}
            </p>
            <p className="text-2xl font-semibold text-accent">{percentage}%</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onGoHome} className="w-full sm:w-auto">
            Return to Map
          </Button>
          <Button onClick={onRestart} className="w-full sm:w-auto">
            <RotateCw className="mr-2 h-4 w-4" />
            Retry Mission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
