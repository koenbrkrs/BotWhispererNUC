import { Youtube, Twitter, CheckCircle, MessageCircle } from 'lucide-react';

interface LevelIndicatorProps {
  currentLevel: 1 | 2 | 3;
  level1Complete: boolean;
  level2Complete: boolean;
  level3Complete: boolean;
}

export const LevelIndicator = ({ currentLevel, level1Complete, level2Complete, level3Complete }: LevelIndicatorProps) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md rounded-full px-6 py-2 border border-white/10">
      <div className="flex items-center gap-4">
        {/* Level 1 - YouTube */}
        <div className={`flex items-center gap-2 ${currentLevel === 1 ? 'opacity-100' : 'opacity-50'}`}>
          <div className={`p-1.5 rounded-full ${level1Complete ? 'bg-green-500' : currentLevel === 1 ? 'bg-red-500' : 'bg-gray-600'}`}>
            {level1Complete ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <Youtube className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="text-sm text-white font-medium">YouTube</span>
        </div>

        {/* Connector 1 */}
        <div className={`w-8 h-0.5 ${level1Complete ? 'bg-green-500' : 'bg-gray-600'}`} />

        {/* Level 2 - Twitter */}
        <div className={`flex items-center gap-2 ${currentLevel === 2 ? 'opacity-100' : 'opacity-50'}`}>
          <div className={`p-1.5 rounded-full ${level2Complete ? 'bg-green-500' : currentLevel === 2 ? 'bg-blue-500' : 'bg-gray-600'}`}>
            {level2Complete ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <Twitter className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="text-sm text-white font-medium">Twitter/X</span>
        </div>

        {/* Connector 2 */}
        <div className={`w-8 h-0.5 ${level2Complete ? 'bg-green-500' : 'bg-gray-600'}`} />

        {/* Level 3 - WhatsApp */}
        <div className={`flex items-center gap-2 ${currentLevel === 3 ? 'opacity-100' : 'opacity-50'}`}>
          <div className={`p-1.5 rounded-full ${level3Complete ? 'bg-green-500' : currentLevel === 3 ? 'bg-[#25D366]' : 'bg-gray-600'}`}>
            {level3Complete ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <MessageCircle className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="text-sm text-white font-medium">WhatsApp</span>
        </div>
      </div>
    </div>
  );
};
