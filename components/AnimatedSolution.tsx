import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import SolutionCard from './SolutionCard';

interface AnimatedSolutionProps {
  solution: string;
  frustration: string;
}

export default function AnimatedSolution({ solution, frustration }: AnimatedSolutionProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 12,
        stiffness: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [solution]);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <SolutionCard solution={solution} frustration={frustration} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
}); 