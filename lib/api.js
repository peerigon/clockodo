"use strict";

const { apiRequest, configure } = require("./lib.js");

// TODO: Add support for ID queries
function setClientSettings(user, apiKey) {
    if (!user) {
        throw new Error("No Clockodo 'user' set!");
    }

    if (!apiKey) {
        throw new Error("No Clockodo 'apiKey' set!");
    }

    configure(user, apiKey);
}

// TODO: Should we even allow the user to pass parameters to this function when there is no options?
function getUsers(parameters) {
    return apiRequest("users", parameters);
}

function getEntries(parameters) {
    return apiRequest("entries", parameters);
}

function getAbsences(parameters) {
    return apiRequest("absences", parameters);
}

function getUserReports(parameters) {
    return apiRequest("userreports", parameters);
}

function getEntryGroup(parameters) {
    return apiRequest("entrygroups", parameters);
}

function getCustomers(parameters) {
    return apiRequest("customers", parameters);
}

exports.getCustomers = getCustomers;
exports.getEntries = getEntries;
exports.getUsers = getUsers;
exports.getAbsences = getAbsences;
exports.getUserReports = getUserReports;
exports.getEntryGroup = getEntryGroup;
exports.setClientSettings = setClientSettings;
