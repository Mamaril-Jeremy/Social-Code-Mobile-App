import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';
import { BRAVE_MISSIONS } from '../../constants/missions';
import { ARCHETYPES } from '../../constants/archetypes';

export default function Missions() {
  const { user } = useStore();

  const archetype = user?.archetype || 'invisible';
  const archetypeData = ARCHETYPES[archetype];
  const currentDay = user?.current_mission_day || 1;

  const difficultyLabel = (d) => {
    if (d === 1) return 'Entry';
    if (d === 2) return 'Moderate';
    return 'Hard';
  };

  const difficultyColor = (d) => {
    if (d === 1) return Colors.success;
    if (d === 2) return Colors.warning;
    return Colors.danger;
  };

  const getStatus = (day) => {
    if (day < currentDay) return 'completed';
    if (day === currentDay) return 'active';
    return 'locked';
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>7-Day Challenge</Text>
        <Text style={styles.subtitle}>
          One mission per day. Real world. No scripts.
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentDay - 1) / 7) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{currentDay - 1} of 7 complete</Text>
        </View>

        <View style={styles.missionList}>
          {BRAVE_MISSIONS.map((mission) => {
            const status = getStatus(mission.day);
            return (
              <View
                key={mission.day}
                style={[
                  styles.missionRow,
                  status === 'active' && styles.missionRowActive,
                  status === 'completed' && styles.missionRowCompleted,
                  status === 'locked' && styles.missionRowLocked,
                ]}
              >
                <View
                  style={[
                    styles.dayCircle,
                    status === 'active' && styles.dayCircleActive,
                    status === 'completed' && styles.dayCircleCompleted,
                    status === 'locked' && styles.dayCircleLocked,
                  ]}
                >
                  {status === 'completed' ? (
                    <Text style={styles.dayCircleCheck}>✓</Text>
                  ) : (
                    <Text
                      style={[
                        styles.dayCircleText,
                        status === 'active' && styles.dayCircleTextActive,
                      ]}
                    >
                      {mission.day}
                    </Text>
                  )}
                </View>

                <View style={styles.missionInfo}>
                  <View style={styles.missionMetaRow}>
                    <Text
                      style={[
                        styles.frameworkTag,
                        { color: Colors[mission.frameworkTag.toLowerCase()] },
                        status === 'locked' && styles.lockedText,
                      ]}
                    >
                      {mission.frameworkTag}
                    </Text>
                    <Text
                      style={[
                        styles.difficultyTag,
                        { color: difficultyColor(mission.difficulty) },
                        status === 'locked' && styles.lockedText,
                      ]}
                    >
                      {difficultyLabel(mission.difficulty)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.missionTitle,
                      status === 'locked' && styles.lockedText,
                      status === 'completed' && styles.completedText,
                    ]}
                  >
                    {mission.title}
                  </Text>
                  {status === 'locked' && (
                    <Text style={styles.lockedLabel}>Complete previous day to unlock</Text>
                  )}
                  {status === 'completed' && (
                    <Text style={styles.completedLabel}>Done</Text>
                  )}
                  {status === 'active' && (
                    <Text style={styles.activeLabel}>Today's mission</Text>
                  )}
                </View>
              </View>
            );
          })}
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
  progressContainer: {
    marginBottom: 32,
  },
  progressTrack: {
    height: 3,
    backgroundColor: Colors.surface3,
    borderRadius: 10,
    marginBottom: 8,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.teal,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  missionList: {
    gap: 12,
  },
  missionRow: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'flex-start',
  },
  missionRowActive: {
    borderColor: Colors.teal,
    backgroundColor: Colors.surface2,
  },
  missionRowCompleted: {
    opacity: 0.7,
  },
  missionRowLocked: {
    opacity: 0.4,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dayCircleActive: {
    backgroundColor: Colors.teal,
  },
  dayCircleCompleted: {
    backgroundColor: Colors.success,
  },
  dayCircleLocked: {
    backgroundColor: Colors.surface3,
  },
  dayCircleText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textTertiary,
  },
  dayCircleTextActive: {
    color: Colors.obsidian,
  },
  dayCircleCheck: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.obsidian,
  },
  missionInfo: {
    flex: 1,
  },
  missionMetaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  frameworkTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  difficultyTag: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  lockedText: {
    color: Colors.textTertiary,
  },
  completedText: {
    color: Colors.textSecondary,
  },
  lockedLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  completedLabel: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
  },
  activeLabel: {
    fontSize: 12,
    color: Colors.teal,
    fontWeight: '600',
  },
});