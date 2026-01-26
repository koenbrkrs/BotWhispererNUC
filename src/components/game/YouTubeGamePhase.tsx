import { useState, useEffect } from 'react';
import { Comment, PlayerGuess, GameResults } from '@/types/game';
import { YouTubeLayout } from '../youtube/YouTubeLayout';
import { VideoPlayer } from '../youtube/VideoPlayer';
import { VideoInfo } from '../youtube/VideoInfo';
import { RecommendedVideos } from '../youtube/RecommendedVideos';
import { CommentsSection } from '../youtube/CommentsSection';
import { GameScoreboard } from './GameScoreboard';
import { GameProgressBar } from './GameProgressBar';
import { UrgencyBorder } from './UrgencyBorder';
import { formatTopicForYouTube } from '@/utils/topicFormatter';

interface YouTubeGamePhaseProps {
  topic: string;
  comments: Comment[];
  lives: number;
  onComplete: (results: GameResults) => void;
  onLiveLost: () => void;
  onGameOver: () => void;
  onLevelSelect?: (level: 1 | 2 | 3) => void;
}

export const YouTubeGamePhase = ({ 
  topic, 
  comments, 
  lives,
  onComplete, 
  onLiveLost,
  onGameOver,
  onLevelSelect 
}: YouTubeGamePhaseProps) => {
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

  const videoTitle = formatTopicForYouTube(topic);

  return (
    <YouTubeLayout>
      {/* Urgency Border */}
      <UrgencyBorder 
        timeRemaining={timeRemaining} 
        currentLevel={1} 
        isRunning={isRunning} 
      />

      {/* Progress Bar */}
      <GameProgressBar
        currentLevel={1}
        level1Complete={false}
        level2Complete={false}
        level3Complete={false}
        onLevelSelect={onLevelSelect}
      />

      {/* Scoreboard with Timer, Lives and Spotted Bots */}
      <GameScoreboard
        timeRemaining={120}
        lives={lives}
        spottedBots={correctGuesses}
        currentLevel={1}
        isRunning={isRunning}
        onTimeUp={() => handleGameEnd(true)}
        onTick={setTimeRemaining}
      />

      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6 pt-20">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <VideoPlayer />
            <VideoInfo title={videoTitle} />
            
            <CommentsSection
              comments={comments}
              mode="playing"
              guesses={guesses}
              removedIds={removedIds}
              onCommentClick={handleCommentClick}
              bottedCount={totalBotted}
              correctGuesses={correctGuesses}
              incorrectGuesses={incorrectGuesses}
            />
          </div>
          
          {/* Sidebar */}
          <aside className="w-full xl:w-[402px] flex-shrink-0">
            <h3 className="text-sm font-medium text-yt-text-primary mb-4">Up next</h3>
            <RecommendedVideos />
          </aside>
        </div>
      </div>
    </YouTubeLayout>
  );
};
