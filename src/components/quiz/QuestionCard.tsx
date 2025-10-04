import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/lib/quiz-data';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswerIndex: number | null;
  isCorrect: boolean | null;
  topicSlug: string;
}

export default function QuestionCard({
  question,
  onAnswer,
  onNext,
  questionNumber,
  totalQuestions,
  selectedAnswerIndex,
  isCorrect,
  topicSlug,
}: QuestionCardProps) {

  const getTopicColorClass = () => {
    switch (topicSlug) {
      case 'human-biology':
        return 'border-red-500/30 shadow-red-500/10';
      case 'plant-science':
        return 'border-green-500/30 shadow-green-500/10';
      case 'microbiology':
        return 'border-blue-500/30 shadow-blue-500/10';
      default:
        return 'border-primary/20 shadow-primary/10';
    }
  };

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
    <Card className={cn(
        "w-full max-w-3xl bg-card/60 backdrop-blur-lg shadow-2xl transition-all",
        getTopicColorClass()
      )}>
      <CardHeader>
        <CardDescription className="text-primary font-bold">
          Pregunta {questionNumber} / {totalQuestions}
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
                'justify-start text-left h-auto py-3 px-4 rounded-lg transition-all duration-300 text-base flex items-center gap-4 whitespace-normal',
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
          <div className="mt-6 space-y-4">
            {question.explanation && (
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <h4 className="font-bold text-lg">Explicación</h4>
                    <p className="text-muted-foreground mt-2">{question.explanation}</p>
                </div>
            )}
             {isCorrect === false && (
              <Button onClick={onNext} className="w-full" size="lg">
                Siguiente Pregunta <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
