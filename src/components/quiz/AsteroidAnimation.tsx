'use client';

import { motion } from 'framer-motion';

// Custom SVG for Asteroid as lucide-react does not have one.
const AsteroidIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.238 6.51a3.022 3.022 0 0 0-3.447-3.447L3 10.825l10.825-7.762.001-2.053a.5.5 0 0 1 .832-.373l2.78 2.085a.5.5 0 0 1 .01.765l-2.086 2.781a.5.5 0 0 1-.764-.01l-2.052.001Z" />
      <path d="M10.825 3 4.162 8.57a3.022 3.022 0 0 0 0 4.275l7.558 7.558a3.022 3.022 0 0 0 4.275 0L21 15.242a3.022 3.022 0-0 0 0-4.275l-5.557-6.666" />
      <path d="m9 15 6-6" />
    </svg>
);


interface AsteroidAnimationProps {
  onAnimationComplete: () => void;
}

export default function AsteroidAnimation({ onAnimationComplete }: AsteroidAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold text-destructive glow">Mission Failed!</h2>
        <p className="text-muted-foreground text-lg">Anomaly detected. Calculating results...</p>
        <motion.div
            initial={{ y: -500, x: 200, rotate: -45, opacity: 0 }}
            animate={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: 'spring' }}
            onAnimationComplete={onAnimationComplete}
        >
            <AsteroidIcon className="h-32 w-32 text-destructive" />
        </motion.div>
    </div>
  );
}
