'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface RocketAnimationProps {
  onAnimationComplete: () => void;
}

export default function RocketAnimation({ onAnimationComplete }: RocketAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold text-center text-primary-foreground glow">Mission Success!</h2>
        <p className="text-muted-foreground text-lg">Calculating results...</p>
        <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -500, opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            onAnimationComplete={onAnimationComplete}
        >
            <Rocket className="h-32 w-32 text-accent" style={{ transform: 'rotate(-45deg)' }} />
        </motion.div>
    </div>
  );
}
