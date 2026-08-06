import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';

export default function NameScreen() {
  const router = useRouter();
  const { user, setUser } = useStore();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    const trimmed = name.trim();
    if (trimmed.length < 1) return;

    setSaving(true);

    // Save locally right away
    setUser({ ...user, first_name: trimmed });

    // Save to database
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase
        .from('profiles')
        .update({ first_name: trimmed })
        .eq('id', session.user.id);
    }

    router.push('/(onboarding)/goal');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.top}>
          <Text style={styles.eyebrow}>SOCIAL CODE</Text>
          <Text style={styles.headline}>What should we call you?</Text>
          <Text style={styles.sub}>
            First name is fine. This is how Shavon and the app will speak to you.
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Your first name"
            placeholderTextColor={Colors.textTertiary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleContinue}
            maxLength={30}
          />

          <Pressable
            style={[styles.primaryBtn, (name.trim().length < 1 || saving) && styles.primaryBtnDisabled]}
            onPress={handleContinue}
            disabled={name.trim().length < 1 || saving}
          >
            <Text style={styles.primaryBtnText}>
              {saving ? 'Saving...' : 'Continue'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.obsidian,
    paddingHorizontal: 28,
    paddingTop: 100,
    paddingBottom: 48,
  },
  inner: {
    flex: 1,
  },
  top: {
    marginBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    color: Colors.gold,
    marginBottom: 12,
    fontWeight: '600',
  },
  headline: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 40,
  },
  sub: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 20,
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