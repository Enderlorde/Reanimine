const { app, BrowserWindow, BrowserView, ipcMain, dialog } = require('electron');
const path = require('path');
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const os = require('os');
const _ = require('lodash');
//import open from 'open';

Authenticator.changeApiUrl('https://authserver.ely.by/auth')
let options = {
    root: "./minecraft",
    customArgs: ['-javaagent:G:\\Projects\\Reanicraft\\minecraft\\authlib-injector-1.2.2.jar=ely.by'],
    version: {
        number: "1.12.2",
        type: "release"
    },
    server:{
        host: '45.87.246.29',
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

    ipcMain.handle('open-directory', async () => {
        const { cancelled,filePaths } = await dialog.showOpenDialog(window, {
            properties: ['openDirectory']
        })
        if (cancelled) {
            return
        }else{
            return filePaths[0]
        }
    });

    const savedOptions = window.webContents.executeJavaScript(`localStorage.getItem('options')`).then(value => JSON.parse(value));
    savedOptions.then((val) => {options = _.merge({...options}, {...val}); console.log(options); console.log(options.authorization)});

    launcher.on('download-status', (e) => window.webContents.send('update-counter', e));
    launcher.on('download', (e) => window.webContents.send('download-done', e));
    launcher.on('package-extract', (e)=> console.log(e))

    window.loadURL('http://localhost:3000');
}

ipcMain.handle('registration', async () => {
    open("https://account.ely.by/login");
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.whenReady().then(() => {
    createWindow();
});

ipcMain.handle('save-options', (e, newOptions) => {
    options = _.merge({...options}, {...newOptions});
});

ipcMain.handle('close', () => {
    app.quit();
});

ipcMain.handle('play',() => {
    if (options){
        launcher.launch(options);
    }else{
        console.log('no options loaded');
    };
});

ipcMain.handle('total-memory', () => os.totalmem());

ipcMain.handle('nickname-change', (e, nickname) => {
    Authenticator.getAuth(nickname,'').then((authData) => {options=_.merge({...options},{authorization: authData}); console.log(options.authorization);}
)});

launcher.on('debug', (e) => {
    const closingRegExp = new RegExp(/closing\.\.\./);
    if (closingRegExp.test(e)) launcher.launch(options);
    console.log(e)
});
launcher.on('data', (e) => console.log(e));
