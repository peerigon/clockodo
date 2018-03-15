"use strict";

const clockodo = require("../lib/api");

// There is some use to all these tests, it made me realize I had authentification and authorization issues.
// But more importantly, what if the API changes somehow? This would be an easy way to know.
beforeEach(() => {
    clockodo.setClientSettings(process.env.USER, process.env.API_KEY);
});

describe("getUsers()", () => {
    // it("resolves when given valid parameters", () => {
    //     expect.assertions(1);
    //     return clockodo.getUsers().then(data => {
    //         console.log("data is", data);
    //         expect(data).anything();
    //     });
    // });
});

describe("getEntries()", () => {});

describe("setClientSettings()", () => {});

describe("getAbsences()", () => {});

describe("getUserReports()", () => {
    // I wanted to check that the parameters made it through but I am not sure it is possible
    // So instead, this test makes sure ...
    // it("resolves when given valid parameters", () => {
    // const options = {
    //     type: 1,
    //     year: 2018,
    // };
    // expect.assertions(1);
    // // Actual expect will probably be on a length of the data or something
    // return clockodo.getUserReports(options).then(data => {
    //     expect(data).anything();
    // });
    // });
});

describe("getEntryGroup()", () => {});

describe("getCustomers()", () => {});
