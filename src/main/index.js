import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import path from "path";

const singleInstanceLock = app.requestSingleInstanceLock();

const createWindow = () => {
    let window = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "..\\preload\\index.cjs"),
        },
    });

    window.webContents.userAgent = "desktop";

    window.webContents.session.webRequest.onBeforeSendHeaders(
        (details, callback) => {
            callback({
                requestHeaders: { Origin: "*", ...details.requestHeaders },
            });
        },
    );

    window.webContents.session.webRequest.onHeadersReceived(
        (details, callback) => {
            callback({
                responseHeaders: {
                    //'Access-Control-Allow-Origin': ['*'],
                    // We use this to bypass headers
                    "Access-Control-Allow-Headers": ["*"],
                    ...details.responseHeaders,
                },
            });
        },
    );

    window.webContents.session.clearCache();

    window.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    ipcMain.handle("selectDirectory", async () => {
        const { cancelled, filePaths } = await dialog.showOpenDialog(window, {
            properties: ["openDirectory"],
        });
        if (cancelled) {
            return;
        } else {
            return filePaths[0];
        }
    });

    ipcMain.handle("minimizeLauncher", () => {
        window.minimize();
    });
    window.loadURL("http://localhost:5173");
};

ipcMain.handle("getAppVersion", () => app.getVersion());

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

if (!singleInstanceLock) {
    app.quit();
} else {
    app.on("second-instance", () => {
        if (window) {
            if (window.isMinimized()) window.restore();
            window.focus();
        }
    });
}

ipcMain.handle("closeLauncher", () => {
    app.quit();
});

app.whenReady().then(() => createWindow());
