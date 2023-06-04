import { CurseForgeClient, CurseForgeModLoaderType } from "curseforge-api";
import { DownloaderHelper } from 'node-downloader-helper';
import { existsSync } from 'fs';
import { EventEmitter } from "stream";
import fetch from 'node-fetch';
import { join, resolve } from "path";

export class ModsDownloader extends EventEmitter {
    constructor(apiKey, modsIDArray) {
        super();
        this.client = new CurseForgeClient(apiKey,{fetch});
        this.modsIDArray = modsIDArray;
    }

    test(text){
        this.emit('test', text)
    }

    async download(dir,gameVersion){
        this.modsResults = await this.client.getMods(this.modsIDArray);
        try{
            this.modsResults.map((value) => {
                const file = value.getFiles({
                    gameVersion: gameVersion,
                    modLoaderType: CurseForgeModLoaderType.Forge,
                    pageSize: 1
                });
        
                file.then((res) => {
                    console.log(res.data);
                    if (res.data.length > 0){
                        if (!existsSync(join(dir,"mods",res.data[0].fileName))){
                            res.data[0].getDownloadURL().then((url) => {
                                const dl = new DownloaderHelper(url, resolve(dir, `mods`),{fileName: res.data[0].fileName});
                                dl.on('end', () => {
                                    console.log('Download Completed');
                                });
                                dl.on('progress.throttled', (progress) => {
                                    this.emit('download-status', {type: progress.name, current: progress.downloaded, total: progress.total})
                                });
                                dl.on('error', (err) => console.log('Download Failed', err));
                                dl.start().catch((err) => console.log('error', err));  
                            })
                        }else{
                            console.log('already exist, skip');
                        }
                    }
                })
            });
        }catch(e){
            Promise.reject(e)
        }
        Promise.reject();
    }
}