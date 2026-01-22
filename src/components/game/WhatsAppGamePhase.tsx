import { useState, useEffect } from 'react';
import { Comment, PlayerGuess, GameResults } from '@/types/game';
import { WhatsAppLayout } from '../whatsapp/WhatsAppLayout';
import { WhatsAppChat } from '../whatsapp/WhatsAppChat';
import { GameHUD } from './GameHUD';
import { UrgencyBorder } from './UrgencyBorder';
import { formatTopicForWhatsApp } from '@/utils/topicFormatter';

interface WhatsAppGamePhaseProps {
  topic: string;
  comments: Comment[];
  lives: number;
  onComplete: (results: GameResults) => void;
  onLiveLost: () => void;
  onGameOver: () => void;
  onLevelSelect?: (level: 1 | 2 | 3) => void;
}

export const WhatsAppGamePhase = ({ 
  topic, 
  comments, 
  lives,
  onComplete, 
  onLiveLost,
  onGameOver,
  onLevelSelect 
}: WhatsAppGamePhaseProps) => {
  const [guesses, setGuesses] = useState<Record<string, PlayerGuess>>({});
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [isRunning, setIsRunning] = useState(true);
  const [livesLost, setLivesLost] = useState(0);

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

  useEffect(() => {
    if (lives <= 0) {
      setIsRunning(false);
      onGameOver();
    }
  }, [lives]);

  const handleGameEnd = (timerExpired: boolean) => {
    const results: GameResults = {
      totalBotted,
      correctGuesses,
      incorrectGuesses,
      missedBotted: totalBotted - correctGuesses,
      timeRemaining,
      timerExpired,
      livesLost,
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
      }, 1200);
    } else {
      setLivesLost(prev => prev + 1);
      onLiveLost();
    }
  };

  const groupName = formatTopicForWhatsApp(topic);

  return (
    <WhatsAppLayout groupName={groupName}>
      {/* Urgency Border */}
      <UrgencyBorder 
        timeRemaining={timeRemaining} 
        currentLevel={3} 
        isRunning={isRunning} 
      />

      {/* HUD with Timer and Lives */}
      <GameHUD
        timeRemaining={120}
        lives={lives}
        currentLevel={3}
        isRunning={isRunning}
        onTimeUp={() => handleGameEnd(true)}
        onTick={setTimeRemaining}
      />

      {/* Load ALL comments statically - no dynamic pop-ups */}
      <WhatsAppChat
        groupName={groupName}
        comments={comments}
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
