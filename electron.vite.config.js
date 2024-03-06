import postcss_nested from "postcss-nested";
import postcss_import from "postcss-import";
import postcss_simple_vars from "postcss-simple-vars";
import viteSvgr from "vite-plugin-svgr";
import { defineConfig, defineViteConfig } from "electron-vite";

export default defineConfig({
    main: {
        build: {
            outDir: "./dist/main",
            emptyOutDir: true,
        },
    },
    preload: {
        build: {
            outDir: "./dist/preload",
            emptyOutDir: true,
            lib: {
                formats: "cjs",
            },
        },
    },
    renderer: defineViteConfig({
        plugins: [viteSvgr()],
        css: {
            postcss: {
                plugins: [
                    postcss_import(),
                    postcss_nested(),
                    postcss_simple_vars(),
                ],
            },
        },
        build: {
            outDir: "./dist/renderer",
            emptyOutDir: true,
        },
    }),
});
