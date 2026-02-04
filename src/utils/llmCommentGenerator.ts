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

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Cache for generated comments
const commentCache = new Map<string, Comment[]>();

const createCacheKey = (config: BotConfig, platform: string): string => {
  return `${platform}-${config.topic}-${config.stance}-${config.friendlyAggressive}-${config.logicalIllogical}-${config.humorSerious}-${config.sarcasmDirect}-${config.openClosed}-${config.minimalVerbose}-${config.emojiAmount}`;
};

const callLLM = async (
  config: BotConfig, 
  platform: 'youtube' | 'twitter' | 'whatsapp',
  type: 'bot' | 'human'
): Promise<string[]> => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ config, platform, type }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to generate ${type} comments`);
  }

  const data = await response.json();
  return data.comments || [];
};

export const generateLLMComments = async (
  config: BotConfig,
  platform: 'youtube' | 'twitter' | 'whatsapp'
): Promise<Comment[]> => {
  const cacheKey = createCacheKey(config, platform);
  
  // Check cache first
  if (commentCache.has(cacheKey)) {
    console.log(`Using cached comments for ${platform}`);
    return commentCache.get(cacheKey)!;
  }

  console.log(`Generating new LLM comments for ${platform}...`);

  // Generate both bot and human comments in parallel
  const [botComments, humanComments] = await Promise.all([
    callLLM(config, platform, 'bot'),
    callLLM(config, platform, 'human'),
  ]);

  const shuffledUsernames = shuffleArray([...usernames]);
  const shuffledTimestamps = shuffleArray([...timestamps]);

  const comments: Comment[] = [];

  // Add human comments (not bots)
  humanComments.forEach((text, i) => {
    comments.push({
      id: `human-${platform}-${i}`,
      text,
      username: shuffledUsernames[i % shuffledUsernames.length],
      timestamp: shuffledTimestamps[i % shuffledTimestamps.length],
      source: 'generatedHuman',
      isBotted: false,
    });
  });

  // Add bot comments
  botComments.forEach((text, i) => {
    comments.push({
      id: `bot-${platform}-${i}`,
      text,
      username: shuffledUsernames[(humanComments.length + i) % shuffledUsernames.length],
      timestamp: shuffledTimestamps[(humanComments.length + i) % shuffledTimestamps.length],
      source: 'generatedBot',
      isBotted: true,
    });
  });

  // Shuffle to mix bots and humans
  const shuffledComments = shuffleArray(comments);

  // Cache the result
  commentCache.set(cacheKey, shuffledComments);

  return shuffledComments;
};

export const clearCommentCache = () => {
  commentCache.clear();
};
