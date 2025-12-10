import { Comment, GameConfig, GameResults } from '@/types/game';
import { YouTubeLayout } from '../youtube/YouTubeLayout';
import { VideoPlayer } from '../youtube/VideoPlayer';
import { VideoInfo } from '../youtube/VideoInfo';
import { RecommendedVideos } from '../youtube/RecommendedVideos';
import { CommentsSection } from '../youtube/CommentsSection';
import { MoreVideosGrid } from '../youtube/MoreVideosGrid';
import { Bot, Trophy, Clock, Target, XCircle, CheckCircle, RotateCcw, Sparkles, MessageSquare, Zap } from 'lucide-react';

interface YouTubeRevealPhaseProps {
  config: GameConfig;
  comments: Comment[];
  results: GameResults;
  onPlayAgain: () => void;
}

export const YouTubeRevealPhase = ({ config, comments, results, onPlayAgain }: YouTubeRevealPhaseProps) => {
  const accuracy = results.totalBotted > 0 
    ? Math.round((results.correctGuesses / results.totalBotted) * 100) 
    : 0;
  
  const getGrade = () => {
    if (accuracy >= 90) return { grade: 'S', color: 'text-yt-red', bg: 'bg-yt-red/20', message: 'Bot Hunter Elite!' };
    if (accuracy >= 75) return { grade: 'A', color: 'text-green-500', bg: 'bg-green-500/20', message: 'Great Detection!' };
    if (accuracy >= 50) return { grade: 'B', color: 'text-yellow-500', bg: 'bg-yellow-500/20', message: 'Good Effort!' };
    if (accuracy >= 25) return { grade: 'C', color: 'text-orange-500', bg: 'bg-orange-500/20', message: 'Needs Practice' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-600/20', message: 'The Bots Won...' };
  };

  const gradeInfo = getGrade();
  const videoTitle = `${config.topic} - The Discussion Everyone Is Talking About | Full Analysis 2025`;

  return (
    <YouTubeLayout>
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <VideoPlayer />
            <VideoInfo title={videoTitle} />
            
            {/* Results Card */}
            <div className="mt-6 p-6 bg-yt-bg-secondary rounded-2xl border border-yt-border">
              {/* Grade */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-yt-red" />
                  <span className="text-lg font-semibold text-yt-text-primary">Game Complete!</span>
                </div>
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${gradeInfo.bg} mb-3`}>
                  <span className={`text-5xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</span>
                </div>
                <p className="text-xl font-medium text-yt-text-primary">{gradeInfo.message}</p>
                <p className="text-sm text-yt-text-secondary mt-1">{accuracy}% Accuracy</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-yt-bg-primary rounded-xl">
                  <Target className="w-6 h-6 text-yt-red mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yt-text-primary">{results.totalBotted}</div>
                  <div className="text-xs text-yt-text-secondary">Total Bots</div>
                </div>
                <div className="text-center p-4 bg-yt-bg-primary rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-500">{results.correctGuesses}</div>
                  <div className="text-xs text-yt-text-secondary">Found</div>
                </div>
                <div className="text-center p-4 bg-yt-bg-primary rounded-xl">
                  <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-500">{results.incorrectGuesses}</div>
                  <div className="text-xs text-yt-text-secondary">Wrong</div>
                </div>
                <div className="text-center p-4 bg-yt-bg-primary rounded-xl">
                  <Clock className="w-6 h-6 text-yt-text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yt-text-primary">
                    {results.timerExpired ? '0:00' : `${Math.floor(results.timeRemaining / 60)}:${(results.timeRemaining % 60).toString().padStart(2, '0')}`}
                  </div>
                  <div className="text-xs text-yt-text-secondary">{results.timerExpired ? 'Time Up!' : 'Remaining'}</div>
                </div>
              </div>

              {/* Bot Config Reveal */}
              <div className="p-4 bg-yt-bg-primary rounded-xl border border-yt-red/30 mb-6">
                <h3 className="flex items-center gap-2 text-sm font-medium text-yt-text-primary mb-3">
                  <Bot className="w-5 h-5 text-yt-red" />
                  Bot Configuration Revealed
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-yt-text-secondary mt-0.5" />
                    <div>
                      <span className="text-yt-text-secondary">Topic: </span>
                      <span className="text-yt-text-primary">{config.topic}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-yt-text-secondary mt-0.5" />
                    <div>
                      <span className="text-yt-text-secondary">Bot Opinion: </span>
                      <span className="text-yt-text-primary">{config.botOpinion}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yt-text-secondary mt-0.5" />
                    <div>
                      <span className="text-yt-text-secondary">Bot Style: </span>
                      <span className="text-yt-text-primary">{config.botStyle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Play Again */}
              <button
                onClick={onPlayAgain}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yt-red hover:bg-red-700 text-white rounded-full font-medium transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </div>
            
            {/* Full Thread */}
            <div className="mt-6">
              <h3 className="text-base font-semibold text-yt-text-primary mb-4">Full Thread (Annotated)</h3>
              <CommentsSection
                comments={comments}
                mode="reveal"
              />
            </div>
            
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
