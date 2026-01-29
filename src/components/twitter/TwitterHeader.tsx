import { Search, Settings } from 'lucide-react';
import { HeaderScoreboard } from '../game/HeaderScoreboard';

interface TwitterHeaderProps {
  scoreboardProps?: {
    timeRemaining: number;
    lives: number;
    spottedBots: number;
    totalBots: number;
    isRunning: boolean;
    onTimeUp: () => void;
    onTick?: (time: number) => void;
  };
}

// Dimmed color for non-interactive elements
const dimmedColor = '#787878';

export const TwitterHeader = ({ scoreboardProps }: TwitterHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-tw-bg-primary/80 backdrop-blur-md border-b border-tw-border">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo - dimmed */}
        <div className="flex items-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" style={{ color: dimmedColor }}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        {/* Search - dimmed */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: dimmedColor }} />
            <input
              type="text"
              placeholder="Search"
              disabled
              className="w-full bg-tw-bg-secondary rounded-full py-2.5 pl-12 pr-4 text-sm placeholder:opacity-50 focus:outline-none cursor-not-allowed"
              style={{ color: dimmedColor }}
            />
          </div>
        </div>

        {/* Right section - Scoreboard or settings */}
        {scoreboardProps ? (
          <HeaderScoreboard
            timeRemaining={scoreboardProps.timeRemaining}
            lives={scoreboardProps.lives}
            spottedBots={scoreboardProps.spottedBots}
            totalBots={scoreboardProps.totalBots}
            currentLevel={2}
            isRunning={scoreboardProps.isRunning}
            onTimeUp={scoreboardProps.onTimeUp}
            onTick={scoreboardProps.onTick}
          />
        ) : (
          <button className="p-2 rounded-full cursor-not-allowed">
            <Settings className="w-5 h-5" style={{ color: dimmedColor }} />
          </button>
        )}
      </div>
    </header>
  );
};
