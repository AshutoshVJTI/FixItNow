import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTheme } from 'react-native-paper';

// Mock react-native-paper's useTheme
jest.mock('react-native-paper', () => ({
  useTheme: jest.fn().mockReturnValue({
    colors: {
      primary: '#000',
    },
  }),
}));

describe('LoadingIndicator', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<LoadingIndicator />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });
}); 