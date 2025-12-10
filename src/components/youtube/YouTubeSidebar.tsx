import { Home, Compass, PlaySquare, Clock, ThumbsUp, Flame, Music2, Gamepad2, Newspaper, Trophy, Lightbulb, Shirt, History, Film, Radio, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubeSidebarProps {
  isOpen: boolean;
}

const mainItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Compass, label: 'Explore' },
  { icon: PlaySquare, label: 'Subscriptions' },
];

const libraryItems = [
  { icon: History, label: 'History' },
  { icon: PlaySquare, label: 'Your videos' },
  { icon: Clock, label: 'Watch later' },
  { icon: ThumbsUp, label: 'Liked videos' },
];

const exploreItems = [
  { icon: Flame, label: 'Trending' },
  { icon: Music2, label: 'Music' },
  { icon: Film, label: 'Films' },
  { icon: Radio, label: 'Live' },
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Newspaper, label: 'News' },
  { icon: Trophy, label: 'Sport' },
  { icon: Lightbulb, label: 'Learning' },
  { icon: Shirt, label: 'Fashion & beauty' },
];

export const YouTubeSidebar = ({ isOpen }: YouTubeSidebarProps) => {
  if (!isOpen) {
    return (
      <aside className="fixed left-0 top-14 w-[72px] h-[calc(100vh-56px)] bg-yt-bg-primary hidden lg:flex flex-col py-1 overflow-y-auto z-40">
        {mainItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex flex-col items-center justify-center py-4 px-1 hover:bg-yt-hover rounded-xl mx-1 transition-colors",
              item.active && "bg-yt-hover"
            )}
          >
            <item.icon className="w-6 h-6 text-yt-text-primary" />
            <span className="text-[10px] text-yt-text-primary mt-1.5">{item.label}</span>
          </button>
        ))}
      </aside>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
      
      <aside className="fixed left-0 top-14 w-60 h-[calc(100vh-56px)] bg-yt-bg-primary flex flex-col overflow-y-auto z-50 scrollbar-thin">
        {/* Main */}
        <div className="py-3 border-b border-yt-border">
          {mainItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex items-center gap-6 w-full px-6 py-2.5 hover:bg-yt-hover transition-colors",
                item.active && "bg-yt-hover"
              )}
            >
              <item.icon className={cn("w-6 h-6", item.active ? "text-yt-text-primary" : "text-yt-text-primary")} />
              <span className={cn("text-sm", item.active ? "font-medium text-yt-text-primary" : "text-yt-text-primary")}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Library */}
        <div className="py-3 border-b border-yt-border">
          <button className="flex items-center gap-6 w-full px-6 py-2.5 hover:bg-yt-hover transition-colors">
            <span className="text-base font-medium text-yt-text-primary">You</span>
            <ChevronDown className="w-4 h-4 text-yt-text-primary -rotate-90" />
          </button>
          {libraryItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-6 w-full px-6 py-2.5 hover:bg-yt-hover transition-colors"
            >
              <item.icon className="w-6 h-6 text-yt-text-primary" />
              <span className="text-sm text-yt-text-primary">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Explore */}
        <div className="py-3">
          <h3 className="px-6 py-1 text-base font-medium text-yt-text-primary">Explore</h3>
          {exploreItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-6 w-full px-6 py-2.5 hover:bg-yt-hover transition-colors"
            >
              <item.icon className="w-6 h-6 text-yt-text-primary" />
              <span className="text-sm text-yt-text-primary">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 text-xs text-yt-text-secondary">
          <p>About Press Copyright</p>
          <p>Contact us Creators</p>
          <p>Advertise Developers</p>
          <p className="mt-4">Terms Privacy Policy & Safety</p>
          <p>How YouTube works</p>
          <p>Test new features</p>
          <p className="mt-4">© 2025 Google LLC</p>
        </div>
      </aside>
    </>
  );
};
