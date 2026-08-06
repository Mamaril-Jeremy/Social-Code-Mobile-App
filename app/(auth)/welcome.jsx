import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

const { height } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.top}>
        <Text style={styles.eyebrow}>FORGE</Text>
        <Text style={styles.sub}>Powered by Social Code</Text>
        <Text style={styles.headline}>Most people are{'\n'}performing.{'\n'}Not present.</Text>
        <Text style={styles.sub}>
          This is not a confidence app.{'\n'}
          This is a competence system.
        </Text>
      </View>

      <View style={styles.bottom}>
        <Pressable
          style={styles.primaryBtn}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.primaryBtnText}>Start the system</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryBtn}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.secondaryBtnText}>I already have an account</Text>
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
    paddingTop: 80,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },
  top: {
    flex: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    color: Colors.gold,
    marginBottom: 24,
    fontWeight: '600',
  },
  headline: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 50,
    marginBottom: 24,
  },
  sub: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  bottom: {
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  secondaryBtnText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
});