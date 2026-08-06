import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';
import { ARCHETYPES } from '../../constants/archetypes';
import { BRAVE_MISSIONS } from '../../constants/missions';

export default function Progress() {
  const router = useRouter();
  const { user } = useStore();

  const archetype = user?.archetype || 'invisible';
  const archetypeData = ARCHETYPES[archetype];
  const currentDay = user?.current_mission_day || 1;
  const streak = user?.current_streak || 0;
  const totalCompleted = currentDay - 1;

  const weeks = Array.from({ length: 7 }, (_, i) => i + 1);

  const fearlessCount = BRAVE_MISSIONS.filter(m => m.frameworkTag === 'FEARLESS').length;
  const sparkCount = BRAVE_MISSIONS.filter(m => m.frameworkTag === 'SPARK').length;
  const talkCount = BRAVE_MISSIONS.filter(m => m.frameworkTag === 'TALK').length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>
          Competence is built in days, not moments.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalCompleted}</Text>
            <Text style={styles.statLabel}>Missions done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{Math.max(0, 7 - totalCompleted)}</Text>
            <Text style={styles.statLabel}>Days left</Text>
          </View>
        </View>

        <View style={[styles.archetypeCard, { borderColor: archetypeData?.color }]}>
          <Text style={styles.archetypeCardLabel}>YOUR ARCHETYPE</Text>
          <Text style={[styles.archetypeName, { color: archetypeData?.color }]}>
            {archetypeData?.name}
          </Text>
          <Text style={styles.archetypeTagline}>{archetypeData?.tagline}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>7-DAY CHALLENGE</Text>
          <View style={styles.weekGrid}>
            {weeks.map((day) => {
              const completed = day < currentDay;
              const active = day === currentDay;
              const mission = BRAVE_MISSIONS[day - 1];
              return (
                <View key={day} style={styles.weekItem}>
                  <View
                    style={[
                      styles.weekDot,
                      completed && styles.weekDotCompleted,
                      active && styles.weekDotActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.weekDotText,
                        (completed || active) && styles.weekDotTextDark,
                      ]}
                    >
                      {completed ? '✓' : day}
                    </Text>
                  </View>
                  <Text style={styles.weekLabel} numberOfLines={1}>
                    {mission?.frameworkTag}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>FRAMEWORK FOCUS</Text>
          <View style={styles.frameworkList}>
            <View style={styles.frameworkItem}>
              <View style={styles.frameworkHeader}>
                <Text style={[styles.frameworkName, { color: Colors.fearless }]}>FEARLESS</Text>
                <Text style={styles.frameworkCount}>
                  {fearlessCount} missions
                </Text>
              </View>
              <Text style={styles.frameworkDesc}>
                {archetypeData?.fearlessFocus}
              </Text>
            </View>
            <View style={styles.frameworkItem}>
              <View style={styles.frameworkHeader}>
                <Text style={[styles.frameworkName, { color: Colors.spark }]}>SPARK</Text>
                <Text style={styles.frameworkCount}>
                  {sparkCount} missions
                </Text>
              </View>
              <Text style={styles.frameworkDesc}>
                {archetypeData?.sparkFocus}
              </Text>
            </View>
            <View style={styles.frameworkItem}>
              <View style={styles.frameworkHeader}>
                <Text style={[styles.frameworkName, { color: Colors.talk }]}>TALK</Text>
                <Text style={styles.frameworkCount}>
                  {talkCount} missions
                </Text>
              </View>
              <Text style={styles.frameworkDesc}>
                {archetypeData?.talkFocus}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PREMIUM FRAMEWORKS</Text>
          <View style={styles.frameworkList}>
            <View style={styles.lockedItem}>
              <View style={styles.lockedHeader}>
                <Text style={[styles.frameworkName, { color: Colors.brave }]}>BRAVE</Text>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
              <Text style={styles.lockedText}>Difficult conversations with reasonable people.</Text>
            </View>
            <View style={styles.lockedItem}>
              <View style={styles.lockedHeader}>
                <Text style={[styles.frameworkName, { color: Colors.shield }]}>SHIELD</Text>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
              <Text style={styles.lockedText}>Protecting yourself from toxic people.</Text>
            </View>
            <View style={styles.lockedItem}>
              <View style={styles.lockedHeader}>
                <Text style={[styles.frameworkName, { color: Colors.roots }]}>ROOTS</Text>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
              <Text style={styles.lockedText}>Building long-term relationships that last.</Text>
            </View>
          </View>

          <Pressable
            style={styles.premiumBtn}
            onPress={() => router.push('/(app)/premium')}
          >
            <Text style={styles.premiumBtnText}>Unlock with Premium</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.obsidian,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.obsidian,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.teal,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  archetypeCard: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    marginBottom: 32,
  },
  archetypeCardLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    marginBottom: 6,
    fontWeight: '600',
  },
  archetypeName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  archetypeTagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '600',
    marginBottom: 16,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekItem: {
    alignItems: 'center',
    gap: 6,
  },
  weekDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDotCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  weekDotActive: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  weekDotText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textTertiary,
  },
  weekDotTextDark: {
    color: Colors.obsidian,
  },
  weekLabel: {
    fontSize: 9,
    color: Colors.textTertiary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  frameworkList: {
    gap: 12,
  },
  frameworkItem: {
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  frameworkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  frameworkName: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  frameworkCount: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  frameworkDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  lockedItem: {
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    opacity: 0.7,
  },
  lockedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lockIcon: {
    fontSize: 14,
  },
  lockedText: {
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 20,
  },
  premiumBtn: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.teal,
    marginTop: 16,
  },
  premiumBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
});