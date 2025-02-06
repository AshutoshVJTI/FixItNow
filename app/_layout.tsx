import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../lib/theme';
import { StatusBar } from 'expo-status-bar';
import { IconButton } from 'react-native-paper';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'FixItNow ✨',
              headerRight: () => (
                <IconButton
                  icon="star-outline"
                  iconColor="white"
                  onPress={() => {}}
                />
              ),
            }}
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 