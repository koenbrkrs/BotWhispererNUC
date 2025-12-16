import { Sparkles, Image, Smile, Calendar, MapPin } from 'lucide-react';
import { Comment } from '@/types/game';
import { Tweet } from './Tweet';

interface TwitterFeedProps {
  topic: string;
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

export const TwitterFeed = ({
  topic,
  comments,
  mode,
  guesses = {},
  removedIds = new Set(),
  onCommentClick,
  onCommentToggle,
  bottedCount = 0,
  correctGuesses = 0,
  incorrectGuesses = 0,
}: TwitterFeedProps) => {
  const visibleComments = comments.filter(c => !removedIds.has(c.id));

  return (
    <main className="flex-1 border-x border-tw-border min-h-screen max-w-[600px]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-tw-bg-primary/80 backdrop-blur-md border-b border-tw-border">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-xl font-bold text-tw-text-primary">Home</h1>
          <button className="p-2 hover:bg-tw-bg-hover rounded-full transition-colors">
            <Sparkles className="w-5 h-5 text-tw-text-primary" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-tw-border">
          <button className="flex-1 py-4 text-center font-bold text-tw-text-primary relative hover:bg-tw-bg-hover transition-colors">
            For you
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-tw-blue rounded-full" />
          </button>
          <button className="flex-1 py-4 text-center text-tw-text-secondary hover:bg-tw-bg-hover transition-colors">
            Following
          </button>
        </div>
      </div>

      {/* Game stats for playing mode */}
      {mode === 'playing' && (
        <div className="px-4 py-3 bg-tw-blue/10 border-b border-tw-border flex items-center justify-between">
          <span className="text-sm text-tw-text-primary font-medium">🎯 Find the bot tweets!</span>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-500 font-medium">✓ {correctGuesses} Found</span>
            <span className="text-red-500 font-medium">✗ {incorrectGuesses} Wrong</span>
            <span className="text-tw-text-secondary">{bottedCount - correctGuesses} remaining</span>
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="px-4 py-3 border-b border-tw-border">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0" />
          <div className="flex-1">
            <textarea
              placeholder="What is happening?!"
              className="w-full bg-transparent text-xl text-tw-text-primary placeholder:text-tw-text-secondary resize-none outline-none min-h-[52px]"
              disabled
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-tw-border">
              <div className="flex gap-1">
                <button className="p-2 hover:bg-tw-blue/20 rounded-full transition-colors">
                  <Image className="w-5 h-5 text-tw-blue" />
                </button>
                <button className="p-2 hover:bg-tw-blue/20 rounded-full transition-colors">
                  <Smile className="w-5 h-5 text-tw-blue" />
                </button>
                <button className="p-2 hover:bg-tw-blue/20 rounded-full transition-colors">
                  <Calendar className="w-5 h-5 text-tw-blue" />
                </button>
                <button className="p-2 hover:bg-tw-blue/20 rounded-full transition-colors">
                  <MapPin className="w-5 h-5 text-tw-blue" />
                </button>
              </div>
              <button className="px-4 py-1.5 bg-tw-blue hover:bg-tw-blue-hover rounded-full text-white font-bold text-sm transition-colors opacity-50 cursor-not-allowed">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Original Tweet / Topic */}
      <div className="px-4 py-4 border-b border-tw-border">
        <div className="flex gap-3">
          <img
            src="https://i.pravatar.cc/100?img=68"
            alt=""
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-tw-text-primary">Discussion Topic</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-tw-blue">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.66 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
              </svg>
              <span className="text-tw-text-secondary">@discussion</span>
              <span className="text-tw-text-secondary">·</span>
              <span className="text-tw-text-secondary">2h</span>
            </div>
            <p className="text-lg text-tw-text-primary mt-2">{topic}</p>
            <p className="text-tw-text-secondary mt-1">Let's discuss this topic. Share your thoughts below 👇</p>
          </div>
        </div>
      </div>

      {/* Tweets */}
      <div>
        {visibleComments.map((comment) => (
          <Tweet
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
          <h3 className="text-xl font-semibold text-tw-text-primary">All bots found!</h3>
          <p className="text-tw-text-secondary">Calculating results...</p>
        </div>
      )}
    </main>
  );
};
