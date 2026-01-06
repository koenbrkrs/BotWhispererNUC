import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  message?: string;
  subMessage?: string;
  color?: 'red' | 'green';
}

export const LoadingScreen = ({ 
  onComplete, 
  message = "Starting", 
  subMessage = "Game starting...",
  color = 'red'
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const colorClass = color === 'green' ? 'text-retro-green' : 'text-retro-red';
  const bgColorClass = color === 'green' ? 'bg-retro-green' : 'bg-retro-red';
  const borderColorClass = color === 'green' ? 'border-retro-green' : 'border-retro-red';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center p-8 font-retro">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Title */}
        <h1 className={`text-4xl md:text-5xl ${colorClass}`}>
          {message}
        </h1>

        {/* Progress Bar */}
        <div className={`w-full h-12 border-2 ${borderColorClass} relative`}>
          <div 
            className={`h-full ${bgColorClass} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Sub message */}
        <p className="text-white/70 text-lg">
          {subMessage}
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 text-retro-muted text-xs">
        Made by: Malmö University Students
      </div>
    </div>
  );
};
