import { CurseForgeClient, CurseForgeModLoaderType } from "curseforge-api";
import { DownloaderHelper } from 'node-downloader-helper';
import { EventEmitter } from "stream";
import fetch from 'node-fetch';
import path from "path";
import fs from 'fs';

export class ModsDownloader extends EventEmitter {
    constructor(apiKey, ) {
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

        const modsInfo = await this.getModsInfo(modsIDArray);

        const modsPromises = modsInfo.map(async (mod) => {
            const modFile = await mod.getFiles({
                gameVersion: gameVersion,
                modLoaderType: CurseForgeModLoaderType.Forge,
                pageSize: 1
            });
    
            if (modFile.data.length > 0){
                const data = await modFile.data[0].getDownloadURL();
                
                const requestOptions = {
                    progressThrottle: 300,
                    fileName: modFile.data[0].fileName,
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
                    const dl = new DownloaderHelper(data, path.resolve(dir, `mods`), requestOptions);
                    dl.on('end', () => {
                        console.log('Download Completed');
                        resolve('Downloaded');
                    });
                    dl.on('progress.throttled', (progress) => {
                        this.emit('download-status', {type: progress.name, current: progress.downloaded, total: progress.total});
    
                    });
                    dl.on('skip', (progress) => {
                        this.emit('download-status', {type: progress.fileName, current: progress.downloadedSize, total: progress.totalSize});
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

        });
        return Promise.all(modsPromises);
    }

}