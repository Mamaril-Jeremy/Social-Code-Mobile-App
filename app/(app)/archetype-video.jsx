import { useRef, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Video, ResizeMode, Audio } from 'expo-av';
import { Colors } from '../../constants/colors';
import { ARCHETYPES } from '../../constants/archetypes';
import { useStore } from '../../store/useStore';

const VIDEOS = {
  invisible: require('../../assets/videos/invisible.mp4'),
  performer: require('../../assets/videos/performer.mp4'),
  frozen: require('../../assets/videos/frozen.mp4'),
  competent: require('../../assets/videos/competent.mp4'),
};

export default function ArchetypeVideo() {
  const router = useRouter();
  const { archetype, scores, personalityType, typeScores } = useLocalSearchParams();
  const videoRef = useRef(null);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);

  const { saveArchetype, setInOnboarding } = useStore();

  const archetypeData = ARCHETYPES[archetype];
  const videoSource = VIDEOS[archetype];

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const handleStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setFinished(true);
    }
  };

  const handleContinue = async () => {
    setSaving(true);
    const parsedScores = scores ? JSON.parse(scores) : {};
    const parsedTypeScores = typeScores ? JSON.parse(typeScores) : {};
    await saveArchetype(archetype, parsedScores, personalityType, parsedTypeScores);
    setInOnboarding(false);
    router.replace('/(app)/home');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>PERSONALIZED MESSAGE FROM SHAVON</Text>
          <Text style={[styles.archetypeName, { color: archetypeData?.color }]}>
            {archetypeData?.name}
          </Text>
        </View>

        {videoSource ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={videoSource}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            onPlaybackStatusUpdate={handleStatusUpdate}
          />
        ) : (
          <View style={[styles.placeholder, { borderColor: archetypeData?.color }]}>
            <Text style={styles.placeholderEmoji}>🎥</Text>
            <Text style={styles.placeholderTitle}>Video coming soon</Text>
            <Text style={styles.placeholderText}>
              Shavon is filming a personalized message for {archetypeData?.name}. Check back soon.
            </Text>
          </View>
        )}

        <Pressable
          style={[styles.continueBtn, (!finished || saving) && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!finished || saving}
        >
          <Text style={styles.continueBtnText}>
            {saving
              ? 'Starting...'
              : finished
              ? 'Begin my 7-day challenge'
              : 'Watch to continue'}
          </Text>
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
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.teal,
    marginBottom: 12,
    fontWeight: '600',
  },
  archetypeName: {
    fontSize: 28,
    fontWeight: '700',
  },
  video: {
    width: '100%',
    aspectRatio: 9 / 16,
    backgroundColor: 'black',
    borderRadius: 16,
    marginBottom: 24,
  },
  placeholder: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    backgroundColor: Colors.surface1,
    marginBottom: 24,
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  continueBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueBtnDisabled: {
    opacity: 0.4,
  },
  continueBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
});