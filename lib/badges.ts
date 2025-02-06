export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  solutionsGenerated: number;
  solutionsShared: number;
  voiceInputsUsed: number;
}

export const badges: Badge[] = [
  {
    id: 'first_solution',
    name: 'Problem Solver',
    description: 'Generated your first solution',
    icon: '🌟',
    condition: (stats) => stats.solutionsGenerated >= 1,
  },
  {
    id: 'voice_master',
    name: 'Voice Master',
    description: 'Used voice input 5 times',
    icon: '🎤',
    condition: (stats) => stats.voiceInputsUsed >= 5,
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Shared 3 solutions',
    icon: '🦋',
    condition: (stats) => stats.solutionsShared >= 3,
  },
]; 