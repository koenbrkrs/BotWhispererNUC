import { useState, useEffect } from 'react';
import { BotConfig } from '@/types/game';
import { X } from 'lucide-react';

interface BotSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (config: BotConfig) => void;
  initialConfig?: BotConfig;
}

const TOPICS = [
  "Women's rights",
  "Data centers",
  "Immigration",
  "Pineapple on pizza"
];

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

const Slider = ({ 
  label, 
  leftLabel, 
  rightLabel, 
  value, 
  onChange 
}: { 
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-white/70">
      <span>{leftLabel}</span>
      <span className="text-retro-red">{value}%</span>
      <span>{rightLabel}</span>
    </div>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-retro"
    />
  </div>
);

export const BotSetupModal = ({ isOpen, onClose, onConfirm, initialConfig }: BotSetupModalProps) => {
  const getDefaultStance = (topic: string) => STANCE_OPTIONS[topic]?.[0] || '';
  
  const [config, setConfig] = useState<BotConfig>(initialConfig || {
    friendlyAggressive: 50,
    logicalIllogical: 50,
    humorSerious: 50,
    sarcasmDirect: 50,
    openClosed: 50,
    minimalVerbose: 50,
    emojiAmount: 30,
    topic: TOPICS[0],
    stance: getDefaultStance(TOPICS[0])
  });

  // Update stance when topic changes
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      stance: STANCE_OPTIONS[prev.topic]?.[0] || ''
    }));
  }, [config.topic]);

  if (!isOpen) return null;

  const handleTopicChange = (newTopic: string) => {
    setConfig(prev => ({
      ...prev,
      topic: newTopic,
      stance: STANCE_OPTIONS[newTopic]?.[0] || ''
    }));
  };

  const handleConfirm = () => {
    onConfirm(config);
    onClose();
  };

  const currentStanceOptions = STANCE_OPTIONS[config.topic] || [];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 font-retro">
      <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-2 border-retro-red rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-retro-red/30">
          <h2 className="text-xl text-retro-red">Bot Configuration</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Topic Dropdown */}
          <div className="space-y-2">
            <label className="text-white/70 text-sm">Discussion Topic</label>
            <select
              value={config.topic}
              onChange={(e) => handleTopicChange(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-retro-red/30 rounded text-white focus:border-retro-red outline-none"
            >
              {TOPICS.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          {/* Stance Dropdown */}
          <div className="space-y-2">
            <label className="text-white/70 text-sm">Bot Stance / Opinion</label>
            <select
              value={config.stance}
              onChange={(e) => setConfig(prev => ({ ...prev, stance: e.target.value }))}
              className="w-full p-3 bg-gray-800 border border-retro-red/30 rounded text-white focus:border-retro-red outline-none text-sm"
            >
              {currentStanceOptions.map(stance => (
                <option key={stance} value={stance}>{stance}</option>
              ))}
            </select>
          </div>

          {/* Sliders */}
          <Slider
            label="Friendly/Aggressive"
            leftLabel="Friendly"
            rightLabel="Aggressive"
            value={config.friendlyAggressive}
            onChange={(v) => setConfig(prev => ({ ...prev, friendlyAggressive: v }))}
          />
          <Slider
            label="Logical/Illogical"
            leftLabel="Logical"
            rightLabel="Illogical"
            value={config.logicalIllogical}
            onChange={(v) => setConfig(prev => ({ ...prev, logicalIllogical: v }))}
          />
          <Slider
            label="Humor/Serious"
            leftLabel="Humor"
            rightLabel="Serious"
            value={config.humorSerious}
            onChange={(v) => setConfig(prev => ({ ...prev, humorSerious: v }))}
          />
          <Slider
            label="Sarcasm/Direct"
            leftLabel="Sarcasm"
            rightLabel="Direct"
            value={config.sarcasmDirect}
            onChange={(v) => setConfig(prev => ({ ...prev, sarcasmDirect: v }))}
          />
          <Slider
            label="Open/Closed"
            leftLabel="Open"
            rightLabel="Closed"
            value={config.openClosed}
            onChange={(v) => setConfig(prev => ({ ...prev, openClosed: v }))}
          />
          <Slider
            label="Minimal/Verbose"
            leftLabel="Minimal"
            rightLabel="Verbose"
            value={config.minimalVerbose}
            onChange={(v) => setConfig(prev => ({ ...prev, minimalVerbose: v }))}
          />
          <Slider
            label="Emoji Amount"
            leftLabel="None"
            rightLabel="Heavy"
            value={config.emojiAmount}
            onChange={(v) => setConfig(prev => ({ ...prev, emojiAmount: v }))}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-retro-red/30">
          <button
            onClick={handleConfirm}
            className="w-full px-6 py-3 bg-retro-button text-retro-button-text text-lg hover:bg-retro-button-hover transition-colors border-2 border-retro-button-text/20"
          >
            Confirm Setup
          </button>
        </div>
      </div>
    </div>
  );
};
