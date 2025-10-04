'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { summarizeSpaceBiologyPublication } from '@/ai/flows/summarize-space-biology-publications';
import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';
import { Wand2, BrainCircuit, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';

const sampleText = "En el entorno de microgravedad del espacio, el cuerpo humano sufre una serie de adaptaciones fisiológicas. Una de las más significativas es el desplazamiento cefálico de fluidos, donde los fluidos corporales se mueven desde las extremidades inferiores hacia la cabeza. Esta redistribución afecta al sistema cardiovascular, provocando una disminución del volumen sanguíneo y una condición conocida como anemia espacial. La densidad ósea también disminuye a un ritmo acelerado, especialmente en los huesos que soportan peso, debido a la falta de carga mecánica. Para contrarrestar estos efectos, los astronautas de la Estación Espacial Internacional (ISS) siguen un riguroso régimen de ejercicios, que incluye tanto entrenamiento aeróbico como de resistencia. Además, la investigación sobre el Síndrome Neuro-ocular Asociado al Espacio (SANS) investiga los cambios en la visión y la estructura del ojo que experimentan algunos astronautas, que se cree que están relacionados con los cambios en la presión intracraneal.";

export default function AiTools() {
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [textToSummarize, setTextToSummarize] = useState(sampleText);
  
  const [quizTopic, setQuizTopic] = useState('Anemia Espacial');
  const [quizContext, setQuizContext] = useState(sampleText);
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary('');
    try {
      const result = await summarizeSpaceBiologyPublication({ text: textToSummarize });
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      setSummary('No se pudo generar el resumen. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setGeneratedQuiz(null);
    try {
        const result = await generateQuizQuestions({
            topic: quizTopic,
            nasaPublicationText: quizContext,
            numberOfQuestions: 3,
        });
        setGeneratedQuiz(result.questions);
    } catch (error) {
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <Card className="bg-card/60 backdrop-blur-lg border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> Resumidor de Publicaciones por IA</CardTitle>
          <CardDescription>Pega texto de una publicación de la NASA para obtener un resumen conciso.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Pega el texto aquí..."
            value={textToSummarize}
            onChange={(e) => setTextToSummarize(e.target.value)}
            rows={8}
            className="mb-4 bg-background/50"
          />
          <Button onClick={handleSummarize} disabled={isSummarizing}>
            {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            Resumir
          </Button>
          {summary && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
              <h4 className="font-bold text-lg">Resumen:</h4>
              <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{summary}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-card/60 backdrop-blur-lg border-accent/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><BrainCircuit className="text-accent"/> Generador de Cuestionarios por IA</CardTitle>
            <CardDescription>Genera preguntas de cuestionario a partir de un tema y un texto de contexto.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <Input placeholder="Tema del Cuestionario" value={quizTopic} onChange={e => setQuizTopic(e.target.value)} className="bg-background/50" />
                <Textarea placeholder="Contexto para el cuestionario..." value={quizContext} onChange={e => setQuizContext(e.target.value)} rows={5} className="bg-background/50" />
                <Button onClick={handleGenerateQuiz} disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                    Generar Cuestionario
                </Button>
            </div>
            {generatedQuiz && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                    <h4 className="font-bold text-lg">Preguntas Generadas:</h4>
                    <ul className="space-y-4 mt-2">
                        {generatedQuiz.map((q: any, i: number) => (
                            <li key={i}>
                                <p className="font-semibold">{i+1}. {q.question}</p>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    {q.options.map((opt: string, j: number) => (
                                        <li key={j} className={cn(j === q.correctAnswerIndex && 'text-green-400 font-bold')}>
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
