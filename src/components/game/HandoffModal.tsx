import { useState } from 'react';
import { Users, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface HandoffModalProps {
  onContinue: () => void;
}

export const HandoffModal = ({ onContinue }: HandoffModalProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/95 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 pulse-glow">
          <Users className="w-10 h-10 text-primary" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Hand Over the Device</h2>
          <p className="text-muted-foreground">
            Pass the device to Player 2 (the Detector) without showing the screen
          </p>
        </div>

        {/* Instructions */}
        <div className="glass p-6 rounded-2xl border border-border/50 text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Don't peek at the settings</p>
              <p className="text-sm text-muted-foreground">Player 2 shouldn't know the bot opinion or style</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div>
              <p className="font-medium text-foreground">2 minutes to find all bots</p>
              <p className="text-sm text-muted-foreground">Tap comments you think are bot-generated</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Correct = disappears, Wrong = turns red</p>
              <p className="text-sm text-muted-foreground">Be strategic with your guesses!</p>
            </div>
          </div>
        </div>

        {/* Ready checkbox */}
        <label className="flex items-center justify-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setIsReady(!isReady)}
            className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${
              isReady 
                ? 'bg-primary border-primary' 
                : 'border-muted-foreground group-hover:border-primary'
            }`}
          >
            {isReady && (
              <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-foreground">Player 2 has the device and is ready</span>
        </label>

        {/* Start button */}
        <button
          onClick={onContinue}
          disabled={!isReady}
          className="btn-game w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="flex items-center justify-center gap-2">
            Start Detection Game
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
};
