const COMMANDS = require("./commandList");
const runCommand = require("./runCommand");

/**
 * This enum contains the list of supported operating systems.
 */
const OS = {
    LINUX: "linux",
    MAC: "darwin",
    WINDOWS: "win32"
};

/**
 * This function runs the given command appropriate for the current operating system.
 * @param {String} command The command to be executed.
 */
const execute = (command) => {
    switch(process.platform) {
        case OS.WINDOWS:
            return runCommand(require("./windowsCommands")[command]);
        case OS.LINUX:
            return runCommand(require("./linuxCommands")[command]);
        default:
            return Promise.reject(new Error(`The current operating system, ${process.platform} is not supported yet!`));
    }
};

module.exports = {
    COMMANDS,
    execute
};
