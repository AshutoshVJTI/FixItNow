import React from 'react';
import { render } from '@testing-library/react-native';
import BadgeNotification from '../../components/BadgeNotification';

describe('BadgeNotification', () => {
  const mockBadge = {
    id: 'test_badge',
    name: 'Test Badge',
    description: 'Test Description',
    icon: '🎯',
    condition: jest.fn(),
  };

  it('renders badge information correctly', () => {
    const { getByText } = render(
      <BadgeNotification badge={mockBadge} onDismiss={jest.fn()} />
    );

    expect(getByText('Test Badge')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByText('🎯')).toBeTruthy();
  });

  it('calls onDismiss after animation', async () => {
    const mockOnDismiss = jest.fn();
    render(<BadgeNotification badge={mockBadge} onDismiss={mockOnDismiss} />);

    // Wait for animations to complete (3.5s = show + delay + hide)
    await new Promise(resolve => setTimeout(resolve, 3500));
    expect(mockOnDismiss).toHaveBeenCalled();
  });
}); 