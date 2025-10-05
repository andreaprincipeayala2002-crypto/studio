'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { topics } from '@/lib/quiz-data';
import { Button } from '../ui/button';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface ScoreData {
  topic: string;
  title: string;
  score: number;
  total: number;
  percentage: number;
}

export default function UserPerformanceCharts() {
  const [scores, setScores] = useState<ScoreData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedScores: ScoreData[] = [];
    topics.forEach(topic => {
      const scoreData = localStorage.getItem(`quiz-score-${topic.slug}`);
      if (scoreData) {
        const { score, total } = JSON.parse(scoreData);
        if (typeof score === 'number' && typeof total === 'number' && total > 0) {
            loadedScores.push({
                topic: topic.slug,
                title: topic.title,
                score,
                total,
                percentage: (score / total) * 100,
            });
        }
      }
    });
    setScores(loadedScores);
    setLoading(false);
  }, []);

  const topicsToImprove = useMemo(() => {
    return scores
      .filter(s => s.percentage < 75)
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3);
  }, [scores]);

  const chartConfig = {
    score: {
      label: 'Score',
      color: 'hsl(var(--primary))',
    },
  };

  if (loading) {
    return (
        <Card className="apple-glass">
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full" />
            </CardContent>
        </Card>
    );
  }

  if (scores.length === 0) {
      return (
        <Card className="apple-glass text-center">
            <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
                <CardDescription>You haven't completed any quizzes yet.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-stone-300 mb-4">Complete your first quiz to see your stats here!</p>
                <Button asChild>
                    <Link href="/">
                        Go to Galactic Map
                        <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="apple-glass lg:col-span-2">
            <CardHeader>
            <CardTitle>Performance by Topic</CardTitle>
            <CardDescription>Your score on each completed quiz.</CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <ResponsiveContainer>
                    <BarChart data={scores} layout="vertical" margin={{ left: 10, right: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis 
                            dataKey="title" 
                            type="category" 
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                            width={250}
                            tickFormatter={(value) => value.length > 35 ? `${value.substring(0, 35)}...` : value}
                        />
                        <Tooltip 
                            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                            content={<ChartTooltipContent formatter={(value) => `${value.toFixed(0)}%`} />}
                        />
                        <Bar dataKey="percentage" fill="var(--color-score)" radius={[0, 4, 4, 0]}>
                            <LabelList 
                                dataKey="percentage" 
                                position="right" 
                                offset={10} 
                                className="fill-white font-bold"
                                formatter={(value: number) => `${value.toFixed(0)}%`}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
            </CardContent>
      </Card>
      <Card className="apple-glass">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="text-amber-400" />
                    Topics to Reinforce
                </CardTitle>
                <CardDescription>Here are the topics with the lowest scores. A good opportunity to review!</CardDescription>
            </CardHeader>
            <CardContent>
                {topicsToImprove.length > 0 ? (
                    <div className="space-y-4">
                        {topicsToImprove.map(topic => (
                            <div key={topic.topic} className="p-4 rounded-lg bg-stone-900/60 border border-stone-700 hover:border-primary transition-all">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-white flex-1 pr-4">{topic.title}</h4>
                                    <span className="font-bold text-primary">{topic.percentage.toFixed(0)}%</span>
                                </div>
                                <Button size="sm" variant="link" asChild className="p-0 h-auto mt-2">
                                    <Link href={`/article/${topic.topic}`}>
                                        Review Article <ArrowRight className="ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-stone-300 py-8">
                        <p className="font-semibold text-lg">Congratulations!</p>
                        <p>You have no low-scoring topics. Keep it up!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
