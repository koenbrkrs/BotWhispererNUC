import { useState } from 'react';
import { Comment, GameConfig, OpinionConfig, StyleConfig } from '@/types/game';
import { generateComments } from '@/utils/commentGenerator';
import { YouTubeLayout } from '../youtube/YouTubeLayout';
import { VideoPlayer } from '../youtube/VideoPlayer';
import { VideoInfo } from '../youtube/VideoInfo';
import { RecommendedVideos } from '../youtube/RecommendedVideos';
import { CommentsSection } from '../youtube/CommentsSection';
import { X, Bot, Sparkles, MessageSquare, Lock, ArrowRight, Sliders } from 'lucide-react';
import { Slider } from '../ui/slider';

interface SetupPhaseProps {
  onComplete: (config: GameConfig, comments: Comment[]) => void;
}

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
}

const SliderControl = ({ label, value, onChange, leftLabel, rightLabel }: SliderControlProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-xs font-medium text-yt-text-primary">{label}</span>
      <span className="text-xs text-yt-text-secondary bg-yt-bg-secondary px-2 py-0.5 rounded">{value}%</span>
    </div>
    <Slider
      value={[value]}
      onValueChange={(v) => onChange(v[0])}
      max={100}
      step={1}
      className="w-full"
    />
    {(leftLabel || rightLabel) && (
      <div className="flex justify-between text-[10px] text-yt-text-secondary">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    )}
  </div>
);

export const YouTubeSetupPhase = ({ onComplete }: SetupPhaseProps) => {
  const [step, setStep] = useState<'config' | 'review'>('config');
  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [botOpinion, setBotOpinion] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // Opinion config sliders
  const [opinionConfig, setOpinionConfig] = useState<OpinionConfig>({
    stanceStrength: 50,
    positivity: 50,
    category: 'pro',
    theme: 'tech'
  });

  // Style config sliders
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    sarcasm: 30,
    dismissiveness: 20,
    logic: 50,
    bulletPoints: 20,
    emotionalIntensity: 40,
    dramaticFlair: 30,
    postLength: 50,
    memeStyle: 20,
    pseudoIntellectual: 20,
    jargonUsage: 20,
    supportiveness: 50,
    agreeableness: 50
  });

  const updateOpinionConfig = <K extends keyof OpinionConfig>(key: K, value: OpinionConfig[K]) => {
    setOpinionConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateStyleConfig = <K extends keyof StyleConfig>(key: K, value: StyleConfig[K]) => {
    setStyleConfig(prev => ({ ...prev, [key]: value }));
  };

  const generateBotStyleString = (): string => {
    const traits: string[] = [];
    if (styleConfig.sarcasm > 60) traits.push('sarcastic');
    if (styleConfig.dismissiveness > 60) traits.push('dismissive');
    if (styleConfig.logic > 60) traits.push('logical');
    if (styleConfig.bulletPoints > 60) traits.push('uses bullet points');
    if (styleConfig.emotionalIntensity > 60) traits.push('emotional');
    if (styleConfig.dramaticFlair > 60) traits.push('dramatic');
    if (styleConfig.postLength > 60) traits.push('short posts');
    if (styleConfig.memeStyle > 60) traits.push('meme-like');
    if (styleConfig.pseudoIntellectual > 60) traits.push('pseudo-intellectual');
    if (styleConfig.jargonUsage > 60) traits.push('uses jargon');
    if (styleConfig.supportiveness > 60) traits.push('supportive');
    if (styleConfig.agreeableness > 60) traits.push('agreeable');
    return traits.length > 0 ? traits.join(', ') : 'neutral';
  };

  const handleGenerateThread = () => {
    const botStyle = generateBotStyleString();
    const generated = generateComments(topic, botOpinion, botStyle, 20, opinionConfig, styleConfig);
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
    const botStyle = generateBotStyleString();
    onComplete({ topic, botOpinion, botStyle, opinionConfig, styleConfig }, comments);
  };

  const bottedCount = comments.filter(c => c.isBotted).length;
  const isConfigValid = topic.trim() && botOpinion.trim();

  const videoTitle = topic 
    ? `${topic} - The Discussion Everyone Is Talking About | Full Analysis 2025`
    : "Why Everyone Is Talking About This Topic - Full Discussion";

  const categories = [
    { value: 'pro', label: 'Pro' },
    { value: 'con', label: 'Con' },
    { value: 'agree', label: 'Agree' },
    { value: 'disagree', label: 'Disagree' },
    { value: 'support', label: 'Support' },
    { value: 'oppose', label: 'Oppose' },
  ] as const;

  const themes = [
    { value: 'political', label: 'Political' },
    { value: 'environmental', label: 'Environmental' },
    { value: 'tech', label: 'Tech' },
    { value: 'social', label: 'Social' },
    { value: 'economic', label: 'Economic' },
    { value: 'cultural', label: 'Cultural' },
  ] as const;

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
              <div className="mt-6 p-8 text-center text-yt-text-secondary">
                <p>Click "Setup Game" above to configure the bot detection game</p>
              </div>
            )}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl bg-yt-bg-primary rounded-2xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-yt-border flex-shrink-0">
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
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Basic Inputs */}
              <div className="space-y-4">
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
                    Bot Opinion / Core Stance
                  </label>
                  <textarea
                    value={botOpinion}
                    onChange={(e) => setBotOpinion(e.target.value)}
                    placeholder="e.g., AI art is not real art because it lacks human creativity"
                    className="w-full px-4 py-3 bg-yt-bg-secondary border border-yt-border rounded-lg text-yt-text-primary placeholder:text-yt-text-secondary focus:outline-none focus:border-yt-blue transition-colors min-h-[80px] resize-none"
                  />
                </div>
              </div>

              {/* Opinion Configuration */}
              <div className="space-y-4 p-4 bg-yt-bg-secondary rounded-xl border border-yt-border">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-yt-text-primary">
                  <Sliders className="w-4 h-4 text-yt-blue" />
                  Opinion Configuration
                </h3>

                <div className="grid gap-4">
                  <SliderControl
                    label="Stance Strength"
                    value={opinionConfig.stanceStrength}
                    onChange={(v) => updateOpinionConfig('stanceStrength', v)}
                    leftLabel="Neutral/Mild"
                    rightLabel="Extreme/Strong"
                  />

                  <SliderControl
                    label="Positivity"
                    value={opinionConfig.positivity}
                    onChange={(v) => updateOpinionConfig('positivity', v)}
                    leftLabel="Strongly Negative"
                    rightLabel="Strongly Positive"
                  />

                  {/* Category Toggle Buttons */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-yt-text-primary">Opinion Category</span>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => updateOpinionConfig('category', cat.value)}
                          className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
                            opinionConfig.category === cat.value
                              ? 'bg-yt-red text-white'
                              : 'bg-yt-bg-primary hover:bg-yt-hover text-yt-text-secondary border border-yt-border'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Dropdown */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-yt-text-primary">Opinion Theme</span>
                    <div className="flex flex-wrap gap-2">
                      {themes.map((theme) => (
                        <button
                          key={theme.value}
                          onClick={() => updateOpinionConfig('theme', theme.value)}
                          className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
                            opinionConfig.theme === theme.value
                              ? 'bg-yt-blue text-white'
                              : 'bg-yt-bg-primary hover:bg-yt-hover text-yt-text-secondary border border-yt-border'
                          }`}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Style Configuration */}
              <div className="space-y-4 p-4 bg-yt-bg-secondary rounded-xl border border-yt-border">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-yt-text-primary">
                  <Sliders className="w-4 h-4 text-yt-red" />
                  Bot Comment Style
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <SliderControl
                    label="Sarcasm Level"
                    value={styleConfig.sarcasm}
                    onChange={(v) => updateStyleConfig('sarcasm', v)}
                    leftLabel="None"
                    rightLabel="Highly Sarcastic"
                  />

                  <SliderControl
                    label="Dismissiveness"
                    value={styleConfig.dismissiveness}
                    onChange={(v) => updateStyleConfig('dismissiveness', v)}
                    leftLabel="Polite"
                    rightLabel="Highly Dismissive"
                  />

                  <SliderControl
                    label="Logic Level"
                    value={styleConfig.logic}
                    onChange={(v) => updateStyleConfig('logic', v)}
                    leftLabel="Irrational"
                    rightLabel="Extremely Logical"
                  />

                  <SliderControl
                    label="Use of Bullet Points"
                    value={styleConfig.bulletPoints}
                    onChange={(v) => updateStyleConfig('bulletPoints', v)}
                    leftLabel="No Bullets"
                    rightLabel="Frequent Bullets"
                  />

                  <SliderControl
                    label="Emotional Intensity"
                    value={styleConfig.emotionalIntensity}
                    onChange={(v) => updateStyleConfig('emotionalIntensity', v)}
                    leftLabel="Calm"
                    rightLabel="Very Emotional"
                  />

                  <SliderControl
                    label="Dramatic Flair"
                    value={styleConfig.dramaticFlair}
                    onChange={(v) => updateStyleConfig('dramaticFlair', v)}
                    leftLabel="Straightforward"
                    rightLabel="Highly Dramatic"
                  />

                  <SliderControl
                    label="Post Length"
                    value={styleConfig.postLength}
                    onChange={(v) => updateStyleConfig('postLength', v)}
                    leftLabel="Long/Detailed"
                    rightLabel="Short/Meme-like"
                  />

                  <SliderControl
                    label="Meme Style"
                    value={styleConfig.memeStyle}
                    onChange={(v) => updateStyleConfig('memeStyle', v)}
                    leftLabel="Formal"
                    rightLabel="Meme-heavy"
                  />

                  <SliderControl
                    label="Pseudo-Intellectual Tone"
                    value={styleConfig.pseudoIntellectual}
                    onChange={(v) => updateStyleConfig('pseudoIntellectual', v)}
                    leftLabel="Simple"
                    rightLabel="Pseudo-Intellectual"
                  />

                  <SliderControl
                    label="Jargon Usage"
                    value={styleConfig.jargonUsage}
                    onChange={(v) => updateStyleConfig('jargonUsage', v)}
                    leftLabel="Plain Language"
                    rightLabel="Heavy Jargon"
                  />

                  <SliderControl
                    label="Supportiveness"
                    value={styleConfig.supportiveness}
                    onChange={(v) => updateStyleConfig('supportiveness', v)}
                    leftLabel="Critical"
                    rightLabel="Highly Supportive"
                  />

                  <SliderControl
                    label="Agreeableness"
                    value={styleConfig.agreeableness}
                    onChange={(v) => updateStyleConfig('agreeableness', v)}
                    leftLabel="Argumentative"
                    rightLabel="Highly Agreeable"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-yt-border flex-shrink-0">
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
