import { GameConfig, GameResults } from '@/types/game';
import { Button } from '../ui/button';
import { RotateCcw, Trophy, Target, XCircle, Youtube, Twitter, MessageCircle } from 'lucide-react';

interface FinalResultsProps {
  config: GameConfig;
  youtubeResults: GameResults;
  twitterResults: GameResults;
  whatsappResults: GameResults;
  onPlayAgain: () => void;
}

export const FinalResults = ({ 
  config, 
  youtubeResults, 
  twitterResults,
  whatsappResults,
  onPlayAgain 
}: FinalResultsProps) => {
  const totalCorrect = youtubeResults.correctGuesses + twitterResults.correctGuesses + whatsappResults.correctGuesses;
  const totalBots = youtubeResults.totalBotted + twitterResults.totalBotted + whatsappResults.totalBotted;
  const totalWrong = youtubeResults.incorrectGuesses + twitterResults.incorrectGuesses + whatsappResults.incorrectGuesses;
  const totalAccuracy = totalBots > 0 ? Math.round((totalCorrect / totalBots) * 100) : 0;

  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return { grade: 'S', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    if (accuracy >= 70) return { grade: 'A', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (accuracy >= 50) return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-400/20' };
    if (accuracy >= 30) return { grade: 'C', color: 'text-orange-400', bg: 'bg-orange-400/20' };
    return { grade: 'D', color: 'text-red-400', bg: 'bg-red-400/20' };
  };

  const ytAccuracy = youtubeResults.totalBotted > 0 
    ? Math.round((youtubeResults.correctGuesses / youtubeResults.totalBotted) * 100) 
    : 0;
  const twAccuracy = twitterResults.totalBotted > 0 
    ? Math.round((twitterResults.correctGuesses / twitterResults.totalBotted) * 100) 
    : 0;
  const waAccuracy = whatsappResults.totalBotted > 0 
    ? Math.round((whatsappResults.correctGuesses / whatsappResults.totalBotted) * 100) 
    : 0;

  const totalGrade = getGrade(totalAccuracy);
  const ytGrade = getGrade(ytAccuracy);
  const twGrade = getGrade(twAccuracy);
  const waGrade = getGrade(waAccuracy);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 overflow-auto">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Game Complete!</h1>
          <p className="text-gray-400">Topic: {config.topic}</p>
        </div>

        {/* Overall Score */}
        <div className={`${totalGrade.bg} rounded-3xl p-8 mb-6 border border-white/10`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-lg">Overall Score</p>
              <div className={`text-8xl font-bold ${totalGrade.color}`}>{totalGrade.grade}</div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-white">{totalAccuracy}%</div>
              <p className="text-white/60">Accuracy</p>
              <p className="text-2xl text-white mt-2">{totalCorrect}/{totalBots} bots found</p>
            </div>
          </div>
        </div>

        {/* Level Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* YouTube */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Youtube className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm">Level 1</h3>
                <p className="text-xs text-gray-400">{ytAccuracy}%</p>
              </div>
              <div className={`text-2xl font-bold ${ytGrade.color}`}>{ytGrade.grade}</div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Bots Found</span>
                <span className="text-green-400">{youtubeResults.correctGuesses}/{youtubeResults.totalBotted}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Wrong</span>
                <span className="text-red-400">{youtubeResults.incorrectGuesses}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Time</span>
                <span>{youtubeResults.timeRemaining}s</span>
              </div>
            </div>
          </div>

          {/* Twitter */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Twitter className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm">Level 2</h3>
                <p className="text-xs text-gray-400">{twAccuracy}%</p>
              </div>
              <div className={`text-2xl font-bold ${twGrade.color}`}>{twGrade.grade}</div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Bots Found</span>
                <span className="text-green-400">{twitterResults.correctGuesses}/{twitterResults.totalBotted}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Wrong</span>
                <span className="text-red-400">{twitterResults.incorrectGuesses}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Time</span>
                <span>{twitterResults.timeRemaining}s</span>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#25D366]/20 rounded-lg">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm">Level 3</h3>
                <p className="text-xs text-gray-400">{waAccuracy}%</p>
              </div>
              <div className={`text-2xl font-bold ${waGrade.color}`}>{waGrade.grade}</div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Bots Found</span>
                <span className="text-green-400">{whatsappResults.correctGuesses}/{whatsappResults.totalBotted}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Wrong</span>
                <span className="text-red-400">{whatsappResults.incorrectGuesses}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Time</span>
                <span>{whatsappResults.timeRemaining}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/20">
            <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{totalCorrect}</p>
            <p className="text-xs text-gray-400">Total Bots Found</p>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4 text-center border border-red-500/20">
            <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{totalWrong}</p>
            <p className="text-xs text-gray-400">Wrong Guesses</p>
          </div>
          <div className="bg-purple-500/10 rounded-xl p-4 text-center border border-purple-500/20">
            <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{totalBots - totalCorrect}</p>
            <p className="text-xs text-gray-400">Missed Bots</p>
          </div>
        </div>

        {/* Play Again Button */}
        <Button 
          onClick={onPlayAgain} 
          className="w-full py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
      </div>
    </div>
  );
};
