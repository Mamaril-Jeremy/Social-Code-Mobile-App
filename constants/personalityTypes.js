
export const PERSONALITY_TYPES = {
  introverted_feeling: {
    key: 'introverted_feeling',
    name: 'The Caretaker',
    jungianName: 'Introverted Feeling',
    tagline: 'You feel everything deeply. You show it through what you do, not what you say.',
    description:
      'The Caretaker leads from a deep inner value system that rarely gets spoken aloud. You know exactly what matters to you and to others — you just rarely broadcast it. Your care is demonstrated through action, consistency, and remembering the details that most people forget entirely.',
    strengths: [
      'Exceptional care and attentiveness to others',
      'Reliability and consistency under pressure',
      'Attention to detail in service of people',
      'Memory for personal details people share',
      'Warmth, hospitality, and genuine belonging-making',
    ],
    blindSpots: [
      'Difficulty saying no — chronically overextends',
      'Avoids conflict even when it is genuinely needed',
      'Suppresses their own needs and resentment builds',
      'Overly modest about their own contributions',
      'Resistant to change even when beneficial',
    ],
    energyPattern:
      'Introverted but people-focused. Energized by helping in familiar, structured settings. Large and unpredictable gatherings are draining. Needs consistency.',
    socialStyle:
      'Warm and attentive one-on-one. Remembers specific details about people they care for. Does not seek the spotlight. Shows love and care through action rather than words.',
    communicationTip:
      'Show genuine appreciation for what they do specifically. Ask how they are — they rarely volunteer it. Give them time to process before responding to large requests.',
    simulatorScenarios: [
      'Initiating plans with someone you would like to know better',
      'Telling a friend something difficult but necessary',
      'Setting a boundary with someone who pushes back',
      'Speaking up with your idea in a team meeting',
      'Asking for what you need without apologizing',
    ],
    color: '#7B68C8',
  },

  extraverted_feeling: {
    key: 'extraverted_feeling',
    name: 'The Connector',
    jungianName: 'Extraverted Feeling',
    tagline: 'You read the room before anyone else knows there is a room to read.',
    description:
      'The Connector is socially fluent, emotionally intelligent, and constantly calibrating the emotional temperature of every space they enter. You make people feel welcome almost effortlessly — but sometimes at the cost of your own authentic position.',
    strengths: [
      'Exceptional emotional intelligence and empathy',
      'Natural ability to make others feel seen and included',
      'Skilled at mediating conflict and finding common ground',
      'Adaptable communication across very different people',
      'Genuine warmth that draws people toward them',
    ],
    blindSpots: [
      'Can lose their own position trying to please everyone',
      'Struggles to deliver feedback that might upset someone',
      'Approval-seeking can undermine their credibility',
      'Difficulty being alone with unpleasant emotions',
      'May sacrifice authenticity for harmony',
    ],
    energyPattern:
      'Extraverted and people-energized. Thrives in social settings and genuinely recharged by meaningful connection. Can overextend by taking on others emotional states.',
    socialStyle:
      'Warm, engaging, and inclusive. Naturally draws people in. Excellent at small talk that quickly becomes real talk. Reads nonverbal cues with precision.',
    communicationTip:
      'Be direct with them — they can handle honesty better than you think. Acknowledge how they make others feel. Do not mistake their agreeableness for agreement.',
    simulatorScenarios: [
      'Disagreeing with someone you care about without backing down',
      'Delivering criticism that needs to land without softening it',
      'Saying no to a request from a friend',
      'Holding your position when someone pushes back emotionally',
      'Expressing a need without framing it as optional',
    ],
    color: '#E8813A',
  },

  introverted_thinking: {
    key: 'introverted_thinking',
    name: 'The Analyst',
    jungianName: 'Introverted Thinking',
    tagline: 'You have already thought of twelve things wrong with this situation. You said none of them.',
    description:
      'The Analyst builds precise internal frameworks for understanding how everything works. You are systematic, independent, and often the most accurate person in the room — but accuracy without communication leaves your insights locked inside a system only you can access.',
    strengths: [
      'Deep independent thinking and problem solving',
      'Precision and accuracy in analysis',
      'Ability to see structural flaws others miss entirely',
      'Comfort with complexity and ambiguity',
      'Principled — driven by logic rather than social pressure',
    ],
    blindSpots: [
      'Appears cold or detached even when deeply engaged',
      'Struggles to translate internal logic into accessible communication',
      'Can be dismissive of emotional data as irrelevant',
      'Perfectionism delays action and output',
      'Underestimates how much relationships require maintenance',
    ],
    energyPattern:
      'Deeply introverted. Energized by solitary thinking and depleted by prolonged social interaction. Needs significant alone time to process and produce.',
    socialStyle:
      'Reserved and selective. Engages deeply when the topic interests them. Can seem distracted or absent when it does not. Dislikes small talk but excels at precise, substantive conversation.',
    communicationTip:
      'Give them time to think before expecting a response. Engage their logic rather than their emotions. Respect their precision — do not paraphrase them inaccurately.',
    simulatorScenarios: [
      'Explaining your idea in a way non-experts can follow',
      'Engaging in small talk without visibly enduring it',
      'Showing genuine interest in someone else\'s emotional experience',
      'Asking for help before you have exhausted every independent option',
      'Receiving feedback without immediately identifying its flaws',
    ],
    color: '#4A9EBA',
  },

  extraverted_thinking: {
    key: 'extraverted_thinking',
    name: 'The Director',
    jungianName: 'Extraverted Thinking',
    tagline: 'You see the most efficient path to the outcome. You cannot understand why everyone else is still deliberating.',
    description:
      'The Director is decisive, structured, and results-oriented. You organize people and systems with natural authority. The challenge is that your efficiency can read as domination, and your certainty can silence the input that would have made the outcome better.',
    strengths: [
      'Decisive under pressure — acts when others hesitate',
      'Natural organizational and leadership instinct',
      'Clear and direct communication',
      'High standards that elevate the people around them',
      'Executes at speed without losing structure',
    ],
    blindSpots: [
      'Can steamroll dissenting perspectives without realizing it',
      'Undervalues the emotional dimension of decisions',
      'Impatient with deliberation that feels unnecessary',
      'Can damage relationships through directness delivered without care',
      'Difficulty receiving criticism without becoming defensive',
    ],
    energyPattern:
      'Extraverted and action-oriented. Energized by execution, outcomes, and visible progress. Drained by ambiguity, indecision, and circular conversation.',
    socialStyle:
      'Confident and direct. Commands attention naturally. Can dominate conversations without intending to. More respected than liked in initial encounters — trust builds over time.',
    communicationTip:
      'Lead with the outcome you want. Be direct — they respect it. Do not bury your point in preamble. Push back on them clearly — they respond better to directness than to hints.',
    simulatorScenarios: [
      'Listening fully before offering your solution',
      'Asking for input and genuinely incorporating it',
      'Acknowledging someone\'s emotional experience before addressing the problem',
      'Slowing down your delivery so the room can follow',
      'Receiving criticism without defending your position immediately',
    ],
    color: '#00D9C0',
  },

  introverted_sensation: {
    key: 'introverted_sensation',
    name: 'The Steward',
    jungianName: 'Introverted Sensation',
    tagline: 'You remember everything. You change nothing until you are certain the change is right.',
    description:
      'The Steward is grounded, reliable, and deeply attentive to the accumulated details of experience. You build trust through consistency and remember specifics that others let slip. Your challenge is that stability can calcify into resistance — and your caution can delay necessary movement.',
    strengths: [
      'Exceptional memory for facts, details, and past experience',
      'Reliability that people learn to depend on completely',
      'Patience and thoroughness in everything they undertake',
      'Practical and grounded in what actually works',
      'Loyal and steady in relationships over long periods',
    ],
    blindSpots: [
      'Resistant to change even when evidence supports it',
      'Can be paralyzed by the need for certainty before acting',
      'May over-rely on past experience in novel situations',
      'Difficulty delegating — trusts their own execution most',
      'Can be perceived as rigid or inflexible under pressure',
    ],
    energyPattern:
      'Introverted and routine-oriented. Energized by familiar, structured environments. Disruption to routine is genuinely costly. Needs predictability to function at full capacity.',
    socialStyle:
      'Quiet and observant. Takes time to warm up but becomes deeply loyal once trust is established. Remembers personal details and uses them to show care. Does not perform warmth — it is earned and then genuine.',
    communicationTip:
      'Give them advance notice of changes. Present new ideas with evidence and precedent. Do not rush them. Acknowledge their reliability specifically — they rarely hear it enough.',
    simulatorScenarios: [
      'Engaging with an unfamiliar social situation without preparing extensively',
      'Saying yes to something before you have analyzed every risk',
      'Expressing spontaneous appreciation in the moment',
      'Adapting your plan when circumstances change unexpectedly',
      'Starting a conversation with someone new in an unstructured setting',
    ],
    color: '#C8A96E',
  },

  extraverted_sensation: {
    key: 'extraverted_sensation',
    name: 'The Engager',
    jungianName: 'Extraverted Sensation',
    tagline: 'You are completely present. Most people are not even close.',
    description:
      'The Engager is fully alive in the present moment. You notice what is actually happening — the energy in the room, the shift in someone\'s expression, the opportunity that just appeared. You act on the present rather than planning for the future, which makes you exceptionally responsive and occasionally underprepared.',
    strengths: [
      'Full presence — genuinely in the moment with people',
      'High responsiveness and practical adaptability',
      'Energizing social presence that draws people in',
      'Skilled at reading the immediate emotional environment',
      'Action-oriented — executes now rather than planning indefinitely',
    ],
    blindSpots: [
      'Difficulty with long-term planning and future orientation',
      'Can appear impulsive or uncommitted to structure',
      'May avoid difficult abstract conversations',
      'Boredom with routine leads to inconsistency',
      'Can overpromise in the excitement of the moment',
    ],
    energyPattern:
      'Extraverted and stimulus-driven. Energized by novelty, variety, and direct sensory experience. Drained by repetition and abstraction. Needs movement and variety to sustain engagement.',
    socialStyle:
      'Engaging, warm, and immediately present. Makes people feel interesting just by the quality of attention they give. Natural storyteller. Thrives in spontaneous connection.',
    communicationTip:
      'Keep it concrete and immediate. Abstract future planning loses them quickly. Engage their present experience. They respond to genuine enthusiasm — match their energy.',
    simulatorScenarios: [
      'Following through on a commitment when the initial excitement has faded',
      'Having a difficult conversation you have been avoiding',
      'Staying engaged in a slow or abstract discussion',
      'Planning ahead before the urgency forces your hand',
      'Listening without redirecting to your own experience',
    ],
    color: '#FF6B6B',
  },

  introverted_intuition: {
    key: 'introverted_intuition',
    name: 'The Visionary',
    jungianName: 'Introverted Intuition',
    tagline: 'You see where this is going before anyone else has looked up.',
    description:
      'The Visionary operates from a deep internal pattern recognition that produces insight others cannot immediately follow. You see the underlying structure of situations, sense what is coming before it arrives, and form convictions that are difficult to explain but frequently correct. The problem is that the gap between your insight and your communication of it is often vast.',
    strengths: [
      'Sees patterns and future trajectories with unusual clarity',
      'Deep conviction and purposeful direction',
      'Original thinking that generates genuinely novel ideas',
      'Comfortable with complexity and long time horizons',
      'Decisive once the internal picture becomes clear',
    ],
    blindSpots: [
      'Difficulty explaining the reasoning behind their convictions',
      'Can be dismissive of present practical concerns',
      'Appears detached or absent when lost in internal processing',
      'Struggles with the mundane execution their visions require',
      'Can become so invested in a vision that contrary evidence is dismissed',
    ],
    energyPattern:
      'Deeply introverted. Internal processing is constant and consuming. Sustained social interaction is costly. Needs significant quiet to develop and access their insights.',
    socialStyle:
      'Intense and selective. Engages deeply on meaningful topics. Disinterested in surface conversation. Can seem distracted — they often are, but not by something trivial. When fully present, the quality of attention is remarkable.',
    communicationTip:
      'Ask them what they see — not what they think. Give them space to unfold an idea without interruption. Do not demand immediate practical application of an insight that is still forming.',
    simulatorScenarios: [
      'Explaining your insight in language someone else can follow and act on',
      'Engaging in surface conversation without contempt for it',
      'Executing on the practical steps your vision requires',
      'Staying present in a conversation instead of processing internally',
      'Asking for what you need directly instead of assuming others will sense it',
    ],
    color: '#7B68C8',
  },

  extraverted_intuition: {
    key: 'extraverted_intuition',
    name: 'The Explorer',
    jungianName: 'Extraverted Intuition',
    tagline: 'You see ten possibilities where others see one. The problem is finishing any of them.',
    description:
      'The Explorer is generative, curious, and constantly scanning the environment for new connections and possibilities. You energize rooms with ideas, make unexpected connections between unrelated things, and ignite enthusiasm in others. The challenge is that the next idea always looks more interesting than the current commitment.',
    strengths: [
      'Generative thinking — produces ideas at high volume and speed',
      'Makes unexpected connections between unrelated concepts',
      'Energizing and enthusiastic — ignites momentum in others',
      'Adaptable and comfortable with uncertainty',
      'Sees opportunity where others see obstacle',
    ],
    blindSpots: [
      'Starts more than they finish — follow-through is the consistent gap',
      'Boredom with routine leads to abandonment of commitments',
      'Can overwhelm others with the volume and speed of ideas',
      'Underestimates the time and effort execution actually requires',
      'May avoid the necessary but unglamorous work',
    ],
    energyPattern:
      'Extraverted and idea-driven. Energized by novelty, brainstorming, and exploring new territory. Drained by repetitive execution and bureaucratic constraint. Needs variety and creative latitude.',
    socialStyle:
      'Enthusiastic and engaging. Draws people into their excitement naturally. Excellent at generating energy in groups. Can jump between topics in ways that lose less agile conversationalists.',
    communicationTip:
      'Engage their ideas seriously — even the half-formed ones contain something real. Help them narrow rather than expand. Ask which idea they are actually committing to. Hold them to it with warmth.',
    simulatorScenarios: [
      'Committing to one direction when multiple options are available',
      'Following through on something after the initial excitement fades',
      'Listening fully without generating your next idea while someone speaks',
      'Doing the unglamorous execution work your idea actually requires',
      'Being present in a routine interaction without mentally moving to the next thing',
    ],
    color: '#00D9C0',
  },
};

export const PERSONALITY_TYPE_ORDER = [
  'introverted_feeling',
  'extraverted_feeling',
  'introverted_thinking',
  'extraverted_thinking',
  'introverted_sensation',
  'extraverted_sensation',
  'introverted_intuition',
  'extraverted_intuition',
];