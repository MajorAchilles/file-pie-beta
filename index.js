const electron = require("electron")
const getDriveList = require("./utils/getDriveList");
const EVENTS = require("./constants/events");
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

app.on(EVENTS.ELECTRON.READY, () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({});

    getDriveList.list()
        .then((list) => {
            console.log(list);
            // Load the index.html of the app.
            mainWindow.loadURL(`file://${__dirname}/index.html`);

            // mainWindow.webContents.openDevTools()

            // Emitted when the window is closed.
            mainWindow.on(EVENTS.ELECTRON.CLOSED, () => mainWindow = null);
        })
        .catch(error => app.emit(EVENTS.FILEPIE.OS_NOT_SUPPORTED, error));
});

app.on(EVENTS.FILEPIE.OS_NOT_SUPPORTED, (error) => {
    const messageBoxOptions = {
        type: "error",
        title: "System Error",
        message: error.message
    };
    electron.dialog.showMessageBox(messageBoxOptions);
    process.exit(1);
});
