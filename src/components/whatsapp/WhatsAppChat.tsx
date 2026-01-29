import { useRef, useEffect, useMemo } from 'react';
import { Comment, PlayerGuess } from '@/types/game';
import { WhatsAppMessage } from './WhatsAppMessage';
import { Search, MoreVertical, Phone, Video, Smile, Paperclip, Mic } from 'lucide-react';
import { HeaderScoreboard } from '../game/HeaderScoreboard';

interface WhatsAppChatProps {
  groupName: string;
  comments: Comment[];
  mode: 'playing' | 'reveal';
  guesses?: Record<string, PlayerGuess>;
  removedIds?: Set<string>;
  onCommentClick?: (comment: Comment) => void;
  bottedCount?: number;
  correctGuesses?: number;
  incorrectGuesses?: number;
  scoreboardProps?: {
    timeRemaining: number;
    lives: number;
    spottedBots: number;
    totalBots: number;
    isRunning: boolean;
    onTimeUp: () => void;
    onTick?: (time: number) => void;
  };
}

export const WhatsAppChat = ({
  groupName,
  comments,
  mode,
  guesses = {},
  removedIds = new Set(),
  onCommentClick,
  bottedCount = 0,
  correctGuesses = 0,
  incorrectGuesses = 0,
  scoreboardProps,
}: WhatsAppChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  // Assign consistent avatars to each username
  const avatarMap = useMemo(() => {
    const map: Record<string, string> = {};
    comments.forEach((comment, index) => {
      if (!map[comment.username]) {
        map[comment.username] = `https://i.pravatar.cc/40?u=${comment.username}-${index}`;
      }
    });
    return map;
  }, [comments]);

  // Assign consistent colors to each username
  const colorMap = useMemo(() => {
    const colors = [
      '#25d366', '#00a884', '#53bdeb', '#e542a3', '#ff9f43',
      '#a29bfe', '#fd79a8', '#00b894', '#74b9ff', '#fdcb6e'
    ];
    const map: Record<string, string> = {};
    let colorIndex = 0;
    comments.forEach((comment) => {
      if (!map[comment.username]) {
        map[comment.username] = colors[colorIndex % colors.length];
        colorIndex++;
      }
    });
    return map;
  }, [comments]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [comments]);

  const visibleComments = comments.filter(c => !removedIds.has(c.id));
  const participantCount = new Set(comments.map(c => c.username)).size;

  return (
    <div className="flex-1 flex flex-col bg-wa-chat-bg min-h-screen">
      {/* Chat Header */}
      <div className="sticky top-0 z-40 h-[60px] bg-wa-bg-header px-4 flex items-center justify-between border-l border-wa-border">
        <div className="flex items-center gap-3">
          <img
            src={`https://picsum.photos/seed/${groupName}/40/40`}
            alt={groupName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium text-wa-text-primary">{groupName}</h2>
            <p className="text-xs text-wa-text-secondary">
              {participantCount} participants
            </p>
          </div>
        </div>
        
        {/* Scoreboard in header */}
        {scoreboardProps ? (
          <HeaderScoreboard
            timeRemaining={scoreboardProps.timeRemaining}
            lives={scoreboardProps.lives}
            spottedBots={scoreboardProps.spottedBots}
            totalBots={scoreboardProps.totalBots}
            currentLevel={3}
            isRunning={scoreboardProps.isRunning}
            onTimeUp={scoreboardProps.onTimeUp}
            onTick={scoreboardProps.onTick}
          />
        ) : (
          <div className="flex items-center gap-6 text-wa-text-secondary">
            <Video className="w-5 h-5 cursor-pointer hover:text-wa-text-primary transition-colors" />
            <Phone className="w-5 h-5 cursor-pointer hover:text-wa-text-primary transition-colors" />
            <Search className="w-5 h-5 cursor-pointer hover:text-wa-text-primary transition-colors" />
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-wa-text-primary transition-colors" />
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: '#0b141a'
        }}
      >
        {/* Date Header */}
        <div className="flex justify-center my-4">
          <span className="bg-wa-bg-header px-3 py-1 rounded-lg text-xs text-wa-text-secondary shadow-sm">
            Today
          </span>
        </div>

        {/* Encryption Notice */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#182229] px-3 py-2 rounded-lg text-xs text-wa-text-secondary text-center max-w-[300px]">
            <span className="text-yellow-400">🔒</span> Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.
          </div>
        </div>

        {visibleComments.map((comment) => (
          <WhatsAppMessage
            key={comment.id}
            comment={comment}
            mode={mode}
            guess={guesses[comment.id]}
            onClick={() => onCommentClick?.(comment)}
            avatarUrl={avatarMap[comment.username]}
            nameColor={colorMap[comment.username]}
          />
        ))}
      </div>

      {/* Input Bar */}
      <div className="h-[62px] bg-wa-bg-header px-4 flex items-center gap-3 border-l border-wa-border">
        <Smile className="w-6 h-6 text-wa-text-secondary cursor-pointer hover:text-wa-text-primary transition-colors" />
        <Paperclip className="w-6 h-6 text-wa-text-secondary cursor-pointer hover:text-wa-text-primary transition-colors" />
        <div className="flex-1 bg-wa-bg-input rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-transparent text-wa-text-primary text-sm placeholder:text-wa-text-secondary focus:outline-none"
            disabled
          />
        </div>
        <Mic className="w-6 h-6 text-wa-text-secondary cursor-pointer hover:text-wa-text-primary transition-colors" />
      </div>
    </div>
  );
};
