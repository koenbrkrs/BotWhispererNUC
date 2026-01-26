import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GameScoreboardProps {
  timeRemaining: number;
  lives: number;
  maxLives?: number;
  spottedBots: number;
  currentLevel: 1 | 2 | 3;
  isRunning: boolean;
  onTimeUp: () => void;
  onTick?: (time: number) => void;
}

export const GameScoreboard = ({ 
  timeRemaining: initialTime, 
  lives, 
  maxLives = 3, 
  spottedBots,
  currentLevel,
  isRunning,
  onTimeUp,
  onTick
}: GameScoreboardProps) => {
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
    1: { main: '#EA4237', name: 'YouTube' }, // Red
    2: { main: '#186BE0', name: 'Twitter' }, // Blue
    3: { main: '#00FF41', name: 'WhatsApp' }, // Green
  };

  const currentColor = platformColors[currentLevel].main;

  return (
    <div 
      className="fixed top-4 right-4 z-50 font-retro"
      style={{ minWidth: '280px' }}
    >
      <div 
        className="border-2 p-3"
        style={{ 
          backgroundColor: '#0a0a0a',
          borderColor: currentColor 
        }}
      >
        {/* Colored bar at top */}
        <div 
          className="h-3 mb-3 -mt-1 -mx-1"
          style={{ backgroundColor: currentColor }}
        />

        {/* TIME row */}
        <div className="flex justify-between items-center mb-2">
          <span 
            className={`text-sm font-bold tracking-wider ${isUrgent ? 'animate-pulse' : ''}`}
            style={{ color: currentColor }}
          >
            TIME
          </span>
          <span 
            className={`text-lg font-bold tracking-widest ${isUrgent ? 'animate-pulse' : ''}`}
            style={{ color: currentColor }}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        {/* HEALTH row */}
        <div className="flex justify-between items-center mb-2">
          <span 
            className="text-sm font-bold tracking-wider"
            style={{ color: currentColor }}
          >
            HEALTH
          </span>
          <div className="flex items-center gap-1">
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
        </div>

        {/* SPOTTED BOTS row */}
        <div className="flex justify-between items-center">
          <span 
            className="text-sm font-bold tracking-wider"
            style={{ color: currentColor }}
          >
            SPOTTED BOTS
          </span>
          <span 
            className="text-lg font-bold"
            style={{ color: currentColor }}
          >
            {spottedBots}
          </span>
        </div>
      </div>
    </div>
  );
};
