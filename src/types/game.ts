export interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  source: 'generatedHuman' | 'generatedBot';
  isBotted: boolean;
}

export interface OpinionConfig {
  stanceStrength: number; // 0-100
  positivity: number; // 0-100
  category: 'pro' | 'con' | 'agree' | 'disagree' | 'support' | 'oppose';
  theme: 'political' | 'environmental' | 'tech' | 'social' | 'economic' | 'cultural';
}

export interface StyleConfig {
  sarcasm: number; // 0-100
  dismissiveness: number; // 0-100
  logic: number; // 0-100
  bulletPoints: number; // 0-100
  emotionalIntensity: number; // 0-100
  dramaticFlair: number; // 0-100
  postLength: number; // 0-100 (0 = long, 100 = short/meme-like)
  memeStyle: number; // 0-100
  pseudoIntellectual: number; // 0-100
  jargonUsage: number; // 0-100
  supportiveness: number; // 0-100
  agreeableness: number; // 0-100
}

export interface GameConfig {
  topic: string;
  botOpinion: string;
  botStyle: string;
  opinionConfig: OpinionConfig;
  styleConfig: StyleConfig;
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
}

export type GamePhase = 'setup' | 'handoff' | 'playing' | 'reveal';
