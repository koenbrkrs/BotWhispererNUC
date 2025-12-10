import { useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { YouTubeLayout } from '../youtube/YouTubeLayout';
import { VideoPlayer } from '../youtube/VideoPlayer';
import { VideoInfo } from '../youtube/VideoInfo';
import { RecommendedVideos } from '../youtube/RecommendedVideos';
import { MoreVideosGrid } from '../youtube/MoreVideosGrid';

interface YouTubeHandoffModalProps {
  onContinue: () => void;
  topic?: string;
}

export const YouTubeHandoffModal = ({ onContinue, topic }: YouTubeHandoffModalProps) => {
  const [isReady, setIsReady] = useState(false);

  const videoTitle = topic 
    ? `${topic} - The Discussion Everyone Is Talking About | Full Analysis 2025`
    : "Why Everyone Is Talking About This Topic - Full Discussion";

  return (
    <YouTubeLayout>
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <VideoPlayer />
            <VideoInfo title={videoTitle} />
            <MoreVideosGrid />
          </div>
          
          {/* Sidebar */}
          <aside className="w-full xl:w-[402px] flex-shrink-0">
            <h3 className="text-sm font-medium text-yt-text-primary mb-4">Up next</h3>
            <RecommendedVideos />
          </aside>
        </div>
      </div>

      {/* Handoff Modal Overlay */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
        <div className="w-full max-w-md bg-yt-bg-primary rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-6 text-center border-b border-yt-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yt-red/20 mb-4">
              <Users className="w-8 h-8 text-yt-red" />
            </div>
            <h2 className="text-xl font-semibold text-yt-text-primary">Hand Over the Device</h2>
            <p className="text-sm text-yt-text-secondary mt-2">
              Pass to Player 2 without showing the screen
            </p>
          </div>

          {/* Instructions */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-yt-bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-yt-red">1</span>
              </div>
              <div>
                <p className="font-medium text-yt-text-primary text-sm">Don't peek at the settings</p>
                <p className="text-xs text-yt-text-secondary">Player 2 shouldn't know the bot opinion or style</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-yt-bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-yt-red">2</span>
              </div>
              <div>
                <p className="font-medium text-yt-text-primary text-sm">2 minutes to find all bots</p>
                <p className="text-xs text-yt-text-secondary">Tap comments you think are bot-generated</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-yt-bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-yt-red">3</span>
              </div>
              <div>
                <p className="font-medium text-yt-text-primary text-sm">Correct = disappears, Wrong = turns red</p>
                <p className="text-xs text-yt-text-secondary">Be strategic with your guesses!</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-yt-border space-y-4">
            <label className="flex items-center justify-center gap-3 cursor-pointer group">
              <div 
                onClick={() => setIsReady(!isReady)}
                className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                  isReady 
                    ? 'bg-yt-red border-yt-red' 
                    : 'border-yt-text-secondary group-hover:border-yt-red'
                }`}
              >
                {isReady && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-yt-text-primary">Player 2 has the device and is ready</span>
            </label>

            <button
              onClick={onContinue}
              disabled={!isReady}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yt-red hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full font-medium transition-colors"
            >
              Start Detection Game
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </YouTubeLayout>
  );
};
