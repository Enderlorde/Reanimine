const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('something',{
    close: () => ipcRenderer.invoke('close'),
    minimize: () => ipcRenderer.invoke('minimize'),
    play: () => ipcRenderer.invoke('play'),
    handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
    handleDownload: (callback) => ipcRenderer.on('download-done', callback),
    selectFolder: () => ipcRenderer.invoke('open-directory'),
    avialableRAM: () => ipcRenderer.invoke('total-memory'),
    saveOptions: (options) => ipcRenderer.invoke('save-options', options),
    registration: ()=> ipcRenderer.invoke('registration'),
    login: (credentials) => ipcRenderer.invoke('login', credentials),
    gameClosed: (callback) => ipcRenderer.on('game-close', callback),
});