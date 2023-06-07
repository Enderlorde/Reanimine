import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import path from 'path';
import { Client, Authenticator } from'minecraft-launcher-core';
const launcher = new Client();
import os from 'os';
import _ from 'lodash';
import fs from 'fs';
import { DownloaderHelper } from 'node-downloader-helper';
import open from 'open';
import { ModsDownloader } from './mods-download.js';
const modsDownloader =  new ModsDownloader('$2a$10$vh2nSvmBS2Trig9lQ4WBX.FcrI7ZkzvJqY0iV2v/ODjcCmr3QeKea');
//61811 - buildcraft, 242638 - industrialcraft, 223008 - opencomputers, 241392 - balkon's weapon mod, 51195 - railcraft, 229061 - backtools, 236484, 237754 - zombie awareness, 237749 - coroutil for zombieawareness, 228027, 271856 - geolosys, 246391 - tough as nails, 223094, 59751 - forestry, 256717, 223794, 225738, 74072 - tinkers construct, 60028 - aquaculture, 241160, 277616, 252239, 285612, 281849, 221857 - pams harvestcraft, 287683, 295319, 276837 - firstaid, 354143, 352835, 235729, 272671, 310383 - armor underwear, 247357 - extra alchemy, 522574, 253456, 711714, 684624, 269973, 244830, 319175, 373774, 642817, 244844, 229060 - ichunutil for backtools, 311327 - carrots lib for touth as nails, 74924 - mantle lib for tinker, 311561 - minerva lib for extra potion, 242872, 556777, 227083, 224472, 238222 - JEI, 291786 - tinkers-jei, 350675 - pams brewcraft, 446100 - pams breadcraft,
Authenticator.changeApiUrl('https://authserver.ely.by/auth')
let options = {
    root: "./minecraft",
    customArgs: [`-javaagent: ${__dirname}/minecraft/authlib-injector-1.2.2.jar=ely.by`, "-Dauthlibinjector.ignoredPackages=forgewrapper"],
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
};

const modsIDs = [61811, 229061, 242638, 223008, 271856, 246391, 310383, 51195, 59751, 276837, 237754, 311327, 229060, 237749, 238222, 74072, 74924, 291786, 241392, 60028, 221857, 446100, 247357, 311561];

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

    window.webContents.session.clearCache();

    window.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' }
      })

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

    modsDownloader.on('download-status', (e) => window.webContents.send('update-counter', e));
    launcher.on('download-status', (e) => window.webContents.send('update-counter', e));
    launcher.on('download', (e) => window.webContents.send('download-done', e));  
    launcher.on('close', (code) => window.webContents.send('game-close', code));

    window.loadURL(process.env.ELECTRON_START_URL||`file://${path.join(__dirname, '../renderer/index.html')}`);
}

ipcMain.handle('mods-info',() => modsDownloader.getModsInfo(modsIDs).then((modsInfo) => JSON.stringify(modsInfo)));

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

const rootFolderCheck = (directory) => new Promise((resolve, reject) => {
    try{
        fs.mkdir((directory),{ recursive: true },() => {
            console.log('Folder created');
            resolve()
        });
    }catch (e){
        reject(e)
    }
});

const authlibCheck = (root) => new Promise((resolve, reject) => {
    const directory = path.join(root, 'authlib-injector-1.2.2.jar');
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

const forgeCheck = (root) => new Promise((resolve, reject) => {
    const directory = path.join(root, 'Forge.jar');
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

    return rootFolderCheck(options.root).then(
        modsDownloader.download(options.root, options.version.number, modsIDs)
    ).then(() =>
        authlibCheck(options.root)
    ).then(() =>
        forgeCheck(options.root)
    ).then(() =>
        launcher.launch(options)
    ).then(
        (result) => fullfiled(result)
    );
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
