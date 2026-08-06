import { View, Text, Pressable, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { Colors } from '../../constants/colors';
import { BRAVE_MISSIONS } from '../../constants/missions';
import { ARCHETYPES } from '../../constants/archetypes';
import { useStore } from '../../store/useStore';

export default function Complete() {
  const router = useRouter();
  const { day } = useLocalSearchParams();
  const { user } = useStore();

  const archetype = user?.archetype || 'invisible';
  const archetypeData = ARCHETYPES[archetype];
  const completedDay = parseInt(day) || 1;
  const mission = BRAVE_MISSIONS[completedDay - 1];
  const isLastDay = completedDay === 7;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);

      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, [day])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.celebrationCircle,
            {
              borderColor: archetypeData?.color,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.celebrationCheck}>✓</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
          <Text style={styles.dayLabel}>DAY {completedDay} COMPLETE</Text>
          <Text style={styles.headline}>
            {isLastDay
              ? 'You finished the 7-day challenge.'
              : 'You did the work.'}
          </Text>

          <Text style={styles.missionTitle}>{mission?.title}</Text>

          <View style={styles.streakBox}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>
              {user?.current_streak || 0} day streak
            </Text>
          </View>

          <View style={styles.shavonBox}>
            <Text style={styles.shavonLabel}>SHAVON'S NOTE</Text>
            <Text style={styles.shavonText}>
              {isLastDay
                ? "Seven days. Seven real actions. Most people read about doing this. You actually did it. That is the difference between the system and the idea. You are operating differently now. Don't stop."
                : "Every time you do the thing that feels uncomfortable, you are shrinking the gap between who you are and who you are capable of being. That is the system working. Show up tomorrow."}
            </Text>
          </View>

          <View style={[styles.archetypeNote, { borderColor: archetypeData?.color }]}>
            <Text style={[styles.archetypeNoteLabel, { color: archetypeData?.color }]}>
              {archetypeData?.name?.toUpperCase()}
            </Text>
            <Text style={styles.archetypeNoteText}>
              {mission?.variants[archetype]}
            </Text>
          </View>

          {isLastDay ? (
            <>
              <Pressable
                style={styles.primaryBtn}
                onPress={() => router.replace('/(app)/home')}
              >
                <Text style={styles.primaryBtnText}>See what's next</Text>
              </Pressable>
              <Pressable
                style={styles.secondaryBtn}
                onPress={() => router.replace('/(app)/progress')}
              >
                <Text style={styles.secondaryBtnText}>View my progress</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                style={styles.primaryBtn}
                onPress={() => router.replace('/(app)/home')}
              >
                <Text style={styles.primaryBtnText}>
                  Day {completedDay + 1} tomorrow →
                </Text>
              </Pressable>
              <Pressable
                style={styles.secondaryBtn}
                onPress={() => router.replace('/(app)/missions')}
              >
                <Text style={styles.secondaryBtnText}>See all missions</Text>
              </Pressable>
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.obsidian,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: 'center',
  },
  celebrationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    backgroundColor: Colors.surface1,
  },
  celebrationCheck: {
    fontSize: 40,
    color: Colors.gold,
    fontWeight: '700',
  },
  dayLabel: {
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.gold,
    fontWeight: '600',
    marginBottom: 12,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 36,
  },
  missionTitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  streakBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface2,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 28,
  },
  streakEmoji: {
    fontSize: 16,
  },
  streakText: {
    fontSize: 14,
    color: Colors.gold,
    fontWeight: '600',
  },
  shavonBox: {
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    width: '100%',
  },
  shavonLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '700',
    marginBottom: 8,
  },
  shavonText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  archetypeNote: {
    borderLeftWidth: 2,
    paddingLeft: 14,
    width: '100%',
    marginBottom: 32,
  },
  archetypeNoteLabel: {
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 6,
  },
  archetypeNoteText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  primaryBtn: {
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtnText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
});