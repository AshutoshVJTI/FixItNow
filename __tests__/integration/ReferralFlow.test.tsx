import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Share } from 'react-native';
import ReferralCard from '../../components/ReferralCard';
import { generateReferralCode, getReferralCode } from '../../lib/referralManager';

jest.mock('../../lib/referralManager');

describe('Referral Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates and shares referral code', async () => {
    const mockCode = 'ABC123';
    (getReferralCode as jest.Mock).mockResolvedValue(null);
    (generateReferralCode as jest.Mock).mockResolvedValue(mockCode);

    const { getByText, findByText } = render(<ReferralCard />);

    // Wait for referral code to be generated
    await findByText(mockCode);

    // Share referral code
    fireEvent.press(getByText('Share Referral Code'));

    await waitFor(() => {
      expect(Share.share).toHaveBeenCalledWith({
        message: expect.stringContaining(mockCode),
        title: 'Join me on FixItNow',
      });
    });
  });

  it('uses existing referral code if available', async () => {
    const mockCode = 'XYZ789';
    (getReferralCode as jest.Mock).mockResolvedValue(mockCode);

    const { findByText } = render(<ReferralCard />);

    await findByText(mockCode);
    expect(generateReferralCode).not.toHaveBeenCalled();
  });
}); 