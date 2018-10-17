# Clockodo Node/JavaScript API

**The Node/JavaScript Client for the [Clockodo-API](https://www.clockodo.com/de/api/).**

[![](https://img.shields.io/npm/v/clockodo.svg)](https://www.npmjs.com/package/clockodo)
[![Dependency Status](https://david-dm.org/peerigon/clockodo.svg)](https://david-dm.org/peerigon/clockodo)
[![Build Status](https://travis-ci.org/peerigon/clockodo.svg?branch=master)](https://travis-ci.org/peerigon/clockodo)

## Note

Now written in Typescript!

---

We have provided methods for each of the endpoints available by the Clockodo API. We also renamed the request and response object keys from what you will see in the Clockodo docs by removing symbols, converting to camel casing, and in some instances shortening their names. If you are interested, you can find the mappings in the mapKeys.ts file.

In general, the first argument for these functions is an object consisting of required parameters. The second is an "options" object for optional parameters.

Please feel free to submit an issue or pull request.

## Installation

Install from NPM (or yarn):

```
npm install clockodo --save
```

Then require the package. For the constructor arguments, you must get the user (email) and clockodo api key from the "[My area](https://my.clockodo.com/en/users/editself)" section of Clockodo's website.

```js
const { Clockodo } = require("clockodo");

const clockodoApi = new Clockodo({
    user: "test-user@example.com",
    apiKey: "kjfdskj643fgnlksf343kdslm"
});
```

Some constants are also available for import:

```js
ENTRY_UNBILLABLE = 0;
ENTRY_BILLABLE = 1;
ENTRY_BILLED = 2;
ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
ABSENCE_TYPE_SPECIAL_LEAVE = 2;
ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
ABSENCE_TYPE_SICK_DAY = 4;
ABSENCE_STATUS_REPORTED = 0;
ABSENCE_STATUS_APPROVED = 1;
ABSENCE_STATUS_DECLINED = 2;
ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
ABSENCE_STATUS_REQUEST_CANCELLED = 4;
```

## Example

```js
const { Clockodo } = require("clockodo");

const clockodoApi = new Clockodo({
    user: "test-user@example.com",
    apiKey: "kjfdskj643fgnlksf343kdslm"
});

// Find the ID of your employee named Hagrid
clockodoApi.getUsers()
  .then(data => {
    const matches = data.users.filter(user => {
      return user.name === "Hagrid";
    });

    console.log(matches[0].id); // 98070
  })
  .catch(error){
    console.log(error);
  };

// Also compatible with async/await of course
const users = await clockodoApi.getUsers();
```

## API

What a function call looks like for each of the defined endpoint methods. For any questions about the different properties please consult the official [Clockodo-API](https://www.clockodo.com/de/api/).

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
    -   [getProject()](#getprojectid)
    -   [getSearchTexts()](#getsearchtexts)
    -   [getService()](#getservice)
    -   [getServices()](#getservices)
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

---

## Get Methods

### getAbsence()

Gets a selected absence by its ID.

#### Example:

```js
clockodo.getAbsence({ id: "007" }).then(console.log);
```

---

### getAbsences()

Gets a list of absences in the provided year

#### Example:

```js
clockodo.getAbsences({ year: 2018 }).then(console.log);
```

---

### getClock()

Get currently running entry for the credentials attached to Clockodo object.

#### Example:

```js
clockodo.getClock().then(console.log);
```

---

### getClockUpdate()

Get status information of the clock for the credentials attached to Clockodo object.

#### Example:

```js
clockodo.getClockUpdate().then(console.log);
```

---

### getCustomer()

Get specific customer by ID

#### Example:

```js
clockodo.getCustomer({ id: "777" }).then(console.log);
```

---

### getCustomers()

Get list of customers

#### Example:

```js
clockodo.getCustomers().then(console.log);
```

---

### getEntry()

Get an entry by its ID.

#### Example:

```js
clockodo.getEntry({ id: "04" }).then(console.log);
```

---

### getEntries()

Gets list of Clockodo activity entries.

#### Example:

```js
// "object passed in" approach for options (also using one of the exported constants)!
const options = {
    filterBillable: ENTRY_BILLED
};
clockodo
    .getEntries(
        { timeSince: "2017-08-18 00:00:00", timeUntil: "2018-02-09 00:00:00" },
        options
    )
    .then(console.log);
```

---

### getEntryGroups()

Get a group of entries defined by your criteria.

#### Example:

```js
// "Destructured object" approach for options.
clockodo
    .getEntryGroups(
        {
            timeSince: "2017-08-18 00:00:00",
            timeUntil: "2018-02-09 00:00:00",
            grouping: ["customers_id", "projects_id"]
        },
        { roundBy: 15 }
    )
    .then(console.log);
```

---

### getProject()

Get a project by its ID. For a list of projects, use getCustomers().

#### Example:

```js
clockodo.getProject({ id: "1985" }).then(console.log);
```

---

### getSearchTexts()

Get the description(s) of the requested entries.

#### Example:

```js
clockodo
    .getSearchTexts({
        projectId: "300"
    })
    .then(console.log);
```

---

### getService()

Get a service by its ID.

#### Example:

```js
clockodo.getService({ id: "10" }).then(console.log);
```

---

### getServices()

Get list of services

#### Example:

```js
clockodo.getServices().then(console.log);
```

---

### getTasks()

Get Clockodo Tasks (grouped entries).

#### Example:

```js
clockodo
    .getTasks({
        count: 6
    })
    .then(console.log);
```

---

### getTaskDuration()

Get individual Clockodo Task by its ID.

#### Example:

```js
clockodo
    .getTaskDuration(
        {
            taskCustomerId: "23",
            taskProjectId: "25",
            taskServiceId: "42",
            taskText: "clean the dishes",
            taskBillable: 1
        },
        { excludeIds: ["217", "450"] }
    )
    .then(console.log);
```

---

### getUser()

Get a co-worker by their ID.

#### Example:

```js
clockodo.getUser({ id: "1263" }).then(console.log);
```

---

### getUsers()

Get list of users

#### Example:

```js
clockodo.getUsers().then(console.log);
```

---

### getUserReport()

Get a co-worker by their ID.

#### Example:

```js
clockodo.getUserReport({ id: "1263", year: 2017 }).then(console.log);
```

---

### getUserReports()

Get an employee/user's report, which contains data such as hours worked and holidays taken.

#### Example:

```js
clockodo.getUserReports({ year: 2017 }).then(console.log);
```

---

## Post Methods

### addAbsence()

Default behavior adds an absence for the user attached to the credentials given to the clockodo object. To add the absence for another user you can use the `userId` option if you have the permissions.

#### Example:

```js
clockodo
    .addAbsence(
        {
            dateSince: "2017-08-18 00:00:00",
            dateUntil: "2018-02-09 00:00:00",
            type: ABSENCE_TYPE_SPECIAL_LEAVE
        },
        {
            note: "elternzeit",
            userId: "12321"
        }
    )
    .then(console.log);
```

---

### addCustomer()

Adds a customer to the organization.

#### Example:

```js
clockodo.addCustomer({ name: "Weyland-Yutani" }, options).then(console.log);
```

---

### addEntry()

Creates an entry for either the user attached to the Clockodo instance or the passed in `userId`. Arguments `duration`, `timeSince`, and `timeUntil` are listed as optional (when using their website you can have the duration modify the start or end times).

#### Example:

```js
clockodo
    .addEntry(
        { customerId: "01", serviceId: "02", billable: ENTRY_BILLABLE },
        options
    )
    .then(console.log);
```

---

### addProject()

Creates a project for an existing customer.

#### Example:

```js
clockodo
    .addProject({ name: "Clockodo Api Wrapper", customerId: "01" }, params)
    .then(console.log);
```

---

### addService()

Adds to the list of services offered by your organization.

#### Example:

```js
clockodo.addService({ name: "Thinking" }, options).then(console.log);
```

---

### addUser()

Creates new user in organization.

#### Example:

```js
clockodo
    .addUser({
        name: "Merkel",
        number: "08",
        email: "angela@eu.eu",
        role: "Chancellor"
    })
    .then(console.log);
```

---

### startClock()

Get Clockodo Tasks (grouped entries).

#### Example:

```js
clockodo
    .startClock(
        { customerId: "24", serviceId: "7", billable: ENTRY_BILLABLE },
        {
            projectId: "365"
        }
    )
    .then(console.log);
```

---

## Put methods

### changeClockDuration()

Changes the duration of an entry. Because the ID returned by clock methods is just the entry ID, and this function can only be used after an entry is finished, there seems to be no difference from using editEntry().

#### Example:

```js
clockodo
    .changeClockDuration(
        { entryId: "7082", duration: "540", durationBefore: "300" },
        {
            offsetBefore: "60"
        }
    )
    .then(console.log);
```

---

### editAbsence()

Edit existing Clockodo absence.

#### Example:

```js
clockodo
    .editAbsence(
        { absenceId: "74" },
        { note: "I know what he did last summer" }
    )
    .then(console.log);
```

---

### editCustomer()

Edit existing Clockodo customer.

#### Example:

```js
clockodo
    .editCustomer(
        { customerId: "15" },
        {
            name: "The Mystery Gang"
        }
    )
    .then(console.log);
```

---

### editEntry()

Changes the values of a Clockodo entry. Unlike changeClockDuration(), editEntry() can seemingly mutate any of the accepted parameters even when the entry is running.

#### Example:

```js
clockodo
    .editEntry(
        { entryId: "365" },
        {
            duration: "540"
        }
    )
    .then(console.log);
```

---

### editEntryGroup()

Allows for mass edit of entries based on a set of filters.

#### Example:

```js
clockodo
    .editEntryGroup(
        { timeSince: "2017-08-18 00:00:00", timeUntil: "2018-02-09 00:00:00" },
        {
            filterText: "Browsing Reddit",
            billable: ENTRY_UNBILLABLE
        }
    )
    .then(console.log);
```

---

### editProject()

Edit existing project.

#### Example:

```js
clockodo.editProject({ projectId: "20" }, options).then(console.log);
```

---

### editService()

Edit existing service.

#### Example:

```js
clockodo
    .editService({ serviceId: "23" }, { name: "Room Service" })
    .then(console.log);
```

---

### editUser()

Edit existing user.

#### Example:

```js
clockodo
    .editUser(
        { userId: "33" },
        {
            name: "Moalo Loco"
        }
    )
    .then(console.log);
```

---

## Delete methods

### deactivateCustomer()

Deactivates (not deletes) customer.

#### Example:

```js
clockodo.deactivateCustomer({ customerId: "343" }).then(console.log);
```

---

### deactivateProject()

Deactivates (not deletes) project.

#### Example:

```js
clockodo.deactivateProject({ projectId: "08" }).then(console.log);
```

---

### deactivateService()

Deactivates (not deletes) service.

#### Example:

```js
clockodo.deactivateService({ serviceId: "94" }).then(console.log);
```

---

### deactivateUser()

Deactivates (not deletes) user.

#### Example:

```js
clockodo.deactivateUser({ userId: "007" }).then(console.log);
```

---

### deleteAbsence()

Deletes absence (go figure).

#### Example:

```js
clockodo.deleteAbsence({ absenceId: "31" }).then(console.log);
```

---

### deleteEntryGroup()

Deletes one or more entries based on a series of filters that builds an "entry group".

#### Example:

```js
clockodo
    .deleteEntryGroup(
        { timeSince: "2017-08-18 00:00:00", timeUntil: "2018-02-09 00:00:00" },
        {
            text: "chilin everyday"
        }
    )
    .then(console.log);
```

---

### stopClock()

Stops a running clock/entry.

#### Example:

```js
clockodo.stopClock({ entryId: "7082" }).then(console.log);
```

---

## License

Unlicense

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
