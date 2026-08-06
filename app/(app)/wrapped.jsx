import { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Video, ResizeMode, Audio } from 'expo-av';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';
import { ARCHETYPES } from '../../constants/archetypes';
import { BRAVE_MISSIONS } from '../../constants/missions';
import { supabase } from '../../lib/supabase';

const CONGRATS_VIDEO = require('../../assets/videos/congratulations.mp4');

export default function Wrapped() {
  const router = useRouter();
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [completions, setCompletions] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const videoRef = useRef(null);

  const archetype = user?.archetype || 'invisible';
  const archetypeData = ARCHETYPES[archetype];

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  useEffect(() => {
    const fetchCompletions = async () => {
      const { data, error } = await supabase
        .from('mission_completions')
        .select('*')
        .eq('user_id', user.id)
        .order('mission_day', { ascending: true });

      if (error) console.log('Wrapped fetch error:', error);
      if (data) setCompletions(data);
      setLoading(false);
    };

    if (user?.id) {
      fetchCompletions();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const handleVideoStatus = (status) => {
    if (status.didJustFinish) {
      setVideoFinished(true);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.loadingBox}>
          <ActivityIndicator color={Colors.teal} />
          <Text style={styles.loadingText}>Calculating your week...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const day1 = completions.find((c) => c.mission_day === 1);
  const day7 = completions.find((c) => c.mission_day === 7);
  const startConfidence = day1?.confidence_score || 0;
  const endConfidence = day7?.confidence_score || 0;
  const growth = endConfidence - startConfidence;

  const bestDay = completions.reduce(
    (best, c) => (c.confidence_score > (best?.confidence_score || 0) ? c : best),
    null
  );
  const hardestDay = completions.reduce(
    (lowest, c) => (c.confidence_score < (lowest?.confidence_score || 11) ? c : lowest),
    null
  );

  const bestMission = bestDay ? BRAVE_MISSIONS[bestDay.mission_day - 1] : null;
  const hardestMission = hardestDay ? BRAVE_MISSIONS[hardestDay.mission_day - 1] : null;

  const reflectionsWithText = completions.filter(
    (c) => c.reflection && c.reflection.trim().length > 0
  );
  const pulledQuote =
    reflectionsWithText.length > 0
      ? reflectionsWithText[reflectionsWithText.length - 1]
      : null;

  // VIDEO GATE — show congratulations video first, must finish to continue
  if (!showStats) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.videoGateContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gateHeader}>
            <Text style={styles.gateEyebrow}>YOU FINISHED THE 7-DAY CHALLENGE</Text>
            <Text style={styles.gateTitle}>
              {user?.first_name ? `${user.first_name}, a message from Shavon` : 'A message from Shavon'}
            </Text>
          </View>

          <Video
            ref={videoRef}
            style={styles.video}
            source={CONGRATS_VIDEO}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            onPlaybackStatusUpdate={handleVideoStatus}
          />

          <Pressable
            style={[styles.primaryBtn, !videoFinished && styles.primaryBtnDisabled]}
            onPress={() => setShowStats(true)}
            disabled={!videoFinished}
          >
            <Text style={styles.primaryBtnText}>
              {videoFinished ? 'See my results' : 'Watch to continue'}
            </Text>
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
        <View style={styles.opener}>
          <Text style={styles.eyebrow}>YOUR 7-DAY WRAPPED</Text>
          <Text style={styles.openerTitle}>
            {user?.first_name ? `${user.first_name}, you showed up\nfor 7 days.` : "You showed up for 7 days.\nMost people don't."}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WHERE YOU STARTED</Text>
          <Text style={styles.bigNumber}>{startConfidence}</Text>
          <Text style={styles.scaleNote}>Day 1 confidence</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WHERE YOU ENDED</Text>
          <Text style={[styles.bigNumber, { color: Colors.teal }]}>{endConfidence}</Text>
          <Text style={styles.scaleNote}>Day 7 confidence</Text>
        </View>

        <View style={[styles.growthBox, { borderColor: Colors.teal }]}>
          <Text style={styles.growthLabel}>YOUR GROWTH</Text>
          <Text style={styles.growthNumber}>
            {growth >= 0 ? '+' : ''}{growth} points
          </Text>
          <Text style={styles.growthSubtext}>
            That's not a vibe shift. That's a measurable change in how you handle real moments.
          </Text>
        </View>

        <View style={styles.divider} />

        {bestMission && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>WHERE YOU GREW MOST</Text>
            <Text style={[styles.frameworkTag, { color: Colors[bestMission.frameworkTag.toLowerCase()] }]}>
              {bestMission.frameworkTag} — DAY {bestDay.mission_day}
            </Text>
            <Text style={styles.missionName}>{bestMission.title}</Text>
            <Text style={styles.scoreLine}>Confidence: {bestDay.confidence_score}/10</Text>
          </View>
        )}

        {hardestMission && hardestDay.mission_day !== bestDay?.mission_day && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>YOUR EDGE</Text>
            <Text style={[styles.frameworkTag, { color: Colors[hardestMission.frameworkTag.toLowerCase()] }]}>
              {hardestMission.frameworkTag} — DAY {hardestDay.mission_day}
            </Text>
            <Text style={styles.missionName}>{hardestMission.title}</Text>
            <Text style={styles.scoreLine}>
              This is where you're still growing. The hardest day is the most useful one.
            </Text>
          </View>
        )}

        {pulledQuote && (
          <View style={styles.quoteBox}>
            <Text style={styles.quoteLabel}>IN YOUR OWN WORDS</Text>
            <Text style={styles.quoteText}>"{pulledQuote.reflection}"</Text>
            <Text style={styles.quoteAttribution}>— You, Day {pulledQuote.mission_day}</Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.archetypeShiftBox}>
          <Text style={styles.sectionLabel}>YOUR ARCHETYPE SHIFT</Text>
          <Text style={styles.archetypeShiftText}>
            You started as <Text style={{ color: archetypeData?.color, fontWeight: '700' }}>{archetypeData?.name}</Text>.
          </Text>
          <Text style={styles.archetypeShiftText}>
            You're already moving toward <Text style={{ color: Colors.teal, fontWeight: '700' }}>The Competent</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR TOTAL MOVES</Text>
          <Text style={[styles.bigNumber, { color: Colors.teal }]}>{completions.length}</Text>
          <Text style={styles.scaleNote}>
            {completions.length} real-world social actions you wouldn't have made before.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.ctaBox}>
          <Text style={styles.ctaEyebrow}>DAY 7 IS NOT THE END</Text>
          <Text style={styles.ctaTitle}>It's the start of the rest of your life.</Text>
          <Text style={styles.ctaText}>
            Premium unlocks 30 more days of missions, the AI conversation simulator, and weekly group calls with Shavon.
          </Text>
          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.push('/(app)/premium')}
          >
            <Text style={styles.primaryBtnText}>Continue with Premium</Text>
          </Pressable>
          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.replace('/(app)/home')}
          >
            <Text style={styles.secondaryBtnText}>Not right now</Text>
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
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 60,
  },
  videoGateContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  gateHeader: {
    marginBottom: 24,
  },
  gateEyebrow: {
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.teal,
    fontWeight: '700',
    marginBottom: 12,
  },
  gateTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  video: {
    width: '100%',
    aspectRatio: 9 / 16,
    backgroundColor: 'black',
    borderRadius: 16,
    marginBottom: 24,
  },
  opener: {
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    color: Colors.teal,
    fontWeight: '700',
    marginBottom: 16,
  },
  openerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 40,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '700',
    marginBottom: 12,
  },
  bigNumber: {
    fontSize: 64,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 70,
    marginBottom: 4,
  },
  scaleNote: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  growthBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    marginBottom: 8,
    backgroundColor: Colors.surface1,
  },
  growthLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.teal,
    fontWeight: '700',
    marginBottom: 8,
  },
  growthNumber: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  growthSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  frameworkTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  missionName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 26,
  },
  scoreLine: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  quoteBox: {
    backgroundColor: Colors.surface1,
    borderLeftWidth: 3,
    borderLeftColor: Colors.teal,
    padding: 20,
    borderRadius: 8,
    marginBottom: 8,
  },
  quoteLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '700',
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: 12,
  },
  quoteAttribution: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  archetypeShiftBox: {
    backgroundColor: Colors.surface1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  archetypeShiftText: {
    fontSize: 18,
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: 6,
  },
  ctaBox: {
    backgroundColor: Colors.surface1,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.teal,
  },
  ctaEyebrow: {
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.teal,
    fontWeight: '700',
    marginBottom: 10,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 32,
  },
  ctaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  primaryBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnDisabled: {
    opacity: 0.4,
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