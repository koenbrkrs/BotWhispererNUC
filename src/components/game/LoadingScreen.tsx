import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  message?: string;
  subMessage?: string;
  color?: 'red' | 'green' | 'blue';
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

  // Updated color values
  const colorMap = {
    red: '#EA4237',
    green: '#00FF41',
    blue: '#186BE0'
  };

  const currentColor = colorMap[color];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center p-8 font-retro">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Title */}
        <h1 
          className="text-4xl md:text-5xl"
          style={{ color: currentColor }}
        >
          {message}
        </h1>

        {/* Progress Bar */}
        <div 
          className="w-full h-12 border-2 relative"
          style={{ borderColor: currentColor }}
        >
          <div 
            className="h-full transition-all duration-100 ease-linear"
            style={{ 
              width: `${progress}%`,
              backgroundColor: currentColor 
            }}
          />
        </div>

        {/* Sub message */}
        <p className="text-white/70 text-lg">
          {subMessage}
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 text-[#787878] text-xs">
        Made by: Malmö University Students
      </div>
    </div>
  );
};
