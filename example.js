/* eslint-disable func-style */
"use strict";

const {
    Clockodo,
} = require("./dist/index");

const clockodo = new Clockodo({
    apiKey: "eenrq7u8dnhgk41c1i8o1ko34yw2bibo",
    user: "celestine.auburger@peerigon.com",
});

const func = (passedFunction) => {
    // eslint-disable-next-line promise/catch-or-return
    passedFunction.then(
        result => {
            console.log("The resolved value is:\n", result);

            return result;
        }, err => {
            console.log("Damn it, there was an error!\n", err.response.data.error);

            return err;
        });
};

func(clockodo.getTargetHours({userId: 61938}));

