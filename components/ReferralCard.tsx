import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button, useTheme } from 'react-native-paper';
import { Share } from 'react-native';
import { generateReferralCode, getReferralCode } from '../lib/referralManager';

export default function ReferralCard() {
  const theme = useTheme();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    loadReferralCode();
  }, []);

  const loadReferralCode = async () => {
    let code = await getReferralCode();
    if (!code) {
      code = await generateReferralCode();
    }
    setReferralCode(code);
  };

  const handleShare = async () => {
    if (!referralCode) return;

    try {
      await Share.share({
        message: `Try FixItNow - the app that solves your everyday frustrations! Use my referral code: ${referralCode}\n\nhttps://fixitnow.app/refer/${referralCode}`,
        title: 'Join me on FixItNow',
      });
    } catch (error) {
      console.error('Error sharing referral:', error);
    }
  };

  return (
    <Surface style={[styles.surface, { backgroundColor: theme.colors.elevation.level2 }]}>
      <View style={styles.container}>
        <Text variant="titleMedium" style={styles.title}>
          Invite Friends 🎉
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          Share your referral code and earn rewards when friends join!
        </Text>
        
        {referralCode && (
          <View style={styles.codeContainer}>
            <Text variant="headlineMedium" style={styles.code}>
              {referralCode}
            </Text>
          </View>
        )}

        <Button
          mode="contained"
          onPress={handleShare}
          icon="share"
          style={styles.button}
        >
          Share Referral Code
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
  },
  container: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.7,
  },
  codeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  code: {
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 8,
  },
}); 