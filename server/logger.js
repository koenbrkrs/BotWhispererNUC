import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const LOG_DIR = path.join(PROJECT_ROOT, 'Datalogging');
const LOG_FILE = path.join(LOG_DIR, 'master_log.csv');

const CSV_HEADER = [
    'Date',
    'PlayerCode',
    'Score',
    'Won',
    'TimeUsed',
    'Topic',
    'Stance',
    'Friendly',
    'Aggressive',
    'Logical',
    'Illogical',
    'Humor',
    'Serious',
    'Sarcasm',
    'Direct',
    'OpenMinded',
    'ClosedMinded',
    'Minimal',
    'Verbose',
    'EmojiAmount',
    'BotsFound',
    'HumansMisidentified',
    'TotalBots',
].join(';');

app.post('/api/log', (req, res) => {
    try {
        const data = req.body;

        // Ensure the Datalogging folder exists
        if (!fs.existsSync(LOG_DIR)) {
            fs.mkdirSync(LOG_DIR, { recursive: true });
            console.log('📁 Created Datalogging folder');
        }

        // If the CSV file doesn't exist, write the header first
        if (!fs.existsSync(LOG_FILE)) {
            fs.writeFileSync(LOG_FILE, '\uFEFF' + CSV_HEADER + '\r\n', 'utf-8');
            console.log('📄 Created master_log.csv with BOM + headers');
        }

        // Build the CSV row
        const row = [
            new Date().toISOString(),
            data.player_code || '',
            data.score ?? '',
            data.won ?? '',
            data.time_used ?? '',
            `"${(data.topic || '').replace(/"/g, '""')}"`,
            `"${(data.stance || '').replace(/"/g, '""')}"`,
            data.friendly ?? '',
            data.aggressive ?? '',
            data.logical ?? '',
            data.illogical ?? '',
            data.humor ?? '',
            data.serious ?? '',
            data.sarcasm ?? '',
            data.direct ?? '',
            data.open_minded ?? '',
            data.closed_minded ?? '',
            data.minimal ?? '',
            data.verbose_level ?? '',
            data.emoji_amount ?? '',
            data.bots_found ?? '',
            data.humans_misidentified ?? '',
            data.total_bots ?? '',
        ].join(';');

        fs.appendFileSync(LOG_FILE, row + '\r\n', 'utf-8');
        console.log('📝 Log written to CSV');

        res.json({ success: true });
    } catch (err) {
        console.error('❌ Logger error:', err);
        res.status(500).json({ error: 'Failed to write log' });
    }
});

app.listen(PORT, () => {
    console.log(`🗄️  Logger server running on http://localhost:${PORT}`);
});
