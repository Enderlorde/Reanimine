import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

const esm = [
    'curseforge-api',
    'node-fetch'
]

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin({exclude: esm})]
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        build: {
            rollupOptions:{
                input:{
                    index: './src/preload/index.js',
                    modal: './src/preload/modal.js'
                }
            }
        }
    },
    renderer: {
        plugins: [react(), svgr()],
        build: {
            rollupOptions:{
                input:{
                    index: './src/renderer/index.html',
                    modal: './src/renderer/modal/index.html'
                }
            }
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    esm.map((module) => {
                        if (id.includes(module)){
                            return module
                        }
                    })
                }
            }
        }
    }
});