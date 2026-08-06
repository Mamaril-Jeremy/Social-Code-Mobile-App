import { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';

const TARGET_LENGTH = 40;
const MIN_LENGTH = 10;

export default function Reflect() {
  const router = useRouter();
  const { day } = useLocalSearchParams();
  const { completeMission } = useStore();

  const [confidence, setConfidence] = useState(null);
  const [reflection, setReflection] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setConfidence(null);
      setReflection('');
      setSubmitting(false);
    }, [day])
  );

  const reflectionLength = reflection.trim().length;
  const remaining = Math.max(0, TARGET_LENGTH - reflectionLength);
  const hasMinimum = reflectionLength >= MIN_LENGTH;
  const hitTarget = reflectionLength >= TARGET_LENGTH;
  const canSubmit = confidence !== null && hasMinimum;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    await completeMission(confidence, reflection.trim());
    if (parseInt(day) === 7) {
      router.replace('/(app)/wrapped');
    } else {
      router.replace({
        pathname: '/(app)/complete',
        params: { day },
      });
    }
  };

  const counterColor = hitTarget
    ? Colors.teal
    : hasMinimum
    ? Colors.gold
    : Colors.textTertiary;

  const counterMessage = hitTarget
    ? 'Nice — go deeper if you want'
    : hasMinimum
    ? `${remaining} more for full reflection`
    : `${MIN_LENGTH - reflectionLength} more to continue`;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.eyebrow}>DAY {day} REFLECTION</Text>
          <Text style={styles.title}>How did it feel?</Text>
          <Text style={styles.subtitle}>
            Be honest. The data is for you — to see your patterns over time.
          </Text>

          <View style={styles.section}>
            <Text style={styles.label}>CONFIDENCE LEVEL</Text>
            <Text style={styles.helperText}>
              1 = barely got through it. 10 = felt fully in control.
            </Text>
            <View style={styles.scaleRow}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Pressable
                  key={num}
                  style={[
                    styles.scaleBtn,
                    confidence === num && styles.scaleBtnSelected,
                  ]}
                  onPress={() => setConfidence(num)}
                >
                  <Text
                    style={[
                      styles.scaleBtnText,
                      confidence === num && styles.scaleBtnTextSelected,
                    ]}
                  >
                    {num}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>WHAT DID YOU NOTICE?</Text>
            <Text style={styles.helperText}>
              A real sentence. What came up? What stuck?
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="One real thing you noticed during this mission..."
              placeholderTextColor={Colors.textTertiary}
              value={reflection}
              onChangeText={setReflection}
              multiline
              numberOfLines={4}
              maxLength={500}
              textAlignVertical="top"
            />
            <View style={styles.counterRow}>
              <Text style={[styles.counterMessage, { color: counterColor }]}>
                {counterMessage}
              </Text>
              <Text style={styles.charCount}>{reflectionLength} / 500</Text>
            </View>
          </View>

          <Pressable
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
            onPress={handleSubmit}
            disabled={!canSubmit || submitting}
          >
            <Text style={styles.primaryBtnText}>
              {submitting ? 'Saving...' : 'Lock it in'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.teal,
    marginBottom: 12,
    fontWeight: '600',
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
    marginBottom: 36,
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  helperText: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginBottom: 16,
    lineHeight: 18,
  },
  scaleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scaleBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleBtnSelected: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  scaleBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  scaleBtnTextSelected: {
    color: Colors.obsidian,
  },
  textArea: {
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: Colors.textPrimary,
    minHeight: 120,
    marginBottom: 8,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterMessage: {
    fontSize: 12,
    fontWeight: '600',
  },
  charCount: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  primaryBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnDisabled: {
    opacity: 0.4,
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
  storeBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
});