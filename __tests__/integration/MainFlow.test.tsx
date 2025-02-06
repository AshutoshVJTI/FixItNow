import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Index from '../../app/index';
import { generateSolution } from '../../lib/openai';
import { getUserStats, updateStats } from '../../lib/stats';
import { checkForNewBadges } from '../../lib/badgeManager';

// Mock all dependencies
jest.mock('../../lib/openai');
jest.mock('../../lib/stats');
jest.mock('../../lib/badgeManager');

describe('Main App Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getUserStats as jest.Mock).mockResolvedValue({
      solutionsGenerated: 0,
      solutionsShared: 0,
      voiceInputsUsed: 0,
    });
  });

  it('completes full solution generation flow', async () => {
    const mockSolution = "Try using a shorter dunking time! 🍪";
    (generateSolution as jest.Mock).mockResolvedValue(mockSolution);
    (checkForNewBadges as jest.Mock).mockResolvedValue([{
      id: 'first_solution',
      name: 'Problem Solver',
      description: 'Generated your first solution',
      icon: '🌟',
      condition: jest.fn(),
    }]);

    const { getByPlaceholderText, getByText, findByText } = render(<Index />);

    // Enter frustration
    fireEvent.changeText(
      getByPlaceholderText('e.g., My biscuit keeps breaking in my tea'),
      'My biscuit keeps breaking in my tea'
    );

    // Submit frustration
    fireEvent.press(getByText('Find Solution'));

    // Wait for solution to appear
    await findByText(mockSolution);

    // Verify stats were updated
    expect(updateStats).toHaveBeenCalledWith({ solutionsGenerated: 1 });

    // Verify badge check was performed
    expect(checkForNewBadges).toHaveBeenCalled();

    // Verify badge notification appears
    await findByText('Problem Solver');
  });

  it('handles error states gracefully', async () => {
    (generateSolution as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { getByPlaceholderText, getByText, findByText } = render(<Index />);

    fireEvent.changeText(
      getByPlaceholderText('e.g., My biscuit keeps breaking in my tea'),
      'Test frustration'
    );

    fireEvent.press(getByText('Find Solution'));

    await findByText('Failed to generate solution. Please try again.');
  });
}); 