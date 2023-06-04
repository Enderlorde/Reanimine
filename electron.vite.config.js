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
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        plugins: [react(), svgr()]
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