const electron = require("electron"); // eslint-disable-line import/no-unresolved
const { list } = require("./utils/getDriveList");
const EVENTS = require("./constants/events");

const {
    app,
    BrowserWindow
} = electron;

let mainWindow;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";


const loadDriveList = () => {
    list()
        .then((driveList) => {
            console.log(driveList);
            console.log("Sending event to webContents", EVENTS.FILEPIE.DRIVE_LIST_RECEIVED);
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

app.on(EVENTS.FILEPIE.OS_NOT_SUPPORTED, (error) => {
    const messageBoxOptions = {
        type: "error",
        title: "System Error",
        message: error.message
    };
    electron.dialog.showMessageBox(messageBoxOptions);
    process.exit(1);
});
