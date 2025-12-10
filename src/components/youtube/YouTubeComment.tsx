import { ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { Comment } from '@/types/game';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

// Generate a stable hash from string for consistent random numbers
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

interface YouTubeCommentProps {
  comment: Comment;
  mode: 'setup' | 'playing' | 'reveal';
  isToggled?: boolean;
  isGuessed?: boolean;
  isCorrect?: boolean;
  isRemoved?: boolean;
  onClick?: () => void;
  onToggle?: () => void;
}

export const YouTubeComment = ({
  comment,
  mode,
  isToggled = false,
  isGuessed = false,
  isCorrect = false,
  isRemoved = false,
  onClick,
  onToggle,
}: YouTubeCommentProps) => {
  // Generate stable like count based on comment id
  const likeCount = useMemo(() => {
    return (hashCode(comment.id) % 500) + 1;
  }, [comment.id]);

  if (isRemoved) {
    return null;
  }

  const handleClick = () => {
    if (mode === 'setup' && onToggle) {
      onToggle();
    } else if (mode === 'playing' && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3 py-3 px-2 rounded-lg cursor-pointer transition-all duration-300 group",
        mode === 'setup' && "hover:bg-yt-hover",
        mode === 'setup' && isToggled && "bg-yt-red/20 border border-yt-red/50",
        mode === 'playing' && "hover:bg-yt-hover",
        mode === 'playing' && isGuessed && !isCorrect && "bg-red-900/40 border border-red-500/50 animate-shake",
        mode === 'playing' && isGuessed && isCorrect && "opacity-0 scale-95 transition-all duration-500",
        mode === 'reveal' && comment.isBotted && "bg-yt-red/10 border border-yt-red/30",
        mode === 'reveal' && !comment.isBotted && "bg-green-900/10 border border-green-500/30"
      )}
      onClick={handleClick}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium",
          `bg-gradient-to-br`,
          comment.id.includes('0') ? 'from-red-500 to-pink-500' :
          comment.id.includes('1') ? 'from-blue-500 to-cyan-500' :
          comment.id.includes('2') ? 'from-green-500 to-emerald-500' :
          comment.id.includes('3') ? 'from-purple-500 to-violet-500' :
          comment.id.includes('4') ? 'from-orange-500 to-amber-500' :
          comment.id.includes('5') ? 'from-indigo-500 to-blue-500' :
          comment.id.includes('6') ? 'from-pink-500 to-rose-500' :
          comment.id.includes('7') ? 'from-teal-500 to-cyan-500' :
          'from-gray-500 to-slate-500'
        )}>
          {comment.username.slice(0, 1).toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-medium text-yt-text-primary">@{comment.username}</span>
          <span className="text-xs text-yt-text-secondary">{comment.timestamp}</span>
          
          {/* Setup mode badge */}
          {mode === 'setup' && isToggled && (
            <span className="text-[10px] px-2 py-0.5 bg-yt-red text-white rounded-full font-medium">
              🤖 BOT
            </span>
          )}
          
          {/* Reveal mode badge */}
          {mode === 'reveal' && (
            <span className={cn(
              "text-[10px] px-2 py-0.5 rounded-full font-medium",
              comment.isBotted ? "bg-yt-red text-white" : "bg-green-600 text-white"
            )}>
              {comment.isBotted ? '🤖 BOT' : '👤 HUMAN'}
            </span>
          )}
        </div>
        
        <p className="text-sm text-yt-text-primary leading-relaxed whitespace-pre-line">
          {comment.text}
        </p>
        
        {/* Actions */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-yt-hover rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
              <ThumbsUp className="w-4 h-4 text-yt-text-secondary" />
            </button>
            <span className="text-xs text-yt-text-secondary">{likeCount}</span>
          </div>
          <button className="p-1.5 hover:bg-yt-hover rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
            <ThumbsDown className="w-4 h-4 text-yt-text-secondary" />
          </button>
          <button className="text-xs font-medium text-yt-text-secondary hover:text-yt-text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
            Reply
          </button>
        </div>
      </div>

      {/* More options */}
      <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-yt-hover rounded-full transition-all self-start" onClick={(e) => e.stopPropagation()}>
        <MoreVertical className="w-5 h-5 text-yt-text-secondary" />
      </button>
    </div>
  );
};
