import React from 'react';
import Constants from 'expo-constants';
import { Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

// Only import Voice when not in Expo Go
const VoiceInput = Constants.appOwnership === 'expo' 
  ? null 
  : require('./VoiceInput').default;

interface VoiceInputWrapperProps {
  onTextReceived: (text: string) => void;
}

export default function VoiceInputWrapper({ onTextReceived }: VoiceInputWrapperProps) {
  const isExpoGo = Constants.appOwnership === 'expo';

  if (isExpoGo) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Voice input is not available in Expo Go
        </Text>
        <Button
          mode="outlined"
          onPress={() => {
            onTextReceived("My coffee is too hot");
          }}
        >
          Test with Sample Text
        </Button>
      </View>
    );
  }

  if (!VoiceInput) {
    return null;
  }

  return <VoiceInput onTextReceived={onTextReceived} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  message: {
    textAlign: 'center',
    marginVertical: 8,
    opacity: 0.6,
  },
}); 