import { CurseForgeClient, CurseForgeModLoaderType } from "curseforge-api";
import { DownloaderHelper } from 'node-downloader-helper';
import { existsSync } from 'fs';
import { EventEmitter } from "stream";
import fetch from 'node-fetch';
import { join, resolve } from "path";

export class ModsDownloader extends EventEmitter {
    constructor(apiKey, ) {
        super();
        this.client = new CurseForgeClient(apiKey,{fetch});
        //this.modsIDArray = modsIDArray;
    }

    test(text){
        this.emit('test', text)
    }

    async getModsInfo(modsIDArray) {
        return await this.client.getMods(modsIDArray);
    }

    async download(dir,gameVersion, modsIDArray){
        //this.modsResults = await this.client.getMods(this.modsIDArray);
        const modsInfo = await this.getModsInfo(modsIDArray);

        modsInfo.map(async (mod) => {
            const modFile = await mod.getFiles({
                gameVersion: gameVersion,
                modLoaderType: CurseForgeModLoaderType.Forge,
                pageSize: 1
            });
    
            modFile.then((res) => {
                console.log(res.data);
                if (res.data.length > 0){
                    if (!existsSync(join(dir,"mods",res.data[0].fileName))){
                        res.data[0].getDownloadURL().then(async (url) => {
                            const dl = new DownloaderHelper(url, resolve(dir, `mods`),{fileName: res.data[0].fileName});
                            dl.on('end', () => {
                                console.log('Download Completed');
                            });
                            dl.on('progress.throttled', (progress) => {
                                this.emit('download-status', {type: progress.name, current: progress.downloaded, total: progress.total});

                            });
                            dl.on('error', (err) => {
                                console.log('Download Failed', err);
                            });
                            dl.start().catch((err) => console.log('error', err));  
                        })
                    }else{
                        console.log('already exist, skip');
                    }
                }else{
                    Promise.reject("no data")
                }
            })
        });
    }
}