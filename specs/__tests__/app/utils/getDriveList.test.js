const {
    ENUMS: { OS }
} = require("../../../../src/app/constants");
const command = require("../../../../src/app/utils/command");

describe("The runCommand function", () => {
    let list;
    let executeSpy;
    beforeEach(() => {
        executeSpy = jest.spyOn(command, "execute").mockImplementation(() => {
            return Promise.resolve({
                platform: OS.WINDOWS,
                stdout: "FIRSTROW\r\r\nC: SOME_SIZE SOME_TYPE\r\r\nD: ANOTER_SIZE ANOTHER_TYPE"
            });
        });
        const { list: listFunction }  = require("../../../../src/app/utils/getDriveList");
        list = listFunction;
    });

    it("should exist", () => {
        expect(list).toBeDefined();
        expect(list).toBeInstanceOf(Function);
    });

    it("returns a Promise", () => {
        expect(list()).toBeInstanceOf(Promise);
    });

    describe("which", () => {
        it("returns a list of drive letters if the platform is windows", (done) => {
            return list().then((value) => {
                expect(value).toEqual({
                    platform: OS.WINDOWS,
                    stdout: ["C:", "D:"]
                });
                done();
            });
        });

        it("returns a list of disk labels if the platform is linux", (done) => {
            executeSpy = jest.spyOn(command, "execute").mockImplementation(() => {
                return Promise.resolve({
                    platform: OS.LINUX,
                    stdout: "FIRSTROW\ndev/sda1 SOME_SIZE SOME_TYPE\ndev/sda2 ANOTER_SIZE ANOTHER_TYPE"
                });
            });
            return list().then((value) => {
                expect(value).toEqual({
                    platform: OS.LINUX,
                    stdout: ["dev/sda1", "dev/sda2"]
                });
                done();
            });
        });
    });
});
