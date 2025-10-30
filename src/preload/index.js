const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App information
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  
  // Theme management
  getTheme: () => ipcRenderer.invoke('get-theme'),
  
  // Window controls
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  
  // File operations
  showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
  showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
  
  // Menu events (one-way communication from main to renderer)
  onMenuNewFile: (callback) => {
    ipcRenderer.on('menu-new-file', callback);
    // Return cleanup function
    return () => ipcRenderer.removeListener('menu-new-file', callback);
  },
  
   onMenuOpenFile: (callback) => {
     ipcRenderer.on('menu-open-file', callback);
     // Return cleanup function
     return () => ipcRenderer.removeListener('menu-open-file', callback);
   },

   onMenuClear: (callback) => {
     ipcRenderer.on('menu-clear', callback);
     // Return cleanup function
     return () => ipcRenderer.removeListener('menu-clear', callback);
   },

   onMenuClearEntry: (callback) => {
     ipcRenderer.on('menu-clear-entry', callback);
     // Return cleanup function
     return () => ipcRenderer.removeListener('menu-clear-entry', callback);
   },
  
  // Utility methods
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});

// Security: Remove any global Node.js APIs
delete window.require;
delete window.exports;
delete window.module;