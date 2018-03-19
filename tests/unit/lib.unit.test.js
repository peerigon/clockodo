"use strict";

require("dotenv").config();
const lib = require("../../lib/lib");
const axios = require("axios");

jest.mock("axios");

beforeEach(() => {
    const expectedResponseData = {};

    axios.get.mockResolvedValue(expectedResponseData);
});

describe("apiRequest()", () => {
    it("calls axios.get()", () => {
        const resource = "users";
        const params = {};

        expect(axios.get.mock.calls.length).toEqual(0);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls.length).toEqual(1);
        });
    });

    it("merges args", () => {
        const resource = "entries";
        const params = {
            time_since: "2017-01-01 00:00:00",
            time_until: "2017-02-01 00:00:00",
        };
        const headers = {
            mockUser: "test@gmail.com",
            mockAPIKey: "12345",
        };

        lib.configure(headers.mockUser, headers.mockAPIKey);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls[0][0]).toContain(resource);
            expect(axios.get.mock.calls[0][1].params).toHaveProperty("time_since");
            expect(axios.get.mock.calls[0][1].params).toHaveProperty("time_until");
            expect(axios.get.mock.calls[0][1].headers).toHaveProperty("X-ClockodoApiUser");
            expect(axios.get.mock.calls[0][1].headers).toHaveProperty("X-ClockodoApiKey");
        });
    });
});

afterEach(() => {
    axios.get.mockClear();
});
