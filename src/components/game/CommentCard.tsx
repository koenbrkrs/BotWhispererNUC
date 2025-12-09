import { Comment } from '@/types/game';
import { Bot, User, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentCardProps {
  comment: Comment;
  mode: 'setup' | 'playing' | 'reveal';
  isToggled?: boolean;
  isGuessed?: boolean;
  isCorrect?: boolean;
  isRemoved?: boolean;
  onClick?: () => void;
  onToggle?: () => void;
}

export const CommentCard = ({
  comment,
  mode,
  isToggled = false,
  isGuessed = false,
  isCorrect = false,
  isRemoved = false,
  onClick,
  onToggle,
}: CommentCardProps) => {
  if (isRemoved) {
    return null;
  }

  const cardClasses = cn(
    'comment-card cursor-pointer',
    mode === 'setup' && isToggled && 'botted',
    mode === 'playing' && isGuessed && !isCorrect && 'incorrect',
    mode === 'playing' && isGuessed && isCorrect && 'correct',
    mode === 'reveal' && comment.isBotted && 'ring-2 ring-primary/50',
  );

  const handleClick = () => {
    if (mode === 'setup' && onToggle) {
      onToggle();
    } else if (mode === 'playing' && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-muted-foreground text-sm font-medium">
            {comment.username.slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-foreground">{comment.username}</span>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {comment.timestamp}
            </span>
            
            {/* Setup mode: show toggle indicator */}
            {mode === 'setup' && isToggled && (
              <span className="badge-bot">
                <Bot className="w-3 h-3" />
                Marked as Bot
              </span>
            )}
            
            {/* Reveal mode: show actual labels */}
            {mode === 'reveal' && (
              comment.isBotted ? (
                <span className="badge-bot">
                  <Bot className="w-3 h-3" />
                  Bot
                </span>
              ) : (
                <span className="badge-human">
                  <User className="w-3 h-3" />
                  Human
                </span>
              )
            )}
          </div>
          
          <p className="text-foreground/90 whitespace-pre-line leading-relaxed">
            {comment.text}
          </p>
        </div>
      </div>

      {/* Setup mode hint */}
      {mode === 'setup' && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-muted-foreground">Click to toggle</span>
        </div>
      )}
    </div>
  );
};
