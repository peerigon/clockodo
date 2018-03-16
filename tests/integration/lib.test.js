"use strict";

require("dotenv").config();
const clockodo = require("../../lib/api");
const lib = require("../../lib/lib");

beforeEach(() => {
    clockodo.setClientSettings(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);
});

describe("integration test for apiRequest()", () => {
    // beforeEach(() => {});

    it("throws an error if passed a bad resource", () => {
        // const goodResource = "users";
        const badResource = "thisdoesntexist";
        const params = {};
        const excpectedError = new Error("Request failed with status code 404");

        expect.assertions(1);

        return lib.apiRequest(badResource, params).catch(error => {
            expect(error).toEqual(excpectedError);
        });
    });

    // it("rejects promise with data.error in case of an error ", () => {});
    // it("resolves with data if no error", () => {});
});
