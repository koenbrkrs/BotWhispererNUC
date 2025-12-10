import { Play, Settings, Maximize, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { useState } from 'react';

interface VideoPlayerProps {
  title?: string;
}

export const VideoPlayer = ({ title = "Video" }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group">
      {/* Video thumbnail / black screen */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      
      {/* Center play button */}
      {!isPlaying && (
        <button 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-black/80 hover:bg-yt-red rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Video controls bar */}
      <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Progress bar */}
        <div className="relative h-1 bg-white/30 mx-0 cursor-pointer group/progress">
          <div className="absolute left-0 top-0 h-full w-[35%] bg-yt-red">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-yt-red rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
          </div>
          <div className="absolute left-[35%] top-0 h-full w-[15%] bg-white/50" />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/90 to-transparent">
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <SkipBack className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
            >
              {isPlaying ? (
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-5 bg-white rounded-sm" />
                  <div className="w-1.5 h-5 bg-white rounded-sm" />
                </div>
              ) : (
                <Play className="w-5 h-5 text-white" fill="white" />
              )}
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <SkipForward className="w-5 h-5 text-white" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <Volume2 className="w-5 h-5 text-white" />
            </button>
            <span className="text-white text-xs ml-2">
              4:23 / 12:45
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Fake video content - gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10" />
    </div>
  );
};
