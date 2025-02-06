import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Badge } from '../lib/badges';

interface BadgeNotificationProps {
  badge: Badge;
  onDismiss: () => void;
}

export default function BadgeNotification({ badge, onDismiss }: BadgeNotificationProps) {
  const translateY = React.useRef(new Animated.Value(-100)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Surface style={styles.surface}>
        <Text style={styles.icon}>{badge.icon}</Text>
        <View style={styles.content}>
          <Text variant="titleMedium">{badge.name}</Text>
          <Text variant="bodySmall">{badge.description}</Text>
        </View>
      </Surface>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 1000,
  },
  surface: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
}); 