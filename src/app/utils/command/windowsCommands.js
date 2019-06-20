const COMMANDS = require("./commandList");

module.exports = {
    [COMMANDS.GET_DRIVE_LIST]: "wmic logicaldisk get name" // Windows command to get the drive list
};
