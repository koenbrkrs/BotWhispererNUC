import { useState, useEffect } from 'react';
import { Comment, PlayerGuess, GameResults } from '@/types/game';
import { YouTubeLayout } from '../youtube/YouTubeLayout';
import { VideoPlayer } from '../youtube/VideoPlayer';
import { VideoInfo } from '../youtube/VideoInfo';
import { RecommendedVideos } from '../youtube/RecommendedVideos';
import { CommentsSection } from '../youtube/CommentsSection';
import { MoreVideosGrid } from '../youtube/MoreVideosGrid';
import { Timer } from './Timer';

interface YouTubeGamePhaseProps {
  topic: string;
  comments: Comment[];
  onComplete: (results: GameResults) => void;
}

export const YouTubeGamePhase = ({ topic, comments, onComplete }: YouTubeGamePhaseProps) => {
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

  const videoTitle = `${topic} - The Discussion Everyone Is Talking About | Full Analysis 2025`;

  return (
    <YouTubeLayout>
      {/* Floating Timer */}
      <div className="fixed top-16 right-4 z-50">
        <Timer
          duration={120}
          isRunning={isRunning}
          onComplete={() => handleGameEnd(true)}
          onTick={setTimeRemaining}
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
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
            
            <MoreVideosGrid />
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
