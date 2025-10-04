'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const topics = [
  {
    slug: 'human-biology',
    title: 'Human Biology',
    description: 'Explore the effects of space on the human body.',
    image: PlaceHolderImages.find(img => img.id === 'human-bio-planet'),
  },
  {
    slug: 'plant-science',
    title: 'Plant Science',
    description: 'Learn how plants adapt and grow in microgravity.',
    image: PlaceHolderImages.find(img => img.id === 'plant-sci-planet'),
  },
  {
    slug: 'microbiology',
    title: 'Microbiology',
    description: 'Discover the world of microorganisms in space.',
    image: PlaceHolderImages.find(img => img.id === 'micro-bio-planet'),
  },
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
              </div>
              <CardFooter>
                <Button asChild className="w-full bg-primary/80 hover:bg-primary text-primary-foreground font-bold group-hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow duration-300">
                  <Link href={`/quiz?topic=${topic.slug}`}>
                    Start Mission <ArrowRight className="ml-2 h-4 w-4" />
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
