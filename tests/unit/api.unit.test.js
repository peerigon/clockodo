"use strict";

require("dotenv").config();
const lib = require("../../lib/lib");
const axios = require("axios");

jest.mock("axios");

beforeEach(() => {
    const expectedResponseData = {};

    axios.get.mockResolvedValue(expectedResponseData);
});

describe("Api Endpoint Method", () => {
    it("ensures paramters sent from getUsers() are in the request", () => {
        const resource = "users";
        const params = {};

        expect(axios.get.mock.calls.length).toEqual(0);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls[0][0]).toContain(resource);
        });
    });
});

afterEach(() => {
    axios.get.mockClear();
});
