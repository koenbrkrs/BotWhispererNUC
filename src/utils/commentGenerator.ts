import { Comment, BotConfig } from '@/types/game';

const usernames = [
  'TechWatcher42', 'DigitalNomad_X', 'CodeMaster99', 'ByteRunner', 'NetSurfer2024',
  'DataDriven', 'CyberPunk_23', 'PixelPusher', 'CloudNine_Dev', 'AlgoRhythm',
  'QuantumLeap', 'SiliconDreams', 'BinaryBard', 'CacheKing', 'StreamLiner',
  'ThreadMaster', 'PacketStorm', 'NodeNinja', 'StackOverflow_Fan', 'GitGuru',
  'APIWizard', 'DockerDude', 'K8sKnight', 'MLMaven', 'AIEnthusiast',
  'RealTalk_99', 'JustMyOpinion', 'CasualObserver', 'ThinkTank22', 'OpenMind2024',
  'DebateMe_Bro', 'FactChecker_X', 'NeutralNelly', 'HotTakeHarry', 'ReasonableRay'
];

const timestamps = [
  '1m ago', '2m ago', '3m ago', '5m ago', '7m ago', '8m ago', '10m ago',
  '12m ago', '15m ago', '18m ago', '22m ago', '25m ago', '30m ago', '35m ago', 
  '42m ago', '48m ago', '55m ago', '1h ago', '1h ago', '2h ago'
];

const emojis = {
  positive: ['👍', '💯', '🙌', '✅', '🔥', '❤️', '👏', '💪'],
  negative: ['👎', '🙄', '😤', '❌', '💔', '😡', '🤦', '😒'],
  neutral: ['🤔', '😐', '🧐', '👀', '💭', '📊'],
  fun: ['😂', '🤣', '😅', '🍕', '🎉', '✨']
};

const typos: Record<string, string> = {
  'the': 'teh',
  'and': 'adn',
  'that': 'taht',
  'this': 'tihs',
  'with': 'wtih',
  'have': 'hvae',
  'just': 'jsut',
  'because': 'becuase',
  'really': 'realy',
  'people': 'poeple',
  'think': 'thnk',
  'about': 'abuot'
};

const slangReplacements: Record<string, string> = {
  'to be honest': 'tbh',
  'in my opinion': 'imo',
  'i do not know': 'idk',
  'by the way': 'btw',
  'for real': 'fr',
  'right now': 'rn',
  'not going to lie': 'ngl',
  'no cap': 'no cap',
  'you': 'u',
  'your': 'ur',
  'are': 'r',
  'though': 'tho'
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const addTypos = (text: string, probability: number): string => {
  if (probability < 30) return text;
  
  const words = text.split(' ');
  return words.map(word => {
    const lower = word.toLowerCase();
    if (typos[lower] && Math.random() < probability / 300) {
      return word[0] === word[0].toUpperCase() 
        ? typos[lower].charAt(0).toUpperCase() + typos[lower].slice(1)
        : typos[lower];
    }
    return word;
  }).join(' ');
};

const addSlang = (text: string, probability: number): string => {
  let result = text.toLowerCase();
  Object.entries(slangReplacements).forEach(([full, slang]) => {
    if (Math.random() < probability / 150) {
      result = result.replace(new RegExp(full, 'gi'), slang);
    }
  });
  return result;
};

const getRandomEmojis = (type: keyof typeof emojis, count: number): string => {
  const available = emojis[type];
  const selected: string[] = [];
  for (let i = 0; i < count; i++) {
    selected.push(available[Math.floor(Math.random() * available.length)]);
  }
  return selected.join('');
};

const generateBotComment = (config: BotConfig): string => {
  const { topic, stance, friendlyAggressive, logicalIllogical, humorSerious, 
          sarcasmDirect, openClosed, minimalVerbose, emojiAmount } = config;
  
  const isAggressive = friendlyAggressive > 50;
  const isIllogical = logicalIllogical > 50;
  const isSerious = humorSerious > 50;
  const isDirect = sarcasmDirect > 50;
  const isClosed = openClosed > 50;
  const isVerbose = minimalVerbose > 50;
  
  const parts: string[] = [];
  
  // Opening based on aggression/friendliness
  const friendlyOpenings = [
    "I think", "In my view,", "Honestly,", "I believe", "From what I see,",
    "Just my take but", "Personally,", "I feel like"
  ];
  const aggressiveOpenings = [
    "Look,", "Let me be clear:", "Wake up people!", "This is ridiculous -",
    "Obviously,", "How can anyone not see that", "It's insane that",
    "I can't believe", "Seriously?"
  ];
  const sarcasticOpenings = [
    "Oh wow,", "Sure, because", "Yeah right,", "Ah yes,", "Oh please,",
    "LOL imagine thinking", "Totally believable that", "Shocker:"
  ];
  
  // Select opening
  if (!isDirect && Math.random() > 0.4) {
    parts.push(sarcasticOpenings[Math.floor(Math.random() * sarcasticOpenings.length)]);
  } else if (isAggressive) {
    parts.push(aggressiveOpenings[Math.floor(Math.random() * aggressiveOpenings.length)]);
  } else {
    parts.push(friendlyOpenings[Math.floor(Math.random() * friendlyOpenings.length)]);
  }
  
  // Main opinion based on stance
  const stanceLower = stance.toLowerCase();
  const isPositiveStance = stanceLower.includes('support') || stanceLower.includes('favor') || 
                           stanceLower.includes('essential') || stanceLower.includes('open') ||
                           stanceLower.includes('incredible') || stanceLower.includes('welcome');
  const isNeutralStance = stanceLower.includes('neutral') || stanceLower.includes('depends');
  
  // Generate opinion variations
  const positiveTemplates = [
    `${stance.toLowerCase()} and I stand by that`,
    `we need to recognize that ${topic.toLowerCase()} is important`,
    `anyone with sense can see ${topic.toLowerCase()} deserves support`,
    `the evidence clearly shows we should embrace this`,
    `history will prove that supporting this was right`
  ];
  
  const negativeTemplates = [
    `${stance.toLowerCase()} is the only sensible position`,
    `people need to understand the real issues with ${topic.toLowerCase()}`,
    `the problems here are obvious to anyone paying attention`,
    `we can't keep ignoring the downsides`,
    `this whole thing has gone too far`
  ];
  
  const neutralTemplates = [
    `there are valid points on both sides of ${topic.toLowerCase()}`,
    `it's more nuanced than people make it out to be`,
    `we need more balanced discussion about this`,
    `jumping to conclusions either way is premature`,
    `let's be reasonable about ${topic.toLowerCase()}`
  ];
  
  let templates = isPositiveStance ? positiveTemplates : 
                  isNeutralStance ? neutralTemplates : negativeTemplates;
  parts.push(templates[Math.floor(Math.random() * templates.length)]);
  
  // Add logical/illogical elements
  if (!isIllogical && Math.random() > 0.5) {
    const logicalAdditions = [
      "The data supports this.",
      "Statistics don't lie.",
      "Just look at the facts.",
      "Research backs this up.",
      "The evidence is clear."
    ];
    parts.push(logicalAdditions[Math.floor(Math.random() * logicalAdditions.length)]);
  } else if (isIllogical && Math.random() > 0.6) {
    const illogicalAdditions = [
      "Everyone knows this!",
      "It's just common sense.",
      "My friend told me so.",
      "I read it somewhere.",
      "Trust me on this."
    ];
    parts.push(illogicalAdditions[Math.floor(Math.random() * illogicalAdditions.length)]);
  }
  
  // Verbose additions
  if (isVerbose) {
    const verboseAdditions = [
      `Furthermore, when you really think about ${topic.toLowerCase()}, there's so much more to consider.`,
      `I could go on and on about this topic because it's so important.`,
      `People don't realize how deep this issue goes.`,
      `There are layers upon layers to unpack here.`
    ];
    if (Math.random() > 0.5) {
      parts.push(verboseAdditions[Math.floor(Math.random() * verboseAdditions.length)]);
    }
  }
  
  // Humor/serious closing
  if (!isSerious && Math.random() > 0.6) {
    const humorClosings = [
      "But what do I know lol",
      "Just saying 🤷",
      "Fight me on this haha",
      "Change my mind 😏",
      "This is the hill I die on lmao"
    ];
    parts.push(humorClosings[Math.floor(Math.random() * humorClosings.length)]);
  }
  
  // Closed-minded additions
  if (isClosed && Math.random() > 0.5) {
    const closedAdditions = [
      "And that's final.",
      "I won't be responding to disagreements.",
      "Don't bother arguing.",
      "My mind is made up.",
      "End of discussion."
    ];
    parts.push(closedAdditions[Math.floor(Math.random() * closedAdditions.length)]);
  }
  
  let result = parts.join(' ');
  
  // Add typos based on illogical slider
  result = addTypos(result, logicalIllogical);
  
  // Add emojis based on emoji slider
  if (emojiAmount > 20) {
    const emojiCount = Math.ceil(emojiAmount / 35);
    const emojiType = isPositiveStance ? 'positive' : isNeutralStance ? 'neutral' : 'negative';
    result += ' ' + getRandomEmojis(emojiType, emojiCount);
  }
  
  // Minimal - shorten if needed
  if (!isVerbose && result.length > 120) {
    const sentences = result.split(/[.!?]+/).filter(s => s.trim());
    result = sentences.slice(0, 2).join('. ') + '.';
    if (emojiAmount > 30) {
      result += ' ' + getRandomEmojis(isPositiveStance ? 'positive' : 'neutral', 1);
    }
  }
  
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const generateHumanComment = (topic: string): string => {
  const templates = [
    `Interesting perspective on ${topic.toLowerCase()}. I've been thinking about this differently lately.`,
    `Not sure I agree with everyone here, but ${topic.toLowerCase()} is definitely worth discussing.`,
    `Can someone explain the other side of this? Genuinely curious what people think.`,
    `I've seen this debate before. Both sides have valid points honestly.`,
    `My experience with ${topic.toLowerCase()} has been mixed to be honest.`,
    `This is a nuanced issue. Nothing is really black and white here.`,
    `Hot take: we're overcomplicating ${topic.toLowerCase()}.`,
    `Been following this topic for years. Things have really changed.`,
    `Anyone else feel like this gets blown out of proportion sometimes?`,
    `Valid concerns here. We should listen more to different perspectives.`,
    `I changed my mind on this after learning more about it actually.`,
    `The real issue is that nobody wants to compromise anymore.`,
    `Unpopular opinion: this matters less than people think? idk`,
    `Great discussion! This topic deserves more attention fr.`,
    `I'm skeptical about some claims here but open to evidence.`,
    `Wait what? I thought this was already settled...`,
    `My two cents: let people do what they want lol`,
    `This thread is wild. So many different viewpoints 😅`,
    `Honestly I just want everyone to chill about ${topic.toLowerCase()}`,
    `Does anyone have actual sources? Not trying to be rude just curious`,
    `Bruh this debate again? We do this every week it feels like`,
    `Okay but has anyone considered maybe we're ALL wrong here?`,
    `I don't have a strong opinion but this is interesting to read through`,
    `My mom has really strong views on this lol. She'd love this thread`,
    `Just here for the comments honestly 🍿`,
    `Can we agree to disagree? Life's too short for internet arguments`
  ];
  
  let text = templates[Math.floor(Math.random() * templates.length)];
  
  // Occasionally add casual slang
  if (Math.random() > 0.7) {
    text = addSlang(text, 80);
  }
  
  // Occasionally add a typo to seem human
  if (Math.random() > 0.85) {
    text = addTypos(text, 50);
  }
  
  // Random chance to add casual emoji
  if (Math.random() > 0.75) {
    text += ' ' + getRandomEmojis('neutral', 1);
  }
  
  return text;
};

export const generateComments = (
  config: BotConfig,
  count: number = 20
): Comment[] => {
  const shuffledUsernames = shuffleArray([...usernames]);
  const shuffledTimestamps = shuffleArray([...timestamps]);
  
  const comments: Comment[] = [];
  const botCount = Math.floor(count / 2); // 50/50 split
  const humanCount = count - botCount;

  // Generate human comments
  for (let i = 0; i < humanCount; i++) {
    comments.push({
      id: `human-${i}`,
      text: generateHumanComment(config.topic),
      username: shuffledUsernames[i % shuffledUsernames.length],
      timestamp: shuffledTimestamps[i % shuffledTimestamps.length],
      source: 'generatedHuman',
      isBotted: false,
    });
  }
  
  // Generate bot comments with variations
  for (let i = 0; i < botCount; i++) {
    // Create slight variations in config for each bot
    const variedConfig: BotConfig = {
      ...config,
      friendlyAggressive: Math.max(0, Math.min(100, config.friendlyAggressive + (Math.random() - 0.5) * 30)),
      logicalIllogical: Math.max(0, Math.min(100, config.logicalIllogical + (Math.random() - 0.5) * 25)),
      humorSerious: Math.max(0, Math.min(100, config.humorSerious + (Math.random() - 0.5) * 30)),
      sarcasmDirect: Math.max(0, Math.min(100, config.sarcasmDirect + (Math.random() - 0.5) * 30)),
      minimalVerbose: Math.max(0, Math.min(100, config.minimalVerbose + (Math.random() - 0.5) * 40)),
      emojiAmount: Math.max(0, Math.min(100, config.emojiAmount + (Math.random() - 0.5) * 30)),
    };
    
    comments.push({
      id: `bot-${i}`,
      text: generateBotComment(variedConfig),
      username: shuffledUsernames[(humanCount + i) % shuffledUsernames.length],
      timestamp: shuffledTimestamps[(humanCount + i) % shuffledTimestamps.length],
      source: 'generatedBot',
      isBotted: true,
    });
  }
  
  return shuffleArray(comments);
};
