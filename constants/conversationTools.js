// Conversation Tools content. Free items are shown to everyone.
// Premium items are locked until upgrade.

export const FREE_STARTERS = [
  {
    text: "What's been the best part of your week so far?",
    why: "Open-ended and positive. Invites a real answer instead of a yes or no.",
  },
  {
    text: "What brought you here today?",
    why: "Works at almost any event. Gives them an easy on-ramp to talk about themselves.",
  },
  {
    text: "I'm trying to get better at meeting new people — mind if I introduce myself?",
    why: "Honest and disarming. Naming the thing removes the pressure for both of you.",
  },
  {
    text: "What's something you're into that most people don't know about?",
    why: "Skips small talk and goes straight to what lights them up.",
  },
  {
    text: "How do you know most of the people here?",
    why: "Low-stakes, situational, and naturally leads to more conversation.",
  },
];

export const CORE_RULES = [
  {
    rule: 'Ask open questions, not closed ones',
    detail: "A closed question ends in a one-word answer: 'Do you like it here?' → 'Yeah.' An open question opens a door: 'What do you like about it here?' Open questions start with what, how, or why.",
  },
  {
    rule: 'Use FORD when you run dry',
    detail: "Family, Occupation, Recreation, Dreams. If a conversation stalls, one of these four always has a thread to pull. 'What do you do?' 'What do you do for fun?' 'What are you working toward?'",
  },
  {
    rule: 'Listen more than you talk',
    detail: "Most people think good conversationalists are great talkers. They're actually great listeners. Ask a follow-up about what they just said instead of waiting for your turn to speak.",
  },
  {
    rule: 'Match their energy first, then lead',
    detail: "Come in a notch calmer or louder than the room and it feels off. Match where they are, then gently steer toward where you want it to go.",
  },
  {
    rule: 'Exit clean',
    detail: "You don't need an excuse. 'It was really good talking to you — I'm going to grab a drink' is enough. Ending well makes them remember you well.",
  },
];

// Premium content — structure defined, content built out when premium launches
export const PREMIUM_SECTIONS = [
  {
    key: 'context_starters',
    title: 'Starters by situation',
    description: 'Tailored openers for networking events, coffee shops, parties, the gym, dating, and work.',
  },
  {
    key: 'topic_ideas',
    title: 'Topic ideas that go deep',
    description: 'A library of conversation topics that move past small talk into real connection.',
  },
  {
    key: 'advanced_scripts',
    title: 'Advanced scripts',
    description: 'What to say when it gets hard — disagreements, awkward silences, graceful exits, and follow-ups.',
  },
];