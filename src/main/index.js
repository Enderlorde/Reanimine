import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { spawn } from 'child_process';
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

let mode = 'Offline';

let window = null;

const singleInstanceLock = app.requestSingleInstanceLock();

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

const modsIDs = [61811, 229061, 242638, 223008, 271856, 246391, 310383, 51195, 59751, 276837, 237754, 311327, 229060, 237749, 238222, 74072, 74924, 291786, 241392, 60028, 221857, 446100, 247357, 311561, 223094, 309516, 318255, 373157, 228027, 248453];
/* 
248453 - sadowfacts forgelin,
373157 - roguelike dungeons,
318255 - Phosphor,
389665 - YUNG better mineshafts,
260373 - gicomo's bookshelf,
61811 - buildcraft, 
242638 - industrialcraft, 
223008 - opencomputers, 
241392 - balkon's weapon mod, 
51195 - railcraft, 
229061 - backtools, 
236484, 
237754 - zombie awareness, 
237749 - coroutil for zombieawareness, 
228027 - bibliocraft, 
271856 - geolosys, 
246391 - tough as nails, 
223094 - inventory tweaker,
309516 - bountifull, 
59751 - forestry, 
256717, 
223794, 
225738, 
74072 - tinkers construct, 
60028 - aquaculture, 
241160, 
277616, 
252239, 
285612, 
281849, 
221857 - pams harvestcraft, 
287683, 
295319, 
276837 - firstaid, 
354143, 
352835, 
235729, 
272671, 
310383 - armor underwear, 
247357 - extra alchemy, 
522574, 
253456, 
711714, 
684624, 
269973, 
244830, 
319175, 
373774, 
642817, 
244844, 
229060 - ichunutil for backtools, 
311327 - carrots lib for touth as nails, 
74924 - mantle lib for tinker, 
311561 - minerva lib for extra potion, 
242872, 
556777, 
227083, 
224472, 
238222 - JEI, 
291786 - tinkers-jei, 
350675 - pams brewcraft, 
446100 - pams breadcraft,
 */

const createWindow = () => {
    window = new BrowserWindow({
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

    launcher.on('download-status', (e) => window.webContents.send('update-counter', e));
    launcher.on('download', (e) => window.webContents.send('download-done', e));  
    launcher.on('close', (code) => window.webContents.send('game-close', code));

    window.loadURL(process.env.ELECTRON_START_URL||`file://${path.join(__dirname, '../renderer/index.html')}`);
}

const modalWindow = (message) => {
    const modalWindow = new BrowserWindow({
        width: 500,
        height: 200,
        frame: true,
        parent: window,
        modal: true,
        show: false,
        webPreferences: {
            preload:path.join(__dirname, '..\\preload\\modal.js')
        },
        resizable: false,
        autoHideMenuBar: true,
    });
    modalWindow.loadURL('http://localhost:5173/modal/index.html')
    modalWindow.once('ready-to-show', () => {
        modalWindow.webContents.send('message-send',message);
        modalWindow.show();
})
}

modsDownloader.on('download-status', (e) => window.webContents.send('update-counter', e));

ipcMain.handle('mods-info',() => modsDownloader.getModsInfo(modsIDs).then((modsInfo) => JSON.stringify(modsInfo)));

ipcMain.handle('registration', async () => {
    open("https://account.ely.by/login");
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

if (!singleInstanceLock){
    app.quit()
}else{
    app.on('second-instance', () => {
        if (window) {
            if (window.isMinimized())
                window.restore();
            window.focus();
        }
    })
}

app.on('ready', () => {
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

const authlibCheck = (root) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            progressThrottle: 300,
            override: {
                skip: true,
                skipSmaller: false
            },
            retry: {
                maxRetries: 10,
                delay: 1000
            }
        }
       
        const dl = new DownloaderHelper('https://github.com/yushijinhun/authlib-injector/releases/download/v1.2.2/authlib-injector-1.2.2.jar', root, requestOptions);
        dl.on('end', () => {
            console.log('Download Completed');
            resolve();
        });
        dl.on('skip', (progress) => {
            window.webContents.send('update-counter', {type: progress.name, current: progress.downloaded, total: progress.total});
            resolve('Skipped');
        });
        dl.on('progress.throttled', (progress) => {
            window.webContents.send('update-counter', {type: progress.name, current: progress.downloaded, total: progress.total});
        });
        dl.on('error', (err) => console.log('Download Failed', err));
        dl.start().catch((err) => reject(err));  
       
    });
};

const forgeCheck = (root) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            progressThrottle: 300,
            fileName: 'Forge.jar',
            override: {
                skip: true,
                skipSmaller: false
            },
            retry: {
                maxRetries: 10,
                delay: 1000
            }
        }
        const dl = new DownloaderHelper("https://maven.minecraftforge.net/net/minecraftforge/forge/1.12.2-14.23.5.2860/forge-1.12.2-14.23.5.2860-installer.jar", root, requestOptions);
        dl.on('end', () => {
            console.log('Download Completed');
            resolve();
        });
        dl.on('skip', (progress) => {
            window.webContents.send('update-counter', {type: progress.name, current: progress.downloaded, total: progress.total});
            resolve('Skipped');
        });
        dl.on('progress.throttled', (progress) => {
            window.webContents.send('update-counter', {type: progress.name, current: progress.downloaded, total: progress.total});
        });
        dl.on('error', (err) => console.log('Download Failed', err));
        dl.start().catch((err) => reject(err));  
    })
};

const javaCheck = () => {
    return new Promise((resolve, reject)=> {
        let process = spawn('java', ['-version']);
        process.on('error', (err) => {
            open('https://www.java.com/ru/download/manual.jsp');
            reject(new Error('Java not found, please check installation'));
        })
        process.stderr.once('data', (data) => {
            console.log('[JAVACHECK]: '+data);
            data = data.toString().split('\n')[0];
            let javaVersion = new RegExp('java version').test(data)?data.split(' ')[2].replace(/"/g, ''):false;
            if(javaVersion){
                console.log('[JAVACHECK]: JAVA ' + javaVersion);
                resolve(javaVersion)
            }else{
                console.log("[JAVACHECK]: NO JAVA INSTALLED");
                open('https://www.java.com/ru/download/manual.jsp');
                reject('No java');
            }
        })
    })
}

ipcMain.handle('play',() => {
    return new Promise((resolve, reject) => {
            javaCheck().then(() => {
                return rootFolderCheck(options.root);
            }).then(() =>{
                return modsDownloader.download(options.root, options.version.number, modsIDs);
            }).then(() =>{
                return authlibCheck(options.root);
            }).then(() =>{
                return forgeCheck(options.root)
            }).then(() =>{
                return launcher.launch(options)
            }).then((result) => {
                resolve(JSON.stringify(result));
            }).catch((err) => {
                modalWindow(err.message);
                reject(err)
            });
    })
});

ipcMain.handle('total-memory', () => os.totalmem());

ipcMain.handle('login', (e, credentials) => {
    const fullfiled = (authData) => {
        options=_.merge({...options},{authorization: authData}); console.log(options.authorization);
        mode = authData.access_token === authData.client_token?'Offline':'Online';
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
