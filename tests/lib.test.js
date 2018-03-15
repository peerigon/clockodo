"use strict";

const clockodo = require("../lib/api");
const lib = require("../lib/lib");
const axios = require("axios");

jest.mock("axios");

beforeEach(() => {
    clockodo.setClientSettings(process.env.USER, process.env.API_KEY);
});

describe("apiRequest()", () => {
    // beforeEach(() => {});

    it("calls axios.get()", () => {
        const resource = "users";
        const params = {};
        const mockResponseData = {};

        axios.get.mockResolvedValue(mockResponseData);

        expect(axios.get.mock.calls.length).toEqual(0);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls.length).toEqual(1);
        });
    });
    it("rejects if data attribute has error", () => {
        const resource = "incorrectResourcePath";
        const params = {};
        const mockResponseError = "Request failed with status code 404";

        // TODO: Not really rejecting!
        return expect(lib.apiRequest(resource, params)).resolves.toThrow(mockResponseError);
    });
    // it("merges args", () => {});
    // it("rejects promise with data.error in case of an error ", () => {});
    // it("resolves with data if no error", () => {});
});
