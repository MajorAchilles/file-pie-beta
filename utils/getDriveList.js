const {
    COMMANDS,
    execute
} = require("./command");

const list = () => execute(COMMANDS.GET_DRIVE_LIST);

module.exports = {
    list
};
