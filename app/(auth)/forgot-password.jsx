import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setError('Enter your email to reset your password.');
      return;
    }
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      {sent ? (
        <View style={styles.top}>
          <Text style={styles.eyebrow}>SOCIAL CODE</Text>
          <Text style={styles.headline}>Check your email</Text>
          <Text style={styles.sub}>
            If an account exists for {email.trim()}, we sent a password reset link. Open it on this device to set a new password.
          </Text>
          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.primaryBtnText}>Back to sign in</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.top}>
            <Text style={styles.eyebrow}>SOCIAL CODE</Text>
            <Text style={styles.headline}>Reset your password</Text>
            <Text style={styles.sub}>
              Enter your email and we'll send you a link to set a new one.
            </Text>
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

            <Pressable
              style={styles.primaryBtn}
              onPress={handleReset}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color={Colors.obsidian} />
                : <Text style={styles.primaryBtnText}>Send reset link</Text>
              }
            </Pressable>
          </View>
        </>
      )}
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
    lineHeight: 22,
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
  primaryBtn: {
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    color: Colors.danger,
    fontSize: 13,
    marginBottom: 16,
  },
});