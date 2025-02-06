import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FrustrationInput from '../../components/FrustrationInput';
import { generateSolution } from '../../lib/openai';
import { updateStats } from '../../lib/stats';

// Mock dependencies
jest.mock('../../lib/openai');
jest.mock('../../lib/stats');

describe('FrustrationInput', () => {
  const mockOnSolutionGenerated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows error when submitting empty input', () => {
    const { getByText } = render(
      <FrustrationInput onSolutionGenerated={mockOnSolutionGenerated} />
    );

    fireEvent.press(getByText('Find Solution'));
    expect(getByText('Please describe your frustration')).toBeTruthy();
  });

  it('generates solution successfully', async () => {
    const mockSolution = 'Test solution';
    (generateSolution as jest.Mock).mockResolvedValue(mockSolution);

    const { getByPlaceholderText, getByText } = render(
      <FrustrationInput onSolutionGenerated={mockOnSolutionGenerated} />
    );

    fireEvent.changeText(
      getByPlaceholderText('e.g., My biscuit keeps breaking in my tea'),
      'Test frustration'
    );
    fireEvent.press(getByText('Find Solution'));

    await waitFor(() => {
      expect(mockOnSolutionGenerated).toHaveBeenCalledWith(
        mockSolution,
        'Test frustration'
      );
      expect(updateStats).toHaveBeenCalledWith({ solutionsGenerated: 1 });
    });
  });

  it('shows error when solution generation fails', async () => {
    (generateSolution as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { getByPlaceholderText, getByText } = render(
      <FrustrationInput onSolutionGenerated={mockOnSolutionGenerated} />
    );

    fireEvent.changeText(
      getByPlaceholderText('e.g., My biscuit keeps breaking in my tea'),
      'Test frustration'
    );
    fireEvent.press(getByText('Find Solution'));

    await waitFor(() => {
      expect(getByText('Failed to generate solution. Please try again.')).toBeTruthy();
    });
  });
}); 