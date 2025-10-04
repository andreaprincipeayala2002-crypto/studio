import { Suspense } from 'react';
import QuizClient from '@/components/quiz/QuizClient';

function QuizLoading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <p className="text-2xl font-bold">Preparando misión...</p>
                <p className="text-muted-foreground">Cargando preguntas de biología espacial.</p>
            </div>
        </div>
    )
}

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizClient />
    </Suspense>
  );
}
