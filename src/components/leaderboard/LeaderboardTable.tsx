import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LeaderboardEntry } from '@/lib/leaderboard-data';
import { Award, BookOpen, Star } from 'lucide-react';

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
}

const getRankColor = (rank: number) => {
    switch (rank) {
        case 1: return "text-yellow-400";
        case 2: return "text-gray-300";
        case 3: return "text-yellow-600";
        default: return "text-muted-foreground";
    }
}

export default function LeaderboardTable({ data }: LeaderboardTableProps) {
  return (
    <div className="max-w-4xl mx-auto apple-glass overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b-white/10">
            <TableHead className="w-[80px] text-center">Rango</TableHead>
            <TableHead>Explorador</TableHead>
            <TableHead className="text-center">Cuestionarios</TableHead>
            <TableHead className="text-right">Puntuación Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => (
            <TableRow key={entry.rank} className="border-white/10">
              <TableCell className="font-bold text-xl text-center">
                <div className={`flex items-center justify-center gap-2 ${getRankColor(entry.rank)}`}>
                    {entry.rank <= 3 && <Award />}
                    {entry.rank}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={entry.avatarUrl} alt={entry.name} />
                    <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{entry.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    {entry.articlesCompleted}
                </div>
                </TableCell>
              <TableCell className="text-right font-semibold text-primary">
                <div className="flex items-center justify-end gap-2">
                    <Star className="h-4 w-4" />
                    {entry.totalScore}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
