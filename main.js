const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    },
    show: true,
    frame: false,
    kiosk: true,
    // resizable: false
  });
  win.fullScreen = true;
  win.loadFile("index.html");

  win.webContents.openDevTools({ mode: "right", activate: false });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows.length == 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
