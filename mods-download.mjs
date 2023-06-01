import { CurseForgeClient, CurseForgeGameEnum, CurseForgeModLoaderType } from "curseforge-api";
import { DownloaderHelper } from 'node-downloader-helper';
import { existsSync } from 'fs';
//import fetch from 'node-fetch';

const client = new CurseForgeClient('$2a$10$vh2nSvmBS2Trig9lQ4WBX.FcrI7ZkzvJqY0iV2v/ODjcCmr3QeKea');

const modsResults = await client.getMods([61811, 242638, 241392, 51195, 229061, 236484, 228027, 271856, 246391, 223094, 256717, 223794, 225738, 74072, 60028, 241160, 277616, 252239, 285612, 281849, 221857, 287683, 295319, 276837, 409087, 354143, 352835, 235729, 233029, 272671, 310383, 247357, 522574, 253456, 711714, 684624, 318453, 269973, 244830, 296289, 319175, 373774, 642817, 244844, 229060]);

//

modsResults.map((value,index) => {
    const file = value.getFiles({
        gameVersion: "1.12.2",
        modLoaderType: CurseForgeModLoaderType.Forge,
        pageSize: 1
    })
    file.then((res) => {
        console.log(res.data);
        if (res.data.length > 0){
            if (!existsSync(`./mods/${res.data[0].fileName}`)){
                res.data[0].getDownloadURL().then((url) => {
                    const dl = new DownloaderHelper(url, `./mods`,{fileName: res.data[0].fileName});
                    dl.on('end', () => {
                        console.log('Download Completed');
                    });
                    dl.on('error', (err) => console.log('Download Failed', err));
                    dl.start().catch((err) => console.log('error', err));  
                })
            }else{
                console.log('already exist, skip');
            }
        }
    })

    
})
