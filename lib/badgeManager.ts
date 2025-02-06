import { Badge, UserStats, badges } from './badges';
import { getUserStats } from './stats';

export interface EarnedBadge extends Badge {
  isNew: boolean;
}

const EARNED_BADGES_KEY = '@earned_badges';

export async function checkForNewBadges(currentStats: UserStats): Promise<Badge[]> {
  try {
    // Get previously earned badges
    const earnedBadgeIds = await AsyncStorage.getItem(EARNED_BADGES_KEY);
    const earnedBadges = earnedBadgeIds ? JSON.parse(earnedBadgeIds) : [];

    // Check for newly earned badges
    const newBadges = badges.filter(badge => 
      !earnedBadges.includes(badge.id) && 
      badge.condition(currentStats)
    );

    if (newBadges.length > 0) {
      // Save newly earned badges
      const updatedEarnedBadges = [...earnedBadges, ...newBadges.map(b => b.id)];
      await AsyncStorage.setItem(EARNED_BADGES_KEY, JSON.stringify(updatedEarnedBadges));
    }

    return newBadges;
  } catch (error) {
    console.error('Error checking badges:', error);
    return [];
  }
} 