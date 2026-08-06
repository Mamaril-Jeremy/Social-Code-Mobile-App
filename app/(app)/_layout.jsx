import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface1,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 24,
          paddingTop: 8,
          height: 76,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Today' }} />
      <Tabs.Screen name="missions" options={{ title: 'Missions' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen
        name="complete"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="archetype-video"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="reflect"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="wrapped"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
      name="conversation-tools"
      options={{
        href: null,
      }}
    />
    </Tabs>
  );
}