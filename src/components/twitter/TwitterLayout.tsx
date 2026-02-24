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
    <div className="min-h-screen bg-tw-bg-primary w-full">
      {/* Header with scoreboard */}
      <TwitterHeader scoreboardProps={scoreboardProps} />

      <div className="w-full mx-auto flex flex-col pt-14">
        {/* Hide sidebars for Portrait Kiosk to focus on Feed */}
        <div className="hidden">
          <TwitterSidebar />
        </div>

        {children}

        <div className="hidden">
          <TwitterRightSidebar />
        </div>
      </div>
    </div>
  );
};
