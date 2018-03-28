"use strict";

const moment = require("moment");
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

    /**
     * Gets a list of Clockodo Entries in a time range
     *
     * @param {string} since - any valid date format
     * @param {string} until - any valid date format
     * @param {Object} filters - optional filters for the request (userId, customerId, projectId, serviceId, billable, text)
     * @returns {Promise}
     */
    getEntries(since, until, filters = {}) {
        const { userId = "", customerId = "", projectId = "", serviceId = "", billable = "", text = "" } = filters; // eslint-disable-line no-unused-vars
        const filterMapping = {
            userId: "filter[users_id]",
            customerId: "filter[customers_id]",
            projectId: "filter[projects_id]",
            serviceId: "filter[services_id]",
            billable: "filter[billable]",
            text: "filter[text]",
        };

        since = moment(since).format("YYYY-MM-DD hh:mm:ss");
        until = moment(until).format("YYYY-MM-DD hh:mm:ss");

        return this._apiRequest("entries", {
            time_since: since,
            time_until: until,
            ...buildParameters(filters, filterMapping),
        });
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

    // Convienece Methods
    getBillableEntriesBetween(since, until) {
        return this.getEntries(since, until, { billable: 2 });
    }
    getNonBillableEntriesBetween(since, until) {
        return this.getEntries(since, until, { billable: 0 });
    }
    getUserEntriesBetween(since, until, userId) {
        return this.getEntries(since, until, { userId });
    }
    getCustomerEntriesBetween(since, until, customerId) {
        return this.getEntries(since, until, { customerId });
    }
    getServiceEntriesBetween(since, until, serviceId) {
        return this.getEntries(since, until, { serviceId });
    }
    getProjectEntriesBetween(since, until, projectId) {
        return this.getEntries(since, until, { projectId });
    }
}

// Could use filter instead according to Meaku
function buildParameters(incomingObj, mapping) {
    const params = {};

    for (const filterProperty in incomingObj) {
        if (incomingObj[filterProperty] !== "") {
            const correctKey = mapping[filterProperty];

            params[correctKey] = incomingObj[filterProperty];
        }
    }

    return params;
}

module.exports = Clockodo;
