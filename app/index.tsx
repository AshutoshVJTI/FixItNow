import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import FrustrationInput from '../components/FrustrationInput';
import { lazyLoad } from '../lib/lazyLoad';
import { Badge } from '../lib/badges';
import { checkForNewBadges } from '../lib/badgeManager';
import { getUserStats } from '../lib/stats';
import { useState, useCallback } from 'react';

// Lazy load heavy components
const AnimatedSolution = lazyLoad(() => import('../components/AnimatedSolution'));
const BadgeNotificationManager = lazyLoad(() => import('../components/BadgeNotificationManager'));
const ReferralCard = lazyLoad(() => import('../components/ReferralCard'));
const MemeGenerator = lazyLoad(() => import('../components/MemeGenerator'));

export default function Index() {
  const [currentSolution, setCurrentSolution] = useState<string | null>(null);
  const [currentFrustration, setCurrentFrustration] = useState<string | null>(null);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  const checkBadges = useCallback(async () => {
    const stats = await getUserStats();
    const badges = await checkForNewBadges(stats);
    if (badges.length > 0) {
      setNewBadges(badges);
    }
  }, []);

  const handleSolutionGenerated = async (solution: string, frustration: string) => {
    setCurrentSolution(solution);
    setCurrentFrustration(frustration);
    await checkBadges();
  };

  return (
    <>
      <BadgeNotificationManager badges={newBadges} />
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Text variant="headlineSmall" style={styles.title}>
            What's frustrating you today?
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Tell me your frustration, and I'll find a solution! 🌟
          </Text>

          <FrustrationInput onSolutionGenerated={handleSolutionGenerated} />
          
          {currentSolution && currentFrustration && (
            <>
              <AnimatedSolution 
                solution={currentSolution} 
                frustration={currentFrustration} 
              />
              <ReferralCard />
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
}); 