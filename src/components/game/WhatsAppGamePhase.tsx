import { useState, useEffect } from 'react';
import { Comment, PlayerGuess, GameResults } from '@/types/game';
import { WhatsAppLayout } from '../whatsapp/WhatsAppLayout';
import { WhatsAppChat } from '../whatsapp/WhatsAppChat';
import { Timer } from './Timer';

interface WhatsAppGamePhaseProps {
  topic: string;
  comments: Comment[];
  onComplete: (results: GameResults) => void;
}

export const WhatsAppGamePhase = ({ topic, comments, onComplete }: WhatsAppGamePhaseProps) => {
  const [guesses, setGuesses] = useState<Record<string, PlayerGuess>>({});
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [isRunning, setIsRunning] = useState(true);
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);

  const totalBotted = comments.filter(c => c.isBotted).length;
  const correctGuesses = Object.values(guesses).filter(g => g.correct).length;
  const incorrectGuesses = Object.values(guesses).filter(g => !g.correct).length;
  const foundAll = correctGuesses === totalBotted;

  // Gradually reveal comments to simulate "incoming messages"
  useEffect(() => {
    // Start with first 10 comments
    setVisibleComments(comments.slice(0, 10));

    // Add remaining comments over time
    const remaining = comments.slice(10);
    let index = 0;

    const interval = setInterval(() => {
      if (index < remaining.length && isRunning) {
        setVisibleComments(prev => [...prev, remaining[index]]);
        index++;
      } else if (index >= remaining.length) {
        clearInterval(interval);
      }
    }, 3000 + Math.random() * 2000); // 3-5 seconds between messages

    return () => clearInterval(interval);
  }, [comments, isRunning]);

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
    <WhatsAppLayout groupName={topic}>
      {/* Floating Timer */}
      <div className="fixed top-4 right-4 z-50">
        <Timer
          duration={120}
          isRunning={isRunning}
          onComplete={() => handleGameEnd(true)}
          onTick={setTimeRemaining}
        />
      </div>

      <WhatsAppChat
        groupName={topic}
        comments={visibleComments}
        mode="playing"
        guesses={guesses}
        removedIds={removedIds}
        onCommentClick={handleCommentClick}
        bottedCount={totalBotted}
        correctGuesses={correctGuesses}
        incorrectGuesses={incorrectGuesses}
      />
    </WhatsAppLayout>
  );
};
