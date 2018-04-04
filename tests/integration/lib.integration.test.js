"use strict";

require("dotenv").config();

const { ClockodoApi } = require("../../lib/lib");

let clockodo;

beforeEach(() => {
    clockodo = new ClockodoApi(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);
});

describe("integration test for get()", () => {
    it("rejects and throws an error if passed a bad resource", () => {
        const badResource = "thisdoesntexist";
        const params = {};
        const expectedError = "Request failed with status code 404";

        expect.assertions(1);

        return expect(clockodo.get(badResource, params)).rejects.toThrow(expectedError);
    });

    it("resolves when given a valid resource (with no params passed)", () => {
        const goodResource = "users";

        expect.assertions(1);

        return expect(clockodo.get(goodResource)).resolves.toHaveProperty("users");
    });

    it("returns with immediate access to data", () => {
        const getUser = "/users/" + process.env.CLOCKODO_TEST_ID;
        const expectedName = process.env.CLOCKODO_TEST_NAME;

        expect.assertions(1);

        return clockodo.get(getUser).then(data => {
            expect(data.user.name).toBe(expectedName);
        });
    });
});
