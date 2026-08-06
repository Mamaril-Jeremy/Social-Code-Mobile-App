import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useStore = create((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  quizAnswers: [],
  currentMissionDay: 1,
  inOnboarding: false,
  notificationBannerDismissed: false,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      set({ session, user: profile, isLoading: false });
    } else {
      set({ session: null, user: null, isLoading: false });
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (get().inOnboarding) {
        set({ session });
        return;
      }
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        set({ session, user: profile });
      } else {
        set({ session: null, user: null });
      }
    });
  },

  setUser: (user) => set({ user }),

  setInOnboarding: (val) => set({ inOnboarding: val }),

  setNotificationBannerDismissed: (val) => set({ notificationBannerDismissed: val }),

  setQuizAnswer: (questionIndex, answerIndex) => {
    const answers = [...get().quizAnswers];
    answers[questionIndex] = answerIndex;
    set({ quizAnswers: answers });
  },

  clearQuizAnswers: () => set({ quizAnswers: [] }),

  setCurrentMissionDay: (day) => set({ currentMissionDay: day }),

  saveArchetype: async (archetype, scores, personalityType, typeScores) => {
    const { session } = get();

    set((state) => ({
      user: {
        ...state.user,
        archetype,
        archetype_scores: scores,
        personality_type: personalityType,
        type_scores: typeScores,
      },
    }));

    if (!session) return;

    const { data } = await supabase
      .from('profiles')
      .update({
        archetype,
        archetype_scores: scores,
        personality_type: personalityType,
        type_scores: typeScores,
      })
      .eq('id', session.user.id)
      .select()
      .single();

    if (data) {
      set({ user: data });
    }
  },

  completeMission: async (confidenceScore, reflection) => {
    const { user, session } = get();
    const currentDay = user?.current_mission_day || 1;
    const currentStreak = user?.current_streak || 0;
    const longestStreak = user?.longest_streak || 0;
    const newDay = Math.min(currentDay + 1, 8);
    const newStreak = currentStreak + 1;
    const newLongest = Math.max(newStreak, longestStreak);

    const updatedUser = {
      ...user,
      current_mission_day: newDay,
      current_streak: newStreak,
      longest_streak: newLongest,
      total_missions_completed: (user?.total_missions_completed || 0) + 1,
    };

    set({ user: updatedUser });

    if (session) {
      await supabase
        .from('profiles')
        .update({
          current_mission_day: newDay,
          current_streak: newStreak,
          longest_streak: newLongest,
          total_missions_completed: updatedUser.total_missions_completed,
          last_active_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      const { error: missionError } = await supabase
        .from('mission_completions')
        .insert({
          user_id: session.user.id,
          mission_day: currentDay,
          confidence_score: confidenceScore,
          reflection: reflection,
          completed_at: new Date().toISOString(),
        });

      if (missionError) {
        console.log('Mission insert error:', missionError);
      }
    }
  },
}));

