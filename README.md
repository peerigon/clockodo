# Clockodo Node/JavaScript API

The Node/JavaScript Client for the [Clockodo-API](https://www.clockodo.com/de/api/).

### init API

Install from NPM:

```
npm install clockodo-node --save
```

Then require the package. For the constructor arguments, you must get the user (email) and clockodo api key from the "[My area](https://my.clockodo.com/en/users/editself)" section of Clockodo's website.

```js
const ClockodoApi = require("clockodo-node");
const clockodo = new ClockodoApi({
  user: "your@mail.com",
  apiKey: "your-api-key"
});
```

We have provided get methods for each of the endpoints available by the Clockodo API. We also renamed the request parameters from what you will see in the Clockodo docs, removing symbols, camel casing, and in some instances shortening their names. If you are interested, you can find the mappings in the mapParams.js file.

---

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

Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:MM:SS"

**end** _- Type: String_

End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:MM:SS"

**filters(optional)**

* `filterUserId`: (string)
* `filterCustomerId`: (string)
* `filterProjectId`: (string)
* `filterServiceId`: (string)
* `filterBillable`: (enum) ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_NOT_BILLED, ClockodoApi.ENTRY_BILLED
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

Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:MM:SS"

**end** _- Type: String_

End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:MM:SS"

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
* `filterBillable`: (enum) ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_NOT_BILLED, ClockodoApi.ENTRY_BILLED
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
      "date_text": [date localized],
      "duration": [duration in seconds, integer],
      "duration_text": [duration in H:MM h],
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

Use constants ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_NOT_BILLED, ClockodoApi.ENTRY_BILLED

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
      "date_text": [date localized],
      "duration": [duration in seconds, integer],
      "duration_text": [duration in H:MM h],
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

## License

Unlicense

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
