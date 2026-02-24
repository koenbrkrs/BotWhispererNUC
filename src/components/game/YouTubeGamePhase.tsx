import { useState, useEffect } from 'react';
import { Comment, PlayerGuess, GameResults } from '@/types/game';
import { YouTubeLayout } from '../youtube/YouTubeLayout';
import { VideoPlayer } from '../youtube/VideoPlayer';
import { VideoInfo } from '../youtube/VideoInfo';
import { RecommendedVideos } from '../youtube/RecommendedVideos';
import { CommentsSection } from '../youtube/CommentsSection';
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
      handleGameEnd(false);
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
      }, 2000);
    } else {
      setLivesLost(prev => prev + 1);
      onLiveLost();
    }
  };

  const videoTitle = formatTopicForYouTube(topic);

  // Scoreboard props for the header
  const scoreboardProps = {
    timeRemaining: 120,
    lives,
    spottedBots: correctGuesses,
    totalBots: totalBotted,
    isRunning,
    onTimeUp: () => handleGameEnd(true),
    onTick: setTimeRemaining,
  };

  return (
    <YouTubeLayout scoreboardProps={scoreboardProps}>
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

      <div className="w-full h-full px-4 lg:px-6 py-6 pt-[8vh] flex flex-col">
        <div className="flex flex-col gap-6 w-full max-w-none mx-auto">
          {/* Main content - stacked vertically */}
          <div className="w-full flex-col space-y-4">
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

          {/* Sidebar - moved to bottom for portrait flow */}
          <aside className="w-full mt-8 pb-20">
            <h3 className="text-sm font-medium text-yt-text-primary mb-4">Up next</h3>
            <div className="grid grid-cols-1 gap-4">
              <RecommendedVideos />
            </div>
          </aside>
        </div>
      </div>
    </YouTubeLayout>
  );
};
