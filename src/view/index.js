/* globals document */
const { ipcRenderer } = require("electron"); // eslint-disable-line import/no-unresolved
const EVENTS = require("../app/constants/events");

ipcRenderer.on(EVENTS.FILEPIE.DRIVE_LIST_RECEIVED, (_, driveList) => {
    document.body.innerHTML = `<pre>${JSON.stringify(driveList, null, 4)}</pre>`;
});
