import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'System',
  displayLarge: {
    fontSize: 57,
    letterSpacing: 0,
    fontWeight: '400',
  },
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF4785', // Vibrant pink
    secondary: '#00D1FF', // Electric blue
    tertiary: '#FFD600', // Bright yellow
    background: '#F8F9FF',
    surface: '#FFFFFF',
    accent: '#6C63FF', // Purple
    error: '#FF3B3B',
    success: '#00E676',
    gradient: ['#FF4785', '#6C63FF'], // For gradient effects
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 16,
}; 