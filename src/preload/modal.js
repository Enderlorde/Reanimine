import { contextBridge, ipcRenderer } from "electron"; 

contextBridge.exposeInMainWorld('modalAPI',{
    messageHandler: (callback) => ipcRenderer.on('message-send', callback)
})