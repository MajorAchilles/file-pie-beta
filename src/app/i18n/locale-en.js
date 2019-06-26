const i18n = {
    app: {
        errors: {
            EMPTY_COMMAND: "Command is empty.",
            SYSTEM_NOT_SUPPORTED: `The current operating system: ${process.platform}, is not supported yet!`,
            SELECT_DIRECTORY: `Select ${process.platform === "win32" ? "Folder" : "Directory"}`
        },
        components: {
            dialog: {
                TITLE: "Information",
                TITLE_UNSUPPORTED_OS: "Unsupported OS",
                ACCEPT: "OK",
                CLOSE: "Close",
                CLOSE_APP: "Close FilePie"
            }
        }
    }
};

module.exports = i18n;
