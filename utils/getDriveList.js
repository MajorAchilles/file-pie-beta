const {
    COMMANDS,
    execute
} = require("./command");
const CONSTANTS = require("../constants");
const {
    ENUMS: {
        OS
    }
} = CONSTANTS;

/**
 * Formats the output from the command for linux based systems.
 * @param {Object} output The output object returned on running the command
 * @returns {Object} The output object with stdout containing the formatted output
 */
const formatLinuxOutput = output => {
    const driveRows = output.stdout.split("\n").slice(1).filter(row => row.length).map(row => row.split(" ")[0]);

    return Object.assign({}, output, { stdout: driveRows });
};

/**
 * Formats the output from the command for windows based systems.
 * @param {Object} output The output object returned on running the command
 * @returns {Object} The output object with stdout containing the formatted output
 */
const formatWindowsOutput = output => {
    const driveRows = output.stdout.split("\r\r\n").slice(1).filter(row => row.length).map(row => row.split(" ")[0]);

    return Object.assign({}, output, { stdout: driveRows });
};

/**
 * Returns the list of logical drives connected to the system
 * @returns {Array<String>} An array of labels of the logical drives.
 */
const list = async () => {
    const output = await execute(COMMANDS.GET_DRIVE_LIST);
    if (output.platform === OS.WINDOWS) {
        return formatWindowsOutput(output);
    } else {
        return formatLinuxOutput(output);
    }
};

module.exports = {
    list
};
