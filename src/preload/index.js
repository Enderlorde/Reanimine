let { contextBridge, ipcRenderer } = require("electron");

/* contextBridge.exposeInMainWorld('something',{
    close: () => ipcRenderer.invoke('close'),
    minimize: () => ipcRenderer.invoke('minimize'),
    play: () => ipcRenderer.invoke('play'),
    handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
    handleDownload: (callback) => ipcRenderer.on('download-done', callback),
    
    avialableRAM: () => ipcRenderer.invoke('total-memory'),
    saveOptions: (options) => ipcRenderer.invoke('save-options', options),
    registration: ()=> ipcRenderer.invoke('registration'),
    login: (credentials) => ipcRenderer.invoke('login', credentials),
    handleClosing: (callback) => ipcRenderer.on('game-close', callback),
    modsInfo: () => ipcRenderer.invoke('mods-info'),
    getAppVersion: () => ipcRenderer.invoke('getAppVersion'),
}); */

contextBridge.exposeInMainWorld("mainAPI", {
    runGame: (options, authKey) =>
        ipcRenderer.invoke("runGame", options, authKey),
    /*     getAuthorization: (username, password) =>
        ipcRenderer.invoke("getAuthorization", username, password), */
    handleRunProgress: (callback) => ipcRenderer.on("runProgress", callback),
    handleClosing: (callback) => ipcRenderer.on("closing", callback),
    clearListeners: (listener) => {
        ipcRenderer.removeAllListeners(listener);
    },
    handleChildProcess: (callback) => ipcRenderer.on("childProcess", callback),
    handleDataMessages: (callback) =>
        ipcRenderer.on("sendDataMessage", callback),
});

contextBridge.exposeInMainWorld("launcherAPI", {
    minimize: () => ipcRenderer.invoke("minimizeLauncher"),
    close: () => ipcRenderer.invoke("closeLauncher"),
    selectFolder: () => ipcRenderer.invoke("selectDirectory"),
});

contextBridge.exposeInMainWorld("mclcAPI", {
    getAuth: (credentials) => ipcRenderer.invoke("getAuth", credentials),
});

contextBridge.exposeInMainWorld("modsAPI", {
    modsInfo: () => ipcRenderer.invoke("getModsInfo"),
});
