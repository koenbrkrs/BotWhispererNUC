import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, ChevronDown, Check, Bell } from 'lucide-react';
import { useState } from 'react';

interface VideoInfoProps {
  title: string;
  showSetup?: boolean;
  onSetupClick?: () => void;
}

export const VideoInfo = ({ title, showSetup, onSetupClick }: VideoInfoProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  return (
    <div className="mt-3 space-y-3">
      {/* Title */}
      <h1 className="text-lg md:text-xl font-semibold text-yt-text-primary leading-snug">
        {title || "Why Everyone Is Talking About This Topic - Full Discussion"}
      </h1>

      {/* Channel info and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Channel */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            D
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-medium text-yt-text-primary text-sm">DebateHub</span>
              <Check className="w-3.5 h-3.5 text-yt-text-secondary" />
            </div>
            <span className="text-xs text-yt-text-secondary">2.4M subscribers</span>
          </div>
          
          <button 
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
              isSubscribed 
                ? 'bg-yt-bg-secondary text-yt-text-primary hover:bg-yt-hover' 
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {isSubscribed && <Bell className="w-4 h-4" />}
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
            {isSubscribed && <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-yt-bg-secondary rounded-full">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 hover:bg-yt-hover rounded-l-full transition-colors border-r border-yt-border ${isLiked ? 'text-yt-blue' : ''}`}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">124K</span>
            </button>
            <button 
              onClick={handleDislike}
              className={`px-4 py-2 hover:bg-yt-hover rounded-r-full transition-colors ${isDisliked ? 'text-yt-blue' : ''}`}
            >
              <ThumbsDown className={`w-5 h-5 ${isDisliked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-yt-bg-secondary hover:bg-yt-hover rounded-full transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-yt-bg-secondary hover:bg-yt-hover rounded-full transition-colors">
            <Download className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Download</span>
          </button>

          {showSetup && (
            <button 
              onClick={onSetupClick}
              className="flex items-center gap-2 px-4 py-2 bg-yt-red hover:bg-red-700 text-white rounded-full transition-colors font-medium text-sm"
            >
              ⚙️ Setup Game
            </button>
          )}

          <button className="p-2 bg-yt-bg-secondary hover:bg-yt-hover rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Description */}
      <div 
        className="bg-yt-bg-secondary rounded-xl p-3 cursor-pointer hover:bg-yt-hover transition-colors"
        onClick={() => setShowDescription(!showDescription)}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-yt-text-primary">
          <span>1.2M views</span>
          <span>•</span>
          <span>3 days ago</span>
        </div>
        <p className={`text-sm text-yt-text-primary mt-1 ${showDescription ? '' : 'line-clamp-2'}`}>
          Today we're diving deep into one of the most debated topics of our time. Join us as we explore different perspectives, analyze arguments from both sides, and try to understand why this discussion matters so much to so many people.
        </p>
        {!showDescription && (
          <span className="text-sm font-medium text-yt-text-primary mt-1 inline-block">...more</span>
        )}
      </div>
    </div>
  );
};
