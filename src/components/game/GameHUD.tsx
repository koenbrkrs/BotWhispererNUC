import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GameHUDProps {
  timeRemaining: number;
  lives: number;
  maxLives?: number;
  currentLevel: 1 | 2 | 3;
  isRunning: boolean;
  onTimeUp: () => void;
  onTick?: (time: number) => void;
}

export const GameHUD = ({ 
  timeRemaining: initialTime, 
  lives, 
  maxLives = 3, 
  currentLevel,
  isRunning,
  onTimeUp,
  onTick
}: GameHUDProps) => {
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
  const isUrgent = time <= 30;

  // Platform-specific heart color
  const heartColor = currentLevel === 1 
    ? 'text-red-500' 
    : currentLevel === 2 
      ? 'text-twitter-blue' 
      : 'text-[#25D366]';

  const heartFillColor = currentLevel === 1 
    ? 'fill-red-500' 
    : currentLevel === 2 
      ? 'fill-twitter-blue' 
      : 'fill-[#25D366]';

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
      {/* Timer */}
      <div className={`text-xl font-mono font-bold ${isUrgent ? 'text-red-500 animate-pulse' : 'text-white'}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-white/20" />

      {/* Lives/Hearts */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxLives }).map((_, i) => (
          <Heart
            key={i}
            size={20}
            className={`${i < lives ? `${heartColor} ${heartFillColor}` : 'text-gray-600'} transition-all ${i < lives ? '' : 'opacity-30'}`}
          />
        ))}
      </div>
    </div>
  );
};
