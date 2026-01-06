import { ScoreEntry } from '@/types/game';

const STORAGE_KEY = 'bot_detective_scores';

export const generatePlayerCode = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
};

export const calculateScore = (
  correctBots: number,
  wrongHumans: number,
  totalTimeSeconds: number
): number => {
  // Base score: correct * 3333 - wrong * 1000
  let baseScore = (correctBots * 3333) - (wrongHumans * 1000);
  
  // Clamp base to min 0
  baseScore = Math.max(0, baseScore);
  
  // Time factor: subtract (totalSeconds / 60) * 100
  const timePenalty = (totalTimeSeconds / 60) * 100;
  
  // Final score, clamped between 0 and 100000
  const finalScore = Math.max(0, Math.min(100000, baseScore - timePenalty));
  
  return Math.floor(finalScore);
};

export const getScores = (): ScoreEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading scores from localStorage:', e);
  }
  return [];
};

export const saveScore = (entry: ScoreEntry): ScoreEntry[] => {
  const scores = getScores();
  scores.push(entry);
  scores.sort((a, b) => b.score - a.score);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (e) {
    console.error('Error saving scores to localStorage:', e);
  }
  
  return scores;
};

export const getPlayerRank = (scores: ScoreEntry[], playerCode: string): number => {
  const index = scores.findIndex(s => s.code === playerCode);
  return index >= 0 ? index + 1 : scores.length + 1;
};

export const getTop10WithPlayer = (scores: ScoreEntry[], playerCode: string): { entries: ScoreEntry[], playerRank: number } => {
  const playerRank = getPlayerRank(scores, playerCode);
  const top10 = scores.slice(0, 10);
  
  return { entries: top10, playerRank };
};
