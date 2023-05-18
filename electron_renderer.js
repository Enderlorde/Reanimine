const { version } = require("html-webpack-plugin");

const chromeVersionElement = document.querySelector("#chrome-version");
const nodeVersionElement = document.querySelector("#node-version");
const electronVersionElement = document.querySelector("#electron-version");

chromeVersionElement.innerText = `Chrome: ${versions.chrome}`;
nodeVersionElement.innerText = `Node: ${versions.node}`;
electronVersionElement.innerText = `Electron: ${versions.electron}`;