const { execute, COMMANDS } = require("../../../../../src/app/utils/command/index");
const  { ENUMS: { OS } } = require("../../../../../src/app/constants");

describe("The execute function", () => {
    let originalPlatform;
    let runCommandSpy;

    beforeAll(() => {
        originalPlatform = process.platform;
        Object.defineProperty(process, "platform", { value: OS.WINDOWS });
    });

    afterAll(() => {
        Object.defineProperty(process, "platform", { value: originalPlatform });
    });

    beforeEach(() => {
        jest.resetModules();
        runCommandSpy = jest.spyOn(
            require("../../../../../src/app/utils/command/runCommand"),
            "runCommand"
        ).mockImplementation(() => Promise.resolve());
    });

    it("should exist", () => {
        expect(execute).toBeInstanceOf(Function);
        expect(execute).toBeDefined();
    });

    it("returns a Promise", (done) => {
        expect(execute(COMMANDS.GET_DRIVE_LIST)).toBeInstanceOf(Promise);
    });
});
