import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

const FEATURES_FREE = [
  'Jungian archetype assessment',
  '7-day approach challenge',
  'FEARLESS approach system (3-Second Scan, Barista Method, 3-2-1, Universal Openers)',
  'SPARK conversation framework',
  'TALK Check system (Tone, Attention, Language, Kinetics)',
  'Daily mission tracking',
  'Streak and confidence tracking',
  '7-day Wrapped recap',
];

const FEATURES_PREMIUM = [
  'Everything in Free',
  'Days 8-30 missions (the integration phase)',
  'BRAVE framework — difficult conversations with reasonable people',
  'SHIELD framework — protecting yourself from toxic people',
  'ROOTS framework — long-term relationship building',
  'AI conversation simulator (practice unlimited scenarios)',
  'Weekly group coaching call with Shavon',
  'Private community access',
  'Advanced shadow work content',
  'Priority access to new frameworks',
];

export default function Premium() {
  const router = useRouter();

  const handleMonthly = () => {
    // Stripe monthly subscription goes here
    console.log('Monthly selected');
  };

  const handleAnnual = () => {
    // Stripe annual subscription goes here
    console.log('Annual selected');
  };

  const handleCoaching = () => {
    // Link to coaching booking goes here
    console.log('Coaching selected');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>SOCIAL CODE PREMIUM</Text>
          <Text style={styles.headline}>
            The full system.{'\n'}Not just the start.
          </Text>
          <Text style={styles.sub}>
            The free 7 days teach you how to start interactions.{'\n'}
            Premium teaches you how to navigate everything that comes after.
          </Text>
        </View>

        <View style={styles.pricingRow}>
          <Pressable style={[styles.pricingCard, styles.pricingCardFeatured]} onPress={handleAnnual}>
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>BEST VALUE</Text>
            </View>
            <Text style={styles.pricingPeriod}>Annual</Text>
            <Text style={styles.pricingPrice}>$99</Text>
            <Text style={styles.pricingPer}>per year</Text>
            <Text style={styles.pricingBreakdown}>$8.25 / month</Text>
            <Text style={styles.pricingSave}>Save $81</Text>
          </Pressable>

          <Pressable style={styles.pricingCard} onPress={handleMonthly}>
            <Text style={styles.pricingPeriod}>Monthly</Text>
            <Text style={styles.pricingPrice}>$14.99</Text>
            <Text style={styles.pricingPer}>per month</Text>
            <Text style={styles.pricingBreakdown}>{'\n'}Cancel anytime</Text>
          </Pressable>
        </View>

        <Pressable style={styles.primaryBtn} onPress={handleAnnual}>
          <Text style={styles.primaryBtnText}>Start Premium — $99/year</Text>
          <Text style={styles.primaryBtnSubtext}>45% off vs monthly</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={handleMonthly}>
          <Text style={styles.secondaryBtnText}>Start monthly — $14.99/month</Text>
        </Pressable>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WHAT YOU UNLOCK WITH PREMIUM</Text>
          {FEATURES_PREMIUM.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.frameworkBreakdown}>
          <Text style={styles.sectionLabel}>THE PREMIUM FRAMEWORKS</Text>

          <View style={[styles.frameworkCard, { borderColor: Colors.teal }]}>
            <Text style={[styles.frameworkName, { color: Colors.teal }]}>BRAVE</Text>
            <Text style={styles.frameworkDesc}>
              Difficult conversations with reasonable people. Asking for a raise. Setting expectations with a friend. Resolving conflict without making it worse.
            </Text>
          </View>

          <View style={[styles.frameworkCard, { borderColor: Colors.teal }]}>
            <Text style={[styles.frameworkName, { color: Colors.teal }]}>SHIELD</Text>
            <Text style={styles.frameworkDesc}>
              Protecting yourself from toxic, manipulative, or unsafe people. Drunk strangers. Drainer coworkers. Boundary violations. Exit cleanly with composure.
            </Text>
          </View>

          <View style={[styles.frameworkCard, { borderColor: Colors.teal }]}>
            <Text style={[styles.frameworkName, { color: Colors.teal }]}>ROOTS</Text>
            <Text style={styles.frameworkDesc}>
              Long-term relationship building. Most men can make a friend. Few know how to keep one. ROOTS is the maintenance layer most adults are missing.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>FREE TIER INCLUDES</Text>
          {FEATURES_FREE.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureCheckMuted}>✓</Text>
              <Text style={styles.featureTextMuted}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.coachingCard}>
          <Text style={styles.coachingLabel}>SERIOUS ABOUT TRANSFORMATION?</Text>
          <Text style={styles.coachingTitle}>1-on-1 Coaching with Shavon</Text>
          <Text style={styles.coachingDescription}>
            60-day personalized engagement. Every framework in the system applied directly to your specific patterns. Not a course. Not a group. You and Shavon, building your social competence from the inside out.
          </Text>
          <Text style={styles.coachingPrice}>Investment will be required</Text>
          <Pressable style={styles.coachingBtn} onPress={handleCoaching}>
            <Text style={styles.coachingBtnText}>Apply for coaching</Text>
          </Pressable>
        </View>

        <View style={styles.shavonBox}>
          <Text style={styles.shavonLabel}>FROM SHAVON</Text>
          <Text style={styles.shavonText}>
            "Most people will take the free assessment, feel seen for the first time, and go back to their lives unchanged. Premium is for the one who decided that is not acceptable. The system works if you work it."
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          Cancel anytime. No questions asked. If you do the work and do not see results, email us.
        </Text>
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
    backgroundColor: Colors.obsidian,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 60,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 16,
  },
  closeBtnText: {
    color: Colors.textTertiary,
    fontSize: 18,
  },
  header: {
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.teal,
    fontWeight: '700',
    marginBottom: 12,
  },
  headline: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 44,
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  pricingRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: Colors.surface1,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  pricingCardFeatured: {
    borderColor: Colors.teal,
    backgroundColor: Colors.surface2,
  },
  recommendedBadge: {
    backgroundColor: Colors.teal,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  recommendedText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.obsidian,
    letterSpacing: 1,
  },
  pricingPeriod: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
    fontWeight: '600',
  },
  pricingPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  pricingPer: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginBottom: 6,
  },
  pricingBreakdown: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  pricingSave: {
    fontSize: 11,
    color: Colors.teal,
    fontWeight: '600',
    marginTop: 4,
  },
  primaryBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
  primaryBtnSubtext: {
    color: Colors.obsidian,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    opacity: 0.7,
  },
  secondaryBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  secondaryBtnText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 28,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '600',
    marginBottom: 6,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  featureCheck: {
    color: Colors.teal,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 1,
  },
  featureText: {
    color: Colors.textPrimary,
    fontSize: 14,
    flex: 1,
    lineHeight: 22,
  },
  featureCheckMuted: {
    color: Colors.textTertiary,
    fontSize: 14,
    marginTop: 1,
  },
  featureTextMuted: {
    color: Colors.textSecondary,
    fontSize: 14,
    flex: 1,
    lineHeight: 22,
  },
  frameworkBreakdown: {
    gap: 12,
  },
  frameworkCard: {
    backgroundColor: Colors.surface1,
    borderLeftWidth: 3,
    borderRadius: 8,
    padding: 16,
    marginBottom: 4,
  },
  frameworkName: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  frameworkDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  coachingCard: {
    backgroundColor: Colors.surface1,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.coral,
    marginBottom: 24,
  },
  coachingLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.coral,
    fontWeight: '700',
    marginBottom: 8,
  },
  coachingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  coachingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 14,
  },
  coachingPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.coral,
    marginBottom: 14,
  },
  coachingBtn: {
    backgroundColor: Colors.coral,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  coachingBtnText: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  shavonBox: {
    backgroundColor: Colors.surface1,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  shavonLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.textTertiary,
    fontWeight: '700',
    marginBottom: 8,
  },
  shavonText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
});