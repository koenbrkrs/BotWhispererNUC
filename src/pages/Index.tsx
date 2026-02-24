import { useState, useCallback, useRef, useEffect } from 'react';
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
import { useArduinoConfig } from '@/hooks/useArduinoConfig';
import { ArduinoBotSetupModal } from '@/components/game/ArduinoBotSetupModal';
import { MuseumWaitScreen } from '@/components/game/MuseumWaitScreen';
import { toast } from 'sonner';

type GamePhase =
  | 'intro'
  | 'loading'
  | 'museum-generating'
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
  emojiAmount: 50,
  topic: "Women's rights",
  stance: STANCE_OPTIONS["Women's rights"][0]
};

/** Shown when LLM is still running after 4s loading screen. Polls ref until ready. */
const MuseumGeneratingWait = ({
  museumCommentsRef,
  onReady,
}: {
  museumCommentsRef: React.RefObject<Comment[] | null>;
  onReady: (comments: Comment[]) => void;
}) => {
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const poll = setInterval(() => {
      if (museumCommentsRef.current) {
        clearInterval(poll);
        onReadyRef.current(museumCommentsRef.current);
      }
    }, 200);
    return () => clearInterval(poll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RED = '#EA4237';
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center font-retro"
      style={{
        backgroundColor: '#0d0d0d',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)' }}
      />
      <div className="relative z-10 max-w-lg w-full px-8 flex flex-col items-center space-y-8">
        <svg width="80" height="80" viewBox="0 0 324 274" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_416_41)">
            <path
              d="M159.398 5.80078C180.401 5.80078 197.694 21.6716 199.946 42.0742H245.533C260.555 42.0742 272.733 54.2523 272.733 69.2744V105.537C295.262 105.542 313.523 123.807 313.523 146.337C313.523 168.867 295.262 187.131 272.733 187.136V232.474C272.733 247.496 260.555 259.674 245.533 259.674H73.2676C58.2455 259.674 46.0675 247.496 46.0674 232.474V186.884C25.6676 184.629 9.80078 167.337 9.80078 146.336C9.80092 125.335 25.6677 108.043 46.0674 105.788V69.2744C46.0674 54.2523 58.2455 42.0742 73.2676 42.0742H118.851C121.103 21.6716 138.395 5.80079 159.398 5.80078ZM73.2676 232.474H245.533V69.2744H73.2676V232.474ZM209.263 200.729H109.529V173.529H209.263V200.729ZM118.59 105.537C128.604 105.537 136.722 113.655 136.723 123.67C136.723 133.685 128.605 141.804 118.59 141.804C108.575 141.804 100.456 133.685 100.456 123.67C100.456 113.655 108.575 105.537 118.59 105.537ZM200.212 105.537C210.226 105.537 218.344 113.655 218.345 123.67C218.345 133.685 210.227 141.804 200.212 141.804C190.197 141.804 182.078 133.685 182.078 123.67C182.078 113.655 190.197 105.537 200.212 105.537Z"
              fill={RED}
            />
          </g>
          <defs>
            <filter
              id="filter0_d_416_41"
              x="0.000781059"
              y="0.000781059"
              width="323.323"
              height="273.473"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4.9" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.890196 0 0 0 0 0.298039 0 0 0 0 0.364706 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_416_41"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_416_41"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <div className="w-full h-12 border-2 relative" style={{ borderColor: RED }}>
          <div className="h-full w-full" style={{ backgroundColor: RED }} />
        </div>
        <p className="text-white/70 text-sm md:text-base">Game starting...</p>
      </div>
      <div className="absolute bottom-4 right-4 text-[#787878] text-xs">Made by: Malmö University Students</div>
    </div>
  );
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

  // Hook for Arduino Serial communication (Museum Mode)
  const { isMuseumMode, arduinoConfig, hasReceivedConfig, resetConfig } = useArduinoConfig();

  useEffect(() => {
    console.log('🏛️ Env VITE_MUSEUM:', import.meta.env.VITE_MUSEUM);
    console.log('🏛️ Museum Mode Status:', isMuseumMode);
    console.log('🔌 Arduino API Available:', !!(window as any).arduinoAPI);
  }, [isMuseumMode]);

  // Track total time used across levels
  const totalTimeUsedRef = useRef(0);

  // Museum mode: track parallel LLM generation state
  const museumCommentsRef = useRef<Comment[] | null>(null);
  const museumLoadingDoneRef = useRef(false);
  const museumPlatformRef = useRef<'youtube' | 'twitter' | 'whatsapp'>('youtube');

  // In museum mode, force the setup modal open at intro
  useEffect(() => {
    if (isMuseumMode && phase === 'intro' && !hasSetupBots) {
      setShowSetupModal(true);
    }
  }, [isMuseumMode, phase, hasSetupBots]);

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

    // In museum mode, auto-start immediately after config is received
    if (isMuseumMode) {
      totalTimeUsedRef.current = 0;

      // Kick off LLM generation IN PARALLEL with the loading screen
      const musePlatform: 'youtube' | 'twitter' | 'whatsapp' =
        config.platform && ['youtube', 'twitter', 'whatsapp'].includes(config.platform)
          ? config.platform as 'youtube' | 'twitter' | 'whatsapp'
          : 'youtube';
      museumPlatformRef.current = musePlatform;
      museumCommentsRef.current = null;
      museumLoadingDoneRef.current = false;
      generateLLMComments(config, musePlatform)
        .then((comments) => {
          museumCommentsRef.current = comments;
          // If loading screen already finished, advance immediately
          if (museumLoadingDoneRef.current) {
            advanceToMuseumGame(musePlatform, comments);
          }
        })
        .catch((err) => {
          console.error('Museum generation failed:', err);
          toast.error('Failed to generate comments. Please try again.');
        });

      setPhase('loading');
    }
  };

  // Helper: set the right comments state and phase for museum mode
  const advanceToMuseumGame = (platform: 'youtube' | 'twitter' | 'whatsapp', comments: Comment[]) => {
    if (platform === 'twitter') {
      setTwitterComments(comments);
      setPhase('twitter-playing');
    } else if (platform === 'whatsapp') {
      setWhatsappComments(comments);
      setPhase('whatsapp-playing');
    } else {
      setYoutubeComments(comments);
      setPhase('youtube-playing');
    }
  };

  const handleLoadingComplete = () => {
    if (isMuseumMode) {
      museumLoadingDoneRef.current = true;
      if (museumCommentsRef.current) {
        // Comments already ready — advance immediately
        advanceToMuseumGame(museumPlatformRef.current, museumCommentsRef.current);
      } else {
        // Still generating — show visible waiting screen
        setPhase('museum-generating');
      }
      return;
    }
    // Non-museum: check if a specific platform was selected
    if (botConfig.platform === 'youtube') {
      setPhase('generating-youtube');
    } else if (botConfig.platform === 'twitter') {
      setPhase('generating-twitter');
    } else if (botConfig.platform === 'whatsapp') {
      setPhase('generating-whatsapp');
    } else {
      setPhase('generating-youtube');
    }
  };


  const handleLiveLost = () => {
    setLives(prev => prev - 1);
  };

  const handleGameOver = () => {
    // No longer used directly - game over is handled via onComplete + lives check
    setPhase('end-lost');
  };

  const handleYoutubeComplete = (results: GameResults) => {
    setYoutubeResults(results);
    totalTimeUsedRef.current += (120 - results.timeRemaining);
    if (lives <= 0) {
      setPhase('end-lost');
      return;
    }

    // Single level mode check (also enforced in museum mode — always one level)
    if (botConfig.platform === 'youtube' || isMuseumMode) {
      setPhase('end-won');
      return;
    }

    setLives(3);
    setPhase('transition-twitter');
  };

  const handleTwitterComplete = (results: GameResults) => {
    setTwitterResults(results);
    totalTimeUsedRef.current += (120 - results.timeRemaining);
    if (lives <= 0) {
      setPhase('end-lost');
      return;
    }

    // Single level mode check (also enforced in museum mode — always one level)
    if (botConfig.platform === 'twitter' || isMuseumMode) {
      setPhase('end-won');
      return;
    }

    setLives(3);
    setPhase('transition-whatsapp');
  };

  const handleWhatsAppComplete = (results: GameResults) => {
    setWhatsappResults(results);
    totalTimeUsedRef.current += (120 - results.timeRemaining);
    if (lives <= 0) {
      setPhase('end-lost');
      return;
    }
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

    // Reset Arduino config listener for next player
    if (isMuseumMode) {
      resetConfig();
    }

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
          {/* In museum mode, show the terminal wait screen instead of the intro */}
          {isMuseumMode ? (
            <MuseumWaitScreen />
          ) : (
            <IntroScreen
              onStart={handleStart}
              onSetupBots={() => setShowSetupModal(true)}
              hasSetupBots={hasSetupBots}
            />
          )}

          {isMuseumMode ? (
            <ArduinoBotSetupModal
              isOpen={showSetupModal}
              arduinoConfig={arduinoConfig}
              hasReceivedConfig={hasReceivedConfig}
              onConfirm={handleSetupConfirm}
            />
          ) : (
            <BotSetupModal
              isOpen={showSetupModal}
              onClose={() => setShowSetupModal(false)}
              onConfirm={handleSetupConfirm}
              initialConfig={botConfig}
              initialConsent={consent}
            />
          )}
        </>
      )}

      {phase === 'loading' && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
          message="Starting"
          subMessage="Game starting..."
          color="red"
          showRobotIcon={isMuseumMode}
          duration={isMuseumMode ? 8000 : 2500}
        />
      )}

      {/* Museum: generation still running after loading screen — show robot screen while waiting */}
      {phase === 'museum-generating' && (
        <MuseumGeneratingWait
          museumCommentsRef={museumCommentsRef}
          onReady={(comments) => {
            advanceToMuseumGame(museumPlatformRef.current, comments);
          }}
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
          fromLevel="Robotube"
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
