'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Award, RotateCw, Map, XCircle, CheckCircle, Rocket } from 'lucide-react';
import type { AnswerRecord } from './QuizClient';
import { cn } from '@/lib/utils';


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
      <path d="M10.825 3 4.162 8.57a3.022 3.022 0 0 0 0 4.275l7.558 7.558a3.022 3.022