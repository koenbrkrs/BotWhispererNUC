import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderScoreboardProps {
  timeRemaining: number;
  lives: number;
  maxLives?: number;
  spottedBots: number;
  totalBots: number;
  currentLevel: 1 | 2 | 3;
  isRunning: boolean;
  onTimeUp: () => void;
  onTick?: (time: number) => void;
}

export const HeaderScoreboard = ({ 
  timeRemaining: initialTime, 
  lives, 
  maxLives = 3, 
  spottedBots,
  totalBots,
  currentLevel,
  isRunning,
  onTimeUp,
  onTick
}: HeaderScoreboardProps) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isRunning || time <= 0) return;

    const interval = setInterval(() => {
      setTime(prev => {
        const next = prev - 1;
        onTick?.(next);
        if (next <= 0) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp, onTick]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const isUrgent = time <= 10;

  // Platform-specific colors
  const platformColors = {
    1: '#EA4237', // YouTube Red
    2: '#186BE0', // Twitter Blue
    3: '#00FF41', // WhatsApp Green
  };

  const currentColor = platformColors[currentLevel];

  return (
    <div className="flex items-center gap-2 font-retro text-sm">
      {/* Time */}
      <span 
        className={`text-white font-bold tracking-wider ${isUrgent ? 'animate-pulse' : ''}`}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      
      {/* Separator */}
      <span className="text-white/50">|</span>
      
      {/* Hearts */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxLives }).map((_, i) => (
          <Heart
            key={i}
            size={18}
            style={{ 
              color: currentColor,
              fill: i < lives ? currentColor : 'transparent',
              opacity: i < lives ? 1 : 0.3
            }}
          />
        ))}
      </div>
      
      {/* Separator */}
      <span className="text-white/50">|</span>
      
      {/* Bots Found */}
      <span 
        className="font-bold tracking-wide"
        style={{ color: currentColor }}
      >
        {spottedBots}/{totalBots} Bots Found
      </span>
    </div>
  );
};
