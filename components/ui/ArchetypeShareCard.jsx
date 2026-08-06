import { View, Text, StyleSheet } from 'react-native';

export default function ArchetypeShareCard({ archetype, archetypeData, personalityData }) {
  return (
    <View style={styles.card} collapsable={false}>
      <View style={styles.top}>
        <Text style={styles.brandLabel}>SOCIAL CODE</Text>
        <Text style={styles.assessmentLabel}>SOCIAL ARCHETYPE ASSESSMENT</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.archetypeName}>{archetypeData?.name}</Text>
        <Text style={styles.archetypeTagline}>{archetypeData?.tagline}</Text>
      </View>

      <View style={[styles.personalityBox, { borderColor: personalityData?.color }]}>
        <Text style={styles.personalityLabel}>JUNGIAN TYPE</Text>
        <Text style={[styles.personalityName, { color: personalityData?.color }]}>
          {personalityData?.name}
        </Text>
        <Text style={styles.jungianName}>{personalityData?.jungianName}</Text>
      </View>

      <View style={styles.shadowBox}>
        <Text style={styles.shadowLabel}>SHADOW PATTERN</Text>
        <Text style={[styles.shadowPattern, { color: archetypeData?.color }]}>
          {archetypeData?.shadowPattern}
        </Text>
      </View>

      <View style={styles.frameworkRow}>
        <View style={styles.frameworkItem}>
          <Text style={[styles.frameworkTag, { color: '#FF6B6B' }]}>SPARK</Text>
          <Text style={styles.frameworkText} numberOfLines={2}>
            {archetypeData?.sparkFocus}
          </Text>
        </View>
        <View style={styles.frameworkItem}>
          <Text style={[styles.frameworkTag, { color: '#00D9C0' }]}>SHIELD</Text>
          <Text style={styles.frameworkText} numberOfLines={2}>
            {archetypeData?.shieldFocus}
          </Text>
        </View>
        <View style={styles.frameworkItem}>
          <Text style={[styles.frameworkTag, { color: '#00D9C0' }]}>BRAVE</Text>
          <Text style={styles.frameworkText} numberOfLines={2}>
            {archetypeData?.braveFocus}
          </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>socialcode.app</Text>
        <Text style={styles.bottomText}>Take the assessment →</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 360,
    backgroundColor: '#1A2332',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 192, 0.3)',
  },
  top: { marginBottom: 20 },
  brandLabel: {
    fontSize: 11,
    letterSpacing: 4,
    color: '#00D9C0',
    fontWeight: '700',
    marginBottom: 4,
  },
  assessmentLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#5E7082',
    fontWeight: '600',
  },
  middle: { marginBottom: 16 },
  archetypeName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F7F9FC',
    marginBottom: 6,
    lineHeight: 38,
  },
  archetypeTagline: {
    fontSize: 13,
    color: '#A8B5C4',
    lineHeight: 20,
  },
  personalityBox: {
    borderLeftWidth: 2,
    paddingLeft: 14,
    marginBottom: 16,
  },
  personalityLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#5E7082',
    fontWeight: '700',
    marginBottom: 4,
  },
  personalityName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  jungianName: {
    fontSize: 11,
    color: '#5E7082',
    fontStyle: 'italic',
  },
  shadowBox: { marginBottom: 16 },
  shadowLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#5E7082',
    fontWeight: '700',
    marginBottom: 6,
  },
  shadowPattern: {
    fontSize: 15,
    fontWeight: '700',
  },
  frameworkRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  frameworkItem: {
    flex: 1,
    backgroundColor: '#212D3E',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 192, 0.15)',
  },
  frameworkTag: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  frameworkText: {
    fontSize: 10,
    color: '#A8B5C4',
    lineHeight: 14,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 217, 192, 0.15)',
    paddingTop: 14,
  },
  bottomText: {
    fontSize: 11,
    color: '#5E7082',
    letterSpacing: 0.5,
  },
});