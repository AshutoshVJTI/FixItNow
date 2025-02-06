import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

// Only import Voice when needed
let Voice: any;
try {
  Voice = require('@react-native-voice/voice').default;
} catch (e) {
  console.log('Voice module not available');
}

interface VoiceInputProps {
  onTextReceived: (text: string) => void;
}

export default function VoiceInput({ onTextReceived }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Voice) return;

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice?.destroy().then(Voice?.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: any) => {
    if (e.value && e.value[0]) {
      onTextReceived(e.value[0]);
      setIsListening(false);
    }
  };

  const onSpeechError = (e: any) => {
    setError('Error recording voice. Please try again.');
    setIsListening(false);
  };

  const startListening = async () => {
    if (!Voice) {
      setError('Voice recognition not available');
      return;
    }

    try {
      setError(null);
      await Voice.start('en-US');
      setIsListening(true);
    } catch (e) {
      setError('Error starting voice recording');
    }
  };

  const stopListening = async () => {
    if (!Voice) return;

    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      setError('Error stopping voice recording');
    }
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon={isListening ? 'microphone' : 'microphone-outline'}
        mode={isListening ? 'contained' : 'outlined'}
        size={30}
        onPress={isListening ? stopListening : startListening}
        style={[
          styles.button,
          isListening && styles.activeButton,
        ]}
      />
      {isListening && (
        <Text style={styles.listeningText}>Listening...</Text>
      )}
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  button: {
    margin: 8,
  },
  activeButton: {
    backgroundColor: '#FF6B6B',
  },
  listeningText: {
    marginTop: 4,
    color: '#FF6B6B',
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
}); 