"use strict";

require("dotenv").config();

const Clockodo = require("./lib/api");

const clockodo = new Clockodo(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);
const params = {
    time_since: "2017-01-01 00:00:00",
    time_until: "2017-02-01 00:00:00",
    "filter[billable]": 0,
};

clockodo
    .getEntries(params)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("caught", error);
    });
