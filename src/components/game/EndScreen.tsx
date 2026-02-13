import { useEffect, useState } from 'react';
import { GameResults, BotConfig, ScoreEntry } from '@/types/game';
import { generatePlayerCode, calculateScore, saveScore, getScores } from '@/utils/scoreManager';
import { printBotsDetected, printBotSetup } from '@/utils/receiptPrinter';

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

    // Log game result to Zapier only if user consented
    if (consent) {
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-game-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        topic: botConfig.topic,
        stance: botConfig.stance,
        friendlyAggressive: botConfig.friendlyAggressive,
        logicalIllogical: botConfig.logicalIllogical,
        humorSerious: botConfig.humorSerious,
        sarcasmDirect: botConfig.sarcasmDirect,
        openClosed: botConfig.openClosed,
        minimalVerbose: botConfig.minimalVerbose,
        emojiAmount: botConfig.emojiAmount,
        botsFound: totalDetected,
        humansMisidentified: totalWrong,
        totalBots: totalBots,
        won,
        score,
        timeUsed: totalTimeUsed,
      }),
    }).catch(err => console.error('Failed to log game result:', err));
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
