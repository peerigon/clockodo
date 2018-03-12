const when = require("when");
const Client = require("node-rest-client").Client;

const client = new Client();
const server = "https://my.clockodo.com/api/";
const globalArgs = {
    data: { },
    headers: { },
};

function getUsers() {
    return when.promise((resolve, reject) => {
        const args = Object.assign({}, globalArgs);

        client.get(server + "users", args, (data, response) => {
            if (data.error) {
                reject(data.error);

                return;
            }
            resolve(data);
        });
    });
}

function getEntries(parameters) {
    return when.promise((resolve, reject) => {
        const args = Object.assign({}, globalArgs);

        args.parameters = parameters;
        client.get(server + "entries", args, (data, response) => {
            if (data.error) {
                reject(data.error);

                return;
            }
            resolve(data);
        });
    });
}

function setClientSettings(user, apiKey) {
    if (!user) {
        throw new Error("No Clockodo 'user' set!");
    }

    if (!apiKey) {
        throw new Error("No Clockodo 'apiKey' set!");
    }

    globalArgs.headers["X-ClockodoApiUser"] = user;
    globalArgs.headers["X-ClockodoApiKey"] = apiKey;
}

function getAbsences(parameters) {
    return when.promise((resolve, reject) => {
        const args = Object.assign({}, globalArgs);

        args.parameters = parameters;
        client.get(server + "absences", args, (data, response) => {
            if (data.error) {
                reject(data.error);

                return;
            }
            resolve(data);
        });
    });
}

function getUserReports(parameters) {
    return when.promise((resolve, reject) => {
        const args = Object.assign({}, globalArgs);

        args.parameters = parameters;
        client.get(server + "userreports", args, (data, response) => {
            if (data.error) {
                reject(data.error);

                return;
            }
            resolve(data);
        });
    });
}

function getEntryGroup(parameters) {
    return when.promise((resolve, reject) => {
        const args = Object.assign({}, globalArgs);

        args.parameters = parameters;
        client.get(server + "entrygroups", args, (data, response) => {
            if (data.error) {
                reject(data.error);

                return;
            }
            resolve(data);
        });
    });
}

function getCustomers() {
    return when.promise((resolve, reject) => {
        const args = Object.assign({}, globalArgs);

        client.get(server + "customers", args, (data, response) => {
            if (data.error) {
                reject(data.error);

                return;
            }
            resolve(data);
        });
    });
}

exports.getCustomers = getCustomers;
exports.getEntries = getEntries;
exports.getUsers = getUsers;
exports.getAbsences = getAbsences;
exports.getUserReports = getUserReports;
exports.getEntryGroup = getEntryGroup;
exports.setClientSettings = setClientSettings;
