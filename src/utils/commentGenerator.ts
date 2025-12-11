import { Comment, OpinionConfig, StyleConfig } from '@/types/game';

const usernames = [
  'TechWatcher42', 'DigitalNomad_X', 'CodeMaster99', 'ByteRunner', 'NetSurfer2024',
  'DataDriven', 'CyberPunk_23', 'PixelPusher', 'CloudNine_Dev', 'AlgoRhythm',
  'QuantumLeap', 'SiliconDreams', 'BinaryBard', 'CacheKing', 'StreamLiner',
  'ThreadMaster', 'PacketStorm', 'NodeNinja', 'StackOverflow_Fan', 'GitGuru',
  'APIWizard', 'DockerDude', 'K8sKnight', 'MLMaven', 'AIEnthusiast'
];

const timestamps = [
  '2m ago', '5m ago', '8m ago', '12m ago', '15m ago', '18m ago', '22m ago',
  '25m ago', '30m ago', '35m ago', '42m ago', '48m ago', '55m ago', '1h ago', '1h ago'
];

const humanCommentTemplates = [
  "Interesting perspective. I've been thinking about {topic} differently lately.",
  "Not sure I agree with everyone here, but {topic} is definitely worth discussing.",
  "Can someone explain the other side of {topic}? Genuinely curious.",
  "I've seen this debate before. Both sides have valid points about {topic}.",
  "My experience with {topic} has been mixed honestly.",
  "This is a nuanced issue. {topic} isn't black and white.",
  "Hot take: we're overcomplicating {topic}.",
  "Been following {topic} for years. Things have really changed.",
  "Anyone else feel like {topic} gets blown out of proportion?",
  "Valid concerns here about {topic}. We should listen more.",
  "I changed my mind on {topic} after learning more about it.",
  "The real issue with {topic} is that nobody wants to compromise.",
  "Unpopular opinion: {topic} matters less than people think.",
  "Great discussion! {topic} deserves more attention.",
  "I'm skeptical about some claims regarding {topic}, but open to evidence.",
];

const generateBotComment = (
  topic: string,
  opinion: string,
  opinionConfig: OpinionConfig,
  styleConfig: StyleConfig
): string => {
  const parts: string[] = [];
  const { stanceStrength, positivity, category } = opinionConfig;
  const {
    sarcasm, dismissiveness, logic, bulletPoints, emotionalIntensity,
    dramaticFlair, postLength, memeStyle, pseudoIntellectual, jargonUsage,
    supportiveness, agreeableness
  } = styleConfig;

  // Determine dominant traits (threshold: 60)
  const isSarcastic = sarcasm > 60;
  const isDismissive = dismissiveness > 60;
  const isLogical = logic > 60;
  const usesBullets = bulletPoints > 60;
  const isEmotional = emotionalIntensity > 60;
  const isDramatic = dramaticFlair > 60;
  const isShort = postLength > 60;
  const isMemeStyle = memeStyle > 60;
  const isPseudoIntellectual = pseudoIntellectual > 60;
  const usesJargon = jargonUsage > 60;
  const isSupportive = supportiveness > 60;
  const isAgreeable = agreeableness > 60;
  const isStrong = stanceStrength > 60;
  const isPositive = positivity > 60;

  // Build opening based on traits
  if (isSarcastic && isDismissive) {
    parts.push(`Oh wow, another "expert" on ${topic}. 🙄`);
  } else if (isEmotional && isDramatic) {
    parts.push(`I can't BELIEVE people still don't get this!!!`);
  } else if (isMemeStyle && isShort) {
    parts.push(`Based.`);
  } else if (isPseudoIntellectual && usesJargon) {
    parts.push(`From an epistemological standpoint,`);
  } else if (isSupportive && isAgreeable) {
    parts.push(`Absolutely love this discussion!`);
  } else if (isLogical) {
    parts.push(`Let me break this down objectively:`);
  }

  // Build opinion statement based on stance
  const stanceWord = category === 'pro' || category === 'agree' || category === 'support' 
    ? (isPositive ? 'strongly support' : 'support')
    : (isPositive ? 'disagree with' : 'strongly oppose');

  if (usesBullets && isLogical) {
    parts.push(`\n1. ${opinion}\n2. The evidence supports this\n3. Opposing views lack merit`);
  } else if (isEmotional && isDramatic) {
    const emojis = isPositive ? '💯😤🔥' : '😭💔😢';
    parts.push(`${opinion}!!! ${emojis.slice(0, Math.ceil(emotionalIntensity / 35))}`);
  } else if (isMemeStyle) {
    const memeIntros = ['fr fr', 'no cap', 'lowkey', 'ngl'];
    parts.push(`${memeIntros[Math.floor(Math.random() * memeIntros.length)]} ${opinion}`);
  } else if (isPseudoIntellectual) {
    const jargonTerms = ['paradigm', 'framework', 'dialectic', 'synthesis', 'epistemology'];
    const term = jargonTerms[Math.floor(Math.random() * jargonTerms.length)];
    parts.push(`the ${term} clearly indicates that ${opinion}`);
  } else if (isSarcastic) {
    parts.push(`Sure, let's just ignore that ${opinion}. Because that's worked so well. 🙄`);
  } else {
    parts.push(`${opinion}.`);
  }

  // Add closing based on traits
  if (isDismissive && isStrong) {
    parts.push(`Anyone disagreeing clearly hasn't done their research.`);
  } else if (isSupportive && isAgreeable) {
    parts.push(`Love seeing others who understand this! 💪`);
  } else if (isLogical && !isEmotional) {
    parts.push(`The data speaks for itself.`);
  } else if (isDramatic) {
    parts.push(`This is literally the most important issue of our time!!!`);
  }

  // Shorten if high postLength
  let result = parts.join(' ');
  if (isShort && result.length > 80) {
    result = parts[1] || parts[0]; // Just use the opinion part
    if (isMemeStyle) {
      result = `${opinion}. Period. 💯`;
    }
  }

  return result;
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateComments = (
  topic: string,
  botOpinion: string,
  botStyle: string,
  count: number = 20,
  opinionConfig?: OpinionConfig,
  styleConfig?: StyleConfig
): Comment[] => {
  const humanComments = humanCommentTemplates.map(t => t.replace('{topic}', topic));
  
  const shuffledUsernames = shuffleArray(usernames);
  const shuffledTimestamps = shuffleArray(timestamps);
  
  const comments: Comment[] = [];
  const botCount = Math.floor(count * 0.4);
  const humanCount = count - botCount;

  // Default configs if not provided (for backwards compatibility)
  const defaultOpinionConfig: OpinionConfig = {
    stanceStrength: 70,
    positivity: 50,
    category: 'pro',
    theme: 'tech'
  };

  const defaultStyleConfig: StyleConfig = {
    sarcasm: 50,
    dismissiveness: 30,
    logic: 50,
    bulletPoints: 20,
    emotionalIntensity: 40,
    dramaticFlair: 30,
    postLength: 50,
    memeStyle: 20,
    pseudoIntellectual: 30,
    jargonUsage: 20,
    supportiveness: 40,
    agreeableness: 40
  };

  const finalOpinionConfig = opinionConfig || defaultOpinionConfig;
  const finalStyleConfig = styleConfig || defaultStyleConfig;
  
  // Generate human comments
  for (let i = 0; i < humanCount; i++) {
    comments.push({
      id: `human-${i}`,
      text: humanComments[i % humanComments.length],
      username: shuffledUsernames[i % shuffledUsernames.length],
      timestamp: shuffledTimestamps[i % shuffledTimestamps.length],
      source: 'generatedHuman',
      isBotted: false,
    });
  }
  
  // Generate bot comments with varied slider values
  for (let i = 0; i < botCount; i++) {
    // Add slight variation to each bot comment
    const variedStyleConfig = { ...finalStyleConfig };
    Object.keys(variedStyleConfig).forEach(key => {
      const k = key as keyof StyleConfig;
      variedStyleConfig[k] = Math.max(0, Math.min(100, variedStyleConfig[k] + (Math.random() - 0.5) * 20));
    });

    const botText = generateBotComment(topic, botOpinion, finalOpinionConfig, variedStyleConfig);
    
    comments.push({
      id: `bot-${i}`,
      text: botText,
      username: shuffledUsernames[(humanCount + i) % shuffledUsernames.length],
      timestamp: shuffledTimestamps[(humanCount + i) % shuffledTimestamps.length],
      source: 'generatedBot',
      isBotted: true,
    });
  }
  
  return shuffleArray(comments);
};
