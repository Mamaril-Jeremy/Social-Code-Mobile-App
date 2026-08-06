import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';
import { ARCHETYPES } from '../../constants/archetypes';

export default function Profile() {
  const router = useRouter();
  const { user, setUser } = useStore();

  const archetype = user?.archetype || 'invisible';
  const archetypeData = ARCHETYPES[archetype];

  const handleRetakeQuiz = () => {
    setUser({ ...user, archetype: null });
    router.replace('/(onboarding)/quiz');
  };

  const handleLogout = () => {
    setUser(null);
    router.replace('/(auth)/welcome');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{user?.first_name || 'Profile'}</Text>

        <View style={[styles.archetypeCard, { borderColor: archetypeData?.color }]}>
          <Text style={styles.archetypeCardLabel}>YOUR ARCHETYPE</Text>
          <Text style={[styles.archetypeName, { color: archetypeData?.color }]}>
            {archetypeData?.name}
          </Text>
          <Text style={styles.archetypeTagline}>{archetypeData?.tagline}</Text>
          <Text style={styles.shadowPattern}>
            Shadow pattern: {archetypeData?.shadowPattern}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.current_streak || 0}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{(user?.current_mission_day || 1) - 1}</Text>
            <Text style={styles.statLabel}>Missions done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.longest_streak || 0}</Text>
            <Text style={styles.statLabel}>Best streak</Text>
          </View>
        </View>

        <View style={styles.woundCard}>
          <Text style={styles.woundLabel}>YOUR CORE WOUND</Text>
          <Text style={styles.woundText}>"{archetypeData?.coreWound}"</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR TRAINING FOCUS</Text>
          <View style={styles.focusList}>
            <View style={styles.focusItem}>
              <Text style={[styles.focusTag, { color: Colors.fearless }]}>FEARLESS</Text>
              <Text style={styles.focusText}>{archetypeData?.fearlessFocus}</Text>
            </View>
            <View style={styles.focusItem}>
              <Text style={[styles.focusTag, { color: Colors.spark }]}>SPARK</Text>
              <Text style={styles.focusText}>{archetypeData?.sparkFocus}</Text>
            </View>
            <View style={styles.focusItem}>
              <Text style={[styles.focusTag, { color: Colors.talk }]}>TALK</Text>
              <Text style={styles.focusText}>{archetypeData?.talkFocus}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PREMIUM FRAMEWORKS</Text>
          <View style={styles.focusList}>
            <View style={styles.lockedItem}>
              <View style={styles.lockedHeader}>
                <Text style={[styles.focusTag, { color: Colors.brave }]}>BRAVE</Text>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
              <Text style={styles.lockedText}>Difficult conversations with reasonable people.</Text>
            </View>
            <View style={styles.lockedItem}>
              <View style={styles.lockedHeader}>
                <Text style={[styles.focusTag, { color: Colors.shield }]}>SHIELD</Text>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
              <Text style={styles.lockedText}>Protecting yourself from toxic people.</Text>
            </View>
            <View style={styles.lockedItem}>
              <View style={styles.lockedHeader}>
                <Text style={[styles.focusTag, { color: Colors.roots }]}>ROOTS</Text>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
              <Text style={styles.lockedText}>Building long-term relationships that last.</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={styles.premiumBtn}
          onPress={() => router.push('/(app)/premium')}
        >
          <Text style={styles.premiumBtnText}>Unlock with Premium</Text>
        </Pressable>

        <View style={styles.actions}>
          <Pressable style={styles.secondaryBtn} onPress={handleRetakeQuiz}>
            <Text style={styles.secondaryBtnText}>Retake the assessment</Text>
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
    marginBottom: 24,
  },
  archetypeCard: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    marginBottom: 28,
  },
  archetypeCardLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    marginBottom: 6,
    fontWeight: '600',
  },
  archetypeName: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },
  archetypeTagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  shadowPattern: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontStyle: 'italic',
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
  woundCard: {
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 28,
  },
  woundLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '600',
    marginBottom: 10,
  },
  woundText: {
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '600',
    marginBottom: 16,
  },
  focusList: {
    gap: 10,
  },
  focusItem: {
    backgroundColor: Colors.surface1,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  focusTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 6,
  },
  focusText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  lockedItem: {
    backgroundColor: Colors.surface1,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    opacity: 0.7,
  },
  lockedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  lockIcon: {
    fontSize: 12,
  },
  lockedText: {
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 20,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  secondaryBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  secondaryBtnText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  logoutBtn: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: Colors.danger,
    fontSize: 15,
  },
  premiumBtn: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.teal,
    marginBottom: 16,
  },
  premiumBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
});