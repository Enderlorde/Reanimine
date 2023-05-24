const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('something',{
    close: () => ipcRenderer.invoke('close'),
    play: () => ipcRenderer.invoke('play'),
    changeNickname: (nickname) => ipcRenderer.invoke('nickname-change', nickname),
    handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
    selectFolder: () => ipcRenderer.invoke('open-directory'),
    avialableRAM: () => ipcRenderer.invoke('total-memory'),
    saveOptions: (options) => ipcRenderer.invoke('save-options', options),
});