import { useState, useCallback, useRef } from 'react';
import { GameResults, BotConfig, Comment } from '@/types/game';
import { IntroScreen } from '@/components/game/IntroScreen';
import { LoadingScreen } from '@/components/game/LoadingScreen';
import { BotSetupModal } from '@/components/game/BotSetupModal';
import { EndScreen } from '@/components/game/EndScreen';
import { YouTubeGamePhase } from '@/components/game/YouTubeGamePhase';
import { TwitterGamePhase } from '@/components/game/TwitterGamePhase';
import { WhatsAppGamePhase } from '@/components/game/WhatsAppGamePhase';
import { LevelTransition } from '@/components/game/LevelTransition';
import { GeneratingCommentsScreen } from '@/components/game/GeneratingCommentsScreen';
import { generateLLMComments, clearCommentCache } from '@/utils/llmCommentGenerator';
import { toast } from 'sonner';

type GamePhase = 
  | 'intro' 
  | 'loading' 
  | 'generating-youtube'
  | 'youtube-playing' 
  | 'generating-twitter'
  | 'transition-twitter' 
  | 'twitter-playing' 
  | 'generating-whatsapp'
  | 'transition-whatsapp' 
  | 'whatsapp-playing' 
  | 'end-won'
  | 'end-lost'
  | 'restarting';

const STANCE_OPTIONS: Record<string, string[]> = {
  "Women's rights": [
    "Strongly support gender equality and reproductive rights",
    "Moderately in favor of women's empowerment",
    "Neutral on most issues but support basic rights",
    "Skeptical of feminist movements",
    "Opposed to expanding women's rights further"
  ],
  "Data centers": [
    "Essential for tech advancement and should expand rapidly",
    "Necessary but need better environmental regulations",
    "Neutral – pros and cons balance out",
    "Overhyped and energy-wasting",
    "Should be heavily restricted due to environmental impact"
  ],
  "Immigration": [
    "Open borders and welcome all immigrants",
    "Support legal immigration with reforms",
    "Neutral – depends on economic needs",
    "Tighter controls needed for security",
    "Strict limits and deportation policies"
  ],
  "Pineapple on pizza": [
    "It's incredible and a delicious innovation",
    "Fun occasional twist but not traditional",
    "Neutral – to each their own",
    "It's the biggest pizza scandal in the world",
    "Has nothing to do with pizza and ruins the culture"
  ]
};

const DEFAULT_BOT_CONFIG: BotConfig = {
  friendlyAggressive: 50,
  logicalIllogical: 50,
  humorSerious: 50,
  sarcasmDirect: 50,
  openClosed: 50,
  minimalVerbose: 50,
  emojiAmount: 30,
  topic: "Women's rights",
  stance: STANCE_OPTIONS["Women's rights"][0]
};

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [botConfig, setBotConfig] = useState<BotConfig>(DEFAULT_BOT_CONFIG);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [hasSetupBots, setHasSetupBots] = useState(false);
  const [consent, setConsent] = useState(false);
  
  const [lives, setLives] = useState(3);
  const [youtubeComments, setYoutubeComments] = useState<Comment[]>([]);
  const [twitterComments, setTwitterComments] = useState<Comment[]>([]);
  const [whatsappComments, setWhatsappComments] = useState<Comment[]>([]);
  
  const [youtubeResults, setYoutubeResults] = useState<GameResults | null>(null);
  const [twitterResults, setTwitterResults] = useState<GameResults | null>(null);
  const [whatsappResults, setWhatsappResults] = useState<GameResults | null>(null);

  // Track total time used across levels
  const totalTimeUsedRef = useRef(0);

  const generateYoutubeComments = useCallback(async () => {
    try {
      const comments = await generateLLMComments(botConfig, 'youtube');
      setYoutubeComments(comments);
      setPhase('youtube-playing');
    } catch (error) {
      console.error('Failed to generate RoboTube comments:', error);
      toast.error('Failed to generate comments. Please try again.');
      setPhase('intro');
    }
  }, [botConfig]);

  const generateTwitterComments = useCallback(async () => {
    try {
      const comments = await generateLLMComments(botConfig, 'twitter');
      setTwitterComments(comments);
      setPhase('twitter-playing');
    } catch (error) {
      console.error('Failed to generate Botter comments:', error);
      toast.error('Failed to generate comments. Please try again.');
      setPhase('intro');
    }
  }, [botConfig]);

  const generateWhatsappComments = useCallback(async () => {
    try {
      const comments = await generateLLMComments(botConfig, 'whatsapp');
      setWhatsappComments(comments);
      setPhase('whatsapp-playing');
    } catch (error) {
      console.error('Failed to generate Botsapp comments:', error);
      toast.error('Failed to generate comments. Please try again.');
      setPhase('intro');
    }
  }, [botConfig]);

  const handleStart = () => {
    totalTimeUsedRef.current = 0;
    setPhase('loading');
  };

  const handleSetupConfirm = (config: BotConfig, consentValue: boolean) => {
    setBotConfig(config);
    setConsent(consentValue);
    setShowSetupModal(false);
    setHasSetupBots(true);
  };

  const handleLoadingComplete = () => {
    setPhase('generating-youtube');
  };

  const handleLiveLost = () => {
    setLives(prev => prev - 1);
  };

  const handleGameOver = () => {
    setPhase('end-lost');
  };

  const handleYoutubeComplete = (results: GameResults) => {
    setYoutubeResults(results);
    // Add time used (120 - remaining)
    totalTimeUsedRef.current += (120 - results.timeRemaining);
    setLives(3); // Reset lives for next level
    setPhase('transition-twitter');
  };

  const handleTwitterComplete = (results: GameResults) => {
    setTwitterResults(results);
    totalTimeUsedRef.current += (120 - results.timeRemaining);
    setLives(3); // Reset lives for next level
    setPhase('transition-whatsapp');
  };

  const handleWhatsAppComplete = (results: GameResults) => {
    setWhatsappResults(results);
    totalTimeUsedRef.current += (120 - results.timeRemaining);
    setPhase('end-won');
  };

  const handleRestart = () => {
    setPhase('restarting');
  };

  const handleRestartComplete = () => {
    // Reset all state including bot setup
    setLives(3);
    totalTimeUsedRef.current = 0;
    setYoutubeResults(null);
    setTwitterResults(null);
    setWhatsappResults(null);
    setYoutubeComments([]);
    setTwitterComments([]);
    setWhatsappComments([]);
    clearCommentCache(); // Clear cache on restart
    setHasSetupBots(false); // Reset so user can change bot settings again
    setPhase('intro');
  };

  const handleLevelSelect = (level: 1 | 2 | 3) => {
    if (level === 1) {
      if (youtubeComments.length === 0) {
        setPhase('generating-youtube');
      } else {
        setPhase('youtube-playing');
      }
    } else if (level === 2) {
      if (twitterComments.length === 0) {
        setPhase('generating-twitter');
      } else {
        setPhase('twitter-playing');
      }
    } else if (level === 3) {
      if (whatsappComments.length === 0) {
        setPhase('generating-whatsapp');
      } else {
        setPhase('whatsapp-playing');
      }
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
            hasSetupBots={hasSetupBots}
          />
          <BotSetupModal
            isOpen={showSetupModal}
            onClose={() => setShowSetupModal(false)}
            onConfirm={handleSetupConfirm}
            initialConfig={botConfig}
            initialConsent={consent}
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

      {phase === 'generating-youtube' && (
        <GeneratingCommentsScreen
          platform="youtube"
          onGenerated={generateYoutubeComments}
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
          fromLevel="RoboTube"
          toLevel="Botter"
          onComplete={() => setPhase('generating-twitter')}
        />
      )}

      {phase === 'generating-twitter' && (
        <GeneratingCommentsScreen
          platform="twitter"
          onGenerated={generateTwitterComments}
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
          fromLevel="Botter"
          toLevel="Botsapp"
          onComplete={() => setPhase('generating-whatsapp')}
        />
      )}

      {phase === 'generating-whatsapp' && (
        <GeneratingCommentsScreen
          platform="whatsapp"
          onGenerated={generateWhatsappComments}
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
          botConfig={botConfig}
          totalTimeUsed={totalTimeUsedRef.current}
          consent={consent}
          onRestart={handleRestart}
        />
      )}

      {phase === 'end-lost' && (
        <EndScreen
          won={false}
          youtubeResults={youtubeResults || defaultResults}
          twitterResults={twitterResults || defaultResults}
          whatsappResults={whatsappResults || defaultResults}
          botConfig={botConfig}
          totalTimeUsed={totalTimeUsedRef.current}
          consent={consent}
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
