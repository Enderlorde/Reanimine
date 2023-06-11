import { CurseForgeClient, CurseForgeModLoaderType } from "curseforge-api";
import { DownloaderHelper } from 'node-downloader-helper';
import { EventEmitter } from "stream";
import fetch from 'node-fetch';
import path from "path";
import fs from 'fs';

export class ModsDownloader extends EventEmitter {
    constructor(apiKey) {
        super();
        this.client = new CurseForgeClient(apiKey,{fetch});
    }

    async getModsInfo(modsIDArray) {
        return await this.client.getMods(modsIDArray);
    }

    async download(dir,gameVersion, modsIDArray){
        fs.mkdir((path.join(dir, 'mods')),{ recursive: true },() => {
            console.log('Mods folder created');
        });

        const info = await this.getModsInfo(modsIDArray);

        const modsPromises = info.reduce(async (previousPromise, mod) => {
            await previousPromise;

            const file = await mod.getFiles({
                gameVersion: gameVersion,
                modLoaderType: CurseForgeModLoaderType.Forge,
                pageSize: 1
            });
    
            if (file.data.length > 0){
                const url = await file.data[0].getDownloadURL();
                if (!url) return Promise.resolve('No url')      
                const requestOptions = {
                    progressThrottle: 300,
                    fileName: file.data[0].fileName,
                    override: {
                        skip: true,
                        skipSmaller: false
                    },
                    retry: {
                        maxRetries: 10,
                        delay: 1000
                    }
                }
                
                return new Promise ((resolve,reject) => {
                    const dl = new DownloaderHelper(url, path.resolve(dir, `mods`), requestOptions);
                    dl.on('end', () => {
                        console.log('Download Completed');
                        resolve('Downloaded');
                    });
                    dl.on('progress.throttled', (progress) => {
                        this.emit('download-status', {type: progress.name, current: progress.downloaded, total: progress.total});
    
                    });
                    dl.on('skip', (progress) => {
                        this.emit('download-status', {type: progress.fileName, current: progress.downloadedSize, total: progress.totalSize});
                        resolve('Skipped');
                    })
                    dl.on('error', (err) => {
                        console.log('Download Failed', err);
                        reject(err);
                    });
                    dl.start().catch((err) => {
                        console.log('Download Failed', err);
                        reject(err);
                    });
                });
            }else{
                throw new Error('no data');
            }

        }, Promise.resolve());
        return modsPromises;
    }

}