import { useState } from 'react';
import { Comment, GameConfig } from '@/types/game';
import { generateComments } from '@/utils/commentGenerator';
import { YouTubeLayout } from '../youtube/YouTubeLayout';
import { VideoPlayer } from '../youtube/VideoPlayer';
import { VideoInfo } from '../youtube/VideoInfo';
import { RecommendedVideos } from '../youtube/RecommendedVideos';
import { CommentsSection } from '../youtube/CommentsSection';
import { MoreVideosGrid } from '../youtube/MoreVideosGrid';
import { X, Bot, Sparkles, Zap, MessageSquare, Lock, ArrowRight } from 'lucide-react';

interface SetupPhaseProps {
  onComplete: (config: GameConfig, comments: Comment[]) => void;
}

export const YouTubeSetupPhase = ({ onComplete }: SetupPhaseProps) => {
  const [step, setStep] = useState<'config' | 'review'>('config');
  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [botOpinion, setBotOpinion] = useState('');
  const [botStyle, setBotStyle] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const styleExamples = [
    'Sarcastic and dismissive',
    'Extremely logical with bullet points',
    'Very emotional and dramatic',
    'Short meme-like posts',
    'Pseudo-intellectual with jargon',
    'Highly supportive and agreeable',
  ];

  const handleGenerateThread = () => {
    const generated = generateComments(topic, botOpinion, botStyle, 20);
    setComments(generated);
    setStep('review');
    setShowModal(false);
  };

  const toggleComment = (id: string) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id ? { ...c, isBotted: !c.isBotted } : c
      )
    );
  };

  const handleLockIn = () => {
    onComplete({ topic, botOpinion, botStyle }, comments);
  };

  const bottedCount = comments.filter(c => c.isBotted).length;
  const isConfigValid = topic.trim() && botOpinion.trim() && botStyle.trim();

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
            <VideoInfo 
              title={videoTitle} 
              showSetup={step === 'config'}
              onSetupClick={() => setShowModal(true)}
            />
            
            {step === 'review' && (
              <>
                {/* Lock in button */}
                <div className="mt-4 p-4 bg-yt-bg-secondary rounded-xl border border-yt-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-yt-text-primary">Ready to start the game?</h3>
                      <p className="text-sm text-yt-text-secondary">You've marked {bottedCount} comments as bots</p>
                    </div>
                    <button
                      onClick={handleLockIn}
                      disabled={bottedCount === 0}
                      className="flex items-center gap-2 px-6 py-2.5 bg-yt-red hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full font-medium transition-colors"
                    >
                      <Lock className="w-4 h-4" />
                      Lock In & Start ({bottedCount} bots)
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <CommentsSection
                  comments={comments}
                  mode="setup"
                  onCommentToggle={toggleComment}
                  bottedCount={bottedCount}
                />
              </>
            )}
            
            {step === 'config' && (
              <CommentsSection
                comments={[]}
                mode="setup"
                bottedCount={0}
              />
            )}
            
            <MoreVideosGrid />
          </div>
          
          {/* Sidebar */}
          <aside className="w-full xl:w-[402px] flex-shrink-0">
            <h3 className="text-sm font-medium text-yt-text-primary mb-4">Up next</h3>
            <RecommendedVideos />
          </aside>
        </div>
      </div>

      {/* Setup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 animate-fade-in">
          <div className="w-full max-w-lg bg-yt-bg-primary rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-yt-border">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-yt-red" />
                <h2 className="text-lg font-semibold text-yt-text-primary">Bot Leader Setup</h2>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-yt-hover rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-yt-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-yt-text-primary">
                  <MessageSquare className="w-4 h-4 text-yt-red" />
                  Discussion Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Should AI art be considered real art?"
                  className="w-full px-4 py-3 bg-yt-bg-secondary border border-yt-border rounded-lg text-yt-text-primary placeholder:text-yt-text-secondary focus:outline-none focus:border-yt-blue transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-yt-text-primary">
                  <Sparkles className="w-4 h-4 text-yt-red" />
                  Bot Opinion / Stance
                </label>
                <textarea
                  value={botOpinion}
                  onChange={(e) => setBotOpinion(e.target.value)}
                  placeholder="e.g., AI art is not real art because..."
                  className="w-full px-4 py-3 bg-yt-bg-secondary border border-yt-border rounded-lg text-yt-text-primary placeholder:text-yt-text-secondary focus:outline-none focus:border-yt-blue transition-colors min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-yt-text-primary">
                  <Zap className="w-4 h-4 text-yt-red" />
                  Bot Comment Style
                </label>
                <input
                  type="text"
                  value={botStyle}
                  onChange={(e) => setBotStyle(e.target.value)}
                  placeholder="e.g., Sarcastic and dismissive"
                  className="w-full px-4 py-3 bg-yt-bg-secondary border border-yt-border rounded-lg text-yt-text-primary placeholder:text-yt-text-secondary focus:outline-none focus:border-yt-blue transition-colors"
                />
                <div className="flex flex-wrap gap-2">
                  {styleExamples.map((example) => (
                    <button
                      key={example}
                      onClick={() => setBotStyle(example)}
                      className="px-3 py-1.5 text-xs rounded-full bg-yt-bg-secondary hover:bg-yt-hover text-yt-text-secondary hover:text-yt-text-primary transition-colors border border-yt-border"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-yt-border">
              <button
                onClick={handleGenerateThread}
                disabled={!isConfigValid}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yt-red hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full font-medium transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Generate Comment Thread
              </button>
            </div>
          </div>
        </div>
      )}
    </YouTubeLayout>
  );
};
