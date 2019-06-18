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

const parseLinuxOutput = output => {
    const driveRows = output.stdout.split("\n").slice(1).filter(row => row.length).map(row => row.split(" ")[0]);

    return Object.assign({}, output, { stdout: driveRows });
};

const parseWindowsOutput = output => {
    const driveRows = output.stdout.split("\r\r\n").slice(1).filter(row => row.length).map(row => row.split(" ")[0]);

    return Object.assign({}, output, { stdout: driveRows });
};

const list = async () => {
    const output = await execute(COMMANDS.GET_DRIVE_LIST);
    if (output.platform === OS.WINDOWS) {
        return parseWindowsOutput(output);
    } else {
        return parseLinuxOutput(output);
    }
};

module.exports = {
    list
};
