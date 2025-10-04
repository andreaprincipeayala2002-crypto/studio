'use client';

import { motion } from 'framer-motion';
import { Asteroid } from 'lucide-react';

interface AsteroidAnimationProps {
  onAnimationComplete: () => void;
}

export default function AsteroidAnimation({ onAnimationComplete }: AsteroidAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold text-destructive glow">¡Misión Fallida!</h2>
        <p className="text-muted-foreground text-lg">Se detectó una anomalía. Calculando resultados...</p>
        <motion.div
            initial={{ y: -500, x: 200, rotate: -45, opacity: 0 }}
            animate={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: 'spring' }}
            onAnimationComplete={onAnimationComplete}
        >
            <Asteroid className="h-32 w-32 text-destructive" />
        </motion.div>
    </div>
  );
}
