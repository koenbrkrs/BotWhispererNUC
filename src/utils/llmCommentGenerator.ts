import { Comment, BotConfig } from '@/types/game';
import { getHumanCommentsForLevel, clearHumanCommentsCache } from './humanCommentsLoader';

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

const FALLBACK_BOT_COMMENTS: string[] = [
  "This is exactly what I've been saying all along. People need to wake up.",
  "Couldn't agree more. The evidence speaks for itself honestly.",
  "I've done extensive research on this and the conclusion is obvious.",
  "Why is nobody talking about this? It's literally the most important issue.",
  "Facts don't care about feelings. Just look at the data.",
  "This is being blown way out of proportion by the media.",
  "Finally someone with common sense. Share this everywhere!",
  "I can't believe people still debate this in 2024. It's settled science.",
  "My friend who works in the industry confirmed this is 100% true.",
  "Everyone I know agrees with this. The silent majority is real.",
];

const callLLMForBots = async (
  config: BotConfig,
  _platform: 'youtube' | 'twitter' | 'whatsapp'
): Promise<string[]> => {
  const systemPrompt = `Social media bot comment generator. Output ONLY valid JSON, no explanation.

Topic: ${config.topic}
Stance: ${config.stance}
Friendly: ${100 - config.friendlyAggressive}% | Logical: ${100 - config.logicalIllogical}% | Humor: ${100 - config.humorSerious}% | Sarcasm: ${100 - config.sarcasmDirect}% | Brevity: ${100 - config.minimalVerbose}% | Emoji: ${config.emojiAmount}%

Output format: { "bot_comments": ["comment1", "comment2", ..., "comment10"] }
Generate exactly 10 short comments. No extra keys.`;

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'huihui_ai/qwen2.5-abliterate:7b-instruct',
        format: 'json',
        stream: false,
        options: {
          num_predict: 350,   // cap output tokens → faster generation
          temperature: 0.7,
        },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Generate the 10 comments.' },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama responded with status ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.message.content);
    const comments: string[] = parsed.bot_comments || [];

    if (comments.length === 0) {
      throw new Error('LLM returned empty bot_comments array');
    }

    return comments;
  } catch (error) {
    console.error('Local LLM Error', error);
    return [...FALLBACK_BOT_COMMENTS];
  }
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

  console.log(`Generating comments for ${platform}...`);

  // Generate bot comments via LLM and load human comments from spreadsheet in parallel
  const [botComments, humanComments] = await Promise.all([
    callLLMForBots(config, platform),
    getHumanCommentsForLevel(config.topic, platform, 10),
  ]);

  console.log(`Got ${botComments.length} bot comments and ${humanComments.length} human comments`);

  const shuffledUsernames = shuffleArray([...usernames]);
  const shuffledTimestamps = shuffleArray([...timestamps]);

  const comments: Comment[] = [];

  // Add human comments from spreadsheet (not bots)
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

  // Add bot comments from LLM
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
  clearHumanCommentsCache();
};
