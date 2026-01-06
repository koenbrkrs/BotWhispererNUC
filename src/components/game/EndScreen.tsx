import { GameResults } from '@/types/game';

interface EndScreenProps {
  won: boolean;
  youtubeResults: GameResults;
  twitterResults: GameResults;
  whatsappResults: GameResults;
  onRestart: () => void;
}

const FAKE_LEADERBOARD = [
  { rank: '1st', name: 'HDN', score: 123091093 },
  { rank: '2nd', name: 'HAS', score: 123091093 },
  { rank: '3rd', name: 'SDA', score: 123091093 },
  { rank: '4th', name: 'ADS', score: 123091093 },
  { rank: '5th', name: 'DHF', score: 123091093 },
  { rank: '6th', name: 'NVK', score: 123091093 },
  { rank: '7th', name: 'KUT', score: 123091093 },
  { rank: '8th', name: 'BLA', score: 123091093 },
  { rank: '9th', name: 'PUS', score: 123091093 },
];

export const EndScreen = ({ won, youtubeResults, twitterResults, whatsappResults, onRestart }: EndScreenProps) => {
  const totalBots = youtubeResults.totalBotted + twitterResults.totalBotted + whatsappResults.totalBotted;
  const totalDetected = youtubeResults.correctGuesses + twitterResults.correctGuesses + whatsappResults.correctGuesses;
  const totalWrong = youtubeResults.incorrectGuesses + twitterResults.incorrectGuesses + whatsappResults.incorrectGuesses;
  const totalHumans = (youtubeResults.totalBotted + twitterResults.totalBotted + whatsappResults.totalBotted) * 1.5; // Approximate humans

  // Random position for player (4th-9th if won, lower if lost)
  const playerRank = won ? Math.floor(Math.random() * 6) + 4 : Math.floor(Math.random() * 3) + 7;
  const playerScore = Math.floor(Math.random() * 100000000) + 10000000;

  const colorClass = won ? 'text-retro-green' : 'text-retro-red';
  const buttonBgClass = won ? 'bg-retro-green hover:bg-retro-green/80' : 'bg-retro-red hover:bg-retro-red/80';

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
          {FAKE_LEADERBOARD.map((entry, i) => {
            const isPlayer = i + 1 === playerRank;
            return (
              <div 
                key={i} 
                className={`grid grid-cols-3 gap-4 text-lg ${isPlayer ? colorClass : 'text-white/90'}`}
              >
                <span>{isPlayer ? `>> ${entry.rank}` : `   ${entry.rank}`}</span>
                <span>{isPlayer ? 'YOU' : entry.name}</span>
                <span>{isPlayer ? playerScore.toLocaleString() : entry.score.toLocaleString()}</span>
              </div>
            );
          })}
        </div>

        {/* Results */}
        <div className="flex-1 space-y-6">
          <h1 className={`text-4xl md:text-5xl ${colorClass}`}>
            {won ? 'HUMANITY WON...' : 'HUMANITY LOST...'}
          </h1>

          <div className="space-y-2 text-white/80 text-lg">
            <p>You detected [{totalDetected}] out of [{totalBots}] bots</p>
            <p>You thought [{totalWrong}] of [{Math.round(totalHumans)}] humans were bots.</p>
          </div>

          <button
            onClick={onRestart}
            className={`px-8 py-3 ${buttonBgClass} text-black text-lg transition-colors border-2 border-black/20`}
          >
            RESTART
          </button>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-12">
        <button className="px-8 py-3 bg-retro-button text-retro-button-text text-lg hover:bg-retro-button-hover transition-colors border-2 border-retro-button-text/20">
          Print receipt Bots catched
        </button>
        <button className="px-8 py-3 bg-retro-button text-retro-button-text text-lg hover:bg-retro-button-hover transition-colors border-2 border-retro-button-text/20">
          Print receipt Bots input
        </button>
      </div>
    </div>
  );
};
