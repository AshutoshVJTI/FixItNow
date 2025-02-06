import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserStats, updateStats } from '../../lib/stats';

describe('Stats Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserStats', () => {
    it('returns default stats when no stats exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      
      const stats = await getUserStats();
      
      expect(stats).toEqual({
        solutionsGenerated: 0,
        solutionsShared: 0,
        voiceInputsUsed: 0,
      });
    });

    it('returns parsed stats when they exist', async () => {
      const mockStats = {
        solutionsGenerated: 5,
        solutionsShared: 2,
        voiceInputsUsed: 3,
      };
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockStats));
      
      const stats = await getUserStats();
      
      expect(stats).toEqual(mockStats);
    });
  });

  describe('updateStats', () => {
    it('updates existing stats correctly', async () => {
      const existingStats = {
        solutionsGenerated: 1,
        solutionsShared: 1,
        voiceInputsUsed: 1,
      };
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(existingStats));
      
      const update = { solutionsGenerated: 2 };
      const updatedStats = await updateStats(update);
      
      expect(updatedStats).toEqual({
        ...existingStats,
        ...update,
      });
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@user_stats',
        JSON.stringify(updatedStats)
      );
    });
  });
}); 