import { useEffect, useState } from 'react';

interface LevelTransitionProps {
  fromLevel: string;
  toLevel: string;
  onComplete: () => void;
}

// Updated colors
const colors = {
  youtube: '#EA4237',
  twitter: '#186BE0',
  whatsapp: '#00FF41',
  success: '#00FF41'
};

export const LevelTransition = ({ fromLevel, toLevel, onComplete }: LevelTransitionProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 1500);
    const timer3 = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const getLevelColor = (level: string) => {
    if (level.includes('Twitter')) return colors.twitter;
    if (level.includes('WhatsApp')) return colors.whatsapp;
    return colors.youtube;
  };

  const levelColor = getLevelColor(toLevel);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center font-retro">
      <div className="text-center">
        {step === 0 && (
          <div className="animate-fade-in">
            <p className="text-2xl text-white/60 mb-2">Level Complete</p>
            <h2 className="text-4xl" style={{ color: colors.success }}>{fromLevel}</h2>
          </div>
        )}
        {step === 1 && (
          <div className="animate-fade-in">
            <p className="text-xl text-white/60 mb-4">Moving to</p>
            <h2 className="text-5xl" style={{ color: levelColor }}>{toLevel}</h2>
            <p className="text-lg text-white/40 mt-4">Infiltrate the timeline...</p>
          </div>
        )}
        {step === 2 && (
          <div className="animate-fade-in">
            <div 
              className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto"
              style={{ borderColor: levelColor, borderTopColor: 'transparent' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
