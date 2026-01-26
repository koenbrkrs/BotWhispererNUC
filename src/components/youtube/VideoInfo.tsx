import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, ChevronDown, Check, Bell } from 'lucide-react';
import { useState } from 'react';

// Dimmed color for non-interactive elements
const dimmedColor = '#787878';

interface VideoInfoProps {
  title: string;
  showSetup?: boolean;
  onSetupClick?: () => void;
}

export const VideoInfo = ({ title, showSetup, onSetupClick }: VideoInfoProps) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="mt-3 space-y-3">
      {/* Title - NOT dimmed, this is important */}
      <h1 className="text-lg md:text-xl font-semibold text-yt-text-primary leading-snug">
        {title || "Why Everyone Is Talking About This Topic - Full Discussion"}
      </h1>

      {/* Channel info and actions - all dimmed */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Channel */}
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: dimmedColor }}
          >
            D
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm" style={{ color: dimmedColor }}>DebateHub</span>
              <Check className="w-3.5 h-3.5" style={{ color: dimmedColor }} />
            </div>
            <span className="text-xs" style={{ color: dimmedColor }}>2.4M subscribers</span>
          </div>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm cursor-not-allowed"
            style={{ backgroundColor: dimmedColor, color: '#1a1a1a' }}
          >
            Subscribe
          </button>
        </div>

        {/* Actions - all dimmed */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-yt-bg-secondary rounded-full">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-l-full border-r border-yt-border cursor-not-allowed"
            >
              <ThumbsUp className="w-5 h-5" style={{ color: dimmedColor }} />
              <span className="text-sm font-medium" style={{ color: dimmedColor }}>124K</span>
            </button>
            <button 
              className="px-4 py-2 rounded-r-full cursor-not-allowed"
            >
              <ThumbsDown className="w-5 h-5" style={{ color: dimmedColor }} />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-yt-bg-secondary rounded-full cursor-not-allowed">
            <Share2 className="w-5 h-5" style={{ color: dimmedColor }} />
            <span className="text-sm font-medium" style={{ color: dimmedColor }}>Share</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-yt-bg-secondary rounded-full cursor-not-allowed">
            <Download className="w-5 h-5" style={{ color: dimmedColor }} />
            <span className="text-sm font-medium hidden sm:inline" style={{ color: dimmedColor }}>Download</span>
          </button>

          {showSetup && (
            <button 
              onClick={onSetupClick}
              className="flex items-center gap-2 px-4 py-2 bg-[#EA4237] hover:bg-[#c9362d] text-white rounded-full transition-colors font-medium text-sm"
            >
              ⚙️ Setup Game
            </button>
          )}

          <button className="p-2 bg-yt-bg-secondary rounded-full cursor-not-allowed">
            <MoreHorizontal className="w-5 h-5" style={{ color: dimmedColor }} />
          </button>
        </div>
      </div>

      {/* Description - dimmed */}
      <div 
        className="bg-yt-bg-secondary rounded-xl p-3 cursor-not-allowed"
      >
        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: dimmedColor }}>
          <span>1.2M views</span>
          <span>•</span>
          <span>3 days ago</span>
        </div>
        <p className={`text-sm mt-1 ${showDescription ? '' : 'line-clamp-2'}`} style={{ color: dimmedColor }}>
          Today we're diving deep into one of the most debated topics of our time. Join us as we explore different perspectives, analyze arguments from both sides, and try to understand why this discussion matters so much to so many people.
        </p>
        {!showDescription && (
          <span className="text-sm font-medium mt-1 inline-block" style={{ color: dimmedColor }}>...more</span>
        )}
      </div>
    </div>
  );
};
