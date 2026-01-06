import { useState, useCallback } from 'react';
import { GameResults, BotConfig, Comment, GameConfig, OpinionConfig, StyleConfig } from '@/types/game';
import { IntroScreen } from '@/components/game/IntroScreen';
import { LoadingScreen } from '@/components/game/LoadingScreen';
import { BotSetupModal } from '@/components/game/BotSetupModal';
import { EndScreen } from '@/components/game/EndScreen';
import { YouTubeGamePhase } from '@/components/game/YouTubeGamePhase';
import { TwitterGamePhase } from '@/components/game/TwitterGamePhase';
import { WhatsAppGamePhase } from '@/components/game/WhatsAppGamePhase';
import { LevelTransition } from '@/components/game/LevelTransition';
import { generateComments } from '@/utils/commentGenerator';

type GamePhase = 
  | 'intro' 
  | 'loading' 
  | 'youtube-playing' 
  | 'transition-twitter' 
  | 'twitter-playing' 
  | 'transition-whatsapp' 
  | 'whatsapp-playing' 
  | 'end-won'
  | 'end-lost'
  | 'restarting';

const DEFAULT_BOT_CONFIG: BotConfig = {
  friendlyAggressive: 50,
  logicalIllogical: 50,
  humorSerious: 50,
  sarcasmDirect: 50,
  openClosed: 50,
  minimalVerbose: 50,
  emojiAmount: 30,
  topic: "Women's rights"
};

const convertBotConfigToGameConfig = (botConfig: BotConfig): { opinionConfig: OpinionConfig; styleConfig: StyleConfig } => {
  return {
    opinionConfig: {
      stanceStrength: botConfig.friendlyAggressive,
      positivity: 100 - botConfig.friendlyAggressive,
      category: botConfig.friendlyAggressive > 50 ? 'oppose' : 'support',
      theme: 'social'
    },
    styleConfig: {
      sarcasm: 100 - botConfig.sarcasmDirect,
      dismissiveness: botConfig.friendlyAggressive,
      logic: 100 - botConfig.logicalIllogical,
      bulletPoints: botConfig.minimalVerbose > 70 ? 60 : 20,
      emotionalIntensity: botConfig.friendlyAggressive,
      dramaticFlair: 100 - botConfig.humorSerious,
      postLength: 100 - botConfig.minimalVerbose,
      memeStyle: 100 - botConfig.humorSerious,
      pseudoIntellectual: 100 - botConfig.logicalIllogical,
      jargonUsage: botConfig.minimalVerbose,
      supportiveness: 100 - botConfig.friendlyAggressive,
      agreeableness: 100 - botConfig.openClosed
    }
  };
};

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [botConfig, setBotConfig] = useState<BotConfig>(DEFAULT_BOT_CONFIG);
  const [showSetupModal, setShowSetupModal] = useState(false);
  
  const [lives, setLives] = useState(3);
  const [youtubeComments, setYoutubeComments] = useState<Comment[]>([]);
  const [twitterComments, setTwitterComments] = useState<Comment[]>([]);
  const [whatsappComments, setWhatsappComments] = useState<Comment[]>([]);
  
  const [youtubeResults, setYoutubeResults] = useState<GameResults | null>(null);
  const [twitterResults, setTwitterResults] = useState<GameResults | null>(null);
  const [whatsappResults, setWhatsappResults] = useState<GameResults | null>(null);

  const generateAllComments = useCallback((config: BotConfig) => {
    const { opinionConfig, styleConfig } = convertBotConfigToGameConfig(config);
    const botOpinion = `This is my stance on ${config.topic}`;
    
    const ytComments = generateComments(config.topic, botOpinion, '', 20, opinionConfig, styleConfig);
    const twComments = generateComments(config.topic, botOpinion, '', 25, opinionConfig, styleConfig);
    const waComments = generateComments(config.topic, botOpinion, '', 30, opinionConfig, styleConfig);
    
    setYoutubeComments(ytComments);
    setTwitterComments(twComments);
    setWhatsappComments(waComments);
  }, []);

  const handleStart = () => {
    generateAllComments(botConfig);
    setPhase('loading');
  };

  const handleSetupConfirm = (config: BotConfig) => {
    setBotConfig(config);
    setShowSetupModal(false);
  };

  const handleLoadingComplete = () => {
    setPhase('youtube-playing');
  };

  const handleLiveLost = () => {
    setLives(prev => prev - 1);
  };

  const handleGameOver = () => {
    setPhase('end-lost');
  };

  const handleYoutubeComplete = (results: GameResults) => {
    setYoutubeResults(results);
    setLives(3); // Reset lives for next level
    setPhase('transition-twitter');
  };

  const handleTwitterComplete = (results: GameResults) => {
    setTwitterResults(results);
    setLives(3); // Reset lives for next level
    setPhase('transition-whatsapp');
  };

  const handleWhatsAppComplete = (results: GameResults) => {
    setWhatsappResults(results);
    setPhase('end-won');
  };

  const handleRestart = () => {
    setPhase('restarting');
  };

  const handleRestartComplete = () => {
    // Reset all state
    setLives(3);
    setYoutubeResults(null);
    setTwitterResults(null);
    setWhatsappResults(null);
    setYoutubeComments([]);
    setTwitterComments([]);
    setWhatsappComments([]);
    setPhase('intro');
  };

  const handleLevelSelect = (level: 1 | 2 | 3) => {
    // Ensure comments are generated
    if (youtubeComments.length === 0) {
      generateAllComments(botConfig);
    }
    
    if (level === 1) {
      setPhase('youtube-playing');
    } else if (level === 2) {
      setPhase('twitter-playing');
    } else if (level === 3) {
      setPhase('whatsapp-playing');
    }
  };

  // Create default results for end screen if needed
  const defaultResults: GameResults = {
    totalBotted: 0,
    correctGuesses: 0,
    incorrectGuesses: 0,
    missedBotted: 0,
    timeRemaining: 0,
    timerExpired: false
  };

  return (
    <>
      {phase === 'intro' && (
        <>
          <IntroScreen 
            onStart={handleStart}
            onSetupBots={() => setShowSetupModal(true)}
          />
          <BotSetupModal
            isOpen={showSetupModal}
            onClose={() => setShowSetupModal(false)}
            onConfirm={handleSetupConfirm}
            initialConfig={botConfig}
          />
        </>
      )}

      {phase === 'loading' && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
          message="Starting"
          subMessage="Game starting..."
          color="red"
        />
      )}

      {phase === 'youtube-playing' && (
        <YouTubeGamePhase
          topic={botConfig.topic}
          comments={youtubeComments}
          lives={lives}
          onComplete={handleYoutubeComplete}
          onLiveLost={handleLiveLost}
          onGameOver={handleGameOver}
          onLevelSelect={handleLevelSelect}
        />
      )}

      {phase === 'transition-twitter' && (
        <LevelTransition
          fromLevel="YouTube"
          toLevel="Twitter/X"
          onComplete={() => setPhase('twitter-playing')}
        />
      )}

      {phase === 'twitter-playing' && (
        <TwitterGamePhase
          topic={botConfig.topic}
          comments={twitterComments}
          lives={lives}
          onComplete={handleTwitterComplete}
          onLiveLost={handleLiveLost}
          onGameOver={handleGameOver}
          onLevelSelect={handleLevelSelect}
        />
      )}

      {phase === 'transition-whatsapp' && (
        <LevelTransition
          fromLevel="Twitter/X"
          toLevel="WhatsApp"
          onComplete={() => setPhase('whatsapp-playing')}
        />
      )}

      {phase === 'whatsapp-playing' && (
        <WhatsAppGamePhase
          topic={botConfig.topic}
          comments={whatsappComments}
          lives={lives}
          onComplete={handleWhatsAppComplete}
          onLiveLost={handleLiveLost}
          onGameOver={handleGameOver}
          onLevelSelect={handleLevelSelect}
        />
      )}

      {phase === 'end-won' && (
        <EndScreen
          won={true}
          youtubeResults={youtubeResults || defaultResults}
          twitterResults={twitterResults || defaultResults}
          whatsappResults={whatsappResults || defaultResults}
          onRestart={handleRestart}
        />
      )}

      {phase === 'end-lost' && (
        <EndScreen
          won={false}
          youtubeResults={youtubeResults || defaultResults}
          twitterResults={twitterResults || defaultResults}
          whatsappResults={whatsappResults || defaultResults}
          onRestart={handleRestart}
        />
      )}

      {phase === 'restarting' && (
        <LoadingScreen
          onComplete={handleRestartComplete}
          message="RESTARTING"
          subMessage="Game restarting..."
          color="green"
        />
      )}
    </>
  );
};

export default Index;
