const { contextBridge, ipcRenderer } = require('electron');

console.log('🔌 Preload script loading... APIs will be exposed.');

contextBridge.exposeInMainWorld('arduinoAPI', {
    /**
     * Register a callback that fires every time the Arduino sends a DEPLOY event.
     * Returns an unsubscribe function.
     */
    onArduinoData: (callback) => {
        const handler = (_event, data) => callback(data);
        ipcRenderer.on('arduino-data', handler);
        return () => ipcRenderer.removeListener('arduino-data', handler);
    },

    /** Returns true when the app was built/run in museum mode. */
    isMuseumMode: () => true, // This file is only loaded in museum (Electron) mode
});
