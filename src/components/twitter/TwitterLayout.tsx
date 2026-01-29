import { ReactNode } from 'react';
import { TwitterSidebar } from './TwitterSidebar';
import { TwitterRightSidebar } from './TwitterRightSidebar';
import { TwitterHeader } from './TwitterHeader';

interface TwitterLayoutProps {
  children: ReactNode;
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

export const TwitterLayout = ({ children, scoreboardProps }: TwitterLayoutProps) => {
  return (
    <div className="min-h-screen bg-tw-bg-primary">
      {/* Header with scoreboard */}
      <TwitterHeader scoreboardProps={scoreboardProps} />
      
      <div className="max-w-[1400px] mx-auto flex pt-14">
        <TwitterSidebar />
        {children}
        <TwitterRightSidebar />
      </div>
    </div>
  );
};
