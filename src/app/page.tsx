'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, CheckCircle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { topics } from '@/lib/quiz-data';
import { useState, useEffect } from 'react';

const specialMissions = [
  {
    slug: '/mission/gliese-581g',
    title: 'Misión: Gliese-581g',
    description: 'Analiza la atmósfera de un exoplaneta en busca de biofirmas.',
    image: {
        imageUrl: 'https://images.unsplash.com/photo-1506443432602-ac2dcd7e20de?w=1080',
        description: 'A rocky exoplanet',
        imageHint: 'rocky exoplanet'
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function GalacticMap() {
  const [scores, setScores] = useState<Record<string, number | null>>({});

  useEffect(() => {
    const loadedScores: Record<string, number | null> = {};
    topics.forEach(topic => {
      const scoreData = localStorage.getItem(`quiz-score-${topic.slug}`);
      if (scoreData) {
        const { score } = JSON.parse(scoreData);
        loadedScores[topic.slug] = score;
      } else {
        loadedScores[topic.slug] = null;
      }
    });
    setScores(loadedScores);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter glow">
          Galactic Map
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Welcome to BioQuest. Select a cosmic destination to begin your mission and test your knowledge of space biology.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {topics.map((topic) => (
          <motion.div key={topic.slug} variants={itemVariants}>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 h-full flex flex-col overflow-hidden group">
              <CardHeader className="p-0">
                {topic.image && (
                   <div className="aspect-video overflow-hidden">
                    <Image
                      src={topic.image.imageUrl}
                      alt={topic.image.description}
                      data-ai-hint={topic.image.imageHint}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                   </div>
                )}
              </CardHeader>
              <div className="p-6 flex flex-col flex-grow">
                <CardTitle className="text-2xl font-bold text-primary-foreground">{topic.title}</CardTitle>
                <CardDescription className="mt-2 flex-grow">{topic.description}</CardDescription>
                <div className="mt-4">
                  {scores[topic.slug] !== null && scores[topic.slug] !== undefined ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-bold">Puntaje: {scores[topic.slug]} / {topic.questions.length}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                       <HelpCircle className="h-5 w-5" />
                      <span>Cuestionario no realizado</span>
                    </div>
                  )}
                </div>
              </div>
              <CardFooter>
                <Button asChild className="w-full bg-primary/80 hover:bg-primary text-primary-foreground font-bold group-hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow duration-300">
                  <Link href={`/article/${topic.slug}`}>
                    Start Mission <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
         {specialMissions.map((mission) => (
          <motion.div key={mission.slug} variants={itemVariants}>
            <Card className="bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all duration-300 h-full flex flex-col overflow-hidden group">
              <CardHeader className="p-0">
                {mission.image && (
                   <div className="aspect-video overflow-hidden">
                    <Image
                      src={mission.image.imageUrl}
                      alt={mission.image.description}
                      data-ai-hint={mission.image.imageHint}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                   </div>
                )}
              </CardHeader>
              <div className="p-6 flex flex-col flex-grow">
                <CardTitle className="text-2xl font-bold text-accent-foreground glow">{mission.title}</CardTitle>
                <CardDescription className="mt-2 flex-grow">{mission.description}</CardDescription>
              </div>
              <CardFooter>
                <Button asChild className="w-full bg-accent/80 hover:bg-accent text-accent-foreground font-bold group-hover:shadow-[0_0_20px_hsl(var(--accent))] transition-shadow duration-300">
                  <Link href={mission.slug}>
                    Iniciar Misión Especial <Star className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
