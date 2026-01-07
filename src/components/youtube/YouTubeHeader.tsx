import { Menu, Search, Mic, Video, Bell, User } from 'lucide-react';
import youtubeLogo from '@/assets/youtube-logo.png';

interface YouTubeHeaderProps {
  onMenuClick?: () => void;
}

export const YouTubeHeader = ({ onMenuClick }: YouTubeHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-yt-bg-primary flex items-center justify-between px-4 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-yt-hover rounded-full transition-colors"
        >
          <Menu className="w-6 h-6 text-yt-text-primary" />
        </button>
        <div className="flex items-center gap-1">
          <img src={youtubeLogo} alt="YouTube" className="h-5 w-auto" />
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-2xl mx-4 hidden sm:flex items-center">
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-10 px-4 bg-yt-bg-primary border border-yt-border rounded-l-full text-yt-text-primary placeholder:text-yt-text-secondary focus:outline-none focus:border-yt-blue"
          />
          <button className="h-10 px-6 bg-yt-bg-secondary border border-l-0 border-yt-border rounded-r-full hover:bg-yt-hover transition-colors">
            <Search className="w-5 h-5 text-yt-text-primary" />
          </button>
        </div>
        <button className="ml-3 p-2 bg-yt-bg-secondary hover:bg-yt-hover rounded-full transition-colors">
          <Mic className="w-5 h-5 text-yt-text-primary" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <button className="sm:hidden p-2 hover:bg-yt-hover rounded-full transition-colors">
          <Search className="w-6 h-6 text-yt-text-primary" />
        </button>
        <button className="hidden sm:flex p-2 hover:bg-yt-hover rounded-full transition-colors">
          <Video className="w-6 h-6 text-yt-text-primary" />
        </button>
        <button className="p-2 hover:bg-yt-hover rounded-full transition-colors relative">
          <Bell className="w-6 h-6 text-yt-text-primary" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-yt-red text-white text-[10px] font-medium rounded-full flex items-center justify-center">3</span>
        </button>
        <button className="ml-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
          A
        </button>
      </div>
    </header>
  );
};
