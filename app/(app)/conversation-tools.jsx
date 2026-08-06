import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { FREE_STARTERS, CORE_RULES, PREMIUM_SECTIONS } from '../../constants/conversationTools';

export default function ConversationTools() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Conversation Tools</Text>
        <Text style={styles.subtitle}>
          Open this before you walk in. A few things to have in your pocket.
        </Text>

        {/* Free starters */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>STARTERS THAT WORK ANYWHERE</Text>
          {FREE_STARTERS.map((starter, index) => (
            <View key={index} style={styles.starterCard}>
              <Text style={styles.starterText}>"{starter.text}"</Text>
              <Text style={styles.starterWhy}>{starter.why}</Text>
            </View>
          ))}
        </View>

        {/* Core rules */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>THE CORE RULES</Text>
          {CORE_RULES.map((item, index) => (
            <View key={index} style={styles.ruleCard}>
              <View style={styles.ruleHeader}>
                <Text style={[styles.ruleNumber, { color: Colors.teal }]}>{index + 1}</Text>
                <Text style={styles.ruleTitle}>{item.rule}</Text>
              </View>
              <Text style={styles.ruleDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>

        {/* Premium locked sections */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>UNLOCK THE FULL LIBRARY</Text>
          {PREMIUM_SECTIONS.map((sec) => (
            <View key={sec.key} style={styles.lockedCard}>
              <View style={styles.lockedHeader}>
                <Text style={styles.lockedTitle}>{sec.title}</Text>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
              <Text style={styles.lockedDesc}>{sec.description}</Text>
            </View>
          ))}

          <Pressable
            style={styles.premiumBtn}
            onPress={() => router.push('/(app)/premium')}
          >
            <Text style={styles.premiumBtnText}>Unlock with Premium</Text>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  back: {
    marginBottom: 20,
  },
  backText: {
    color: Colors.textSecondary,
    fontSize: 15,
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
    marginBottom: 32,
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '700',
    marginBottom: 16,
  },
  starterCard: {
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  starterText: {
    fontSize: 17,
    color: Colors.textPrimary,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  starterWhy: {
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 19,
  },
  ruleCard: {
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  ruleNumber: {
    fontSize: 18,
    fontWeight: '700',
    width: 20,
  },
  ruleTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  ruleDetail: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  lockedCard: {
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    opacity: 0.7,
  },
  lockedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lockedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  lockIcon: {
    fontSize: 14,
  },
  lockedDesc: {
    fontSize: 14,
    color: Colors.textTertiary,
    lineHeight: 21,
  },
  premiumBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  premiumBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
});