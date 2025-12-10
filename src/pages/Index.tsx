import { useState } from 'react';
import { GamePhase, Comment, GameConfig, GameResults } from '@/types/game';
import { YouTubeSetupPhase } from '@/components/game/YouTubeSetupPhase';
import { YouTubeHandoffModal } from '@/components/game/YouTubeHandoffModal';
import { YouTubeGamePhase } from '@/components/game/YouTubeGamePhase';
import { YouTubeRevealPhase } from '@/components/game/YouTubeRevealPhase';

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [results, setResults] = useState<GameResults | null>(null);

  const handleSetupComplete = (gameConfig: GameConfig, gameComments: Comment[]) => {
    setConfig(gameConfig);
    setComments(gameComments);
    setPhase('handoff');
  };

  const handleHandoffContinue = () => {
    setPhase('playing');
  };

  const handleGameComplete = (gameResults: GameResults) => {
    setResults(gameResults);
    setPhase('reveal');
  };

  const handlePlayAgain = () => {
    setPhase('setup');
    setConfig(null);
    setComments([]);
    setResults(null);
  };

  return (
    <>
      {phase === 'setup' && (
        <YouTubeSetupPhase onComplete={handleSetupComplete} />
      )}

      {phase === 'handoff' && config && (
        <YouTubeHandoffModal 
          onContinue={handleHandoffContinue} 
          topic={config.topic}
        />
      )}

      {phase === 'playing' && config && (
        <YouTubeGamePhase
          topic={config.topic}
          comments={comments}
          onComplete={handleGameComplete}
        />
      )}

      {phase === 'reveal' && config && results && (
        <YouTubeRevealPhase
          config={config}
          comments={comments}
          results={results}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
};

export default Index;
