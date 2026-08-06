# Social Code

A Jungian-rooted social confidence app for men who know what to say but freeze before saying it.

![React Native](https://img.shields.io/badge/React%20Native-mobile-61dafb)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020)
![Supabase](https://img.shields.io/badge/Supabase-auth%20%2B%20db-3ecf8e)
![Zustand](https://img.shields.io/badge/Zustand-state-443e38)
![Status](https://img.shields.io/badge/status-pre--beta-yellow)

FILL: add 3-4 screenshots here, or a short screen recording. For a mobile app this matters more than anything else in the README. Nobody can install it to see it, so images are the only way to show the work.

---

## The problem

Most social confidence advice assumes the problem is not knowing what to say. For a lot of people it isn't. They know exactly what to say and the words don't come out.

That's a different problem, and it doesn't respond to the same fix. Social Code starts by identifying *how* someone's anxiety actually shows up, then gives them missions calibrated to that specific pattern instead of generic advice.

---

## What it does

A 10-question assessment sorts each user on two axes: their **social archetype** (how their anxiety presents) and their **Jungian personality type** (how they process the world). Those two results drive everything after.

From there the user gets a 7-day challenge with one real-world mission per day, written for their archetype rather than pulled from a generic list. Each day they complete the mission, log a confidence score from 1 to 10, and write a reflection. Streaks track consistency.

On Day 7 they get a Wrapped-style recap built from their own numbers and their own reflections, so the progress is measurable rather than a feeling.

---

## Architecture

```mermaid
flowchart TD
    A[Onboarding] --> B[10-question<br/>assessment]
    B --> C[Archetype +<br/>Jungian type]
    C --> D[Personalized<br/>7-day plan]
    D --> E[Daily mission]
    E --> F[Log confidence<br/>+ reflection]
    F --> DB[(Supabase)]
    F --> G{Day 7?}
    G -->|no| E
    G -->|yes| H[Wrapped recap]
    DB --> H
```

**React Native + Expo (SDK 54).** Expo handles the build and OTA update pipeline, which matters for a solo build where standing up native toolchains for two platforms isn't a good use of time.

**Expo Router** for file-based navigation, so route structure maps directly to the `app/` directory.

**Zustand** for state. Assessment results and mission progress need to be readable across most screens, and Zustand does that without the boilerplate Redux would add to an app this size.

**Supabase** for auth and Postgres. Row Level Security enforces access at the database layer rather than in client code.

**expo-av** for archetype video playback, **expo-notifications** for daily mission reminders.

---

## Data model

Two tables.

**`profiles`** — account details, first name, weekly goal, archetype and archetype scores, personality type and type scores, current streak, longest streak, current mission day, total missions completed.

**`mission_completions`** — one row per completed mission: mission day, confidence score (1–10), reflection text, timestamp.

Row Level Security is on for both. A user can only read and write their own rows, enforced by Postgres policy rather than application logic.

Keeping completions in their own table rather than as a counter on `profiles` means the Day 7 recap can be computed from the actual history, and confidence trends stay queryable over time.

---

## Archetypes

The assessment sorts users into one of four:

| Archetype | Pattern |
|---|---|
| **The Invisible** | In the room but not in the conversation |
| **The Performer** | Shows up, but it costs everything |
| **The Frozen** | Knows exactly what to say, then says nothing |
| **The Competent Man** | Becoming who he was always capable of being |

Each archetype gets its own variant of every daily mission plus a recorded video message.

---

## Frameworks

**Free tier**
- **FEARLESS** — the approach system (3-Second Scan, Barista Method, 3-2-1, Universal Openers)
- **SPARK** — conversation structure
- **TALK** — Tone, Attention, Language, Kinetics

**Premium tier**
- **BRAVE**, **SHIELD**, and the extended frameworks for the post-Day-7 experience

---

## Project structure

```
├── app/           # Expo Router screens — file-based routing
├── components/    # shared UI components
├── constants/     # archetype definitions, mission content, theme
├── hooks/         # custom React hooks
├── lib/           # Supabase client and helpers
├── store/         # Zustand stores
├── assets/        # images, video, fonts
├── App.js
├── app.json       # Expo config
└── package.json
```

FILL: adjust the folder comments to match what's actually in each. If the assessment scoring logic lives somewhere specific, point at it — that's the most interesting code in the repo and a reader won't find it on their own.

---

## Role

FILL: This is where you say what you built. Something like: "I'm the founding engineer — I own the technical architecture and implementation, working with a product owner on content and framework design." Then name the specific things: the assessment scoring logic, the Supabase schema and RLS policies, state management, the streak system, the recap screen.

Be specific about the parts that were hard. Scoring two dimensions from ten questions, or making the recap work off a variable-length completion history, are more interesting than a feature list.

---

## Setup

```bash
git clone https://github.com/Mamaril-Jeremy/Social-Code-Mobile-App.git
cd Social-Code-Mobile-App
npm install
```

Create a `.env` at the project root:

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then:

```bash
npx expo start
```

Scan the QR code with the iPhone camera app, or with Expo Go on Android.

FILL: a reader also needs the database to exist. Consider adding a `supabase/schema.sql` with the two table definitions and the RLS policies so someone can actually stand this up.

---

## Status

Pre-beta. The free tier is feature complete. Premium content and payment integration are in progress.

---

## Limitations

- No automated tests yet.
- Premium tier is scaffolded but not wired to payments.
- The assessment is self-reported, so results depend on honest answers. There's no calibration against observed behavior.
- Content is written for one audience. The archetype framing and mission design don't generalize past it without a rewrite.

---

## Roadmap

- Payment integration and premium unlock
- Post-Day-7 experience built on BRAVE and SHIELD
- Beta launch

---

## Tech stack

**Mobile:** React Native, Expo (SDK 54), Expo Router
**State:** Zustand
**Backend:** Supabase (Auth, Postgres, Row Level Security)
**Media & notifications:** expo-av, expo-notifications