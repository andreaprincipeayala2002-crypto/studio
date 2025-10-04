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
      label: 'Puntuación',
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
                <CardTitle>Rendimiento de Cuestionarios</CardTitle>
                <CardDescription>Aún no has completado ningún cuestionario.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-stone-300 mb-4">¡Completa tu primer cuestionario para ver tus estadísticas aquí!</p>
                <Button asChild>
                    <Link href="/">
                        Ir al Mapa Galáctico
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
            <CardTitle>Rendimiento por Tema</CardTitle>
            <CardDescription>Tu puntuación en cada cuestionario completado.</CardDescription>
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
                    Temas para Reforzar
                </CardTitle>
                <CardDescription>Aquí están los temas con menor puntuación. ¡Una buena oportunidad para repasar!</CardDescription>
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
                                        Repasar Artículo <ArrowRight className="ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-stone-300 py-8">
                        <p className="font-semibold text-lg">¡Felicidades!</p>
                        <p>No tienes temas con puntuación baja. ¡Sigue así!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
