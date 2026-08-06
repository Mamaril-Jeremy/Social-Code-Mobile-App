import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function enableDailyReminder() {
  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return { success: false, reason: 'denied' };
  }

  // Clear any existing scheduled reminders first
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule daily 8am reminder
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your mission is waiting',
      body: "Today's the day. Don't break the streak.",
    },
    trigger: {
      type: 'daily',
      hour: 8,
      minute: 0,
    },
  });

  return { success: true };
}