/**
 * The events specific to the electron framework.
 */
const ELECTRON = {
    CLOSED: "closed",
    READY: "ready"
};

/**
 * The events specific to the Renderer process.
 */
const WEBCONTENT = {
    DID_FINISH_LOAD: "did-finish-load"
};

/**
 * The events specific to the file-pie application.
 */
const FILEPIE = {
    OS_NOT_SUPPORTED: "FilePie::Events::OsNotSupported",
    DRIVE_LIST_RECEIVED: "FilePie::Events::DriveListReceived"
};

module.exports = {
    ELECTRON,
    FILEPIE,
    WEBCONTENT
};
