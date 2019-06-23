const  { ENUMS: { OS } } = require("../../../../../src/app/constants");
const { app: { errors } } = require("../../../../../src/app/i18n/locale-en");

describe("The execute function", () => {
    let originalPlatform;
    let runCommandSpy;
    let execute;
    let COMMANDS;

    beforeAll(() => {
        originalPlatform = process.platform;
        Object.defineProperty(process, "platform", { value: OS.WINDOWS });
    
        runCommandSpy = jest.spyOn(
            require("../../../../../src/app/utils/command/runCommand"),
            "runCommand"
        ).mockImplementation(() => Promise.resolve());
        const { execute: exec, COMMANDS: COMM } = require("../../../../../src/app/utils/command/index");
        execute = exec;
        COMMANDS = COMM;
    });

    afterAll(() => {
        Object.defineProperty(process, "platform", { value: originalPlatform });
    });

    it("should exist", () => {
        expect(execute).toBeInstanceOf(Function);
        expect(execute).toBeDefined();
    });

    it("returns a Promise", () => {
        expect(execute(COMMANDS.GET_DRIVE_LIST)).toBeInstanceOf(Promise);
    });

    it("runs the windows command when on an Windows system", (done) => {
        Object.defineProperty(process, "platform", { value: OS.WINDOWS });

        execute(COMMANDS.GET_DRIVE_LIST).then(() => {
            expect(runCommandSpy).toHaveBeenCalledWith(
                require("../../../../../src/app/utils/command/windowsCommands")[COMMANDS.GET_DRIVE_LIST]
            );
            done();
        })
    });

    it("runs the linux command when on a Linux system", (done) => {
        Object.defineProperty(process, "platform", { value: OS.LINUX });

        execute(COMMANDS.GET_DRIVE_LIST).then(() => {
            expect(runCommandSpy).toHaveBeenCalledWith(
                require("../../../../../src/app/utils/command/linuxCommands")[COMMANDS.GET_DRIVE_LIST]
            );
            done();
        })
    });

    it("rejects the promise otherwise with an error object", (done) => {
        Object.defineProperty(process, "platform", { value: OS.MAC });

        execute(COMMANDS.GET_DRIVE_LIST).catch((error) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(errors.SYSTEM_NOT_SUPPORTED);
            done();
        });
    });
});
