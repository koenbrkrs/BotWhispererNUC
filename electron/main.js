import { app, BrowserWindow, screen, globalShortcut } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Disable hardware acceleration to prevent potential rendering issues on some kiosks
// app.disableHardwareAcceleration();

let mainWindow;

// ─── Arduino Serial Port ───────────────────────────────────────────────
let serialPort = null;

async function initSerial() {
  try {
    // Dynamic import so the app still starts even if serialport isn't installed
    const { SerialPort } = await import('serialport');
    const { ReadlineParser } = await import('@serialport/parser-readline');

    const SERIAL_PATH = '/dev/cu.usbmodem2101';
    const BAUD_RATE = 9600;

    serialPort = new SerialPort({ path: SERIAL_PATH, baudRate: BAUD_RATE });
    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

    serialPort.on('open', () => {
      console.log(`🔌 Serial port opened: ${SERIAL_PATH} @ ${BAUD_RATE}`);
    });

    parser.on('data', (line) => {
      try {
        const json = JSON.parse(line.trim());
        console.log('📡 Arduino data:', json);

        if (json.event === 'DEPLOY' && mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('arduino-data', json);
        }
      } catch (err) {
        // Ignore non-JSON lines (e.g. debug prints from Arduino)
        console.warn('⚠️  Non-JSON serial line:', line);
      }
    });

    serialPort.on('error', (err) => {
      console.error('❌ Serial port error:', err.message);
    });

    serialPort.on('close', () => {
      console.log('🔌 Serial port closed');
    });
  } catch (err) {
    console.error('❌ Could not initialise serial port:', err.message);
    console.log('   (the app will continue without Arduino support)');
  }
}

// ─── Window Creation ───────────────────────────────────────────────────
function createWindow() {
  const displays = screen.getAllDisplays();

  // Find the external display (assumed to be the one where bounds.x or bounds.y is not 0)
  // If no external display is found, fall back to the primary display (displays[0])
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  const targetDisplay = externalDisplay || displays[0];

  if (externalDisplay) {
    console.log('Detected external display:', externalDisplay);
  } else {
    console.log('No external display detected, using primary display:', targetDisplay);
  }

  // Create the browser window — kiosk mode fills the portrait screen
  mainWindow = new BrowserWindow({
    // Explicitly target the detected display
    x: targetDisplay.bounds.x,
    y: targetDisplay.bounds.y,
    width: targetDisplay.bounds.width,
    height: targetDisplay.bounds.height,

    kiosk: true,        // Strict kiosk mode — fills screen automatically
    fullscreen: true,   // Fullscreen
    frame: false,       // No window frame/chrome
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Ensure preload can run without restrictions
      preload: path.join(__dirname, 'preload.cjs'),
      zoomFactor: 1.0,
    },
  });

  // Load the local http-server URL
  mainWindow.loadURL('http://localhost:8080');

  // Clear HTTP cache to ensure we load the latest build (critical for VITE_MUSEUM env var)
  mainWindow.webContents.session.clearCache();

  // Apply Kiosk UI/UX settings once the DOM is ready
  mainWindow.webContents.on('dom-ready', () => {
    // Set zoom factor (bump slightly for 2.8K portrait readability)
    mainWindow.webContents.setZoomFactor(1);

    // Fallback CSS — the main kiosk CSS lives in src/index.css,
    // but this ensures cursor hiding even if the Vite bundle is slow.
    mainWindow.webContents.insertCSS(`
      * { cursor: none important; }
      ::-webkit-scrollbar { display: none; }
    `);
  });

  // Disable navigation gestures (swipe back/forward) and pinch-zoom
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ─── App Lifecycle ─────────────────────────────────────────────────────
app.whenReady().then(async () => {
  createWindow();

  // Start reading from the Arduino
  await initSerial();

  // Register a 'CommandOrControl+Shift+Q' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Shift+Q', () => {
    console.log('CommandOrControl+Shift+Q is pressed, quitting application.');
    app.quit();
  });

  if (!ret) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+Shift+Q'));

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
  // Close serial port gracefully
  if (serialPort && serialPort.isOpen) {
    serialPort.close();
  }
});
