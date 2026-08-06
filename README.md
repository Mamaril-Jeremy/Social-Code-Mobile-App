# Social Code

A Jungian-rooted social confidence app for men who know what to say but freeze before saying it.

## What it does

Users take a 10-question assessment that identifies two things: their **social archetype** (how their anxiety shows up) and their **Jungian personality type** (how they process the world). From there they get a personalized 7-day challenge with daily real-world missions calibrated to their specific pattern.

Each day they complete a mission, log a confidence score and a written reflection, and build a streak. On Day 7 they get a Wrapped-style recap showing measurable change in their own numbers and their own words.

## Stack

- **React Native** with Expo (SDK 54)
- **Expo Router** for file-based navigation
- **Zustand** for state management
- **Supabase** for auth and database
- **expo-av** for archetype video playback
- **expo-notifications** for daily reminders

## Project structure

    app/
      (auth)/          Welcome, login, signup, forgot password
      (onboarding)/    Name capture, goal selection, quiz, result
      (app)/           Home, missions, progress, profile, and hidden screens
    components/ui/     Shared UI components
    constants/         Archetypes, personality types, missions, colors, insights
    lib/               Supabase client, notification helpers
    store/             Zustand store
    assets/videos/     Archetype and congratulations videos

## Setup

1. Clone the repo.

2. Install dependencies:

       npm install

3. Create a `.env` file at the project root:

       EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
       EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Start the dev server:

       npx expo start

5. Scan the QR code with the iPhone camera app, or with Expo Go on Android.

## Database

Two Supabase tables:

**profiles** — user account, first name, weekly goal, archetype, archetype scores, personality type, type scores, current streak, longest streak, current mission day, total missions completed.

**mission_completions** — one row per completed mission, with mission day, confidence score (1 to 10), reflection text, and timestamp.

Row Level Security is enabled on both tables. Users can only read and write their own rows.

## Frameworks

**Free tier**

- FEARLESS — the approach system (3-Second Scan, Barista Method, 3-2-1, Universal Openers)
- SPARK — conversation structure
- TALK — Tone, Attention, Language, Kinetics

**Premium tier**

- BRAVE, SHIELD, and the extended frameworks for the post-Day-7 experience

## Archetypes

The assessment sorts users into one of four social archetypes:

- **The Invisible** — in the room but not in the conversation
- **The Performer** — shows up, but it costs everything
- **The Frozen** — knows exactly what to say, then says nothing
- **The Competent Man** — becoming who he was always capable of being

Each archetype gets its own variant of every daily mission, plus a recorded video message.

## Status

Pre-beta. The free tier is feature complete. Premium content and payment integration are in progress.