import { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';
import { QUIZ_INSIGHTS } from '../../constants/insights';

const QUESTIONS = [
  {
    id: 1,
    text: 'A colleague shares an idea in a meeting that you immediately see three problems with. You:',
    answers: [
      {
        text: 'Stay quiet. Pointing it out feels risky.',
        archetypeWeights: { invisible: 3, performer: 0, frozen: 1, competent: 0 },
        typeWeights: { introverted_feeling: 2, introverted_thinking: 1, introverted_sensation: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Frame the concern diplomatically so no one feels attacked.',
        archetypeWeights: { invisible: 0, performer: 2, frozen: 0, competent: 1 },
        typeWeights: { extraverted_feeling: 3, introverted_feeling: 1, extraverted_thinking: 0, introverted_thinking: 0, introverted_sensation: 0, extraverted_sensation: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
      {
        text: 'I want to say something but by the time I organize my thoughts the moment has passed.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 3, competent: 0 },
        typeWeights: { introverted_thinking: 3, introverted_intuition: 2, extraverted_feeling: 0, introverted_feeling: 0, extraverted_thinking: 0, introverted_sensation: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Raise the concerns directly and specifically.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 3 },
        typeWeights: { extraverted_thinking: 3, introverted_thinking: 1, extraverted_feeling: 0, introverted_feeling: 0, introverted_sensation: 0, extraverted_sensation: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
    ],
  },
  {
    id: 2,
    text: 'You are at a networking event. After 45 minutes you feel:',
    answers: [
      {
        text: 'Drained. I have been performing and I need to leave.',
        archetypeWeights: { invisible: 1, performer: 3, frozen: 0, competent: 0 },
        typeWeights: { introverted_feeling: 2, introverted_thinking: 2, introverted_sensation: 1, introverted_intuition: 2, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Energized. I have met interesting people and want to keep going.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 2 },
        typeWeights: { extraverted_feeling: 3, extraverted_thinking: 2, extraverted_sensation: 3, extraverted_intuition: 3, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
      {
        text: 'Relieved I have not had to talk to anyone yet.',
        archetypeWeights: { invisible: 3, performer: 0, frozen: 1, competent: 0 },
        typeWeights: { introverted_thinking: 2, introverted_sensation: 2, introverted_intuition: 2, introverted_feeling: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Frustrated with myself for not saying the things I wanted to say.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 3, competent: 0 },
        typeWeights: { introverted_feeling: 2, introverted_thinking: 2, introverted_intuition: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0, introverted_sensation: 0 },
      },
    ],
  },
  {
    id: 3,
    text: 'When you are working through a difficult problem you prefer to:',
    answers: [
      {
        text: 'Think it through alone until I have a complete answer.',
        archetypeWeights: { invisible: 1, performer: 0, frozen: 1, competent: 1 },
        typeWeights: { introverted_thinking: 3, introverted_intuition: 2, introverted_sensation: 2, introverted_feeling: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Talk it through with someone — the conversation helps me think.',
        archetypeWeights: { invisible: 0, performer: 1, frozen: 0, competent: 2 },
        typeWeights: { extraverted_feeling: 3, extraverted_intuition: 3, extraverted_thinking: 2, extraverted_sensation: 1, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
      {
        text: 'Research precedent — what has worked before in similar situations.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 1, competent: 2 },
        typeWeights: { introverted_sensation: 3, extraverted_sensation: 1, introverted_thinking: 1, extraverted_thinking: 1, introverted_feeling: 0, extraverted_feeling: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Trust the pattern I am sensing even before I can fully articulate it.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 2 },
        typeWeights: { introverted_intuition: 3, extraverted_intuition: 2, introverted_thinking: 1, extraverted_thinking: 0, introverted_feeling: 0, extraverted_feeling: 0, introverted_sensation: 0, extraverted_sensation: 0 },
      },
    ],
  },
  {
    id: 4,
    text: 'Someone close to you is visibly upset but says they are fine. You:',
    answers: [
      {
        text: 'Notice but say nothing — it feels intrusive to press.',
        archetypeWeights: { invisible: 2, performer: 0, frozen: 1, competent: 0 },
        typeWeights: { introverted_feeling: 2, introverted_thinking: 2, introverted_sensation: 1, introverted_intuition: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Gently check in — I can feel something is off and I want to help.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 3 },
        typeWeights: { extraverted_feeling: 3, introverted_feeling: 2, extraverted_sensation: 1, extraverted_intuition: 1, introverted_thinking: 0, extraverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
      {
        text: 'Take them at their word. They said they are fine.',
        archetypeWeights: { invisible: 1, performer: 0, frozen: 1, competent: 0 },
        typeWeights: { extraverted_thinking: 2, introverted_thinking: 1, introverted_sensation: 2, extraverted_sensation: 1, introverted_feeling: 0, extraverted_feeling: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Create an opening and let them come to it when they are ready.',
        archetypeWeights: { invisible: 0, performer: 1, frozen: 0, competent: 2 },
        typeWeights: { introverted_feeling: 3, extraverted_feeling: 2, introverted_intuition: 2, extraverted_intuition: 1, introverted_thinking: 0, extraverted_thinking: 0, introverted_sensation: 0, extraverted_sensation: 0 },
      },
    ],
  },
  {
    id: 5,
    text: 'Your honest relationship with planning is:',
    answers: [
      {
        text: 'I plan extensively before I act. Uncertainty is uncomfortable.',
        archetypeWeights: { invisible: 1, performer: 0, frozen: 2, competent: 1 },
        typeWeights: { introverted_sensation: 3, introverted_thinking: 2, extraverted_thinking: 1, introverted_feeling: 1, extraverted_feeling: 0, extraverted_sensation: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
      {
        text: 'I have a vision and I trust myself to figure out the path.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 2 },
        typeWeights: { introverted_intuition: 3, extraverted_intuition: 2, extraverted_thinking: 1, introverted_thinking: 1, introverted_feeling: 0, extraverted_feeling: 0, introverted_sensation: 0, extraverted_sensation: 0 },
      },
      {
        text: 'I respond well to what is in front of me. Plans feel constraining.',
        archetypeWeights: { invisible: 0, performer: 1, frozen: 0, competent: 1 },
        typeWeights: { extraverted_sensation: 3, extraverted_intuition: 2, extraverted_feeling: 1, extraverted_thinking: 1, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
      {
        text: 'I avoid committing to plans because what if something better comes up.',
        archetypeWeights: { invisible: 1, performer: 1, frozen: 1, competent: 0 },
        typeWeights: { extraverted_intuition: 3, extraverted_sensation: 1, introverted_intuition: 1, extraverted_feeling: 1, introverted_feeling: 0, introverted_thinking: 0, extraverted_thinking: 0, introverted_sensation: 0 },
      },
    ],
  },
  {
    id: 6,
    text: 'In a group conversation that has gone quiet, you:',
    answers: [
      {
        text: 'Wait for someone else to restart it.',
        archetypeWeights: { invisible: 3, performer: 0, frozen: 1, competent: 0 },
        typeWeights: { introverted_feeling: 2, introverted_thinking: 2, introverted_sensation: 1, introverted_intuition: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Fill it naturally — silence in groups makes me uncomfortable.',
        archetypeWeights: { invisible: 0, performer: 2, frozen: 0, competent: 1 },
        typeWeights: { extraverted_feeling: 3, extraverted_sensation: 2, extraverted_intuition: 2, extraverted_thinking: 1, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
      {
        text: 'Have something to say but cannot push myself to say it first.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 3, competent: 0 },
        typeWeights: { introverted_thinking: 2, introverted_feeling: 2, introverted_intuition: 2, introverted_sensation: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Introduce a new thread when the silence has gone on long enough.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 3 },
        typeWeights: { extraverted_thinking: 2, extraverted_intuition: 2, extraverted_feeling: 1, extraverted_sensation: 1, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
    ],
  },
  {
    id: 7,
    text: 'When someone criticizes something you made or said, your first internal response is:',
    answers: [
      {
        text: 'Withdrawal. I take it personally even if I know I should not.',
        archetypeWeights: { invisible: 2, performer: 1, frozen: 1, competent: 0 },
        typeWeights: { introverted_feeling: 3, extraverted_feeling: 1, introverted_sensation: 1, introverted_intuition: 1, extraverted_thinking: 0, introverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Analysis. Is the criticism accurate? What is the evidence?',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 3 },
        typeWeights: { introverted_thinking: 3, extraverted_thinking: 2, introverted_sensation: 1, extraverted_sensation: 0, introverted_feeling: 0, extraverted_feeling: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Defense. My first instinct is to explain why I was right.',
        archetypeWeights: { invisible: 0, performer: 2, frozen: 0, competent: 1 },
        typeWeights: { extraverted_thinking: 3, extraverted_sensation: 1, introverted_thinking: 1, extraverted_feeling: 0, introverted_feeling: 0, introverted_sensation: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Curiosity. I want to understand what they saw that I missed.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 3 },
        typeWeights: { extraverted_intuition: 3, introverted_intuition: 2, extraverted_feeling: 1, extraverted_thinking: 1, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, extraverted_sensation: 0 },
      },
    ],
  },
  {
    id: 8,
    text: 'What does social anxiety actually feel like for you?',
    answers: [
      {
        text: 'A constant background calculation of how I am being perceived.',
        archetypeWeights: { invisible: 2, performer: 3, frozen: 0, competent: 0 },
        typeWeights: { introverted_feeling: 2, extraverted_feeling: 2, introverted_intuition: 2, introverted_thinking: 1, extraverted_thinking: 0, extraverted_sensation: 0, introverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'A gap between what I know and what I can make myself do.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 3, competent: 0 },
        typeWeights: { introverted_thinking: 3, introverted_intuition: 2, introverted_feeling: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, introverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'An impulse to disappear or become invisible in the room.',
        archetypeWeights: { invisible: 3, performer: 0, frozen: 1, competent: 0 },
        typeWeights: { introverted_feeling: 2, introverted_sensation: 2, introverted_thinking: 1, introverted_intuition: 1, extraverted_feeling: 0, extraverted_thinking: 0, extraverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Residual doubt after interactions I handled well.',
        archetypeWeights: { invisible: 0, performer: 1, frozen: 0, competent: 2 },
        typeWeights: { introverted_feeling: 2, introverted_intuition: 2, introverted_thinking: 1, extraverted_feeling: 1, extraverted_thinking: 0, extraverted_sensation: 0, introverted_sensation: 0, extraverted_intuition: 0 },
      },
    ],
  },
  {
    id: 9,
    text: 'Your closest friends would say your biggest social strength is:',
    answers: [
      {
        text: 'You remember everything about people and make them feel genuinely cared for.',
        archetypeWeights: { invisible: 1, performer: 0, frozen: 0, competent: 2 },
        typeWeights: { introverted_feeling: 3, extraverted_feeling: 2, introverted_sensation: 2, extraverted_sensation: 0, introverted_thinking: 0, extraverted_thinking: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
      {
        text: 'You can read a room and adapt to what it needs immediately.',
        archetypeWeights: { invisible: 0, performer: 2, frozen: 0, competent: 1 },
        typeWeights: { extraverted_feeling: 3, extraverted_sensation: 2, extraverted_intuition: 2, extraverted_thinking: 1, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
      {
        text: 'You ask the question everyone was thinking but nobody said.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 3 },
        typeWeights: { introverted_thinking: 2, extraverted_intuition: 3, introverted_intuition: 2, extraverted_thinking: 1, introverted_feeling: 0, extraverted_feeling: 0, introverted_sensation: 0, extraverted_sensation: 0 },
      },
      {
        text: 'You are completely reliable. People know you will show up.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 1, competent: 2 },
        typeWeights: { introverted_sensation: 3, extraverted_sensation: 1, introverted_feeling: 1, extraverted_feeling: 1, introverted_thinking: 0, extraverted_thinking: 0, introverted_intuition: 0, extraverted_intuition: 0 },
      },
    ],
  },
  {
    id: 10,
    text: 'When you imagine the social version of yourself you want to become, you see:',
    answers: [
      {
        text: 'Someone who can be fully present without the performance.',
        archetypeWeights: { invisible: 0, performer: 3, frozen: 0, competent: 1 },
        typeWeights: { introverted_feeling: 3, extraverted_feeling: 1, introverted_intuition: 1, extraverted_sensation: 1, introverted_thinking: 0, extraverted_thinking: 0, introverted_sensation: 0, extraverted_intuition: 0 },
      },
      {
        text: 'Someone who acts when they see the moment instead of watching it pass.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 3, competent: 1 },
        typeWeights: { extraverted_sensation: 3, extraverted_intuition: 2, extraverted_thinking: 1, extraverted_feeling: 1, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
      {
        text: 'Someone who takes up space in a room without apologizing for it.',
        archetypeWeights: { invisible: 3, performer: 0, frozen: 1, competent: 0 },
        typeWeights: { extraverted_thinking: 2, extraverted_feeling: 2, extraverted_sensation: 1, extraverted_intuition: 1, introverted_feeling: 0, introverted_thinking: 0, introverted_sensation: 0, introverted_intuition: 0 },
      },
      {
        text: 'Someone whose social presence matches their actual internal capability.',
        archetypeWeights: { invisible: 0, performer: 0, frozen: 0, competent: 3 },
        typeWeights: { introverted_thinking: 2, introverted_intuition: 2, extraverted_thinking: 2, extraverted_feeling: 1, introverted_feeling: 0, extraverted_sensation: 0, introverted_sensation: 0, extraverted_intuition: 0 },
      },
    ],
  },
];

export default function Quiz() {
  const router = useRouter();
  const { setQuizAnswer, quizAnswers } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showInsight, setShowInsight] = useState(null);
  const [insightPhase, setInsightPhase] = useState('loading');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  useEffect(() => {
    if (showInsight && insightPhase === 'loading') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.4,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      const timer = setTimeout(() => {
        pulse.stop();
        setInsightPhase('revealed');
        fadeAnim.setValue(0);
        slideAnim.setValue(20);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      }, 1400);

      return () => {
        clearTimeout(timer);
        pulse.stop();
      };
    }
  }, [showInsight, insightPhase]);

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) return;

    if (currentQuestion < QUESTIONS.length - 1) {
      setQuizAnswer(currentQuestion, selected);

      const questionNumber = currentQuestion + 1;
      const insight = QUIZ_INSIGHTS[questionNumber];

      if (insight) {
        setShowInsight(insight);
        setInsightPhase('loading');
        return;
      }

      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      const allAnswers = [...quizAnswers];
      allAnswers[currentQuestion] = selected;

      const archetypeScores = { invisible: 0, performer: 0, frozen: 0, competent: 0 };
      const typeScores = {
        introverted_feeling: 0,
        extraverted_feeling: 0,
        introverted_thinking: 0,
        extraverted_thinking: 0,
        introverted_sensation: 0,
        extraverted_sensation: 0,
        introverted_intuition: 0,
        extraverted_intuition: 0,
      };

      allAnswers.forEach((answerIndex, questionIndex) => {
        const q = QUESTIONS[questionIndex];
        if (q && q.answers[answerIndex] !== undefined) {
          const answer = q.answers[answerIndex];
          Object.keys(answer.archetypeWeights).forEach((key) => {
            archetypeScores[key] += answer.archetypeWeights[key];
          });
          Object.keys(answer.typeWeights).forEach((key) => {
            typeScores[key] += answer.typeWeights[key];
          });
        }
      });

      const dominantArchetype = Object.keys(archetypeScores).reduce((a, b) =>
        archetypeScores[a] > archetypeScores[b] ? a : b
      );

      const dominantType = Object.keys(typeScores).reduce((a, b) =>
        typeScores[a] > typeScores[b] ? a : b
      );

      router.push({
        pathname: '/(onboarding)/result',
        params: {
          archetype: dominantArchetype,
          scores: JSON.stringify(archetypeScores),
          personalityType: dominantType,
          typeScores: JSON.stringify(typeScores),
        },
      });
    }
  };

  const handleInsightContinue = () => {
    setShowInsight(null);
    setInsightPhase('loading');
    setCurrentQuestion(currentQuestion + 1);
    setSelected(null);
  };

  return (
    <View style={styles.container}>
      {showInsight && (
        <View style={styles.insightOverlay}>
          {insightPhase === 'loading' ? (
            <View style={styles.loadingWrap}>
              <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />
              <Text style={styles.loadingText}>Analyzing your answers...</Text>
            </View>
          ) : (
            <Animated.View
              style={[
                styles.insightCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.insightEyebrow}>DID YOU KNOW</Text>
              <Text style={styles.insightStat}>{showInsight.stat}</Text>
              <Text style={styles.insightStatContext}>{showInsight.statContext}</Text>
              <Text style={styles.insightBody}>{showInsight.body}</Text>
              <Text style={styles.insightSource}>Source: {showInsight.source}</Text>
              <Pressable style={styles.insightBtn} onPress={handleInsightContinue}>
                <Text style={styles.insightBtnText}>Continue</Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
      )}

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuestion + 1} of {QUESTIONS.length}
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>SOCIAL ARCHETYPE ASSESSMENT</Text>
        <Text style={styles.question}>{question.text}</Text>

        <View style={styles.answers}>
          {question.answers.map((answer, index) => (
            <Pressable
              key={index}
              style={[
                styles.answerBtn,
                selected === index && styles.answerBtnSelected,
              ]}
              onPress={() => handleSelect(index)}
            >
              <View style={[
                styles.answerDot,
                selected === index && styles.answerDotSelected,
              ]} />
              <Text style={[
                styles.answerText,
                selected === index && styles.answerTextSelected,
              ]}>
                {answer.text}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={[styles.nextBtn, selected === null && styles.nextBtnDisabled]}
        onPress={handleNext}
        disabled={selected === null}
      >
        <Text style={styles.nextBtnText}>
          {currentQuestion < QUESTIONS.length - 1 ? 'Next' : 'See my result'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.obsidian,
    paddingTop: 60,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: Colors.surface3,
    borderRadius: 10,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.teal,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.teal,
    marginBottom: 20,
    fontWeight: '600',
  },
  question: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 32,
    marginBottom: 32,
  },
  answers: {
    gap: 12,
  },
  answerBtn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
  },
  answerBtnSelected: {
    borderColor: Colors.teal,
    backgroundColor: Colors.surface2,
  },
  answerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textTertiary,
    marginTop: 1,
    flexShrink: 0,
  },
  answerDotSelected: {
    borderColor: Colors.teal,
    backgroundColor: Colors.teal,
  },
  answerText: {
    flex: 1,
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  answerTextSelected: {
    color: Colors.textPrimary,
  },
  nextBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  nextBtnDisabled: {
    opacity: 0.4,
  },
  nextBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
  insightOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 35, 50, 0.97)',
    zIndex: 100,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  pulseDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.teal,
  },
  loadingText: {
    fontSize: 15,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  insightCard: {
    backgroundColor: Colors.surface1,
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.teal,
  },
  insightEyebrow: {
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.teal,
    fontWeight: '700',
    marginBottom: 16,
  },
  insightStat: {
    fontSize: 56,
    fontWeight: '700',
    color: Colors.teal,
    marginBottom: 4,
  },
  insightStatContext: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 20,
    lineHeight: 22,
  },
  insightBody: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  insightSource: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontStyle: 'italic',
    marginBottom: 24,
    lineHeight: 16,
  },
  insightBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  insightBtnText: {
    color: Colors.obsidian,
    fontSize: 16,
    fontWeight: '700',
  },
});