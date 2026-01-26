import { Search, Sparkles, Settings } from 'lucide-react';

// Dimmed color for non-interactive elements
const dimmedColor = '#787878';

export const TwitterHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-tw-bg-primary/80 backdrop-blur-md border-b border-tw-border">
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

        {/* Settings - dimmed */}
        <button className="p-2 rounded-full cursor-not-allowed">
          <Settings className="w-5 h-5" style={{ color: dimmedColor }} />
        </button>
      </div>
    </header>
  );
};
