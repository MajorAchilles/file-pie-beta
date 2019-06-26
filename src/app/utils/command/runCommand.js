const { exec } = require("child_process");
const i18n = require("../../i18n");

/**
 * This function runs the given command as a child process that returns a buffer
 * @param {String} command The command to be executed
 * @returns {Promise<ArrayBuffer|Error>} The output stream containing the results of running the command as a buffer.
 */
const runCommand = command => new Promise(
    (resolve, reject) => {
        if (!command) {
            reject(new Error(i18n.app.errors.EMPTY_COMMAND));
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ // eslint-disable-line prefer-promise-reject-errors
                    error,
                    command,
                    platform: process.platform
                });
            }

            resolve({
                stdout,
                stderr,
                command,
                platform: process.platform
            });
        });
    }
);

module.exports = {
    runCommand
};
