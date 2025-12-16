import { useState } from 'react';
import { GamePhase, Comment, GameConfig, GameResults } from '@/types/game';
import { YouTubeSetupPhase } from '@/components/game/YouTubeSetupPhase';
import { YouTubeHandoffModal } from '@/components/game/YouTubeHandoffModal';
import { YouTubeGamePhase } from '@/components/game/YouTubeGamePhase';
import { YouTubeRevealPhase } from '@/components/game/YouTubeRevealPhase';
import { TwitterGamePhase } from '@/components/game/TwitterGamePhase';
import { TwitterRevealPhase } from '@/components/game/TwitterRevealPhase';
import { LevelTransition } from '@/components/game/LevelTransition';
import { LevelIndicator } from '@/components/game/LevelIndicator';
import { FinalResults } from '@/components/game/FinalResults';
import { generateComments } from '@/utils/commentGenerator';

type ExtendedGamePhase = GamePhase | 'youtube-reveal' | 'transition' | 'twitter-handoff' | 'twitter-playing' | 'twitter-reveal' | 'final';

const Index = () => {
  const [phase, setPhase] = useState<ExtendedGamePhase>('setup');
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [youtubeComments, setYoutubeComments] = useState<Comment[]>([]);
  const [twitterComments, setTwitterComments] = useState<Comment[]>([]);
  const [youtubeResults, setYoutubeResults] = useState<GameResults | null>(null);
  const [twitterResults, setTwitterResults] = useState<GameResults | null>(null);

  const currentLevel = phase.startsWith('twitter') || phase === 'final' ? 2 : 1;
  const level1Complete = youtubeResults !== null;
  const level2Complete = twitterResults !== null;

  const handleSetupComplete = (gameConfig: GameConfig, gameComments: Comment[]) => {
    setConfig(gameConfig);
    setYoutubeComments(gameComments);
    
    // Generate Twitter comments with same config
    const twitterCommentsGenerated = generateComments(
      gameConfig.topic, 
      gameConfig.botOpinion, 
      gameConfig.botStyle, 
      20, 
      gameConfig.opinionConfig, 
      gameConfig.styleConfig
    );
    setTwitterComments(twitterCommentsGenerated);
    
    setPhase('handoff');
  };

  const handleHandoffContinue = () => {
    setPhase('playing');
  };

  const handleYoutubeComplete = (gameResults: GameResults) => {
    setYoutubeResults(gameResults);
    setPhase('youtube-reveal');
  };

  const handleYoutubeRevealContinue = () => {
    setPhase('transition');
  };

  const handleTransitionComplete = () => {
    setPhase('twitter-playing');
  };

  const handleTwitterComplete = (gameResults: GameResults) => {
    setTwitterResults(gameResults);
    setPhase('twitter-reveal');
  };

  const handleTwitterRevealContinue = () => {
    setPhase('final');
  };

  const handlePlayAgain = () => {
    setPhase('setup');
    setConfig(null);
    setYoutubeComments([]);
    setTwitterComments([]);
    setYoutubeResults(null);
    setTwitterResults(null);
  };

  const showLevelIndicator = ['playing', 'youtube-reveal', 'twitter-playing', 'twitter-reveal'].includes(phase);

  return (
    <>
      {showLevelIndicator && (
        <LevelIndicator
          currentLevel={currentLevel}
          level1Complete={level1Complete}
          level2Complete={level2Complete}
        />
      )}

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
          comments={youtubeComments}
          onComplete={handleYoutubeComplete}
        />
      )}

      {phase === 'youtube-reveal' && config && youtubeResults && (
        <YouTubeRevealPhase
          config={config}
          comments={youtubeComments}
          results={youtubeResults}
          onPlayAgain={handlePlayAgain}
          onContinue={handleYoutubeRevealContinue}
          showContinue={true}
        />
      )}

      {phase === 'transition' && (
        <LevelTransition
          fromLevel="YouTube"
          toLevel="Twitter/X"
          onComplete={handleTransitionComplete}
        />
      )}

      {phase === 'twitter-playing' && config && (
        <TwitterGamePhase
          topic={config.topic}
          comments={twitterComments}
          onComplete={handleTwitterComplete}
        />
      )}

      {phase === 'twitter-reveal' && config && twitterResults && (
        <TwitterRevealPhase
          config={config}
          comments={twitterComments}
          results={twitterResults}
          onPlayAgain={handlePlayAgain}
          onContinue={handleTwitterRevealContinue}
          showContinue={true}
        />
      )}

      {phase === 'final' && config && youtubeResults && twitterResults && (
        <FinalResults
          config={config}
          youtubeResults={youtubeResults}
          twitterResults={twitterResults}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
};

export default Index;
