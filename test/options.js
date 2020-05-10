const assert = require("assert");
const { isShortOption, isLongOption } = require("../build/parser/options");

describe("Parser", function() {
    describe("isShortOption()", function() {
        it("matches all lowercase letters", function() {
            for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); ++i) {
                assert.equal(isShortOption(`-${String.fromCharCode(i)}`), true);
            }
        });

        it("matches all uppercase letters", function() {
            for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); ++i) {
                assert.equal(isShortOption(`-${String.fromCharCode(i)}`), true);
            }
        });

        it("rejects empty option", function() {
            assert.equal(isShortOption(`-`), false);
        });

        it("matches grouped short options", function() {
            assert.equal(isShortOption("-vh"), true);
        });

        it("does not match long options", function() {
            assert.equal(isShortOption("--experimentalDecorators"), false);
        })
    });

    describe("isLongOption()", function() {
        it("matches alphabetic strings", function() {
            assert.equal(isLongOption("--experimentalDecorators"), true);
        });

        it("does not match special characters", function() {
            assert.equal(isLongOption("--hello@#;&"), false);
        });

        it("does not match short options", function() {
            assert.equal(isLongOption("-c"), false);
        });
    });
});
