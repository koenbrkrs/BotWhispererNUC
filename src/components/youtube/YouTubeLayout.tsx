import { useState, ReactNode } from 'react';
import { YouTubeHeader } from './YouTubeHeader';
import { YouTubeSidebar } from './YouTubeSidebar';

interface YouTubeLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
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

export const YouTubeLayout = ({ children, showSidebar = true, scoreboardProps }: YouTubeLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-yt-bg-primary font-roboto">
      <YouTubeHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} scoreboardProps={scoreboardProps} />
      
      {showSidebar && <YouTubeSidebar isOpen={sidebarOpen} />}
      
      {/* Click outside to close sidebar on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      <main className={`pt-14 transition-all duration-200 ${showSidebar ? 'lg:pl-[72px]' : ''}`}>
        {children}
      </main>
    </div>
  );
};
