import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button, useTheme, IconButton } from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Platform, Share } from 'react-native';

interface MemeGeneratorProps {
  frustration: string;
  solution: string;
  onClose: () => void;
}

export default function MemeGenerator({ frustration, solution, onClose }: MemeGeneratorProps) {
  const theme = useTheme();
  const viewShotRef = React.useRef<ViewShot>(null);

  const generateAndShare = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Media library permission not granted');
        return;
      }

      if (!viewShotRef.current) return;

      const uri = await viewShotRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);

      await Share.share({
        url: Platform.OS === 'ios' ? uri : `file://${uri}`,
        message: `${frustration}\n\n${solution}\n\n#FixItNow`,
      });

      onClose();
    } catch (error) {
      console.error('Error sharing meme:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Meme</Text>
        <IconButton
          icon="close"
          size={24}
          onPress={onClose}
          style={styles.closeButton}
        />
      </View>

      <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 0.9 }}
        style={styles.memeContainer}
      >
        <Surface style={[styles.meme, { backgroundColor: theme.colors.elevation.level3 }]}>
          <Text style={styles.emoji}>😤</Text>
          <Text style={styles.frustrationText}>"{frustration}"</Text>
          <View style={styles.divider} />
          <Text style={styles.emoji}>💡</Text>
          <Text style={styles.solutionText}>{solution}</Text>
          <Text style={styles.watermark}>#FixItNow</Text>
        </Surface>
      </ViewShot>

      <Button
        mode="contained"
        onPress={generateAndShare}
        icon="share"
        style={styles.button}
      >
        Share Meme
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    margin: -8,
  },
  memeContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  meme: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  frustrationText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  solutionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  watermark: {
    fontSize: 12,
    color: '#666',
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  button: {
    marginTop: 16,
  },
}); 