const { exec } = require("child_process");

/**
 * This function runs the given command as a child process that returns a buffer
 * @param {String} command The command to be executed
 * @returns {Promise<ArrayBuffer|Error>} The output stream containing the results of running the command as a buffer.
 */
module.exports = (command) => new Promise(
    (resolve, reject) => {
        if (!command) {
            reject(new Error("Command is empty."));
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }

            resolve({
                stdout,
                stderr
            });
        });
    }
);