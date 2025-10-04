import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/lib/quiz-data';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswerIndex: number | null;
  isCorrect: boolean | null;
}

export default function QuestionCard({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  selectedAnswerIndex,
  isCorrect
}: QuestionCardProps) {

  const getButtonClass = (index: number) => {
    if (selectedAnswerIndex === null) {
      return 'bg-secondary/20 border-secondary/30 hover:bg-secondary/40 text-secondary-foreground';
    }
    if (index === question.correctAnswerIndex) {
      return 'bg-green-500/80 border-green-500 text-white animate-pulse';
    }
    if (index === selectedAnswerIndex && !isCorrect) {
      return 'bg-red-500/80 border-red-500 text-white';
    }
    return 'bg-secondary/20 border-secondary/30 text-muted-foreground opacity-50';
  };

  const getIcon = (index: number) => {
    if(selectedAnswerIndex === null) return null;
    if(index === question.correctAnswerIndex) return <CheckCircle className="h-5 w-5" />;
    if(index === selectedAnswerIndex && !isCorrect) return <XCircle className="h-5 w-5" />;
    return null;
  }

  return (
    <Card className="w-full max-w-3xl bg-card/60 backdrop-blur-lg border-primary/20 shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardDescription className="text-primary font-bold">
          Question {questionNumber} / {totalQuestions}
        </CardDescription>
        <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(index)}
              className={cn(
                'justify-start text-left h-auto py-3 px-4 rounded-lg transition-all duration-300 text-base flex items-center gap-4',
                getButtonClass(index)
              )}
              disabled={selectedAnswerIndex !== null}
            >
              <span className="font-bold">{String.fromCharCode(65 + index)}</span>
              <span className="flex-1">{option}</span>
              {getIcon(index)}
            </Button>
          ))}
        </div>
        {selectedAnswerIndex !== null && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-bold text-lg">Explanation</h4>
                <p className="text-muted-foreground mt-2">{question.explanation}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
