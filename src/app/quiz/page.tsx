import { Suspense } from 'react';
import QuizClient from '@/components/quiz/QuizClient';

function QuizLoading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <p className="text-2xl font-bold">Preparing mission...</p>
                <p className="text-muted-foreground">Loading space biology questions.</p>
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
