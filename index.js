"use strict";

const { Clockodo } = require("./dist/index");

const clockodoApi = new Clockodo({
    user: "tanner.hoisington@peerigon.com",
    apiKey: "m5nt4xlgwqg617r2cpmmytarpsdoov2z",
});

clockodoApi.getTargetHours({ userId: "61938" }).then(console.log);

// clockodoApi.getUsers().then(console.log);

// clockodoApi.getSingleTargetHourSet({ id: "27173" }).then(console.log);