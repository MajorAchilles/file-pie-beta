const electron = require("electron"); // eslint-disable-line import/no-unresolved
const { list } = require("./utils/getDriveList");
const EVENTS = require("./constants/events");
const i18n = require("./i18n");

const {
    app,
    ipcMain,
    BrowserWindow
} = electron;

let mainWindow;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";


const loadDriveList = () => {
    list()
        .then((driveList) => {
            mainWindow.webContents.send(EVENTS.FILEPIE.DRIVE_LIST_RECEIVED, driveList);
        })
        .catch((errorObject) => {
            app.emit(EVENTS.FILEPIE.OS_NOT_SUPPORTED, errorObject);
        });
};

app.on(EVENTS.ELECTRON.READY, () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/../view/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.on(EVENTS.ELECTRON.CLOSED, () => { mainWindow = null; });
    mainWindow.webContents.on(EVENTS.WEBCONTENT.DID_FINISH_LOAD, loadDriveList);
});

app.on(EVENTS.FILEPIE.OS_NOT_SUPPORTED, (errorObject) => {
    mainWindow.webContents.send(EVENTS.FILEPIE.SHOW_ERROR_DIALOG, {
        title: i18n.app.components.dialog.TITLE_UNSUPPORTED_OS,
        message: errorObject.message,
        closeEvent: EVENTS.FILEPIE.OS_NOT_SUPPORTED_ACCEPTED
    });
});

ipcMain.on(EVENTS.FILEPIE.OS_NOT_SUPPORTED_ACCEPTED, () => {
    process.exit(1);
});
