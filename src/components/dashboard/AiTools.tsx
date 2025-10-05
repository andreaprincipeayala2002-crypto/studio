'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { summarizeSpaceBiologyPublication } from '@/ai/flows/summarize-space-biology-publications';
import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';
import { Wand2, BrainCircuit, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

const sampleText = "In the microgravity environment of space, the human body undergoes a series of physiological adaptations. One of the most significant is the cephalic fluid shift, where body fluids move from the lower extremities towards the head. This redistribution affects the cardiovascular system, leading to a decrease in blood volume and a condition known as space anemia. Bone density also decreases at an accelerated rate, especially in weight-bearing bones, due to the lack of mechanical loading. To counteract these effects, astronauts on the International Space Station (ISS) follow a rigorous exercise regimen, including both aerobic and resistance training. Additionally, research on Spaceflight Associated Neuro-ocular Syndrome (SANS) investigates the changes in vision and eye structure experienced by some astronauts, believed to be related to changes in intracranial pressure.";

export default function AiTools() {
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [textToSummarize, setTextToSummarize] = useState(sampleText);
  
  const [quizTopic, setQuizTopic] = useState('Space Anemia');
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
      setSummary('Could not generate summary. Please try again.');
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
    <>
      <div className="text-center mb-12 mt-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-stone-400">AI Tools</h2>
        <p className="text-lg text-stone-300 mt-3 max-w-2xl mx-auto">Use AI to generate summaries and personalized quizzes.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="apple-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-3"><Wand2 className="text-fuchsia-400" /> Publication Summarizer</CardTitle>
            <CardDescription>Paste text from a NASA publication to get a concise summary.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste text here..."
              value={textToSummarize}
              onChange={(e) => setTextToSummarize(e.target.value)}
              rows={8}
              className="bg-stone-900/80 border-stone-700"
            />
            <Button onClick={handleSummarize} disabled={isSummarizing} className="mt-4 w-full">
              {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Summarize
            </Button>
            {summary && (
              <div className="mt-4 p-4 bg-black/30 rounded-xl border border-white/10">
                <h4 className="font-bold text-lg">Generated Summary:</h4>
                <p className="text-stone-300 mt-2 whitespace-pre-wrap">{summary}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="apple-glass">
          <CardHeader>
              <CardTitle className="flex items-center gap-3"><BrainCircuit className="text-sky-400"/> Quiz Generator</CardTitle>
              <CardDescription>Generate quiz questions from a topic and context text.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="space-y-4">
                  <Input placeholder="Quiz Topic" value={quizTopic} onChange={e => setQuizTopic(e.target.value)} className="bg-stone-900/80 border-stone-700" />
                  <Textarea placeholder="Context for the quiz..." value={quizContext} onChange={e => setQuizContext(e.target.value)} rows={5} className="bg-stone-900/80 border-stone-700" />
                  <Button onClick={handleGenerateQuiz} disabled={isGenerating} className="w-full">
                      {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                      Generate Quiz
                  </Button>
              </div>
              {generatedQuiz && (
                  <div className="mt-4 p-4 bg-black/30 rounded-xl border border-white/10">
                      <h4 className="font-bold text-lg">Generated Questions:</h4>
                      <ul className="space-y-4 mt-2">
                          {generatedQuiz.map((q: any, i: number) => (
                              <li key={i}>
                                  <p className="font-semibold">{i+1}. {q.question}</p>
                                  <ul className="list-disc pl-5 text-stone-300">
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
    </>
  );
}
