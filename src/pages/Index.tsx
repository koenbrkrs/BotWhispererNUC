import { useState } from 'react';
import { GamePhase, Comment, GameConfig, GameResults } from '@/types/game';
import { SetupPhase } from '@/components/game/SetupPhase';
import { HandoffModal } from '@/components/game/HandoffModal';
import { GamePhase as PlayingPhase } from '@/components/game/GamePhase';
import { RevealPhase } from '@/components/game/RevealPhase';

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
    <div className="min-h-screen bg-background">
      {phase === 'setup' && (
        <SetupPhase onComplete={handleSetupComplete} />
      )}

      {phase === 'handoff' && (
        <HandoffModal onContinue={handleHandoffContinue} />
      )}

      {phase === 'playing' && config && (
        <PlayingPhase
          topic={config.topic}
          comments={comments}
          onComplete={handleGameComplete}
        />
      )}

      {phase === 'reveal' && config && results && (
        <RevealPhase
          config={config}
          comments={comments}
          results={results}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
};

export default Index;
