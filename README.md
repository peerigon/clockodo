# Clockodo

**Unofficial JavaScript SDK for the [Clockodo API](https://www.clockodo.com/de/api/).** Written in Typescript.

[![Version on NPM](https://img.shields.io/npm/v/clockodo?style=for-the-badge)](https://www.npmjs.com/package/clockodo)
[![Semantically released](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-release)
[![Monthly downloads on NPM](https://img.shields.io/npm/dm/clockodo?style=for-the-badge)](https://www.npmjs.com/package/clockodo)<br>
[![NPM Bundle size minified](https://img.shields.io/bundlephobia/min/clockodo?style=for-the-badge)](https://bundlephobia.com/result?p=clockodo)
[![NPM Bundle size minified and gzipped](https://img.shields.io/bundlephobia/minzip/clockodo?style=for-the-badge)](https://bundlephobia.com/result?p=clockodo)<br>
[![Dependencies status](https://img.shields.io/david/peerigon/clockodo?style=for-the-badge)](https://david-dm.org/peerigon/clockodo)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/clockodo?style=for-the-badge)](https://snyk.io/test/github/peerigon/clockodo)<br>
![Written in TypeScript](https://img.shields.io/npm/types/clockodo?style=for-the-badge)
[![Coverage Status](https://img.shields.io/coveralls/github/peerigon/clockodo?style=for-the-badge)](https://coveralls.io/github/peerigon/clockodo?branch=main)
[![License](https://img.shields.io/npm/l/clockodo?style=for-the-badge)](https://unlicense.org/)

## Installation and usage

```
npm install clockodo --save
```

Then require the package. For the constructor arguments, you must get the user (email) and clockodo api key from the "[My area](https://my.clockodo.com/en/users/editself)" section of Clockodo's website.

```js
import { Clockodo } from "clockodo";

const clockodoApi = new Clockodo({
    authentication: {
        user: "test-user@example.com",
        apiKey: "kjfdskj643fgnlksf343kdslm",
    },
});
```

It is also possible to create a Clockodo instance with **caching**. This means the request responses are cached until a `POST`, `PUT`, `DELETE` or `PATCH` is send to the very same url or the cache time is over.

```js
import { Clockodo } from "clockodo";
import { cachePlugin } from "clockodo/plugins/cache";

const clockodoApi = new Clockodo({
    authentication: {
        user: "test-user@example.com",
        apiKey: "kjfdskj643fgnlksf343kdslm",
    },
});

clockodoApi.use(cachePlugin({ cacheTime: 15 * 60 * 1000 })); // cache of 15 minutes
```

### Example

```js
import { Clockodo } from "clockodo";

const clockodo = new Clockodo({
    authentication: {
        user: "test-user@example.com",
        apiKey: "kjfdskj643fgnlksf343kdslm",
    },
});

// Find the ID of your employee named Hagrid
const { users } = await clockodo.getUsers();

const matches = users.filter((user) => user.name === "Hagrid");

console.log(matches[0].id); // 98070
```

## Config

-   `authentication`: Specify a `user` and an `apiKey` to authenticate every request
-   `baseUrl`: Points to the Clockodo API. Defaults to `https://my.clockodo.com/api`

You can update the configuration later like this:

```js
clockodo.api.config({
    authentication: {
        /* ... */
    },
});
```

## API

We have provided methods for each of the endpoints available by the Clockodo API. In order to provide a seamless API to JavaScript, we renamed the request and response object keys from what you will see in the Clockodo docs by removing special characters and converting to camel casing. If you are interested, you can find the mappings in the [mappings.ts file](https://github.com/peerigon/clockodo/blob/main/src/internals/utilities/mappings.ts).

In general, the first argument for these functions is an object consisting of required parameters. The second is an "options" object for optional parameters.

For any questions about the different properties please consult the official [Clockodo-API](https://www.clockodo.com/de/api/).

-   Get methods
    -   [getAbsence()](#getabsence)
    -   [getAbsences()](#getabsences)
    -   [getClock()](#getclock)
    -   [getClockUpdate()](#getclockupdate)
    -   [getCustomer()](#getcustomer)
    -   [getCustomers()](#getcustomers)
    -   [getEntry()](#getEntry)
    -   [getEntries()](#getentries)
    -   [getEntryGroups()](#getentrygroups)
    -   [getProject()](#getproject)
    -   [getSearchTexts()](#getsearchtexts)
    -   [getService()](#getservice)
    -   [getServices()](#getservices)
    -   [getLumpSumServices()](#getlumpsumservices)
    -   [getSingleTargetHourSet()](#getsingletargethourset)
    -   [getTargetHours()](#gettargethours)
    -   [getTasks()](#gettasks)
    -   [getTaskDuration()](#gettaskduration)
    -   [getUser()](#getuser)
    -   [getUsers()](#getusers)
    -   [getUserReport()](#getuserreport)
    -   [getUserReports()](#getuserreports)
-   Post methods
    -   [addAbsence()](#addabsence)
    -   [addCustomer()](#addcustomer)
    -   [addEntry()](#addentry)
    -   [addProject()](#addproject)
    -   [addService()](#addservice)
    -   [addUser()](#adduser)
    -   [startClock()](#startclockparams)
-   Put methods
    -   [changeClockDuration()](#changeclockduration)
    -   [editAbsence()](#editabsence)
    -   [editCustomer()](#editcustomer)
    -   [editEntry()](#editentry)
    -   [editEntryGroup()](#editentrygroup)
    -   [editProject()](#editproject)
    -   [editService()](#editservice)
    -   [editUser()](#edituser)
-   Delete methods
    -   [deactivateCustomer()](#deactivatecustomer)
    -   [deactivateProject()](#deactivateproject)
    -   [deactivateService()](#deactivateservice)
    -   [deactivateUser()](#deactivateuser)
    -   [deleteAbsence()](#deleteabsence)
    -   [deleteEntry()](#deleteentry)
    -   [deleteEntryGroup()](#deleteentrygroup)
    -   [stopClock()](#stopclock)

Some constants are also available for import:

```js
export const ENTRY_UNBILLABLE = 0;
export const ENTRY_BILLABLE = 1;
export const ENTRY_BILLED = 2;
export const ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
export const ABSENCE_TYPE_SPECIAL_LEAVE = 2;
export const ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
export const ABSENCE_TYPE_SICK_DAY = 4;
export const ABSENCE_TYPE_SICK_DAY_OF_CHILD = 5;
export const ABSENCE_TYPE_SCHOOL_FURTHER_EDUCATION = 6;
export const ABSENCE_TYPE_MATERNITY_PROTECTION = 7;
export const ABSENCE_TYPE_HOME_OFFICE = 8;
export const ABSENCE_TYPE_WORK_OUT_OF_OFFICE = 9;
export const ABSENCE_STATUS_REPORTED = 0;
export const ABSENCE_STATUS_APPROVED = 1;
export const ABSENCE_STATUS_DECLINED = 2;
export const ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
export const ABSENCE_STATUS_REQUEST_CANCELLED = 4;
```

---

## Get Methods

### getAbsence()

Gets a selected absence by its ID.

#### Example:

```js
await clockodo.getAbsence({ id: 7 });
```

---

### getAbsences()

Gets a list of absences in the provided year

#### Example:

```js
await clockodo.getAbsences({ year: 2018 });
```

---

### getClock()

Get currently running entry for the credentials attached to Clockodo object.

#### Example:

```js
await clockodo.getClock();
```

---

### getClockUpdate()

Get status information of the clock for the credentials attached to Clockodo object.

#### Example:

```js
await clockodo.getClockUpdate();
```

---

### getCustomer()

Get specific customer by ID

#### Example:

```js
await clockodo.getCustomer({ id: 777 });
```

---

### getCustomers()

Get list of customers

#### Example:

```js
await clockodo.getCustomers();
```

---

### getEntry()

Get an entry by its ID.

#### Example:

```js
await clockodo.getEntry({ id: 4 });
```

---

### getEntries()

Gets list of Clockodo activity entries.

#### Example:

```js
import { ENTRY_BILLED } from "clockodo";

await clockodo.getEntries(
    { timeSince: "2017-08-18T00:00:00Z", timeUntil: "2018-02-09T00:00:00Z" },
    { filterBillable: ENTRY_BILLED }
);
```

---

### getEntryGroups()

Get a group of entries defined by your criteria.

#### Example:

```js
await clockodo.getEntryGroups(
    {
        timeSince: "2017-08-18T00:00:00Z",
        timeUntil: "2018-02-09T00:00:00Z",
        grouping: ["customers_id", "projects_id"],
    },
    { roundToMinutes: 15 }
);
```

---

### getProject()

Get a project by its ID. For a list of projects, use getCustomers().

#### Example:

```js
await clockodo.getProject({ id: 1985 });
```

---

### getSearchTexts()

Get the description(s) of the requested entries.

#### Example:

```js
await clockodo.getSearchTexts({
    projectsId: 300,
});
```

---

### getService()

Get a service by its ID.

#### Example:

```js
await clockodo.getService({ id: 10 });
```

---

### getServices()

Get list of all services

#### Example:

```js
await clockodo.getServices();
```

---

### getLumpSumServices()

Get a list of all lump sum services

#### Example:

```js
await clockodo.getLumpSumServices();
```

---

### getSingleTargetHourSet()

Get a specific target hour period for a specific user by its ID (not the ID of the user)

#### Example:

```js
await clockodo.getSingleTargetHourSet({ id: 1234 });
```

---

### getTargetHours()

Get list of target hours for all users, with option to pass an object with an `usersId` to filter the history of target hours to a specific user.

#### Example:

```js
await clockodo.getTargetHours();
// or
await clockodo.getTargetHours({ usersId: 346923 });
```

---

### getTasks()

Get Clockodo Tasks (grouped entries).

#### Example:

```js
await clockodo.getTasks({
    count: 6,
});
```

---

### getTaskDuration()

Get individual Clockodo Task by its ID.

#### Example:

```js
await clockodo.getTaskDuration(
    {
        taskCustomersId: 23,
        taskProjectsId: 25,
        taskServicesId: 42,
        taskText: "clean the dishes",
        taskBillable: 1,
    },
    { excludeIds: [217, 450] }
);
```

---

### getUser()

Get a co-worker by their ID.

#### Example:

```js
await clockodo.getUser({ id: 1263 });
```

---

### getUsers()

Get list of users

#### Example:

```js
await clockodo.getUsers();
```

---

### getUserReport()

Get a co-worker by their ID.

#### Example:

```js
await clockodo.getUserReport({ id: 1263, year: 2017 });
```

---

### getUserReports()

Get an employee/user's report, which contains data such as hours worked and holidays taken.

#### Example:

```js
await clockodo.getUserReports({ year: 2017 }, { type: 1 });
```

---

## Post Methods

### addAbsence()

Default behavior adds an absence for the user attached to the credentials given to the clockodo object. To add the absence for another user you can use the `usersId` option if you have the permissions.

#### Example:

```js
import { ABSENCE_TYPE_SPECIAL_LEAVE } from "clockodo";

await clockodo.addAbsence(
    {
        dateSince: "2017-08-18T00:00:00Z",
        dateUntil: "2018-02-09T00:00:00Z",
        type: ABSENCE_TYPE_SPECIAL_LEAVE,
    },
    {
        note: "elternzeit",
        usersId: 12321,
    }
);
```

---

### addCustomer()

Adds a customer to the organization.

#### Example:

```js
await clockodo.addCustomer({ name: "Weyland-Yutani" });
```

---

### addEntry()

Creates an entry for either the user attached to the Clockodo instance or the passed in `usersId`. Depending on the type of entry different properties are required:

| Type of entry            | Required properties                                                    |
| :----------------------- | :--------------------------------------------------------------------- |
| Time entry               | `customersId`, `servicesId`, `billable`, `timeSince`, `timeUntil`      |
| Lump sum entry           | `customersId`, `servicesId`, `billable`, `timeSince`, `lumpSum`        |
| Recurring lump sum entry | `customersId`, `lumpSumsAmount`, `lumpSumsId`, `billable`, `timeSince` |

#### Example:

```js
import { ENTRY_BILLABLE } from "clockodo";

await clockodo.addEntry({
    customersId: 1,
    servicesId: 2,
    billable: ENTRY_BILLABLE,
    timeSince: "2018-10-01T00:00:00Z",
    timeUntil: "2018-10-01T03:00:00Z",
});
```

---

### addProject()

Creates a project for an existing customer.

#### Example:

```js
await clockodo.addProject({ name: "Clockodo Api Wrapper", customersId: 1 });
```

---

### addService()

Adds to the list of services offered by your organization.

#### Example:

```js
await clockodo.addService({ name: "Thinking" });
```

---

### addUser()

Creates new user in organization.

#### Example:

```js
await clockodo.addUser({
    name: "Merkel",
    number: "08",
    email: "angela@eu.eu",
    role: "Chancellor",
});
```

---

### startClock()

Get Clockodo Tasks (grouped entries).

#### Example:

```js
import { ENTRY_BILLABLE } from "clockodo";

await clockodo.startClock(
    { customersId: 24, servicesId: 7, billable: ENTRY_BILLABLE },
    { projectsId: 365 }
);
```

---

## Put methods

### changeClockDuration()

Changes the duration of an entry. Because the ID returned by clock methods is just the entry ID, and this function can only be used after an entry is finished, there seems to be no difference from using editEntry().

#### Example:

```js
await clockodo.changeClockDuration(
    { entryId: 7082, duration: 540, durationBefore: 300 },
    { offsetBefore: 60 }
);
```

---

### editAbsence()

Edit existing Clockodo absence.

#### Example:

```js
await clockodo.editAbsence(
    { absenceId: 74 },
    { note: "I know what he did last summer" }
);
```

---

### editCustomer()

Edit existing Clockodo customer.

#### Example:

```js
await clockodo.editCustomer({ customersId: 15 }, { name: "The Mystery Gang" });
```

---

### editEntry()

Changes the values of a Clockodo entry. Unlike changeClockDuration(), editEntry() can seemingly mutate any of the accepted parameters even when the entry is running.

#### Example:

```js
await clockodo.editEntry({ entryId: 365 }, { duration: 540 });
```

---

### editEntryGroup()

Allows for mass edit of entries based on a set of filters.

#### Example:

```js
import { ENTRY_UNBILLABLE } from "clockodo";

await clockodo.editEntryGroup(
    { timeSince: "2017-08-18T00:00:00Z", timeUntil: "2018-02-09T00:00:00Z" },
    { filterText: "Browsing Reddit", billable: ENTRY_UNBILLABLE }
);
```

---

### editProject()

Edit existing project.

#### Example:

```js
await clockodo.editProject({ projectsId: 20 }, options);
```

---

### editService()

Edit existing service.

#### Example:

```js
await clockodo.editService({ servicesId: 23 }, { name: "Room Service" });
```

---

### editUser()

Edit existing user.

#### Example:

```js
await clockodo.editUser({ usersId: 33 }, { name: "Moalo Loco" });
```

---

## Delete methods

### deactivateCustomer()

Deactivates (not deletes) customer.

#### Example:

```js
await clockodo.deactivateCustomer({ customersId: 343 });
```

---

### deactivateProject()

Deactivates (not deletes) project.

#### Example:

```js
await clockodo.deactivateProject({ projectsId: 8 });
```

---

### deactivateService()

Deactivates (not deletes) service.

#### Example:

```js
await clockodo.deactivateService({ servicesId: 94 });
```

---

### deactivateUser()

Deactivates (not deletes) user.

#### Example:

```js
await clockodo.deactivateUser({ usersId: 7 });
```

---

### deleteAbsence()

Deletes absence (go figure).

#### Example:

```js
await clockodo.deleteAbsence({ absenceId: 31 });
```

---

### deleteEntryGroup()

Deletes one or more entries based on a series of filters that builds an "entry group".

#### Example:

```js
await clockodo.deleteEntryGroup(
    { timeSince: "2017-08-18T00:00:00Z", timeUntil: "2018-02-09T00:00:00Z" },
    { text: "chilin everyday" }
);
```

---

### stopClock()

Stops a running clock/entry.

#### Example:

```js
await clockodo.stopClock({ entryId: 7082 });
```

---

## Development

To run integration tests you need to create an `.env` by copying the `.env.example` and entering credentials of a dev-user, as you don't want to mess up your real clockodo data.

## License

Unlicense

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
