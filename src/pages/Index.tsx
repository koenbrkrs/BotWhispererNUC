import { useState } from 'react';
import { GamePhase, Comment, GameConfig, GameResults } from '@/types/game';
import { YouTubeSetupPhase } from '@/components/game/YouTubeSetupPhase';
import { YouTubeHandoffModal } from '@/components/game/YouTubeHandoffModal';
import { YouTubeGamePhase } from '@/components/game/YouTubeGamePhase';
import { YouTubeRevealPhase } from '@/components/game/YouTubeRevealPhase';
import { TwitterGamePhase } from '@/components/game/TwitterGamePhase';
import { TwitterRevealPhase } from '@/components/game/TwitterRevealPhase';
import { WhatsAppGamePhase } from '@/components/game/WhatsAppGamePhase';
import { WhatsAppRevealPhase } from '@/components/game/WhatsAppRevealPhase';
import { LevelTransition } from '@/components/game/LevelTransition';
import { LevelIndicator } from '@/components/game/LevelIndicator';
import { FinalResults } from '@/components/game/FinalResults';
import { generateComments } from '@/utils/commentGenerator';

type ExtendedGamePhase = GamePhase | 'youtube-reveal' | 'transition-twitter' | 'twitter-playing' | 'twitter-reveal' | 'transition-whatsapp' | 'whatsapp-playing' | 'whatsapp-reveal' | 'final';

const Index = () => {
  const [phase, setPhase] = useState<ExtendedGamePhase>('setup');
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [youtubeComments, setYoutubeComments] = useState<Comment[]>([]);
  const [twitterComments, setTwitterComments] = useState<Comment[]>([]);
  const [whatsappComments, setWhatsappComments] = useState<Comment[]>([]);
  const [youtubeResults, setYoutubeResults] = useState<GameResults | null>(null);
  const [twitterResults, setTwitterResults] = useState<GameResults | null>(null);
  const [whatsappResults, setWhatsappResults] = useState<GameResults | null>(null);

  const getCurrentLevel = (): 1 | 2 | 3 => {
    if (phase.startsWith('whatsapp') || phase === 'final') return 3;
    if (phase.startsWith('twitter') || phase === 'transition-whatsapp') return 2;
    return 1;
  };

  const currentLevel = getCurrentLevel();
  const level1Complete = youtubeResults !== null;
  const level2Complete = twitterResults !== null;
  const level3Complete = whatsappResults !== null;

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

    // Generate WhatsApp comments with same config
    const whatsappCommentsGenerated = generateComments(
      gameConfig.topic, 
      gameConfig.botOpinion, 
      gameConfig.botStyle, 
      25, 
      gameConfig.opinionConfig, 
      gameConfig.styleConfig
    );
    setWhatsappComments(whatsappCommentsGenerated);
    
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
    setPhase('transition-twitter');
  };

  const handleTwitterTransitionComplete = () => {
    setPhase('twitter-playing');
  };

  const handleTwitterComplete = (gameResults: GameResults) => {
    setTwitterResults(gameResults);
    setPhase('twitter-reveal');
  };

  const handleTwitterRevealContinue = () => {
    setPhase('transition-whatsapp');
  };

  const handleWhatsAppTransitionComplete = () => {
    setPhase('whatsapp-playing');
  };

  const handleWhatsAppComplete = (gameResults: GameResults) => {
    setWhatsappResults(gameResults);
    setPhase('whatsapp-reveal');
  };

  const handleWhatsAppRevealContinue = () => {
    setPhase('final');
  };

  const handlePlayAgain = () => {
    setPhase('setup');
    setConfig(null);
    setYoutubeComments([]);
    setTwitterComments([]);
    setWhatsappComments([]);
    setYoutubeResults(null);
    setTwitterResults(null);
    setWhatsappResults(null);
  };

  const showLevelIndicator = ['playing', 'youtube-reveal', 'twitter-playing', 'twitter-reveal', 'whatsapp-playing', 'whatsapp-reveal'].includes(phase);

  return (
    <>
      {showLevelIndicator && (
        <LevelIndicator
          currentLevel={currentLevel}
          level1Complete={level1Complete}
          level2Complete={level2Complete}
          level3Complete={level3Complete}
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

      {phase === 'transition-twitter' && (
        <LevelTransition
          fromLevel="YouTube"
          toLevel="Twitter/X"
          onComplete={handleTwitterTransitionComplete}
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

      {phase === 'transition-whatsapp' && (
        <LevelTransition
          fromLevel="Twitter/X"
          toLevel="WhatsApp"
          onComplete={handleWhatsAppTransitionComplete}
        />
      )}

      {phase === 'whatsapp-playing' && config && (
        <WhatsAppGamePhase
          topic={config.topic}
          comments={whatsappComments}
          onComplete={handleWhatsAppComplete}
        />
      )}

      {phase === 'whatsapp-reveal' && config && whatsappResults && (
        <WhatsAppRevealPhase
          config={config}
          comments={whatsappComments}
          results={whatsappResults}
          onPlayAgain={handlePlayAgain}
          onContinue={handleWhatsAppRevealContinue}
          showContinue={true}
        />
      )}

      {phase === 'final' && config && youtubeResults && twitterResults && whatsappResults && (
        <FinalResults
          config={config}
          youtubeResults={youtubeResults}
          twitterResults={twitterResults}
          whatsappResults={whatsappResults}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
};

export default Index;
