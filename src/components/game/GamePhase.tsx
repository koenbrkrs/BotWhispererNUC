import { useState, useEffect } from 'react';
import { Comment, PlayerGuess, GameResults } from '@/types/game';
import { CommentCard } from './CommentCard';
import { Timer } from './Timer';
import { Bot, Target } from 'lucide-react';

interface GamePhaseProps {
  topic: string;
  comments: Comment[];
  onComplete: (results: GameResults) => void;
}

export const GamePhase = ({ topic, comments, onComplete }: GamePhaseProps) => {
  const [guesses, setGuesses] = useState<Record<string, PlayerGuess>>({});
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [isRunning, setIsRunning] = useState(true);

  const totalBotted = comments.filter(c => c.isBotted).length;
  const correctGuesses = Object.values(guesses).filter(g => g.correct).length;
  const incorrectGuesses = Object.values(guesses).filter(g => !g.correct).length;
  const foundAll = correctGuesses === totalBotted;

  useEffect(() => {
    if (foundAll && isRunning) {
      setIsRunning(false);
      handleGameEnd(false);
    }
  }, [foundAll]);

  const handleGameEnd = (timerExpired: boolean) => {
    const results: GameResults = {
      totalBotted,
      correctGuesses,
      incorrectGuesses,
      missedBotted: totalBotted - correctGuesses,
      timeRemaining,
      timerExpired,
    };
    onComplete(results);
  };

  const handleCommentClick = (comment: Comment) => {
    if (guesses[comment.id] || removedIds.has(comment.id)) return;

    const isCorrect = comment.isBotted;
    
    setGuesses(prev => ({
      ...prev,
      [comment.id]: { guessed: true, correct: isCorrect }
    }));

    if (isCorrect) {
      // Remove after animation
      setTimeout(() => {
        setRemovedIds(prev => new Set([...prev, comment.id]));
      }, 500);
    }
  };

  const visibleComments = comments.filter(c => !removedIds.has(c.id));

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="sticky top-0 z-10 glass p-4 rounded-2xl border border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Find the Bots!</h2>
                <p className="text-sm text-muted-foreground">Tap comments you think are bot-generated</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-success">{correctGuesses}</div>
                <div className="text-xs text-muted-foreground">Found</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-destructive">{incorrectGuesses}</div>
                <div className="text-xs text-muted-foreground">Wrong</div>
              </div>
            </div>
          </div>

          {/* Topic */}
          <div className="p-3 rounded-xl bg-secondary/50 border border-border/30">
            <div className="text-xs text-muted-foreground mb-1">Topic</div>
            <div className="font-medium text-foreground">{topic}</div>
          </div>

          {/* Timer */}
          <Timer
            duration={120}
            isRunning={isRunning}
            onComplete={() => handleGameEnd(true)}
            onTick={setTimeRemaining}
          />
        </div>

        {/* Comments */}
        <div className="space-y-3">
          {visibleComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              mode="playing"
              isGuessed={!!guesses[comment.id]}
              isCorrect={guesses[comment.id]?.correct}
              isRemoved={removedIds.has(comment.id)}
              onClick={() => handleCommentClick(comment)}
            />
          ))}
        </div>

        {visibleComments.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground">All bots found!</h3>
            <p className="text-muted-foreground">Calculating results...</p>
          </div>
        )}
      </div>
    </div>
  );
};
