import { useEffect } from 'react';
import { Comment, PlayerGuess } from '@/types/game';
import { Check, CheckCheck, Bot } from 'lucide-react';
import { useBinaryDissolve } from '@/hooks/useBinaryDissolve';

interface WhatsAppMessageProps {
  comment: Comment;
  mode: 'playing' | 'reveal';
  guess?: PlayerGuess;
  onClick?: () => void;
  avatarUrl: string;
  nameColor: string;
}

export const WhatsAppMessage = ({
  comment,
  mode,
  guess,
  onClick,
  avatarUrl,
  nameColor,
}: WhatsAppMessageProps) => {
  const { containerRef, triggerDissolve } = useBinaryDissolve('whatsapp');
  const isRevealed = mode === 'reveal';
  const isBot = comment.isBotted;
  const wasGuessed = guess?.guessed;
  const wasCorrect = guess?.correct;

  // Trigger dissolve animation when correctly guessed
  useEffect(() => {
    if (wasGuessed && wasCorrect) {
      triggerDissolve();
    }
  }, [wasGuessed, wasCorrect, triggerDissolve]);

  // Determine bubble style based on game state
  let bubbleClass = 'bg-wa-bubble-incoming';
  let showBotBadge = false;

  if (mode === 'playing') {
    if (wasGuessed) {
      bubbleClass = wasCorrect
        ? 'bg-wa-bubble-incoming'
        : 'bg-red-900/40 border border-red-500/50 animate-shake';
    }
  } else if (isRevealed && isBot) {
    bubbleClass = 'bg-wa-green/20 border border-wa-green/50';
    showBotBadge = true;
  }

  return (
    <div
      ref={containerRef}
      className={`flex gap-2 group max-w-[85%] min-h-[60px] items-start ${mode === 'playing' && !wasGuessed ? 'cursor-pointer' : ''}`}
      onClick={mode === 'playing' && !wasGuessed ? onClick : undefined}
    >
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={comment.username}
        className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
      />

      {/* Message Bubble */}
      <div
        className={`relative rounded-lg px-3 py-2 shadow-sm transition-all duration-200 ${bubbleClass} ${mode === 'playing' && !wasGuessed ? 'hover:bg-wa-bg-hover group-hover:shadow-md' : ''
          }`}
      >
        {/* Sender Name */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium" style={{ color: nameColor }}>
            {comment.username}
          </span>
          {showBotBadge && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 bg-wa-green text-white text-[10px] font-bold rounded">
              <Bot className="w-3 h-3" />
              BOT
            </span>
          )}
        </div>

        {/* Message Text */}
        <p className="text-sm text-wa-text-primary whitespace-pre-wrap break-words">
          {comment.text}
        </p>

        {/* Timestamp & Read Receipts */}
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[11px] text-wa-text-secondary">
            {comment.timestamp}
          </span>
          <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
        </div>

        {/* Tail */}
        <div
          className="absolute top-0 -left-2 w-0 h-0"
          style={{
            borderTop: '8px solid transparent',
            borderRight: isRevealed && isBot
              ? '8px solid rgba(37, 211, 102, 0.2)'
              : wasGuessed && wasCorrect
                ? '8px solid rgba(34, 197, 94, 0.2)'
                : wasGuessed && !wasCorrect
                  ? '8px solid rgba(239, 68, 68, 0.2)'
                  : '8px solid #202c33',
            borderBottom: '8px solid transparent',
          }}
        />
      </div>

      {/* Click hint on hover */}
      {mode === 'playing' && !wasGuessed && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
          <span className="text-xs text-wa-text-secondary bg-wa-bg-header px-2 py-1 rounded">
            Click to flag as bot
          </span>
        </div>
      )}
    </div>
  );
};
