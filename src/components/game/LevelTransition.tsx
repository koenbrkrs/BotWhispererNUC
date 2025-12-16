import { useEffect, useState } from 'react';

interface LevelTransitionProps {
  fromLevel: string;
  toLevel: string;
  onComplete: () => void;
}

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

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="text-center">
        {step === 0 && (
          <div className="animate-fade-in">
            <p className="text-2xl text-white/60 mb-2">Level Complete</p>
            <h2 className="text-4xl font-bold text-white">{fromLevel}</h2>
          </div>
        )}
        {step === 1 && (
          <div className="animate-fade-in">
            <p className="text-xl text-white/60 mb-4">Moving to</p>
            <h2 className="text-5xl font-bold text-blue-500">{toLevel}</h2>
            <p className="text-lg text-white/40 mt-4">Infiltrate the timeline...</p>
          </div>
        )}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
};
