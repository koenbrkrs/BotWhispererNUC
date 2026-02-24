import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface GeneratingCommentsScreenProps {
  platform: 'youtube' | 'twitter' | 'whatsapp';
  onGenerated: () => void;
}

const platformColors = {
  youtube: '#EA4237',
  twitter: '#186BE0',
  whatsapp: '#00FF41',
};

const platformNames = {
  youtube: 'Robotube',
  twitter: 'Botter',
  whatsapp: 'Botsapp',
};

const messages = [
  'Generating realistic comments…',
  'Analyzing bot personality…',
  'Crafting authentic responses…',
  'Simulating social behavior…',
];

export const GeneratingCommentsScreen = ({ 
  platform, 
  onGenerated 
}: GeneratingCommentsScreenProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const color = platformColors[platform];
  const platformName = platformNames[platform];

  useEffect(() => {
    // Start generation immediately
    onGenerated();
  }, [onGenerated]);

  useEffect(() => {
    // Cycle through messages
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center font-retro z-50"
      style={{ 
        backgroundColor: '#0a0a0a',
        backgroundImage: `radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 70%)` 
      }}
    >
      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* Platform indicator */}
      <div 
        className="text-sm mb-4 tracking-wider opacity-70"
        style={{ color }}
      >
        LEVEL: {platformName.toUpperCase()}
      </div>

      {/* Spinner */}
      <div className="relative mb-8">
        <Loader2 
          className="animate-spin" 
          size={64} 
          style={{ color }} 
        />
        <div 
          className="absolute inset-0 animate-ping opacity-30"
          style={{ 
            border: `2px solid ${color}`,
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Main message */}
      <h1 
        className="text-2xl md:text-3xl mb-4 text-center animate-pulse"
        style={{ color }}
      >
        {messages[messageIndex]}
      </h1>

      {/* Sub message */}
      <p className="text-white/50 text-sm text-center max-w-md px-4">
        Using AI to create unique bot and human comments based on your personality settings
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= messageIndex ? color : 'rgba(255,255,255,0.2)',
              transform: i === messageIndex ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Retro border effect */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-40"
        style={{ color }}
      >
        ▸ PLEASE WAIT ◂
      </div>
    </div>
  );
};
