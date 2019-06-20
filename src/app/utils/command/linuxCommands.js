const COMMANDS = require("./commandList");

module.exports = {
    [COMMANDS.GET_DRIVE_LIST]: "df -t ext4" // Linux command to get the drive list, filtered by ext4 type
};
