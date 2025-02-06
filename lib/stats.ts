import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStats } from './badges';

const STATS_KEY = '@user_stats';

export async function getUserStats(): Promise<UserStats> {
  try {
    const stats = await AsyncStorage.getItem(STATS_KEY);
    return stats ? JSON.parse(stats) : {
      solutionsGenerated: 0,
      solutionsShared: 0,
      voiceInputsUsed: 0,
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    return {
      solutionsGenerated: 0,
      solutionsShared: 0,
      voiceInputsUsed: 0,
    };
  }
}

export async function updateStats(update: Partial<UserStats>): Promise<UserStats> {
  try {
    const currentStats = await getUserStats();
    const newStats = {
      solutionsGenerated: (currentStats.solutionsGenerated || 0) + (update.solutionsGenerated || 0),
      solutionsShared: (currentStats.solutionsShared || 0) + (update.solutionsShared || 0),
      voiceInputsUsed: (currentStats.voiceInputsUsed || 0) + (update.voiceInputsUsed || 0),
    };
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    return newStats;
  } catch (error) {
    console.error('Error updating stats:', error);
    throw error;
  }
} 