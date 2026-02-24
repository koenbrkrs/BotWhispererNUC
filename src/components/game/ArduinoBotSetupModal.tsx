import { useEffect, useRef } from 'react';
import { BotConfig } from '@/types/game';

interface ArduinoBotSetupModalProps {
    isOpen: boolean;
    arduinoConfig: BotConfig | null;
    hasReceivedConfig: boolean;
    onConfirm: (config: BotConfig, consent: boolean) => void;
}

/**
 * Logic-only component — no visible UI.
 * Watches for Arduino config and auto-calls onConfirm when received.
 * Visual waiting state is handled by MuseumWaitScreen.
 */
export const ArduinoBotSetupModal = ({
    isOpen,
    arduinoConfig,
    hasReceivedConfig,
    onConfirm,
}: ArduinoBotSetupModalProps) => {
    const hasDeployed = useRef(false);

    // Auto-deploy as soon as Arduino config arrives
    useEffect(() => {
        if (hasReceivedConfig && arduinoConfig && !hasDeployed.current) {
            hasDeployed.current = true;
            // Consent is auto-granted in museum / kiosk mode
            onConfirm(arduinoConfig, true);
        }
    }, [hasReceivedConfig, arduinoConfig, onConfirm]);

    // Reset deploy guard when modal re-opens (after restart)
    useEffect(() => {
        if (isOpen) {
            hasDeployed.current = false;
        }
    }, [isOpen]);

    // No UI — MuseumWaitScreen owns all visual output while waiting
    return null;
};
