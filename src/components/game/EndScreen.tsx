import { useEffect, useState } from 'react';
import { GameResults, BotConfig, ScoreEntry } from '@/types/game';
import { generatePlayerCode, calculateScore, saveScore, getScores } from '@/utils/scoreManager';
import { printBotsDetected, printBotSetup } from '@/utils/receiptPrinter';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EndScreenProps {
  won: boolean;
  youtubeResults: GameResults;
  twitterResults: GameResults;
  whatsappResults: GameResults;
  botConfig: BotConfig;
  totalTimeUsed: number;
  consent: boolean;
  onRestart: () => void;
}

// Updated colors
const winColor = '#00FF41';
const loseColor = '#EA4237';

export const EndScreen = ({ 
  won, 
  youtubeResults, 
  twitterResults, 
  whatsappResults, 
  botConfig,
  totalTimeUsed,
  consent,
  onRestart 
}: EndScreenProps) => {
  const [playerCode, setPlayerCode] = useState('');
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [playerRank, setPlayerRank] = useState(1);
  const [highscore, setHighscore] = useState(0);

  const totalBots = youtubeResults.totalBotted + twitterResults.totalBotted + whatsappResults.totalBotted;
  const totalDetected = youtubeResults.correctGuesses + twitterResults.correctGuesses + whatsappResults.correctGuesses;
  const totalWrong = youtubeResults.incorrectGuesses + twitterResults.incorrectGuesses + whatsappResults.incorrectGuesses;
  const totalHumans = (youtubeResults.totalBotted + twitterResults.totalBotted + whatsappResults.totalBotted); // Same as bots for 50/50

  useEffect(() => {
    // Generate unique player code
    const code = generatePlayerCode();
    setPlayerCode(code);
    
    // Calculate score
    const score = calculateScore(totalDetected, totalWrong, totalTimeUsed);
    setHighscore(score);
    
    // Save score and get updated leaderboard
    const entry: ScoreEntry = { code, score, time: totalTimeUsed };
    const updatedScores = saveScore(entry);
    setScores(updatedScores);
    
    // Find player rank
    const rank = updatedScores.findIndex(s => s.code === code) + 1;
    setPlayerRank(rank);

    // Save game session to database if user consented
    if (consent) {
      const sessionData = {
        topic: botConfig.topic,
        stance: botConfig.stance,
        friendly: 100 - botConfig.friendlyAggressive,
        aggressive: botConfig.friendlyAggressive,
        logical: 100 - botConfig.logicalIllogical,
        illogical: botConfig.logicalIllogical,
        humor: 100 - botConfig.humorSerious,
        serious: botConfig.humorSerious,
        sarcasm: 100 - botConfig.sarcasmDirect,
        direct: botConfig.sarcasmDirect,
        open_minded: 100 - botConfig.openClosed,
        closed_minded: botConfig.openClosed,
        minimal: 100 - botConfig.minimalVerbose,
        verbose_level: botConfig.minimalVerbose,
        emoji_amount: botConfig.emojiAmount,
        bots_found: totalDetected,
        humans_misidentified: totalWrong,
        total_bots: totalBots,
        won,
        score,
        time_used: totalTimeUsed,
        player_code: code,
        consent_given: true,
      };

      supabase.from('game_sessions').insert(sessionData)
        .then(({ error }) => {
          if (error) {
            console.error('Failed to save session:', error);
          } else {
            toast.success('Session saved to cloud');
          }
        });
    }
  }, [totalDetected, totalWrong, totalTimeUsed, consent]);

  const currentColor = won ? winColor : loseColor;

  const handlePrintBotsDetected = () => {
    printBotsDetected(playerCode, totalDetected, totalBots, totalWrong, totalHumans, highscore);
  };

  const handlePrintBotSetup = () => {
    printBotSetup(playerCode, totalDetected, totalBots, totalWrong, totalHumans, highscore, botConfig);
  };

  // Get top 10 scores for display
  const displayScores = scores.slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center p-8 font-retro">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-12 items-start">
        {/* Leaderboard */}
        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-3 gap-4 text-white/70 text-lg mb-4">
            <span>RANK</span>
            <span>NAME</span>
            <span>SCORE</span>
          </div>
          {displayScores.length > 0 ? (
            displayScores.map((entry, i) => {
              const isPlayer = entry.code === playerCode;
              const rankLabels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
              return (
                <div 
                  key={entry.code + i} 
                  className="grid grid-cols-3 gap-4 text-lg"
                  style={{ color: isPlayer ? currentColor : 'rgba(255,255,255,0.9)' }}
                >
                  <span>{isPlayer ? `>> ${rankLabels[i]}` : `   ${rankLabels[i]}`}</span>
                  <span>{isPlayer ? 'YOU' : entry.code}</span>
                  <span>{entry.score.toLocaleString()}</span>
                </div>
              );
            })
          ) : (
            <div 
              className="grid grid-cols-3 gap-4 text-lg"
              style={{ color: currentColor }}
            >
              <span>{`>> 1st`}</span>
              <span>YOU</span>
              <span>{highscore.toLocaleString()}</span>
            </div>
          )}
          {playerRank > 10 && (
            <div 
              className="grid grid-cols-3 gap-4 text-lg mt-4 pt-4 border-t border-white/20"
              style={{ color: currentColor }}
            >
              <span>{`>> ${playerRank}th`}</span>
              <span>YOU</span>
              <span>{highscore.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 space-y-6">
          <h1 
            className="text-4xl md:text-5xl"
            style={{ color: currentColor }}
          >
            {won ? 'HUMANITY WON..' : 'HUMANITY LOST..'}
          </h1>

          <div className="space-y-2 text-white/80 text-lg">
            <p>You detected [{totalDetected}] out of [{totalBots}] bots</p>
            <p>You thought [{totalWrong}] of [{totalHumans}] humans were bots.</p>
            <p className="mt-4">Your ID: <span style={{ color: currentColor }}>{playerCode}</span></p>
          </div>

          <button
            onClick={onRestart}
            className="px-8 py-3 text-black text-lg transition-colors border-2 border-black/20"
            style={{ backgroundColor: currentColor }}
          >
            RESTART
          </button>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-12">
        <button 
          onClick={handlePrintBotsDetected}
          className="px-8 py-3 bg-retro-button text-retro-button-text text-lg hover:bg-retro-button-hover transition-colors border-2 border-retro-button-text/20"
        >
          Print receipt Bots caught
        </button>
        <button 
          onClick={handlePrintBotSetup}
          className="px-8 py-3 bg-retro-button text-retro-button-text text-lg hover:bg-retro-button-hover transition-colors border-2 border-retro-button-text/20"
        >
          Print receipt Bots input
        </button>
      </div>
    </div>
  );
};
