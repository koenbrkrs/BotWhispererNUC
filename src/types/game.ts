export interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  source: 'generatedHuman' | 'generatedBot';
  isBotted: boolean;
}

export interface GameConfig {
  topic: string;
  botOpinion: string;
  botStyle: string;
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
