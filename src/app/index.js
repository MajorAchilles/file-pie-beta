const electron = require("electron"); // eslint-disable-line import/no-unresolved
const getDriveList = require("./utils/getDriveList");
const EVENTS = require("./constants/events");

const {
    app,
    BrowserWindow
} = electron;

let mainWindow;

app.on(EVENTS.ELECTRON.READY, () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({});

    getDriveList.list()
        .then((list) => {
            console.log(list); // eslint-disable-line no-console
            // Load the index.html of the app.
            mainWindow.loadURL(`file://${__dirname}/index.html`);

            // mainWindow.webContents.openDevTools()

            // Emitted when the window is closed.
            mainWindow.on(EVENTS.ELECTRON.CLOSED, () => { mainWindow = null; });
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
