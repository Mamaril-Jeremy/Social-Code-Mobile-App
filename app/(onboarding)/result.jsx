import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../../constants/colors';
import { ARCHETYPES } from '../../constants/archetypes';
import { PERSONALITY_TYPES } from '../../constants/personalityTypes';
import { useStore } from '../../store/useStore';

export default function Result() {
  const router = useRouter();
  const { archetype, scores, personalityType, typeScores } = useLocalSearchParams();
  const { saveArchetype, setInOnboarding, user } = useStore();

  const archetypeData = ARCHETYPES[archetype];
  const personalityData = PERSONALITY_TYPES[personalityType];

  if (!archetypeData || !personalityData) {
    return (
      <View style={[styles.container, { paddingTop: 100, paddingHorizontal: 24 }]}>
        <Text style={{ color: 'white', fontSize: 14 }}>Missing data</Text>
      </View>
    );
  }

return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        {user?.first_name ? (
          <Text style={styles.headerGreeting}>{user.first_name}, here's what we found.</Text>
        ) : null}
        <View style={styles.headerRow}>
          <View style={[styles.headerLeft, { borderColor: archetypeData.color }]}>
            <Text style={styles.headerEyebrow}>ARCHETYPE</Text>
            <Text style={[styles.headerArchetype, { color: archetypeData.color }]}>
              {archetypeData.name}
            </Text>
          </View>
          <View style={[styles.headerRight, { borderColor: personalityData.color }]}>
            <Text style={styles.headerEyebrow}>JUNGIAN TYPE</Text>
            <Text style={[styles.headerType, { color: personalityData.color }]}>
              {personalityData.name}
            </Text>
            <Text style={styles.headerJungian}>{personalityData.jungianName}</Text>
          </View>
        </View>
        <Text style={styles.headerTagline}>{archetypeData.tagline}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR SOCIAL PATTERN</Text>
          <Text style={styles.sectionText}>{archetypeData.description}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR SHADOW PATTERN</Text>
          <Text style={[styles.shadowPattern, { color: archetypeData.color }]}>
            {archetypeData.shadowPattern}
          </Text>
          <Text style={styles.sectionText}>{archetypeData.shadowExplanation}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>THE WOUND UNDERNEATH</Text>
          <Text style={styles.coreWound}>"{archetypeData.coreWound}"</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR PSYCHOLOGICAL PROFILE</Text>
          <Text style={styles.sectionText}>{personalityData.description}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR STRENGTHS</Text>
          {personalityData.strengths?.map((strength, index) => (
            <View key={index} style={styles.listRow}>
              <Text style={[styles.listCheck, { color: Colors.teal }]}>✓</Text>
              <Text style={styles.listText}>{strength}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR BLIND SPOTS</Text>
          {personalityData.blindSpots?.map((spot, index) => (
            <View key={index} style={styles.listRow}>
              <Text style={[styles.listCheck, { color: Colors.coral }]}>✗</Text>
              <Text style={styles.listText}>{spot}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ENERGY PATTERN</Text>
          <Text style={styles.sectionText}>{personalityData.energyPattern}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SOCIAL STYLE</Text>
          <Text style={styles.sectionText}>{personalityData.socialStyle}</Text>
        </View>

        <View style={styles.divider} />

        <View style={[styles.tipCard, { borderColor: personalityData.color }]}>
          <Text style={styles.sectionLabel}>COMMUNICATION TIP</Text>
          <Text style={styles.sectionText}>{personalityData.communicationTip}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR TRAINING SCENARIOS</Text>
          {personalityData.simulatorScenarios?.map((scenario, index) => (
            <View key={index} style={styles.scenarioRow}>
              <Text style={[styles.scenarioNum, { color: personalityData.color }]}>
                {index + 1}
              </Text>
              <Text style={styles.listText}>{scenario}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.focusRow}>
          <View style={styles.focusItem}>
            <Text style={[styles.focusTag, { color: Colors.fearless }]}>FEARLESS</Text>
            <Text style={styles.focusText}>{archetypeData.fearlessFocus}</Text>
          </View>
          <View style={styles.focusItem}>
            <Text style={[styles.focusTag, { color: Colors.spark }]}>SPARK</Text>
            <Text style={styles.focusText}>{archetypeData.sparkFocus}</Text>
          </View>
          <View style={styles.focusItem}>
            <Text style={[styles.focusTag, { color: Colors.talk }]}>TALK</Text>
            <Text style={styles.focusText}>{archetypeData.talkFocus}</Text>
          </View>
        </View>

        <Pressable
          style={styles.primaryBtn}
          onPress={() => router.push({
            pathname: '/(app)/archetype-video',
            params: { archetype, scores, personalityType, typeScores },
          })}
        >
          <Text style={styles.primaryBtnText}>Watch your message & begin</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          Results reflect your dominant patterns. Most people carry elements of multiple types.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.obsidian,
  },
  fixedHeader: {
    backgroundColor: Colors.surface1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerGreeting: {
    fontSize: 14,
    color: Colors.teal,
    fontWeight: '600',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  headerRight: {
    flex: 1,
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  headerEyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerArchetype: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  headerType: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 2,
  },
  headerJungian: {
    fontSize: 10,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },
  headerTagline: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    marginBottom: 12,
    fontWeight: '600',
  },
  sectionText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  shadowPattern: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  coreWound: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 24,
  },
  listRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  listCheck: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
    flexShrink: 0,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  scenarioRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  scenarioNum: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
    flexShrink: 0,
    width: 16,
  },
  tipCard: {
    borderLeftWidth: 2,
    paddingLeft: 16,
  },
  focusRow: {
    gap: 12,
    marginBottom: 28,
  },
  focusItem: {
    backgroundColor: Colors.surface1,
    borderRadius: 10,
    padding: 16,
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
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  videoBtn: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    marginBottom: 12,
  },
  videoBtnText: {
    color: Colors.teal,
    fontSize: 16,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
});