import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  duration: number; // in seconds
  isRunning: boolean;
  onComplete: () => void;
  onTick?: (remaining: number) => void;
}

export const Timer = ({ duration, isRunning, onComplete, onTick }: TimerProps) => {
  const [remaining, setRemaining] = useState(duration);
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (onTick) onTick(next);
        if (next <= 0) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return next;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, onComplete, onTick]);
  
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isCritical = remaining <= 30;
  const percentage = (remaining / duration) * 100;
  
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Time display */}
      <div
        className={cn(
          'flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-3xl font-bold transition-all',
          isCritical ? 'timer-critical bg-destructive/20' : 'text-foreground bg-secondary'
        )}
      >
        <Clock className={cn('w-6 h-6', isCritical && 'text-destructive')} />
        <span>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full max-w-xs h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-1000 ease-linear rounded-full',
            isCritical ? 'bg-destructive' : 'bg-primary'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
