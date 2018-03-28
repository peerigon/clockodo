"use strict";

require("dotenv").config();

const Clockodo = require("./lib/api");
const prompt = require("prompt"); // eslint-disable-line import/no-extraneous-dependencies

const clockodo = new Clockodo(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);

prompt.start();

prompt.get("testFunction", (err, result) => {
    if (err) {
        console.log(err);
    }

    if (result.testFunction === "getEntries") {
        const parameters = {
            billable: 2,
            userId: 38557,
        };

        clockodo
            .getEntries("03-12-2016", "08-18-2017", parameters)
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
