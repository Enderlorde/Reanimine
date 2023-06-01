const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const os = require('os');
const _ = require('lodash');
const fs = require('fs');
const { DownloaderHelper } = require('node-downloader-helper');
//const open = require('open');

Authenticator.changeApiUrl('https://authserver.ely.by/auth')
let options = {
    root: "./minecraft",
    //customArgs: [`-javaagent:./minecraft/authlib-injector-1.2.2.jar=ely.by                                           `],
    version: {
        number: "1.12.2",
        type: "release"
    },
    forge: `./minecraft/Forge.jar`,
    server:{
        //host: '45.87.246.29',
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

    
    ipcMain.handle('minimize', () => {
        window.minimize();
    });

    const savedOptions = window.webContents.executeJavaScript(`localStorage.getItem('options')`).then(value => JSON.parse(value));
    savedOptions.then((val) => {options = _.merge({...options}, {...val}); console.log(options); console.log(options.authorization)});

    launcher.on('download-status', (e) => window.webContents.send('update-counter', e));
    launcher.on('download', (e) => window.webContents.send('download-done', e));  
    launcher.on('close', (code) => window.webContents.send('game-close', code));

    //window.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
    //window.loadURL(`http://localhost:3000`);
    window.loadURL(process.env.ELECTRON_START_URL||`file://${path.join(__dirname, 'build/index.html')}`);
}

const buffer = fs.readFileSync('./myfile.nbt');
console.log(parseNBT(buffer));
console.log(parseNBT(buffer).payload);
console.log(parseNBT(buffer).payload[0]);
console.log(parseNBT(buffer).payload[0].payload);
console.log(parseNBT(buffer).payload[0].payload[0]);

/* const test = new NBT_Compound('')
test.payload = [new NBT_List('servers')]
test.payload[0].payload = [new NBT_Compound()]
test.payload[0].payload[0].payload = [ new NBT_Compound()]
test.payload[0].payload[0].payload[0].payload = [new NBT_String("ip"), new NBT_String("name")]
test.payload[0].payload[0].payload[0].payload[0].payload = "45.87.246.29";
test.payload[0].payload[0].payload[0].payload[1].payload = "Server"; */

/* const buffer2 = writeNBT(test)
fs.writeFileSync('myfile.nbt', buffer2) */

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
                };
            })
        })
    })
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

/* launcher.on('debug', (e) => {
    const closingRegExp = new RegExp(/closing\.\.\./);
    if (closingRegExp.test(e)) launcher.launch(options);
    console.log(e)
}); */
launcher.on('data', (e) => console.log(e));
launcher.on('debug', (e) => console.log(e));
