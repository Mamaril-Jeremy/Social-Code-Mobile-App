import { Redirect } from 'expo-router';
import { useStore } from '../store/useStore';

export default function Index() {
  const { session, user, isLoading, inOnboarding } = useStore();

  if (isLoading) return null;
  if (inOnboarding) return null;
  if (!session) return <Redirect href="/(auth)/welcome" />;
  if (!user?.archetype) return <Redirect href="/(onboarding)/quiz" />;
  return <Redirect href="/(app)/home" />;
}