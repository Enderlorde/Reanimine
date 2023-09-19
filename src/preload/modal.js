import { contextBridge, ipcRenderer } from "electron"; 

contextBridge.exposeInMainWorld('modalAPI',{
    messageHandler: (callback) => ipcRenderer.on('message-send', callback),
    close: () => ipcRenderer.invoke('modal-close'),
})