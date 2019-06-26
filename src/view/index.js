/* globals document */
const { ipcRenderer } = require("electron"); // eslint-disable-line import/no-unresolved
const ReactDOM = require("react-dom");
const { createElement: el } = require("react");
const { Page } = require("./frontPage/Page");
const EVENTS = require("../app/constants/events");

// let pageElement = el(Page);
ipcRenderer.on(EVENTS.FILEPIE.DRIVE_LIST_RECEIVED, (_, driveList) => {
    ReactDOM.render(
        el(
            Page,
            { preText: JSON.stringify(driveList.stdout, null, 4) },
            null
        ),
        document.getElementById("root")
    );
});

ipcRenderer.on(EVENTS.FILEPIE.SHOW_ERROR_DIALOG, (_, dialogOptions) => {
    console.log(dialogOptions);
});
