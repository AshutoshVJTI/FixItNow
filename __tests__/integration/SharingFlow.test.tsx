import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Share } from 'react-native';
import SolutionCard from '../../components/SolutionCard';
import { updateStats } from '../../lib/stats';

jest.mock('../../lib/stats');

describe('Sharing Flow', () => {
  const mockSolution = "Try using a shorter dunking time! 🍪";
  const mockFrustration = "My biscuit keeps breaking in my tea";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shares solution with correct content', async () => {
    const { getByText } = render(
      <SolutionCard 
        solution={mockSolution} 
        frustration={mockFrustration} 
      />
    );

    fireEvent.press(getByText('Share'));

    await waitFor(() => {
      expect(Share.share).toHaveBeenCalledWith({
        message: expect.stringContaining(mockSolution),
        title: 'Check out this solution!',
      });
      expect(updateStats).toHaveBeenCalledWith({ solutionsShared: 1 });
    });
  });

  it('generates and shares meme', async () => {
    const { getByText } = render(
      <SolutionCard 
        solution={mockSolution} 
        frustration={mockFrustration} 
      />
    );

    fireEvent.press(getByText('Generate Meme'));
    
    await waitFor(() => {
      expect(getByText('Share Meme')).toBeTruthy();
    });

    fireEvent.press(getByText('Share Meme'));

    await waitFor(() => {
      expect(Share.share).toHaveBeenCalled();
    });
  });
}); 