import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateStats } from './stats';

const REFERRAL_CODE_KEY = '@referral_code';
const REFERRALS_KEY = '@referrals';

interface Referral {
  code: string;
  usedBy: string[];
  createdAt: number;
}

export async function generateReferralCode(): Promise<string> {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  await AsyncStorage.setItem(REFERRAL_CODE_KEY, code);
  
  const referral: Referral = {
    code,
    usedBy: [],
    createdAt: Date.now(),
  };
  
  await AsyncStorage.setItem(REFERRALS_KEY, JSON.stringify([referral]));
  return code;
}

export async function getReferralCode(): Promise<string | null> {
  return AsyncStorage.getItem(REFERRAL_CODE_KEY);
}

export async function validateReferralCode(code: string): Promise<boolean> {
  try {
    const referralsStr = await AsyncStorage.getItem(REFERRALS_KEY);
    const referrals: Referral[] = referralsStr ? JSON.parse(referralsStr) : [];
    return referrals.some(r => r.code === code);
  } catch (error) {
    console.error('Error validating referral code:', error);
    return false;
  }
} 