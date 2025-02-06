import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import BadgeNotification from './BadgeNotification';
import { Badge } from '../lib/badges';

interface BadgeNotificationManagerProps {
  badges: Badge[];
}

export default function BadgeNotificationManager({ badges }: BadgeNotificationManagerProps) {
  const [currentBadge, setCurrentBadge] = useState<Badge | null>(null);
  const [queue, setQueue] = useState<Badge[]>([]);

  useEffect(() => {
    if (badges.length > 0) {
      setQueue(prev => [...prev, ...badges]);
    }
  }, [badges]);

  useEffect(() => {
    if (!currentBadge && queue.length > 0) {
      setCurrentBadge(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [currentBadge, queue]);

  const handleDismiss = () => {
    setCurrentBadge(null);
  };

  if (!currentBadge) return null;

  return (
    <View style={styles.container}>
      <BadgeNotification badge={currentBadge} onDismiss={handleDismiss} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
}); 