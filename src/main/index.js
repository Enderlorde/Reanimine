import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { Client, Authenticator } from'minecraft-launcher-core';
const launcher = new Client();
import os from 'os';
import _ from 'lodash';
import fs from 'fs';
import { DownloaderHelper } from 'node-downloader-helper';
import open from 'open';

Authenticator.changeApiUrl('https://authserver.ely.by/auth')
let options = {
    root: "./minecraft",
    customArgs: [`-javaagent:./minecraft/authlib-injector-1.2.2.jar=ely.by`,''],
    version: {
        number: "1.12.2",
        type: "release"
    },
    forge: `./minecraft/Forge.jar`,
    server:{
       host: '45.87.246.29',
    },
    minArgs: 17,
    memory: {
        max: "1G",
        min: "512M"
    },
    overrides:{
        detached: true,
        fw: {
            baseUrl: 'https://github.com/ZekerZhayard/ForgeWrapper/releases/download/',
            version: '1.5.5',
            sh1: '90104e9aaa8fbedf6c3d1f6d0b90cabce080b5a9',
            size: 29892,
        },
    }
}

const createWindow = () => {
    const window = new BrowserWindow({
        width: 298,
        height: 500,
        frame: false,
        webPreferences: {
            preload:path.join(__dirname, '..\\preload\\index.js')
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

    
    ipcMain.handle('minimize', () => {
        window.minimize();
    });

    const savedOptions = window.webContents.executeJavaScript(`localStorage.getItem('options')`).then(value => JSON.parse(value));
    savedOptions.then((val) => {options = _.merge({...options}, {...val}); console.log(options); console.log(options.authorization)});

    launcher.on('download-status', (e) => window.webContents.send('update-counter', e));
    launcher.on('download', (e) => window.webContents.send('download-done', e));  
    launcher.on('close', (code) => window.webContents.send('game-close', code));

    window.loadURL(process.env.ELECTRON_START_URL||`file://${path.join(__dirname, '../renderer/index.html')}`);
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

const rootFolderCheck = () => new Promise((resolve, reject) => {
    const directory = options.root;
    if (fs.existsSync(directory,)){
        console.log("[rootFolderChek]: root folder exists, starting...");
        resolve()
    }else{
        console.log("[rootFolderChek]: root folder doesn't exists, creating...");
        try{
            fs.mkdir((directory),{ recursive: true },() => {
                console.log('Folder created');
                resolve()
            });
        }catch (e){
            reject(e)
        }
    }
});

const authlibCheck = () => new Promise((resolve, reject) => {
    const directory = path.join(options.root, 'authlib-injector-1.2.2.jar');
    if (fs.existsSync(directory)){
        console.log("[authlibChek]: lib exists, starting...");
        resolve()
    }else{
        console.log("[authlibChek]: lib doesn't exists, downloading...");
        const dl = new DownloaderHelper('https://github.com/yushijinhun/authlib-injector/releases/download/v1.2.2/authlib-injector-1.2.2.jar', options.root);
        dl.on('end', () => {
            console.log('Download Completed');
            resolve();
        });
        dl.on('error', (err) => console.log('Download Failed', err));
        dl.start().catch(err => reject(err));  
    }
});

const forgeCheck = () => new Promise((resolve, reject) => {
    const directory = path.join(options.root, 'Forge.jar');
    if (fs.existsSync(directory)){
        console.log("[forgeChek]: lib exists, starting...");
        resolve()
    }else{
        console.log("[forgeChek]: lib doesn't exists, downloading...");
        const dl = new DownloaderHelper("https://maven.minecraftforge.net/net/minecraftforge/forge/1.12.2-14.23.5.2860/forge-1.12.2-14.23.5.2860-installer.jar", options.root, {
            fileName: 'Forge.jar'
        });
        dl.on('end', () => {
            console.log('Download Completed');
            resolve();
        });
        dl.on('error', (err) => console.log('Download Failed', err));
        dl.start().catch(err => reject(err));  
    }
});

ipcMain.handle('play', async () => {
    const fullfiled = (result) => {
        console.log('[PLAY]: Run with pid: ' + result.pid)
        return (JSON.stringify(result));
    }

    const rejected = (reason) => {
        console.log('[PLAY]: Error:'+ reason)
        throw (reason)
    }

    rootFolderCheck().then(()=>{
        authlibCheck().then(() => {
            forgeCheck().then(() => {
                if (options){
                    console.log(options);
                    return launcher.launch(options).then((result) => fullfiled(result)).catch((reason) => rejected(reason));
                }else{
                    console.log('no options loaded');
                    throw ('No options loaded');
                }
            })
        })
    })
});

ipcMain.handle('total-memory', () => os.totalmem());

ipcMain.handle('login', (e, credentials) => {
    const fullfiled = (authData) => {
        options=_.merge({...options},{authorization: authData}); console.log(options.authorization);
        const mode = authData.access_token === authData.client_token?'Offline':'Online';
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

launcher.on('data', (e) => console.log(e));
launcher.on('debug', (e) => console.log(e));
