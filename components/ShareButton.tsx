import React from 'react';
import { Share, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { updateStats } from '../lib/stats';

interface ShareButtonProps {
  solution: string;
  frustration: string;
}

export default function ShareButton({ solution, frustration }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      const message = `🤔 Frustration: ${frustration}\n\n✨ Solution: ${solution}\n\n#FixItNow`;
      
      await Share.share({
        message,
        title: 'Check out this solution!',
        ...(Platform.OS === 'ios' ? { url: 'https://fixitnow.app' } : {})
      });

      await updateStats({ solutionsShared: 1 });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Button
      mode="outlined"
      onPress={handleShare}
      icon="share-variant"
      style={{ marginTop: 8 }}
    >
      Share Solution
    </Button>
  );
} 