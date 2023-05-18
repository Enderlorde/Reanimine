const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

let options = {
    authorization: Authenticator.getAuth('usertest'),
    root: "./minecraft",
    version: {
        number: "1.14",
        type: "release"
    },
    memory: {
        max: "6G",
        min: "4G"
    }
}

const setOptions = (ops) => {
    options = new Object(options.join(ops))
}

const createWindow = () => {
    const window = new BrowserWindow({
        width: 298,
        height: 425,
        frame: false,
        webPreferences: {
            preload:path.join(__dirname, 'preload.js')
        }
    })
    
    launcher.on('download-status', (e) => window.webContents.send('update-counter', e))

    window.loadURL('http://localhost:3000')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.whenReady().then(() => {
    createWindow()
});

ipcMain.handle('close', () => {
    console.log('handled');
    app.quit();
});

ipcMain.handle('play',() => {
    launcher.launch(options);
});

ipcMain.handle('nickname-change', (e, nickname) => {
    options['authorization'] = Authenticator.getAuth(nickname),
    console.log(options);
});

launcher.on('debug', (e) => console.log(e));
launcher.on('data', (e) => console.log(e));
