'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { quizData, Question } from '@/lib/quiz-data';
import QuestionCard from './QuestionCard';
import ScoreModal from './ScoreModal';
import RocketAnimation from './RocketAnimation';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [showScore, setShowScore] = useState(false);
  
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (topic && quizData[topic]) {
      // Shuffle questions for variety on retry
      const shuffledQuestions = [...quizData[topic]].sort(() => Math.random() - 0.5);
      setQuestions(shuffledQuestions);
    } else {
      // Default to a topic or handle error if no topic is found
      const defaultTopic = 'human-biology';
      const shuffledQuestions = [...quizData[defaultTopic]].sort(() => Math.random() - 0.5);
      setQuestions(shuffledQuestions);
    }
  }, [topic]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswerIndex !== null) return; // Prevent multiple answers

    const question = questions[currentQuestionIndex];
    const correct = answerIndex === question.correctAnswerIndex;

    setSelectedAnswerIndex(answerIndex);
    setIsCorrect(correct);

    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswerIndex(null);
        setIsCorrect(null);
      } else {
        setQuizFinished(true);
        setShowRocket(true);
      }
    }, 1500);
  };
  
  const handleRestart = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setShowRocket(false);
    setShowScore(false);
    setSelectedAnswerIndex(null);
    setIsCorrect(null);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-xl text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedAnswerIndex={selectedAnswerIndex}
              isCorrect={isCorrect}
            />
          </motion.div>
        ) : (
          showRocket && (
            <motion.div
              key="rocket"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
                <RocketAnimation onAnimationComplete={() => {
                    setShowRocket(false);
                    setShowScore(true);
                }} />
            </motion.div>
          )
        )}
      </AnimatePresence>
      <ScoreModal
        isOpen={showScore}
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
        onGoHome={handleGoHome}
      />
    </div>
  );
}
