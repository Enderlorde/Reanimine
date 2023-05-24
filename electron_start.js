const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const os = require('os');

let options = {
    authorization: Authenticator.getAuth('Nickname'),
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

const createWindow = () => {
    const window = new BrowserWindow({
        width: 298,
        height: 500,
        frame: false,
        webPreferences: {
            preload:path.join(__dirname, 'preload.js')
        }
    });

    ipcMain.handle('dialog:openDirectory', async () => {
        const { cancelled,filePaths } = await dialog.showOpenDialog(window, {
            properties: ['openDirectory']
        })
        if (cancelled) {
            return
        }else{
            return filePaths[0]
        }
    });

    window.webContents.send('getTotalMem', () => 20);

    launcher.on('download-status', (e) => window.webContents.send('update-counter', e));

    window.loadURL('http://localhost:3000');
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.whenReady().then(() => {
    createWindow();
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
