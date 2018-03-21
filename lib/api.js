"use strict";

const { apiRequest, configure } = require("./lib.js");

class Clockodo {
    constructor(user, apiKey) {
        if (typeof user === undefined) {
            throw new Error("No Clockodo 'user' set");
        }

        if (typeof apiKey === undefined) {
            throw new Error("No Clockodo 'apiKey' set");
        }

        this._apiRequest = apiRequest;

        configure(user, apiKey);
    }

    getUser(id) {
        return this._apiRequest("users/" + id);
    }

    getUsers() {
        return this._apiRequest("users");
    }

    getCustomer(id) {
        return this._apiRequest("customers/" + id);
    }

    getCustomers() {
        return this._apiRequest("customers");
    }

    getProject(id) {
        return this._apiRequest("projects/" + id);
    }

    getService(id) {
        return this._apiRequest("services/" + id);
    }

    getServices() {
        return this._apiRequest("services");
    }

    getEntries(parameters) {
        return this._apiRequest("entries", parameters);
    }

    getTask(parameters) {
        return this._apiRequest("tasks/duration", parameters);
    }

    // TODO: The response I am getting from Clockodo is not quite what the docs claims (and empty)
    getTasks(parameters) {
        return this._apiRequest("tasks", parameters);
    }

    getEntryGroups(parameters) {
        return this._apiRequest("entrygroups", parameters);
    }

    getUserReport(id, parameters) {
        return this._apiRequest("userreports/" + id, parameters);
    }

    getUserReports(parameters) {
        return this._apiRequest("userreports", parameters);
    }

    getAbsence(id) {
        return this._apiRequest("absences/" + id);
    }

    getAbsences(parameters) {
        return this._apiRequest("absences", parameters);
    }

    getClockRunning() {
        return this._apiRequest("clock");
    }

    getClockStatus() {
        return this._apiRequest("clock/update");
    }
}

module.exports = Clockodo;
