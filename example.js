"use strict";

require("dotenv").config();

const clockodo = require("./lib/api");

clockodo.setClientSettings(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);
clockodo
    .getUsers()
    .then(data => {
        data.data.users.forEach(console.log);
    })
    .catch(error => {
        console.log("caught", error);
    });
