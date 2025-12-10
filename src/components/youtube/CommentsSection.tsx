import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Comment } from '@/types/game';
import { YouTubeComment } from './YouTubeComment';

interface CommentsSectionProps {
  comments: Comment[];
  mode: 'setup' | 'playing' | 'reveal';
  guesses?: Record<string, { guessed: boolean; correct: boolean }>;
  removedIds?: Set<string>;
  onCommentClick?: (comment: Comment) => void;
  onCommentToggle?: (id: string) => void;
  bottedCount?: number;
  correctGuesses?: number;
  incorrectGuesses?: number;
}

export const CommentsSection = ({
  comments,
  mode,
  guesses = {},
  removedIds = new Set(),
  onCommentClick,
  onCommentToggle,
  bottedCount = 0,
  correctGuesses = 0,
  incorrectGuesses = 0,
}: CommentsSectionProps) => {
  const [sortBy, setSortBy] = useState('top');
  const visibleComments = comments.filter(c => !removedIds.has(c.id));
  const totalComments = comments.length;

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <h2 className="text-base font-semibold text-yt-text-primary">
            {totalComments} Comments
          </h2>
          <button className="flex items-center gap-2 text-sm text-yt-text-primary hover:text-yt-text-secondary transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Sort by</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        {/* Game stats for playing mode */}
        {mode === 'playing' && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-500 font-medium">✓ {correctGuesses} Found</span>
            <span className="text-red-500 font-medium">✗ {incorrectGuesses} Wrong</span>
            <span className="text-yt-text-secondary">{bottedCount - correctGuesses} remaining</span>
          </div>
        )}

        {/* Setup mode stats */}
        {mode === 'setup' && (
          <div className="text-sm text-yt-text-secondary">
            <span className="text-yt-red font-medium">{bottedCount}</span> marked as bots
          </div>
        )}
      </div>

      {/* Add comment input */}
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
          A
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-yt-border text-yt-text-primary text-sm py-1 focus:outline-none focus:border-yt-text-primary transition-colors placeholder:text-yt-text-secondary"
            disabled
          />
        </div>
      </div>

      {/* Instructions based on mode */}
      {mode === 'setup' && (
        <div className="mb-4 p-3 bg-yt-bg-secondary rounded-lg border border-yt-border">
          <p className="text-sm text-yt-text-secondary">
            👆 <span className="text-yt-text-primary font-medium">Click comments to mark them as "bots"</span> for Player 2 to find.
          </p>
        </div>
      )}

      {mode === 'playing' && (
        <div className="mb-4 p-3 bg-yt-red/20 rounded-lg border border-yt-red/30">
          <p className="text-sm text-yt-text-primary">
            🎯 <span className="font-medium">Find the bot comments!</span> Click on comments you think are bot-generated.
          </p>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-1">
        {visibleComments.map((comment) => (
          <YouTubeComment
            key={comment.id}
            comment={comment}
            mode={mode}
            isToggled={comment.isBotted}
            isGuessed={!!guesses[comment.id]}
            isCorrect={guesses[comment.id]?.correct}
            isRemoved={removedIds.has(comment.id)}
            onClick={() => onCommentClick?.(comment)}
            onToggle={() => onCommentToggle?.(comment.id)}
          />
        ))}
      </div>

      {visibleComments.length === 0 && mode === 'playing' && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-yt-text-primary">All bots found!</h3>
          <p className="text-yt-text-secondary">Calculating results...</p>
        </div>
      )}
    </div>
  );
};
