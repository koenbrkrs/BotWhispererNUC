import { GameConfig, Comment, GameResults } from '@/types/game';
import { TwitterLayout } from '../twitter/TwitterLayout';
import { TwitterFeed } from '../twitter/TwitterFeed';
import { Button } from '../ui/button';
import { RotateCcw, Trophy, Target, XCircle, Clock } from 'lucide-react';

interface TwitterRevealPhaseProps {
  config: GameConfig;
  comments: Comment[];
  results: GameResults;
  onPlayAgain: () => void;
  onContinue?: () => void;
  showContinue?: boolean;
}

export const TwitterRevealPhase = ({ 
  config, 
  comments, 
  results, 
  onPlayAgain,
  onContinue,
  showContinue = false,
}: TwitterRevealPhaseProps) => {
  const accuracy = results.totalBotted > 0 
    ? Math.round((results.correctGuesses / results.totalBotted) * 100) 
    : 0;

  const getGrade = () => {
    if (accuracy >= 90) return { grade: 'S', color: 'text-yellow-400', label: 'Perfect!' };
    if (accuracy >= 70) return { grade: 'A', color: 'text-green-400', label: 'Excellent!' };
    if (accuracy >= 50) return { grade: 'B', color: 'text-blue-400', label: 'Good!' };
    if (accuracy >= 30) return { grade: 'C', color: 'text-orange-400', label: 'Keep practicing!' };
    return { grade: 'D', color: 'text-red-400', label: 'Try again!' };
  };

  const { grade, color, label } = getGrade();

  return (
    <TwitterLayout>
      <div className="flex-1 border-x border-tw-border min-h-screen max-w-[600px]">
        {/* Results Header */}
        <div className="sticky top-0 z-30 bg-tw-bg-primary/80 backdrop-blur-md border-b border-tw-border px-4 py-4">
          <h1 className="text-xl font-bold text-tw-text-primary mb-4">Level 2 Results - Twitter/X</h1>
          
          {/* Score Card */}
          <div className="bg-tw-bg-secondary rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <div className={`text-6xl font-bold ${color}`}>{grade}</div>
                <p className="text-tw-text-secondary mt-1">{label}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-tw-text-primary">{accuracy}%</div>
                <p className="text-tw-text-secondary">Accuracy</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3 p-3 bg-tw-bg-primary rounded-xl">
                <Target className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-lg font-bold text-tw-text-primary">{results.correctGuesses}</p>
                  <p className="text-xs text-tw-text-secondary">Bots Found</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-tw-bg-primary rounded-xl">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-lg font-bold text-tw-text-primary">{results.incorrectGuesses}</p>
                  <p className="text-xs text-tw-text-secondary">Wrong Guesses</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-tw-bg-primary rounded-xl">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-lg font-bold text-tw-text-primary">{results.missedBotted}</p>
                  <p className="text-xs text-tw-text-secondary">Missed Bots</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-tw-bg-primary rounded-xl">
                <Clock className="w-5 h-5 text-tw-blue" />
                <div>
                  <p className="text-lg font-bold text-tw-text-primary">{results.timeRemaining}s</p>
                  <p className="text-xs text-tw-text-secondary">Time Left</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              {showContinue && onContinue ? (
                <Button onClick={onContinue} className="flex-1 bg-tw-blue hover:bg-tw-blue-hover">
                  Continue to Final Results
                </Button>
              ) : (
                <Button onClick={onPlayAgain} className="flex-1 bg-tw-blue hover:bg-tw-blue-hover">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bot Tweets Reveal */}
        <div className="px-4 py-3 bg-tw-blue/10 border-b border-tw-border">
          <p className="text-sm text-tw-text-primary">
            <span className="font-bold">Bot tweets revealed below</span> - marked with a "BOT" badge
          </p>
        </div>

        <TwitterFeed
          topic={config.topic}
          comments={comments}
          mode="reveal"
        />
      </div>
    </TwitterLayout>
  );
};
