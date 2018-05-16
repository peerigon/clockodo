# Clockodo Node/JavaScript API

**The Node/JavaScript Client for the [Clockodo-API](https://www.clockodo.com/de/api/).**

[![](https://img.shields.io/npm/v/clockodo.svg)](https://www.npmjs.com/package/clockodo)
[![Dependency Status](https://david-dm.org/peerigon/clockodo.svg)](https://david-dm.org/peerigon/clockodo)
[![Build Status](https://travis-ci.org/peerigon/clockodo.svg?branch=master)](https://travis-ci.org/peerigon/clockodo)

We have provided get methods for each of the endpoints available by the Clockodo API. We also renamed the request and response object keys from what you will see in the Clockodo docs, removing symbols, converting to camel casing, and in some instances shortening their names. If you are interested, you can find the mappings in the mapKeys.js file.

Further features and endpoints can be added on request. Please feel free to submit an issue or pull request.

## Installation

Install from NPM:

```
npm install clockodo --save
```

Then require the package. For the constructor arguments, you must get the user (email) and clockodo api key from the "[My area](https://my.clockodo.com/en/users/editself)" section of Clockodo's website.

```js
const ClockodoApi = require("clockodo");
const clockodo = new ClockodoApi({
  user: "your@mail.com",
  apiKey: "your-api-key"
});
```

## Example

```js
const ClockodoApi = require("clockodo");
const clockodo = new ClockodoApi({
  user: "harry@hogwarts.wiz",
  apiKey: "h0rcruXe7"
});

clockodo.getUsers()
  .then(data => {
    const matches = data.users.filter(user => {
      return user.name === "Hagrid";
    });

    console.log(matches[0].id); // 98070
  })
  .catch(error){
    console.log(error);
  };
```

## API

* Get methods
  * [getAbsence()](#getabsenceid)
  * [getAbsences()](#getabsencesparams)
  * [getClock()](#getclock)
  * [getClockUpdate()](#getclockupdate)
  * [getCustomer()](#getcustomerid)
  * [getCustomers()](#getcustomers)
  * [getEntry()](#getentryid)
  * [getEntries()](#getentriesbegin-end-filters)
  * [getEntryGroups()](#getentrygroupsbegin-end-grouping-options)
  * [getProject()](#getprojectid)
  * [getSearchTexts()](#getsearchtextsparams)
  * [getService()](#getserviceid)
  * [getServices()](#getservices)
  * [getUser()](#getuserid)
  * [getUsers()](#getusers)
  * [getUserReport()](#getuserreportid)
  * [getUserReports()](#getuserreportsid-params)
  * [getTasks()](#gettasksparams)
  * [getTaskDuration()](#gettaskdurationparams)
* Post methods
  * [startClock()](#startclockparams)
* Put methods
  * [changeClockDuration()](#changeclockdurationid-params)
  * [editEntry()](#editentryid-params)
* Delete methods
  * [stopClock()](#stopclockid-params)

---

## Get Methods

### getAbsence(id)

Gets a selected absence by its ID.

#### Parameters:

**id** _- Type: String_

Clockodo Absence ID

#### Example:

```js
clockodo.getAbsence("007").then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "absence": [object of type absence]
}
```

---

### getAbsences(params)

Gets a list of absences in the provided year

#### Parameters:

**year** _- Type: integer_

Year of absences

#### Example:

```js
clockodo.getAbsences({ year: 2018 }).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "absences":
  {
    [object of type absence],
    [object of type absence],
    ...
  }
}
```

---

### getClock()

Get currently running entry for the credentials attached to Clockodo object.

#### Example:

```js
clockodo.getClock().then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "running": [object of type entry]
}  
```

---

### getClockUpdate()

Get status information of the clock for the credentials attached to Clockodo object.

#### Example:

```js
clockodo.getClockUpdate().then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "running": [object of type entry],
  "services": {
    [object of type service],
    ...
  },
  "projects":
  {
    "id": [integer],
    "name": [string],
    "access":
    {
      "add": [boolean],
      "edit": [boolean]
    },
    "projects":
    {
      {
        "id": [integer],
        "name": [string],
        "access":
        {
          "add": [boolean],
          "edit": [boolean]
        }
      },
      ...
    }
  }, ...
  "billable":
  {
    [customer_id-projects_id]:
    {
      "billable_default": [boolean]
    },
    ...
  }
}
```

---

### getCustomer(id)

Get specific customer by ID

#### Parameters:

**id** _- Type: String_

Clockodo Customer ID

#### Example:

```js
clockodo.getCustomer("8675309").then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "customer": [object of type customer]
}
```

---

### getCustomers()

Get list of customers

#### Example:

```js
clockodo.getCustomers().then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "customers":
  {
    [object of type customer],
    [object of type customer],
    ...
  }
}
```

---

### getEntry(id)

Get an entry by its ID.

#### Parameters:

**id** _- Type: String_

Clockodo Entry ID

#### Example:

```js
clockodo.getEntry("2000").then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "entry": [object of type entry]
}
```

---

### getEntries(begin, end[, filters])

Gets list of Clockodo activity entries.

#### Parameters:

**begin** _- Type: String_

Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"

**end** _- Type: String_

End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"

**filters(optional)**

* `filterUserId`: (string)
* `filterCustomerId`: (string)
* `filterProjectId`: (string)
* `filterServiceId`: (string)
* `filterBillable`: (enum) ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_BILLABLE, ClockodoApi.ENTRY_BILLED
* `filterText`: (string) text of entry

#### Example:

```js
const options = {
  filterBillable: ClockodoApi.ENTRY_BILLED,
  filterUserId: 007,
  begin: "2017-08-18 00:00:00",
  end: "2018-02-09 00:00:00"
};

clockodo.getEntries(options).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "paging": [paging information],
  "filter": [list of respected filters],
  "entries":
  {
    [object of type entry],
    [object of type entry],
    ...
  }
}
```

---

### getEntryGroups(begin, end, grouping[, options])

Get a group of entries defined by your criteria.

#### Parameters:

**begin** _- Type: String_

Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"

**end** _- Type: String_

End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"

**grouping** _- Type: Array_

Here are the list of Strings you can pass to the request. Passing multiple groupings will lead to a nested response:

* `"customers_id"`
* `"projects_id"`
* `"services_id"`
* `"users_id"`
* `"texts_id"`
* `"billable"`
* `"is_lumpsum"`
* `"year"`
* `"month"`
* `"week"`
* `"day"`

**options(optional)**

* `filterUserId`: (string)
* `filterCustomerId`: (string)
* `filterProjectId`: (string)
* `filterServiceId`: (string)
* `filterBillable`: (enum) ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_BILLABLE, ClockodoApi.ENTRY_BILLED
* `filterText`: (string) text of entry
* `roundBy`: (integer) Rounds the duration of entries to provided minutes. _Default: 0_
* `prependCustomer`: (Boolean) Prepends customer name to the front of project names. _Default: true_
* `calcHardBudgetRevenues`: (Boolean) By default, revenues for projects with hard budgets aren't calculated. If you activate this option, the sum of all revenues to this project can be more than the project budget. _Default: false_

#### Example:

```js
const params = {
  begin: "2017-08-18 00:00:00",
  end: "2018-02-09 00:00:00",
  grouping: ["customers_id", "projects_id"],
  roundBy: 15
};

clockodo.getEntries(params).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "groups":
  {
    [object of type group which may contain subgroups],
    [object of type group which may contain subgroups],
    ...
  }
}
```

---

### getProject(id)

Get a project by its ID. For a list of projects, use getCustomers().

#### Parameters:

**id** _- Type: String_

Clockodo Project ID

#### Example:

```js
clockodo.getProject("21").then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "project": [object of type project]
}
```

---

### getSearchTexts(params)

Get the description(s) of the requested entries.

#### Parameters:

**options(optional)**

* `searchTerm`: (string)
* `searchCustomerId`: (string)
* `searchProjectId`: (string)
* `searchServiceId`: (string)
* `billable`: (enum) ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_BILLABLE, ClockodoApi.ENTRY_BILLED
* `begin`: (string) Must be in the format of "YYYY-MM-DD HH:mm:ss"
* `end`: (string) Must be in the format of "YYYY-MM-DD HH:mm:ss"

#### Example:

```js
const options = {
  searchProjectId: "300"
};

clockodo.getSearchTexts(options).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "texts": {
    [string],
    ...
  }
}
```

---

### getService(id)

Get a service by its ID.

#### Parameters:

**id** _- Type: String_

Clockodo Service ID

#### Example:

```js
clockodo.getService("1989").then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "service": [object of type service]
}
```

---

### getServices()

Get list of services

#### Example:

```js
clockodo.getServices().then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "services":
  {
    [object of type service],
    [object of type service],
    ...
  }
}
```

---

### getUser(id)

Get a co-worker by their ID.

#### Parameters:

**id** _- Type: String_

Clockodo User ID

#### Example:

```js
clockodo.getUser("101").then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "user": [object of type user]
}
```

---

### getUsers()

Get list of users

#### Example:

```js
clockodo.getUsers().then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "users":
  {
    [object of type user],
    [object of type user], ...
  }
}
```

---

### getUserReport(id)

Get a co-worker by their ID.

#### Parameters:

**id** _- Type: String_

Clockodo user id

**year** _- Type: String_

Year for the user report that will be returned.

**type (optional)** _- Type: Enum_

Including the type in your request returns more specific data about hours worked over months/weeks/days.

* `0`: Request only key data for the year (default)
* `1`: Request key data for the year and the months
* `2`: Request key data for the year, months and weeks
* `3`: Request key data for the year, months, weeks and days
* `4`: Request key data for the year, months, weeks and days; The day data does also include start and end times, as well as breaks

#### Example:

```js
const params = {
  year: 2018,
  type: 2
};

clockodo.getUserReport("101", params).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "userreport": [object of type userreport]
}
```

---

### getUserReports(params)

Get an employee/user's report, which contains data such as hours worked and holidays taken.

#### Parameters:

**year** _- Type: String_

Year for the user reports that will be returned.

**type (optional)** _- Type: Enum_

Including the type in your request returns more specific data about hours worked over months/weeks/days.

* `0`: Request only key data for the year (default)
* `1`: Request key data for the year and the months
* `2`: Request key data for the year, months and weeks
* `3`: Request key data for the year, months, weeks and days
* `4`: Request key data for the year, months, weeks and days; The day data does also include start and end times, as well as breaks

#### Example:

```js
clockodo.getUserReports({ year: 2018 }).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "userreports":
  [
    [object of type userreport],
    [object of type userreport],
    ...
  ]
}
```

---

### getTasks(params)

Get Clockodo Tasks (grouped entries).

#### Parameters:

**count(optional)** _- Type: integer_

Count of days for which the tasks will be listed. _default: 8, max: 30_

#### Example:

```js
const options = {
  count: 6
};

clockodo.getTasks(options).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "days":
  {
    {
      "date": [date in YYYY-MM-DD],
      "dateText": [date localized],
      "duration": [duration in seconds, integer],
      "durationText": [duration in H:MM h],
      "tasks":
      {
        [object of type task],
        [object of type task],
		...
      }
    },
    ...
  }
}
```

---

### getTaskDuration(params)

Get individual Clockodo Task by its ID.

#### Parameters:

**taskCustomerId** _- Type: String_

Customer ID from Clockodo

**taskProjectId** _- Type: String_

Project ID from Clockodo

**taskServiceId** _- Type: String_

Service ID from Clockodo

**taskText** _- Type: String_

The text of the task you want

**taskBillable** _- Type: Enum_

Use constants ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_BILLABLE, ClockodoApi.ENTRY_BILLED

**excludeIds** _- Type: Array_

List of entry-Ids (strings) which should not be included in the duration

#### Example:

```js
const params = {
  taskCustomerId: "23",
  taskProjectId: "25",
  taskServiceId: "42",
  taskText: "clean the dishes",
  taskBillable: ClockodoApi.ENTRY_UNBILLABLE,
  excludeIds: ["217", "450"]
};

clockodo.getTaskDuration(params).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "days":
  {
    {
      "date": [date in YYYY-MM-DD],
      "dateText": [date localized],
      "duration": [duration in seconds, integer],
      "durationText": [duration in H:MM h],
      "tasks":
      {
        [object of type task],
        [object of type task],
		...
      }
    },
    ...
  }
}
```

---

## Post methods

### startClock(params)

Get Clockodo Tasks (grouped entries).

#### Parameters:

**customerId** _- Type: string_

Customer ID from Clockodo

**serviceId** _- Type: string_

Service ID from Clockodo

**billable** _- Type: Enum_

Use constants ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_BILLABLE, ClockodoApi.ENTRY_BILLED

**optional**

* projectId(optional) _- Type: string_

* userId(optional) _- Type: string_

* text(optional) _- Type: string_ The text to attach to the entry

#### Example:

```js
const options = {
  customerId: "300",
  serviceId: "0",
  billable: ClockodoApi.ENTRY_UNBILLABLE
};

clockodo.startClock(options).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "running": [object of type entry]
}
```

---

## Put methods

### changeClockDuration(id, params)

Changes the duration of an entry. Because the ID returned by clock methods is just the entry ID, and this function can only be used after an entry is finished, there seems to be no difference from using editEntry().

#### Parameters:

**id** _- Type: String_

The ID of the entry.

**durationBefore** _- Type: string_

The previously recorded duration (in seconds) of the entry you want to edit. The clock must be stopped because otherwise the request fails with an error.

**duration** _- Type: string_

The new duration (in seconds) of the entry.

**optional**

* offsetBefore _- Type: string_

If you directly alter the duration of the clock/entry, then there will be a descrepancy in the difference of its timeSince and timeUntil and the duration value. That difference is represented by offset.

At the time of this writing I am not sure what including this request parameter does because the Clockodo docs are sparse and I already had to do work to get this much information.

#### Example:

```js
const options = {
  durationBefore: "300",
  duration: "200"
};

clockodo.changeClockDuration("37465", options).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "updated": [object of type entry],
  "running": [object of type entry]
}
```

---

### editEntry(id, params)

Changes the values of a Clockodo entry. Unlike changeClockDuration(), editEntry() can seemingly mutate any of the accepted parameters even when the entry is running.

#### Parameters:

**id** _- Type: String_

The ID of the entry.

**optional**

* customerId(optional) _- Type: string_

* projectId(optional) _- Type: string_

* serviceId(optional) _- Type: string_

* userId(optional) _- Type: string_

* billable(optional) _- Type: (enum) ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_BILLABLE, ClockodoApi.ENTRY_BILLED_

* duration(optional) _- Type: string_ (in seconds)

* lumpSum(optional) _- Type: string_

* hourlyRate(optional) _- Type: integer_ ex: If you are paid 80 euros an hour, enter 80 here.

* begin(optional): (string) Must be in the format of "YYYY-MM-DD HH:mm:ss"

* end(optional): (string) Must be in the format of "YYYY-MM-DD HH:mm:ss"

* text(optional) _- Type: string_ The text to attach to the entry

#### Example:

```js
const options = {
  hourlyRate: 25,
  text: "air quotes consulting"
};

clockodo.editEntry("101", options).then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "entry": [object of type entry]
}
```

---

## Delete methods

### stopClock(id, params)

Stops a running clock/entry.

#### Parameters:

**id** _- Type: String_

The ID of the entry.

**optional**

* duration(optional) _- Type: integer_

* userId(optional) _- Type: string_

* away(optional) _- Type: string_ Again, I don't know what this parameter does.

#### Example:

```js
clockodo.changeClockDuration("321").then(data => {
  console.log(data);
});
```

#### Response:

```
{
  "stopped": [object of type entry],
  "running": [object of type entry]
}
```

---

## License

Unlicense

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
