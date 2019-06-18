const COMMANDS = require("./commandList");

module.exports = {
    [COMMANDS.GET_DRIVE_LIST]: "df -t ext4" // Windows command to get the drive list
}