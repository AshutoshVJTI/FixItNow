import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateReferralCode, getReferralCode, validateReferralCode } from '../../lib/referralManager';

describe('ReferralManager Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateReferralCode', () => {
    it('generates and saves a valid referral code', async () => {
      const code = await generateReferralCode();
      
      expect(code).toMatch(/^[A-Z0-9]{6}$/);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@referral_code', code);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@referrals',
        expect.stringContaining(code)
      );
    });
  });

  describe('validateReferralCode', () => {
    it('returns true for valid codes', async () => {
      const mockReferrals = [{
        code: 'ABC123',
        usedBy: [],
        createdAt: Date.now(),
      }];
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockReferrals));
      
      const isValid = await validateReferralCode('ABC123');
      expect(isValid).toBe(true);
    });

    it('returns false for invalid codes', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));
      
      const isValid = await validateReferralCode('INVALID');
      expect(isValid).toBe(false);
    });
  });
}); 