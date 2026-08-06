import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';

const GOALS = [
  {
    key: 'start_conversations',
    label: 'Start conversations with strangers',
    detail: 'Approach without the freeze.',
  },
  {
    key: 'speak_up_groups',
    label: 'Speak up more in groups and meetings',
    detail: 'Stop disappearing in the room.',
  },
  {
    key: 'deepen_connection',
    label: 'Turn small talk into real connection',
    detail: 'Go past the surface.',
  },
  {
    key: 'build_habit',
    label: 'Just build the habit of showing up',
    detail: 'Consistency over outcome.',
  },
  {
    key: 'reduce_anxiety',
    label: 'Feel less anxious in social situations',
    detail: 'Regulate before you engage.',
  },
];

export default function GoalScreen() {
  const router = useRouter();
  const { user, setUser } = useStore();
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setSaving(true);

    setUser({ ...user, weekly_goal: selected });

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase
        .from('profiles')
        .update({ weekly_goal: selected })
        .eq('id', session.user.id);
    }

    router.push('/(onboarding)/quiz');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.top}>
          <Text style={styles.eyebrow}>SOCIAL CODE</Text>
          <Text style={styles.headline}>
            {user?.first_name ? `${user.first_name}, what do you want this week?` : 'What do you want this week?'}
          </Text>
          <Text style={styles.sub}>
            Pick the one that matters most right now. This shapes your path.
          </Text>
        </View>

        <View style={styles.options}>
          {GOALS.map((goal) => (
            <Pressable
              key={goal.key}
              style={[
                styles.optionBtn,
                selected === goal.key && styles.optionBtnSelected,
              ]}
              onPress={() => setSelected(goal.key)}
            >
              <View style={[
                styles.optionDot,
                selected === goal.key && styles.optionDotSelected,
              ]} />
              <View style={styles.optionTextWrap}>
                <Text style={[
                  styles.optionLabel,
                  selected === goal.key && styles.optionLabelSelected,
                ]}>
                  {goal.label}
                </Text>
                <Text style={styles.optionDetail}>{goal.detail}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.primaryBtn, (!selected || saving) && styles.primaryBtnDisabled]}
          onPress={handleContinue}
          disabled={!selected || saving}
        >
          <Text style={styles.primaryBtnText}>
            {saving ? 'Saving...' : 'Continue'}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.obsidian,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 48,
  },
  top: {
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    color: Colors.gold,
    marginBottom: 12,
    fontWeight: '600',
  },
  headline: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 38,
  },
  sub: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  options: {
    gap: 12,
    marginBottom: 28,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 18,
  },
  optionBtnSelected: {
    borderColor: Colors.teal,
    backgroundColor: Colors.surface2,
  },
  optionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textTertiary,
    marginTop: 2,
    flexShrink: 0,
  },
  optionDotSelected: {
    borderColor: Colors.teal,
    backgroundColor: Colors.teal,
  },
  optionTextWrap: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
    lineHeight: 22,
  },
  optionLabelSelected: {
    color: Colors.textPrimary,
  },
  optionDetail: {
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 18,
  },
  primaryBtn: {
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnDisabled: {
    opacity: 0.4,
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
});