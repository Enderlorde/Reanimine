const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const window = new BrowserWindow({
        width: 298,
        height: 425,
        frame: false,
        webPreferences: {
            preload:path.join(__dirname, 'preload.js')
        }
    })
    
    window.loadURL('http://localhost:3000')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()
})

ipcMain.handle('close', () => {
    console.log('handled');
    app.quit();
})