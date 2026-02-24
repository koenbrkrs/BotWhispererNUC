import { useState, useEffect, useRef } from 'react';
import { BotConfig } from '@/types/game';

// ─── Stance lookup (must mirror the maps in BotSetupModal / Index) ──────
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

// ─── Arduino JSON → BotConfig mapper ────────────────────────────────────
interface ArduinoPayload {
    event: string;
    topic: string;
    platform: string;
    stance: string;
    friendliness: string;
    logic: string;
    humour: string;
    sarcasm: string;
    openness: string;
    verbosity: string;
    emojiAmount: string;
}

function clamp(v: number, min = 0, max = 100): number {
    return Math.max(min, Math.min(max, v));
}


function mapArduinoToBotConfig(data: ArduinoPayload): BotConfig {
    const topic = data.topic || "Women's rights";

    // Stance is now 0-100. Map to 5 buckets.
    // 0-19 -> Index 0
    // 20-39 -> Index 1
    // ...
    // 80-100 -> Index 4
    const stanceValue = parseInt(data.stance, 10) || 0;
    const stanceIndex = Math.min(4, Math.floor(stanceValue / 20));
    const stanceOptions = STANCE_OPTIONS[topic] || STANCE_OPTIONS["Women's rights"];
    const stance = stanceOptions[stanceIndex] || stanceOptions[0];

    // Platform mapping
    let platform: 'youtube' | 'twitter' | 'whatsapp' | undefined;
    if (data.platform?.toLowerCase() === 'robotube') platform = 'youtube';
    else if (data.platform?.toLowerCase() === 'botter') platform = 'twitter';
    else if (data.platform?.toLowerCase() === 'botsapp') platform = 'whatsapp';

    // Arduino sends 0-100 string values.
    const friendliness = parseInt(data.friendliness, 10) || 50;
    const logic = parseInt(data.logic, 10) || 50;
    const humour = parseInt(data.humour, 10) || 50;
    const sarcasm = parseInt(data.sarcasm, 10) || 50;
    const openness = parseInt(data.openness, 10) || 50;
    const verbosity = parseInt(data.verbosity, 10) || 50;
    const emojiAmount = parseInt(data.emojiAmount, 10) || 50;

    return {
        // High friendliness (100) => low on Friendly→Aggressive axis (0)
        friendlyAggressive: clamp(100 - friendliness),
        // High logic (100) => low on Logical→Illogical axis (0)
        logicalIllogical: clamp(100 - logic),
        // High humour (100) => high humor end (0), low serious end
        humorSerious: clamp(100 - humour),
        // High sarcasm (100) => high sarcasm end (0), low direct end
        sarcasmDirect: clamp(100 - sarcasm),
        // High openness (100) => low on Open→Closed axis (0)
        openClosed: clamp(100 - openness),
        // High verbosity (100) => high on Minimal→Verbose axis (100)
        minimalVerbose: clamp(verbosity),
        // Direct scale
        emojiAmount: clamp(emojiAmount),
        topic,
        stance,
        platform,
    };
}


// ─── Detect museum / Electron mode ──────────────────────────────────────
function detectMuseumMode(): boolean {
    // In Electron with our preload, window.arduinoAPI will exist
    const apiExists = typeof window !== 'undefined' && !!(window as any).arduinoAPI;
    // Fallback: check build env var
    const envMuseum = import.meta.env.VITE_MUSEUM === 'true';
    return apiExists || envMuseum;
}

// ─── Hook ───────────────────────────────────────────────────────────────
export function useArduinoConfig() {
    const [isMuseumMode] = useState(() => detectMuseumMode());
    const [arduinoConfig, setArduinoConfig] = useState<BotConfig | null>(null);
    const [hasReceivedConfig, setHasReceivedConfig] = useState(false);
    const unsubRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!isMuseumMode) return;

        const api = (window as any).arduinoAPI;
        if (!api) {
            console.warn("⚠️ Museum mode active (via env) but window.arduinoAPI is missing. Serial data will not be received.");
            return;
        }

        // Subscribe to Arduino data events from the Electron main process
        unsubRef.current = api.onArduinoData((data: ArduinoPayload) => {
            console.log('🎮 Arduino DEPLOY received:', data);
            const config = mapArduinoToBotConfig(data);
            setArduinoConfig(config);
            setHasReceivedConfig(true);
        });

        return () => {
            unsubRef.current?.();
        };
    }, [isMuseumMode]);

    /** Reset so the hook can receive a fresh config (used on game restart) */
    const resetConfig = () => {
        setArduinoConfig(null);
        setHasReceivedConfig(false);
    };

    return { isMuseumMode, arduinoConfig, hasReceivedConfig, resetConfig };
}
