"use strict";

const axios = require("axios");

const endpoint = "https://my.clockodo.com/api/";
const globalArgs = {
    headers: {},
};

function apiRequest(resource, params = {}) {
    const args = { ...globalArgs, params };

    return axios.get(`${ endpoint }${ resource }`, args).then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    });
}

function configure(user, apiKey) {
    globalArgs.headers["X-ClockodoApiUser"] = user;
    globalArgs.headers["X-ClockodoApiKey"] = apiKey;
}

module.exports = {
    apiRequest,
    configure,
};
