const COMMANDS = require("./commandList");
const runCommand = require("./runCommand");
const CONSTANTS = require("../../constants");
const windowsCommands = require("./windowsCommands");
const linuxCommands = require("./linuxCommands");

const {
    ENUMS: {
        OS
    }
} = CONSTANTS;

/**
 * This function runs the given command appropriate for the current operating system.
 * @param {String} command The command to be executed.
 * @returns {Promise<Object>} A promise that resolves once the command is complete or errors out.
 */
const execute = (command) => {
    switch (process.platform) {
        case OS.WINDOWS:
            return runCommand(windowsCommands[command]); // eslint-disable-line
        case OS.LINUX:
            return runCommand(linuxCommands[command]);
        default:
            return Promise.reject(new Error(`The current operating system, ${process.platform} is not supported yet!`));
    }
};

module.exports = {
    COMMANDS,
    execute
};
