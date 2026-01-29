import { Menu, Search, Mic, Video, Bell } from 'lucide-react';
import youtubeLogo from '@/assets/youtube-logo.png';
import { HeaderScoreboard } from '../game/HeaderScoreboard';
import { ReactNode } from 'react';

interface YouTubeHeaderProps {
  onMenuClick?: () => void;
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

export const YouTubeHeader = ({ onMenuClick, scoreboardProps }: YouTubeHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-yt-bg-primary flex items-center justify-between px-4 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-yt-hover rounded-full transition-colors"
        >
          <Menu className="w-6 h-6" style={{ color: dimmedColor }} />
        </button>
        <div className="flex items-center gap-1 opacity-50">
          <img src={youtubeLogo} alt="YouTube" className="h-5 w-auto grayscale" />
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-2xl mx-4 hidden sm:flex items-center">
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Search"
            disabled
            className="flex-1 h-10 px-4 bg-yt-bg-primary border border-yt-border rounded-l-full placeholder:text-[#787878] focus:outline-none cursor-not-allowed"
            style={{ color: dimmedColor }}
          />
          <button className="h-10 px-6 bg-yt-bg-secondary border border-l-0 border-yt-border rounded-r-full cursor-not-allowed">
            <Search className="w-5 h-5" style={{ color: dimmedColor }} />
          </button>
        </div>
        <button className="ml-3 p-2 bg-yt-bg-secondary rounded-full cursor-not-allowed">
          <Mic className="w-5 h-5" style={{ color: dimmedColor }} />
        </button>
      </div>

      {/* Right section - Scoreboard or default icons */}
      <div className="flex items-center gap-2">
        {scoreboardProps ? (
          <HeaderScoreboard
            timeRemaining={scoreboardProps.timeRemaining}
            lives={scoreboardProps.lives}
            spottedBots={scoreboardProps.spottedBots}
            totalBots={scoreboardProps.totalBots}
            currentLevel={1}
            isRunning={scoreboardProps.isRunning}
            onTimeUp={scoreboardProps.onTimeUp}
            onTick={scoreboardProps.onTick}
          />
        ) : (
          <>
            <button className="sm:hidden p-2 rounded-full cursor-not-allowed">
              <Search className="w-6 h-6" style={{ color: dimmedColor }} />
            </button>
            <button className="hidden sm:flex p-2 rounded-full cursor-not-allowed">
              <Video className="w-6 h-6" style={{ color: dimmedColor }} />
            </button>
            <button className="p-2 rounded-full relative cursor-not-allowed">
              <Bell className="w-6 h-6" style={{ color: dimmedColor }} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#787878] text-white text-[10px] font-medium rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="ml-2 w-8 h-8 rounded-full bg-[#787878] flex items-center justify-center text-white text-sm font-medium cursor-not-allowed">
              A
            </button>
          </>
        )}
      </div>
    </header>
  );
};
