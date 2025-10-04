export type LeaderboardEntry = {
  rank: number;
  name: string;
  avatarUrl: string;
  articlesCompleted: number;
  totalScore: number;
};

export const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Comandante Nova',
    avatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    articlesCompleted: 3,
    totalScore: 280,
  },
  {
    rank: 2,
    name: 'Dra. Selene',
    avatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
    articlesCompleted: 3,
    totalScore: 265,
  },
  {
    rank: 3,
    name: 'Capitán Orión',
    avatarUrl: 'https://picsum.photos/seed/avatar3/40/40',
    articlesCompleted: 2,
    totalScore: 190,
  },
  {
    rank: 4,
    name: 'Astro-Alex',
    avatarUrl: 'https://picsum.photos/seed/avatar4/40/40',
    articlesCompleted: 2,
    totalScore: 175,
  },
  {
    rank: 5,
    name: 'Luna',
    avatarUrl: 'https://picsum.photos/seed/avatar5/40/40',
    articlesCompleted: 1,
    totalScore: 90,
  },
    {
    rank: 6,
    name: 'Piloto interestelar',
    avatarUrl: 'https://picsum.photos/seed/avatar6/40/40',
    articlesCompleted: 1,
    totalScore: 85,
  },
  {
    rank: 7,
    name: 'Cosmo-Kid',
    avatarUrl: 'https://picsum.photos/seed/avatar7/40/40',
    articlesCompleted: 1,
    totalScore: 70,
  },
];
