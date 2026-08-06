import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';
import { BRAVE_MISSIONS } from '../../constants/missions';
import { ARCHETYPES } from '../../constants/archetypes';
import { enableDailyReminder } from '../../lib/notifications';

export default function Home() {
  const router = useRouter();
  const { user, completeMission, notificationBannerDismissed, setNotificationBannerDismissed } = useStore();
  const [enabling, setEnabling] = useState(false);

  const archetype = user?.archetype || 'invisible';
  const archetypeData = ARCHETYPES[archetype];
  const missionDay = user?.current_mission_day || 1;
  const mission = BRAVE_MISSIONS[missionDay - 1];
  const variant = mission?.variants[archetype];

  const hasGraduated = missionDay > 7;

  const difficultyLabel = (d) => {
    if (d === 1) return 'Entry level';
    if (d === 2) return 'Moderate';
    return 'Hard';
  };

  const difficultyColor = (d) => {
    if (d === 1) return Colors.success;
    if (d === 2) return Colors.warning;
    return Colors.danger;
  };

  const handleEnableNotifications = async () => {
    setEnabling(true);
    const result = await enableDailyReminder();
    setEnabling(false);
    setNotificationBannerDismissed(true);

    if (result.success) {
      Alert.alert('Reminders on', "We'll nudge you daily at 8am so you never break your streak.");
    } else {
      Alert.alert(
        'Permission needed',
        'To get daily reminders, enable notifications for Social Code in your phone settings.'
      );
    }
  };

  const showBanner = !notificationBannerDismissed && !hasGraduated;

  if (hasGraduated) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.greeting}>
              {user?.first_name ? `${user.first_name}, you finished` : 'You finished Day 7'}
            </Text>
            <View style={[styles.archetypeBadge, { borderColor: archetypeData?.color }]}>
              <Text style={[styles.archetypeLabel, { color: archetypeData?.color }]}>
                Hey {archetypeData?.name}!
              </Text>
            </View>
          </View>

          <View style={styles.streakRow}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>
              {user?.current_streak || 0} day streak
            </Text>
          </View>

          <Pressable
            style={styles.toolsLink}
            onPress={() => router.push('/(app)/conversation-tools')}
          >
            <Text style={styles.toolsLinkText}>Heading out? Open conversation tools →</Text>
          </Pressable>

          <View style={styles.gradCard}>
            <Text style={styles.gradEyebrow}>YOU SHOWED UP FOR 7 DAYS</Text>
            <Text style={styles.gradTitle}>This is where most people stop.</Text>
            <Text style={styles.gradText}>
              You proved you can do the work. The next 30 days are where the change becomes who you are. Unlock the next chapter with Premium.
            </Text>
          </View>

          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.push('/(app)/premium')}
          >
            <Text style={styles.primaryBtnText}>Continue with Premium</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push('/(app)/wrapped')}
          >
            <Text style={styles.secondaryBtnText}>View my 7-day wrapped</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {showBanner && (
          <View style={styles.banner}>
            <View style={styles.bannerTextWrap}>
              <Text style={styles.bannerTitle}>Turn on daily reminders</Text>
              <Text style={styles.bannerText}>So you never break your streak.</Text>
            </View>
            <View style={styles.bannerActions}>
              <Pressable
                style={styles.bannerEnableBtn}
                onPress={handleEnableNotifications}
                disabled={enabling}
              >
                <Text style={styles.bannerEnableText}>
                  {enabling ? '...' : 'Enable'}
                </Text>
              </Pressable>
              <Pressable
                style={styles.bannerDismissBtn}
                onPress={() => setNotificationBannerDismissed(true)}
              >
                <Text style={styles.bannerDismissText}>✕</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.greeting}>
            {user?.first_name ? `${user.first_name} · Day ${missionDay}` : `Day ${missionDay} of 7`}
          </Text>
          <View style={[styles.archetypeBadge, { borderColor: archetypeData?.color }]}>
            <Text style={[styles.archetypeLabel, { color: archetypeData?.color }]}>
              {archetypeData?.name}
            </Text>
          </View>
        </View>

        <View style={styles.streakRow}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>
            {user?.current_streak || 0} day streak
          </Text>
        </View>

        <Pressable
          style={styles.toolsLink}
          onPress={() => router.push('/(app)/conversation-tools')}
        >
          <Text style={styles.toolsLinkText}>Heading out? Open conversation tools →</Text>
        </Pressable>

        <View style={styles.missionCard}>
          <View style={styles.missionCardTop}>
            <View style={styles.missionMeta}>
              <Text style={[styles.frameworkTag, { color: Colors[mission?.frameworkTag?.toLowerCase()] }]}>
                {mission?.frameworkTag}
              </Text>
              <Text style={[styles.difficulty, { color: difficultyColor(mission?.difficulty) }]}>
                {difficultyLabel(mission?.difficulty)}
              </Text>
            </View>
            <Text style={styles.missionTitle}>{mission?.title}</Text>
            <Text style={styles.missionDescription}>{mission?.description}</Text>
          </View>

          <View style={styles.variantBox}>
            <Text style={styles.variantLabel}>FOR YOU SPECIFICALLY</Text>
            <Text style={styles.variantText}>{variant}</Text>
          </View>

          <View style={styles.shavonBox}>
            <Text style={styles.shavonLabel}>SHAVON'S NOTE</Text>
            <Text style={styles.shavonText}>{mission?.shavonNote}</Text>
          </View>
        </View>

        <Pressable
          style={styles.primaryBtn}
          onPress={() => {
            router.push({
              pathname: '/(app)/reflect',
              params: { day: missionDay },
            });
          }}
        >
          <Text style={styles.primaryBtnText}>I did the mission today</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Remind me later</Text>
        </Pressable>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.teal,
    padding: 14,
    marginBottom: 20,
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  bannerText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  bannerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bannerEnableBtn: {
    backgroundColor: Colors.teal,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  bannerEnableText: {
    color: Colors.obsidian,
    fontSize: 13,
    fontWeight: '700',
  },
  bannerDismissBtn: {
    padding: 4,
  },
  bannerDismissText: {
    color: Colors.textTertiary,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  archetypeBadge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  archetypeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  streakEmoji: {
    fontSize: 16,
  },
  streakText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  toolsLink: {
    backgroundColor: Colors.surface1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  toolsLinkText: {
    color: Colors.teal,
    fontSize: 13,
    fontWeight: '600',
  },
  missionCard: {
    backgroundColor: Colors.surface1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginBottom: 20,
  },
  missionCardTop: {
    padding: 20,
  },
  missionMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  frameworkTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  difficulty: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  missionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  missionDescription: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  variantBox: {
    backgroundColor: Colors.surface2,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  variantLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.gold,
    fontWeight: '700',
    marginBottom: 8,
  },
  variantText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  shavonBox: {
    backgroundColor: Colors.surface3,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
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
  primaryBtn: {
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
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
  },
  secondaryBtnText: {
    color: Colors.textTertiary,
    fontSize: 14,
  },
});