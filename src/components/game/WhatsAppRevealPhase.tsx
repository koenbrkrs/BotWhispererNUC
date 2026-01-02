import { GameConfig, Comment, GameResults } from '@/types/game';
import { WhatsAppLayout } from '../whatsapp/WhatsAppLayout';
import { WhatsAppChat } from '../whatsapp/WhatsAppChat';
import { Button } from '../ui/button';
import { RotateCcw, Trophy, Target, XCircle, Clock } from 'lucide-react';

interface WhatsAppRevealPhaseProps {
  config: GameConfig;
  comments: Comment[];
  results: GameResults;
  onPlayAgain: () => void;
  onContinue?: () => void;
  showContinue?: boolean;
}

export const WhatsAppRevealPhase = ({ 
  config, 
  comments, 
  results, 
  onPlayAgain,
  onContinue,
  showContinue = false,
}: WhatsAppRevealPhaseProps) => {
  const accuracy = results.totalBotted > 0 
    ? Math.round((results.correctGuesses / results.totalBotted) * 100) 
    : 0;

  const getGrade = () => {
    if (accuracy >= 90) return { grade: 'S', color: 'text-yellow-400', label: 'Perfect!' };
    if (accuracy >= 70) return { grade: 'A', color: 'text-wa-green', label: 'Excellent!' };
    if (accuracy >= 50) return { grade: 'B', color: 'text-blue-400', label: 'Good!' };
    if (accuracy >= 30) return { grade: 'C', color: 'text-orange-400', label: 'Keep practicing!' };
    return { grade: 'D', color: 'text-red-400', label: 'Try again!' };
  };

  const { grade, color, label } = getGrade();

  return (
    <WhatsAppLayout groupName={config.topic}>
      <div className="flex-1 flex flex-col bg-wa-chat-bg min-h-screen">
        {/* Results Header */}
        <div className="bg-wa-bg-header px-4 py-4 border-b border-wa-border">
          <h1 className="text-xl font-bold text-wa-text-primary mb-4">Level 3 Results - WhatsApp</h1>
          
          {/* Score Card */}
          <div className="bg-wa-bg-secondary rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <div className={`text-6xl font-bold ${color}`}>{grade}</div>
                <p className="text-wa-text-secondary mt-1">{label}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-wa-text-primary">{accuracy}%</div>
                <p className="text-wa-text-secondary">Accuracy</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3 p-3 bg-wa-bg-input rounded-xl">
                <Target className="w-5 h-5 text-wa-green" />
                <div>
                  <p className="text-lg font-bold text-wa-text-primary">{results.correctGuesses}</p>
                  <p className="text-xs text-wa-text-secondary">Bots Found</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-wa-bg-input rounded-xl">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-lg font-bold text-wa-text-primary">{results.incorrectGuesses}</p>
                  <p className="text-xs text-wa-text-secondary">Wrong Guesses</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-wa-bg-input rounded-xl">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-lg font-bold text-wa-text-primary">{results.missedBotted}</p>
                  <p className="text-xs text-wa-text-secondary">Missed Bots</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-wa-bg-input rounded-xl">
                <Clock className="w-5 h-5 text-wa-green" />
                <div>
                  <p className="text-lg font-bold text-wa-text-primary">{results.timeRemaining}s</p>
                  <p className="text-xs text-wa-text-secondary">Time Left</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              {showContinue && onContinue ? (
                <Button onClick={onContinue} className="flex-1 bg-wa-green hover:bg-wa-green/80">
                  Continue to Final Results
                </Button>
              ) : (
                <Button onClick={onPlayAgain} className="flex-1 bg-wa-green hover:bg-wa-green/80">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bot Messages Reveal */}
        <div className="px-4 py-3 bg-wa-green/10 border-b border-wa-border">
          <p className="text-sm text-wa-text-primary">
            <span className="font-bold">Bot messages revealed below</span> - marked with a "BOT" badge
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1" style={{ backgroundColor: '#0b141a' }}>
          <WhatsAppChat
            groupName={config.topic}
            comments={comments}
            mode="reveal"
          />
        </div>
      </div>
    </WhatsAppLayout>
  );
};
