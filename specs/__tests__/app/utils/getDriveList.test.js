// const runCommand = require("../../../../../src/app/utils/command/runCommand").runCommand;
// const i18n = require("../../../../../src/app/i18n/locale-en");

// jest.mock("child_process");

// describe("The runCommand function", () => {
//     const MOCK_COMMAND = "ls";
//     let execSpy;
//     beforeEach(() => {
//         execSpy = jest.spyOn(require("child_process"), "exec").mockImplementation(() => {
//             return Promise.resolve();
//         });
//     });

//     it("should exist", () => {
//         expect(runCommand).toBeDefined();
//     });

//     it("returns a Promise", () => {
//         expect(runCommand(MOCK_COMMAND)).toBeInstanceOf(Promise);
//     });

//     describe("which", () => {
//         it("is rejected if no command is provided", (done) => {
//             return runCommand().catch((value) => {
//                 expect(value).toBeInstanceOf(Error);
//                 expect(value.message).toBe(i18n.app.errors.EMPTY_COMMAND);
//                 done();
//             });
//         });

//         it("executes the given command as a child process", (done) => {
//             runCommand(MOCK_COMMAND);
//             setTimeout(() => {
//                 expect(execSpy).toHaveBeenCalledWith(MOCK_COMMAND, expect.any(Function));
//                 done();
//             }, 100);
//         });

//         describe("the exec callback", () => {
//             let callback;
//             beforeEach((done) => {
//                 runCommand(MOCK_COMMAND);
//                 setTimeout(() => {
//                     callback = execSpy.mock.calls[execSpy.mock.calls.length - 1][1];
//                     done();
//                 }, 100);
//             });

//             xit("rejects the promise if the command errors out", (done) => {
//                 debugger;
//                 const ERROR = "ERROR";
//                 execSpy.mockImplementation(() => {
//                     callback(ERROR);
//                 });

//                 return runCommand(MOCK_COMMAND)
//                     .catch((errorObject) => {
//                         expect(errorObject).toBe({
//                             error: ERROR,
//                             command: MOCK_COMMAND,
//                             platform: process.platform
//                         });
//                         done();
//                     });
//             });

//             xit("resolves it otherwise", (done) => {
//                 const ERROR = "ERROR";
//                 execSpy.mockImplementation(() => {
//                     callback(null, "STDOUT", "STDERR");
//                 });

//                 runCommand(MOCK_COMMAND)
//                     .then((resolvedObject) => {
//                         expect(resolvedObject).toBe({
//                             stdout: "STDOUT",
//                             stderr: "STDERR",
//                             command: MOCK_COMMAND,
//                             platform: process.platform
//                         });
//                         done();
//                     });
//             });
//         });
//     });
// });
