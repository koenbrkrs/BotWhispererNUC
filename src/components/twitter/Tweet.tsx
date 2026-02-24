import { useState, useEffect } from 'react';
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, BarChart2 } from 'lucide-react';
import { Comment } from '@/types/game';
import { useBinaryDissolve } from '@/hooks/useBinaryDissolve';

interface TweetProps {
  comment: Comment;
  mode: 'setup' | 'playing' | 'reveal';
  isToggled?: boolean;
  isGuessed?: boolean;
  isCorrect?: boolean;
  isRemoved?: boolean;
  onClick?: () => void;
  onToggle?: () => void;
}

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const Tweet = ({
  comment,
  mode,
  isToggled,
  isGuessed,
  isCorrect,
  isRemoved,
  onClick,
  onToggle,
}: TweetProps) => {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const { containerRef, triggerDissolve } = useBinaryDissolve('twitter');

  // Trigger dissolve animation when correctly guessed
  useEffect(() => {
    if (isGuessed && isCorrect) {
      triggerDissolve();
    }
  }, [isGuessed, isCorrect, triggerDissolve]);

  const hash = hashCode(comment.id);
  const likes = (hash % 5000) + 10;
  const retweets = (hash % 1500) + 5;
  const replies = (hash % 200) + 1;
  const views = ((hash % 50) + 5) * 1000;
  const avatarId = (hash % 70) + 1;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleClick = () => {
    if (mode === 'setup') {
      onToggle?.();
    } else if (mode === 'playing') {
      onClick?.();
    }
  };

  if (isRemoved) return null;

  return (
    <article
      ref={containerRef}
      onClick={handleClick}
      className={`px-4 py-3 border-b border-tw-border hover:bg-tw-bg-hover transition-all cursor-pointer min-h-[60px] ${mode === 'playing' && isGuessed
          ? isCorrect
            ? ''
            : 'bg-red-500/20 animate-shake'
          : ''
        } ${mode === 'setup' && isToggled ? 'bg-tw-blue/20 border-l-4 border-l-tw-blue' : ''
        } ${mode === 'reveal' && comment.isBotted ? 'bg-tw-blue/10 border-l-4 border-l-tw-blue' : ''
        }`}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <img
          src={`https://i.pravatar.cc/100?img=${avatarId}`}
          alt=""
          className="w-10 h-10 rounded-full flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-bold text-tw-text-primary truncate">{comment.username}</span>
              <span className="text-tw-text-secondary">@{comment.username.toLowerCase().replace(/\s/g, '')}</span>
              <span className="text-tw-text-secondary">·</span>
              <span className="text-tw-text-secondary">{comment.timestamp}</span>
              {mode === 'reveal' && comment.isBotted && (
                <span className="ml-2 px-2 py-0.5 bg-tw-blue text-white text-xs font-medium rounded-full">
                  BOT
                </span>
              )}
            </div>
            <button
              className="p-1.5 hover:bg-tw-blue/20 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-4 h-4 text-tw-text-secondary" />
            </button>
          </div>

          {/* Tweet text */}
          <p className="text-tw-text-primary mt-1 whitespace-pre-wrap">{comment.text}</p>

          {/* Actions */}
          <div className="flex items-center justify-between mt-3 max-w-md">
            <button
              className="flex items-center gap-2 group"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 rounded-full group-hover:bg-tw-blue/20 transition-colors">
                <MessageCircle className="w-4 h-4 text-tw-text-secondary group-hover:text-tw-blue" />
              </div>
              <span className="text-sm text-tw-text-secondary group-hover:text-tw-blue">{replies}</span>
            </button>

            <button
              className={`flex items-center gap-2 group ${retweeted ? 'text-green-500' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setRetweeted(!retweeted);
              }}
            >
              <div className="p-2 rounded-full group-hover:bg-green-500/20 transition-colors">
                <Repeat2 className={`w-4 h-4 ${retweeted ? 'text-green-500' : 'text-tw-text-secondary group-hover:text-green-500'}`} />
              </div>
              <span className={`text-sm ${retweeted ? 'text-green-500' : 'text-tw-text-secondary group-hover:text-green-500'}`}>
                {formatNumber(retweets + (retweeted ? 1 : 0))}
              </span>
            </button>

            <button
              className={`flex items-center gap-2 group ${liked ? 'text-pink-500' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
            >
              <div className="p-2 rounded-full group-hover:bg-pink-500/20 transition-colors">
                <Heart className={`w-4 h-4 ${liked ? 'fill-pink-500 text-pink-500' : 'text-tw-text-secondary group-hover:text-pink-500'}`} />
              </div>
              <span className={`text-sm ${liked ? 'text-pink-500' : 'text-tw-text-secondary group-hover:text-pink-500'}`}>
                {formatNumber(likes + (liked ? 1 : 0))}
              </span>
            </button>

            <button
              className="flex items-center gap-2 group"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 rounded-full group-hover:bg-tw-blue/20 transition-colors">
                <BarChart2 className="w-4 h-4 text-tw-text-secondary group-hover:text-tw-blue" />
              </div>
              <span className="text-sm text-tw-text-secondary group-hover:text-tw-blue">{formatNumber(views)}</span>
            </button>

            <button
              className="p-2 rounded-full hover:bg-tw-blue/20 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Share className="w-4 h-4 text-tw-text-secondary hover:text-tw-blue" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
