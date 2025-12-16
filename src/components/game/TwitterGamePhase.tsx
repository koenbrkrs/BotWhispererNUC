import { useState, useEffect } from 'react';
import { Comment, PlayerGuess, GameResults } from '@/types/game';
import { TwitterLayout } from '../twitter/TwitterLayout';
import { TwitterFeed } from '../twitter/TwitterFeed';
import { Timer } from './Timer';

interface TwitterGamePhaseProps {
  topic: string;
  comments: Comment[];
  onComplete: (results: GameResults) => void;
}

export const TwitterGamePhase = ({ topic, comments, onComplete }: TwitterGamePhaseProps) => {
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
      setTimeout(() => {
        setRemovedIds(prev => new Set([...prev, comment.id]));
      }, 500);
    }
  };

  return (
    <TwitterLayout>
      {/* Floating Timer */}
      <div className="fixed top-4 right-4 z-50">
        <Timer
          duration={120}
          isRunning={isRunning}
          onComplete={() => handleGameEnd(true)}
          onTick={setTimeRemaining}
        />
      </div>

      <TwitterFeed
        topic={topic}
        comments={comments}
        mode="playing"
        guesses={guesses}
        removedIds={removedIds}
        onCommentClick={handleCommentClick}
        bottedCount={totalBotted}
        correctGuesses={correctGuesses}
        incorrectGuesses={incorrectGuesses}
      />
    </TwitterLayout>
  );
};
