const { app, BrowserWindow, BrowserView, ipcMain, dialog } = require('electron');
const path = require('path');
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const os = require('os');
const _ = require('lodash');
const fs = require('fs');
const download = require('file-download')
//import open from 'open';

Authenticator.changeApiUrl('https://authserver.ely.by/auth')
let options = {
    root: "./minecraft",
    customArgs: [`-javaagent:${__dirname}\\minecraft\\authlib-injector-1.2.2.jar=ely.by`],
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

    window.webContents.session.webRequest.onBeforeSendHeaders(
        (details, callback) => {
          callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
        },
      );
      
    window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
          responseHeaders: {
            'Access-Control-Allow-Origin': ['*'],
            // We use this to bypass headers
            'Access-Control-Allow-Headers': ['*'],
            ...details.responseHeaders,
          },
        });
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
    launcher.on('close', (code) => window.webContents.send('game-close', code));

    window.loadURL('http://localhost:3000');
}

app.commandLine.appendSwitch('ignore-certificate-errors');

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

const authlibCheck = () => new Promise((resolve, reject) => {
    const directory = path.join(options.root, 'authlib-injector-1.2.2.jar');
    if (fs.existsSync(directory)){
        resolve()
    }else{
        try{
            download('https://github.com/yushijinhun/authlib-injector/releases/download/v1.2.2/authlib-injector-1.2.2.jar',{directory: options.root});
            resolve()
        }catch (e){
            reject(e)
        }
    }
}) 

ipcMain.handle('play', async () => {
    const fullfiled = (result) => {
        console.log('[PLAY]: Run with pid: ' + result.pid)
        return (JSON.stringify(result));
    }

    const rejected = (reason) => {
        console.log('[PLAY]: Error:'+ reason)
        throw (reason)
    }

    if (options){
        return launcher.launch(options).then((result) => fullfiled(result)).catch((reason) => rejected(reason));
    }else{
        console.log('no options loaded');
        throw ('No options loaded');
    };
});

ipcMain.handle('total-memory', () => os.totalmem());

ipcMain.handle('login', (e, credentials) => {
    const fullfiled = (authData) => {
        options=_.merge({...options},{authorization: authData}); console.log(options.authorization);
        const mode = authData.access_token === authData.client_token?'Offline':'Online';
        if (mode == "Online"){

        }
        const info = `${mode} mode as ${authData.name}`;
        console.log(info);
        return JSON.stringify({info: info, mode: mode, authData: authData});
    }

    const rejected = (reason) => {
        console.log(`[LOGIN]: ${reason}`);
        return JSON.stringify({info:`${reason}`, mode:'error'});
    }

    return Authenticator.getAuth(credentials.nickname, credentials.password).then((authData) => fullfiled(authData), (reason) => rejected(reason))
});

launcher.on('debug', (e) => {
    const closingRegExp = new RegExp(/closing\.\.\./);
    if (closingRegExp.test(e)) launcher.launch(options);
    console.log(e)
});
launcher.on('data', (e) => console.log(e));
