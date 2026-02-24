/**
 * Hybrid Game Logger
 *
 * Saves game session data to:
 *   1. localStorage (browser backup — always works)
 *   2. Disk via the logger sidecar at http://localhost:3001/api/log (CSV file)
 *
 * Silent failover: if the server is unreachable the game continues normally.
 */

const LOCAL_STORAGE_KEY = 'game_session_logs';
const LOGGER_URL = 'http://localhost:3001/api/log';

export interface GameSessionData {
    player_code: string;
    score: number;
    won: boolean;
    time_used: number;
    topic: string;
    stance: string;
    friendly: number;
    aggressive: number;
    logical: number;
    illogical: number;
    humor: number;
    serious: number;
    sarcasm: number;
    direct: number;
    open_minded: number;
    closed_minded: number;
    minimal: number;
    verbose_level: number;
    emoji_amount: number;
    bots_found: number;
    humans_misidentified: number;
    total_bots: number;
}

/**
 * Save a game session to localStorage (append to existing array).
 */
const saveToLocalStorage = (data: GameSessionData): void => {
    try {
        const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
        const logs: GameSessionData[] = existing ? JSON.parse(existing) : [];
        logs.push(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(logs));
        console.log('💾 Game session backed up to localStorage');
    } catch (err) {
        console.warn('Failed to save to localStorage', err);
    }
};

/**
 * Send a game session to the Node logger sidecar for CSV writing.
 */
const saveToDisk = async (data: GameSessionData): Promise<void> => {
    try {
        const response = await fetch(LOGGER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Logger responded with ${response.status}`);
        }

        console.log('📝 Game session written to CSV on disk');
    } catch (err) {
        console.warn('⚠️ Could not reach logger server — relying on browser backup.', err);
    }
};

/**
 * Main entry point. Call this from EndScreen when the game finishes.
 * Only logs if the player has consented.
 */
export const saveGameLog = async (
    data: GameSessionData,
    hasConsented: boolean
): Promise<void> => {
    if (!hasConsented) {
        console.log('Skipping game log — no consent.');
        return;
    }

    // 1. Browser backup (synchronous, always works)
    saveToLocalStorage(data);

    // 2. Disk write (async, silent failover)
    await saveToDisk(data);
};

/**
 * Download all locally stored game sessions as an Excel-compatible CSV.
 * Uses semicolons, UTF-8 BOM, and \\r\\n line endings.
 */
export const downloadLogsAsCSV = (): void => {
    try {
        const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!existing) {
            console.warn('No game sessions found in localStorage.');
            return;
        }

        const logs: GameSessionData[] = JSON.parse(existing);
        if (logs.length === 0) {
            console.warn('Game session log is empty.');
            return;
        }

        const header = [
            'PlayerCode', 'Score', 'Won', 'TimeUsed', 'Topic', 'Stance',
            'Friendly', 'Aggressive', 'Logical', 'Illogical', 'Humor', 'Serious',
            'Sarcasm', 'Direct', 'OpenMinded', 'ClosedMinded', 'Minimal', 'Verbose',
            'EmojiAmount', 'BotsFound', 'HumansMisidentified', 'TotalBots',
        ].join(';');

        const rows = logs.map(d => [
            d.player_code,
            d.score,
            d.won,
            d.time_used,
            `"${(d.topic || '').replace(/"/g, '""')}"`,
            `"${(d.stance || '').replace(/"/g, '""')}"`,
            d.friendly,
            d.aggressive,
            d.logical,
            d.illogical,
            d.humor,
            d.serious,
            d.sarcasm,
            d.direct,
            d.open_minded,
            d.closed_minded,
            d.minimal,
            d.verbose_level,
            d.emoji_amount,
            d.bots_found,
            d.humans_misidentified,
            d.total_bots,
        ].join(';'));

        const csvString = [header, ...rows].join('\r\n');
        const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'game_sessions.csv';
        a.click();
        URL.revokeObjectURL(url);

        console.log('📥 Downloaded game sessions CSV');
    } catch (err) {
        console.warn('Failed to download CSV', err);
    }
};
