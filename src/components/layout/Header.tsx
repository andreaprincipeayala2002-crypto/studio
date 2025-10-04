'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Rocket, BrainCircuit, Trophy } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Mapa Galáctico', icon: Rocket },
  { href: '/dashboard', label: 'Motor de Conocimiento', icon: BrainCircuit },
  { href: '/leaderboard', label: 'Clasificación', icon: Trophy },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">BioQuest</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary-foreground font-semibold' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
