export interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  source: 'generatedHuman' | 'generatedBot';
  isBotted: boolean;
}

export interface BotConfig {
  friendlyAggressive: number; // 0 = Friendly, 100 = Aggressive
  logicalIllogical: number; // 0 = Logical, 100 = Illogical
  humorSerious: number; // 0 = Humor, 100 = Serious
  sarcasmDirect: number; // 0 = Sarcasm, 100 = Direct
  openClosed: number; // 0 = Open, 100 = Closed
  minimalVerbose: number; // 0 = Minimal, 100 = Verbose
  emojiAmount: number; // 0 = None, 100 = Heavy
  topic: string;
  stance: string;
}

export interface ScoreEntry {
  code: string;
  score: number;
  time: number;
}

// Keep old interfaces for backwards compatibility
export interface OpinionConfig {
  stanceStrength: number;
  positivity: number;
  category: 'pro' | 'con' | 'agree' | 'disagree' | 'support' | 'oppose';
  theme: 'political' | 'environmental' | 'tech' | 'social' | 'economic' | 'cultural';
}

export interface StyleConfig {
  sarcasm: number;
  dismissiveness: number;
  logic: number;
  bulletPoints: number;
  emotionalIntensity: number;
  dramaticFlair: number;
  postLength: number;
  memeStyle: number;
  pseudoIntellectual: number;
  jargonUsage: number;
  supportiveness: number;
  agreeableness: number;
}

export interface GameConfig {
  topic: string;
  botOpinion: string;
  botStyle: string;
  opinionConfig: OpinionConfig;
  styleConfig: StyleConfig;
  botConfig?: BotConfig;
}

export interface PlayerGuess {
  guessed: boolean;
  correct: boolean;
}

export interface GameResults {
  totalBotted: number;
  correctGuesses: number;
  incorrectGuesses: number;
  missedBotted: number;
  timeRemaining: number;
  timerExpired: boolean;
  livesLost?: number;
}

export type GamePhase = 'setup' | 'handoff' | 'playing' | 'reveal';
