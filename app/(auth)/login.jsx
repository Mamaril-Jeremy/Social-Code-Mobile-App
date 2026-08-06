import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/(app)/home');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <View style={styles.top}>
        <Text style={styles.eyebrow}>SOCIAL CODE</Text>
        <Text style={styles.headline}>Welcome back</Text>
        <Text style={styles.sub}>Continue where you left off.</Text>
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
          placeholder="Your password"
          placeholderTextColor={Colors.textTertiary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={styles.primaryBtn}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={Colors.obsidian} />
            : <Text style={styles.primaryBtnText}>Sign in</Text>
          }
        </Pressable>

        <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.switchText}>Don't have an account? Start here</Text>
        </Pressable>
      </View>
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
  primaryBtn: {
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
  forgotText: {
    color: Colors.teal,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
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