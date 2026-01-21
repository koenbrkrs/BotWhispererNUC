import { useEffect, useState } from 'react';

interface UrgencyBorderProps {
  timeRemaining: number;
  currentLevel: 1 | 2 | 3;
  isRunning: boolean;
}

export const UrgencyBorder = ({ timeRemaining, currentLevel, isRunning }: UrgencyBorderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show border only when time is 10 seconds or less and game is running
    const shouldShow = isRunning && timeRemaining <= 10 && timeRemaining > 0;
    setIsVisible(shouldShow);
  }, [timeRemaining, isRunning]);

  if (!isVisible) return null;

  // Platform-specific colors
  const colors = {
    1: { border: '#FF1A1A', glow: 'rgba(255, 26, 26, 0.4)' }, // YouTube red
    2: { border: '#1D9BF0', glow: 'rgba(29, 155, 240, 0.4)' }, // Twitter blue
    3: { border: '#25D366', glow: 'rgba(37, 211, 102, 0.4)' }, // WhatsApp green
  };

  const color = colors[currentLevel];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] animate-urgency-pulse"
      style={{
        border: `4px solid ${color.border}`,
        boxShadow: `inset 0 0 20px ${color.glow}, 0 0 20px ${color.glow}`,
        opacity: 0.7,
      }}
    />
  );
};
