"use strict";

const clockodo = require("./lib/api");

clockodo.setClientSettings(process.env.USER, process.env.API_KEY);
clockodo
    .getUsers()
    .then(data => {
        data.users.forEach(console.log);
    })
    .catch(error => {
        console.log("caught", error);
    });
