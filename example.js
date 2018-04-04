"use strict";

require("dotenv").config();

const Clockodo = require("./lib/api");
const prompt = require("prompt"); // eslint-disable-line import/no-extraneous-dependencies

const clockodo = new Clockodo(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);

prompt.start();
/* eslint-disable complexity */
prompt.get("testFunction", (err, result) => {
    if (err) {
        console.log(err);
    }

    if (result.testFunction === "getEntries") {
        const parameters = {
            filterBillable: 2,
            filterUserId: 38557,
            begin: "03-12-2016",
            end: "08-18-2017",
        };

        clockodo
            .getEntries(parameters)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log("caught", error);
            });
    } else if (result.testFunction === "getUsers") {
        clockodo
            .getUsers()
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log("caught", error);
            });
    }
});
