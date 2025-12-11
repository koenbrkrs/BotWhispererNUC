import { useState } from 'react';
import { Comment, GameConfig } from '@/types/game';
import { CommentCard } from './CommentCard';
import { generateComments } from '@/utils/commentGenerator';
import { Bot, Sparkles, MessageSquare, Zap, Lock } from 'lucide-react';

interface SetupPhaseProps {
  onComplete: (config: GameConfig, comments: Comment[]) => void;
}

export const SetupPhase = ({ onComplete }: SetupPhaseProps) => {
  const [step, setStep] = useState<'config' | 'review'>('config');
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
    'Critical and negative',
    'Conspiratorial tone',
  ];

  const handleGenerateThread = () => {
    const generated = generateComments(topic, botOpinion, botStyle, 20);
    setComments(generated);
    setStep('review');
  };

  const toggleComment = (id: string) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id ? { ...c, isBotted: !c.isBotted } : c
      )
    );
  };

  const handleLockIn = () => {
    onComplete({ 
      topic, 
      botOpinion, 
      botStyle,
      opinionConfig: { stanceStrength: 50, positivity: 50, category: 'pro', theme: 'tech' },
      styleConfig: { sarcasm: 30, dismissiveness: 20, logic: 50, bulletPoints: 20, emotionalIntensity: 40, dramaticFlair: 30, postLength: 50, memeStyle: 20, pseudoIntellectual: 20, jargonUsage: 20, supportiveness: 50, agreeableness: 50 }
    }, comments);
  };

  const bottedCount = comments.filter(c => c.isBotted).length;
  const isConfigValid = topic.trim() && botOpinion.trim() && botStyle.trim();

  if (step === 'config') {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Bot className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Bot Leader Setup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Configure Your Bots
            </h1>
            <p className="text-muted-foreground text-lg">
              Set the topic, define what your bots believe, and choose their style
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6 glass p-8 rounded-2xl border border-border/50">
            {/* Topic */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MessageSquare className="w-4 h-4 text-primary" />
                Discussion Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Should AI art be considered real art?"
                className="input-game"
              />
            </div>

            {/* Bot Opinion */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                Bot Opinion / Stance
              </label>
              <textarea
                value={botOpinion}
                onChange={(e) => setBotOpinion(e.target.value)}
                placeholder="e.g., AI art is not real art because it lacks human emotion and creativity"
                className="input-game min-h-[100px] resize-none"
              />
            </div>

            {/* Bot Style */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Zap className="w-4 h-4 text-primary" />
                Bot Comment Style
              </label>
              <input
                type="text"
                value={botStyle}
                onChange={(e) => setBotStyle(e.target.value)}
                placeholder="e.g., Sarcastic and dismissive"
                className="input-game"
              />
              <div className="flex flex-wrap gap-2">
                {styleExamples.map((example) => (
                  <button
                    key={example}
                    onClick={() => setBotStyle(example)}
                    className="px-3 py-1.5 text-xs rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors border border-border/50"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateThread}
              disabled={!isConfigValid}
              className="btn-game w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate Thread
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="sticky top-0 z-10 glass p-4 rounded-2xl border border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Review & Tag Comments</h2>
              <p className="text-muted-foreground text-sm">
                Click comments to mark/unmark as "botted" for Player 2 to find
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{bottedCount}</div>
              <div className="text-xs text-muted-foreground">Marked as Bot</div>
            </div>
          </div>
          
          {/* Topic display */}
          <div className="p-3 rounded-xl bg-secondary/50 border border-border/30">
            <div className="text-xs text-muted-foreground mb-1">Topic</div>
            <div className="font-medium text-foreground">{topic}</div>
          </div>
          
          <button
            onClick={handleLockIn}
            disabled={bottedCount === 0}
            className="btn-game w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              Lock In & Start Game ({bottedCount} bots)
            </span>
          </button>
        </div>

        {/* Comments */}
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              mode="setup"
              isToggled={comment.isBotted}
              onToggle={() => toggleComment(comment.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
