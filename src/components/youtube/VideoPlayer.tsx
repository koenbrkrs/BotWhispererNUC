import { Play, Settings, Maximize, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { useState } from 'react';

// Dimmed color for non-interactive elements
const dimmedColor = '#787878';

interface VideoPlayerProps {
  title?: string;
}

export const VideoPlayer = ({ title = "Video" }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group">
      {/* Video thumbnail / black screen */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      
      {/* Center play button - dimmed */}
      {!isPlaying && (
        <button 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center z-10 cursor-not-allowed"
        >
          <div 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(120, 120, 120, 0.8)' }}
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Video controls bar - dimmed */}
      <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Progress bar */}
        <div className="relative h-1 bg-white/30 mx-0 cursor-not-allowed">
          <div className="absolute left-0 top-0 h-full w-[35%]" style={{ backgroundColor: dimmedColor }}>
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0"
              style={{ backgroundColor: dimmedColor }}
            />
          </div>
          <div className="absolute left-[35%] top-0 h-full w-[15%] bg-white/30" />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/90 to-transparent">
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded cursor-not-allowed">
              <SkipBack className="w-5 h-5" style={{ color: dimmedColor }} />
            </button>
            <button className="p-1.5 rounded cursor-not-allowed">
              {isPlaying ? (
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-5 rounded-sm" style={{ backgroundColor: dimmedColor }} />
                  <div className="w-1.5 h-5 rounded-sm" style={{ backgroundColor: dimmedColor }} />
                </div>
              ) : (
                <Play className="w-5 h-5" style={{ color: dimmedColor }} fill={dimmedColor} />
              )}
            </button>
            <button className="p-1.5 rounded cursor-not-allowed">
              <SkipForward className="w-5 h-5" style={{ color: dimmedColor }} />
            </button>
            <button className="p-1.5 rounded cursor-not-allowed">
              <Volume2 className="w-5 h-5" style={{ color: dimmedColor }} />
            </button>
            <span className="text-xs ml-2" style={{ color: dimmedColor }}>
              4:23 / 12:45
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded cursor-not-allowed">
              <Settings className="w-5 h-5" style={{ color: dimmedColor }} />
            </button>
            <button className="p-1.5 rounded cursor-not-allowed">
              <Maximize className="w-5 h-5" style={{ color: dimmedColor }} />
            </button>
          </div>
        </div>
      </div>

      {/* Fake video content - gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10" />
    </div>
  );
};
