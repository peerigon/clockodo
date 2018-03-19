"use strict";

require("dotenv").config();
const lib = require("../../lib/lib");
const axios = require("axios");

jest.mock("axios");

beforeEach(() => {
    const expectedResponseData = {};

    axios.get.mockResolvedValue(expectedResponseData);
});

describe("Api Endpoint Methods", () => {
    it("ensures paramters sent from getUsers() are in the request", () => {
        const resource = "users";
        const params = {};

        expect(axios.get.mock.calls.length).toEqual(0);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls[0][0]).toContain(resource);
        });
    });
    it("ensures paramters sent from getEntries() are in the request", () => {
        const resource = "entries";
        const params = {};

        expect(axios.get.mock.calls.length).toEqual(0);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls[0][0]).toContain(resource);
        });
    });
    it("ensures paramters sent from getAbsences() are in the request", () => {
        const resource = "absences";
        const params = {};

        expect(axios.get.mock.calls.length).toEqual(0);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls[0][0]).toContain(resource);
        });
    });
    it("ensures paramters sent from getUserReports() are in the request", () => {
        const resource = "userreports";
        const params = {};

        expect(axios.get.mock.calls.length).toEqual(0);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls[0][0]).toContain(resource);
        });
    });
    it("ensures paramters sent from getEntryGroup() are in the request", () => {
        const resource = "entrygroups";
        const params = {};

        expect(axios.get.mock.calls.length).toEqual(0);

        return lib.apiRequest(resource, params).then(data => {
            expect(axios.get.mock.calls[0][0]).toContain(resource);
        });
    });
    it("ensures paramters sent from getCustomers() are in the request", () => {
        const resource = "customers";
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
