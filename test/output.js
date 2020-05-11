const assert = require("assert");
const { getMaxFilenameLength } = require("../build/handler/output");

describe("Output", () => {
    describe("getMaxFilenameLength", () => {
        it("gets the maximum filesize", () => {
            const files = [
                "a",
                "abc",
                "abc",
                "abcd"
            ];
    
            assert.equal(getMaxFilenameLength(files), 4);
        });
    });
});
