import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';
import { useStore } from '../../store/useStore';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setInOnboarding } = useStore();

  const passwordChecks = {
    length: password.length >= 8 && password.length <= 64,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]/.test(password),
  };

  const allValid = Object.values(passwordChecks).every(Boolean);

  const handleSignup = async () => {
    if (!email || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    if (!allValid) {
      setError('Your password does not meet all requirements.');
      return;
    }

    setLoading(true);
    setError('');
    setInOnboarding(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setInOnboarding(false);
      setLoading(false);
      return;
    }

    router.push('/(onboarding)/name');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <View style={styles.top}>
        <Text style={styles.eyebrow}>FORGE</Text>
        <Text style={styles.headline}>Create your account</Text>
        <Text style={styles.sub}>Start the 7-day system today.</Text>
      </View>

      <View style={styles.form}>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@email.com"
          placeholderTextColor={Colors.textTertiary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="At least 8 characters"
          placeholderTextColor={Colors.textTertiary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {password.length > 0 && (
          <View style={styles.checklist}>
            <PasswordRule passed={passwordChecks.length} label="8+ characters" />
            <PasswordRule passed={passwordChecks.uppercase} label="One uppercase letter" />
            <PasswordRule passed={passwordChecks.lowercase} label="One lowercase letter" />
            <PasswordRule passed={passwordChecks.number} label="One number" />
            <PasswordRule passed={passwordChecks.special} label="One special character (!@#$%...)" />
          </View>
        )}

        <Pressable
          style={[styles.primaryBtn, (!allValid || loading) && styles.primaryBtnDisabled]}
          onPress={handleSignup}
          disabled={loading || !allValid}
        >
          {loading
            ? <ActivityIndicator color={Colors.obsidian} />
            : <Text style={styles.primaryBtnText}>Create account</Text>
          }
        </Pressable>

        <Pressable onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.switchText}>Already have an account? Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PasswordRule({ passed, label }) {
  return (
    <View style={styles.ruleRow}>
      <Text style={[styles.ruleCheck, { color: passed ? Colors.teal : Colors.textTertiary }]}>
        {passed ? '✓' : '○'}
      </Text>
      <Text style={[styles.ruleText, { color: passed ? Colors.textSecondary : Colors.textTertiary }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.obsidian,
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 48,
  },
  back: {
    marginBottom: 32,
  },
  backText: {
    color: Colors.textSecondary,
    fontSize: 15,
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
  },
  sub: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  checklist: {
    backgroundColor: Colors.surface1,
    borderRadius: 10,
    padding: 12,
    marginTop: -8,
    marginBottom: 20,
    gap: 6,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ruleCheck: {
    fontSize: 12,
    fontWeight: '700',
    width: 14,
  },
  ruleText: {
    fontSize: 12,
  },
  primaryBtn: {
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  primaryBtnDisabled: {
    opacity: 0.4,
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
  switchText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  error: {
    color: Colors.danger,
    fontSize: 13,
    marginBottom: 16,
  },
});