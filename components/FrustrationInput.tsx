import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../lib/theme';
import { generateSolution } from '../lib/openai';
import VoiceInputWrapper from './VoiceInputWrapper';
import { updateStats } from '../lib/stats';
import LoadingIndicator from './LoadingIndicator';

interface FrustrationInputProps {
  onSolutionGenerated: (solution: string, frustration: string) => void;
}

export default function FrustrationInput({ onSolutionGenerated }: FrustrationInputProps) {
  const [frustration, setFrustration] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bounceAnim = new Animated.Value(1);

  const handleVoiceInput = async (text: string) => {
    setFrustration(text);
    await updateStats({ voiceInputsUsed: 1 });
  };

  const handleSubmit = async () => {
    if (!frustration.trim()) {
      setError('Please describe your frustration');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const solution = await generateSolution(frustration);
      onSolutionGenerated(solution, frustration);
      await updateStats({ solutionsGenerated: 1 });
    } catch (error) {
      setError('Failed to generate solution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.spring(bounceAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Surface style={styles.container} elevation={2}>
      <LinearGradient
        colors={theme.colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <View style={styles.inputContainer}>
          <TextInput
            label="Spill the tea... ☕️"
            value={frustration}
            onChangeText={setFrustration}
            multiline
            numberOfLines={3}
            style={styles.input}
            placeholder="what's bothering you rn?"
            theme={{ colors: { primary: theme.colors.primary } }}
          />

          <VoiceInputWrapper onTextReceived={handleVoiceInput} />

          {error && (
            <Text style={styles.error}>
              {error} 😅
            </Text>
          )}

          <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
            <Button
              mode="contained"
              onPress={() => {
                animateButton();
                handleSubmit();
              }}
              icon="magic"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              loading={loading}
            >
              {loading ? 'Finding magic...' : 'Fix This! ✨'}
            </Button>
          </Animated.View>
        </View>
      </LinearGradient>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.roundness,
    overflow: 'hidden',
    marginVertical: 16,
  },
  gradientBorder: {
    padding: 2,
  },
  inputContainer: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.roundness - 2,
  },
  input: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: theme.roundness,
    elevation: 4,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  error: {
    color: theme.colors.error,
    marginTop: 8,
    textAlign: 'center',
  },
}); 