import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import { leaderboardData } from '@/lib/leaderboard-data';
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter glow flex items-center justify-center gap-4">
          <Trophy className="h-12 w-12 text-yellow-400" />
          Explorer Leaderboard
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          The top explorers of BioQuest. Complete quizzes to climb the ranks!
        </p>
      </div>
      <LeaderboardTable data={leaderboardData} />
    </div>
  );
}
