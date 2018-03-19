"use strict";

require("dotenv").config();
const clockodo = require("../../lib/api");
const lib = require("../../lib/lib");

beforeEach(() => {
    clockodo.setClientSettings(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);
});

describe("integration test for apiRequest()", () => {
    it("rejects and throws an error if passed a bad resource", () => {
        const badResource = "thisdoesntexist";
        const params = {};
        const excpectedError = new Error("Request failed with status code 404");

        expect.assertions(1);

        return expect(lib.apiRequest(badResource, params)).rejects.toThrow(excpectedError);
    });

    it("resolves when given a valid resource", () => {
        const goodResource = "users";
        const params = {};

        expect.assertions(1);

        return expect(lib.apiRequest(goodResource, params)).resolves.not.toBeUndefined();
    });
});
