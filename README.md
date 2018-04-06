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
const clockodo = new ClockodoApi("your@mail.com", "your-api-key");
```

We have provided get methods for each of the endpoints available by the Clockodo API.

___

### getCustomers()

Get list of customers

#### Example:

```js

clockodo
    .getCustomers()
    .then(data => {
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

___

### getCustomer(id)

Get specific customer by ID

#### Parameters:

**id** *- Type: Integer*

Clockodo Customer ID

#### Example:

```js

clockodo
    .getCustomer(8675309)
    .then(data => {
        console.log(data);
    });
```

#### Response:

```
{
  "customer": [object of type customer]
}
```

___

### getProject(id)

Get a project by its ID. For a list of projects, use getCustomers().

#### Parameters:

**id** *- Type: Integer*

Clockodo Project ID

#### Example:

```js

clockodo
    .getProject(21)
    .then(data => {
        console.log(data);
    });
```

#### Response:

```
{
  "project": [object of type project]
}
```

___

### getServices()

Get list of services

#### Example:

```js

clockodo
    .getServices()
    .then(data => {
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

___

### getService(id)

Get a service by its ID.

#### Parameters:

**id** *- Type: Integer*

Clockodo Service ID

#### Example:

```js

clockodo
    .getService(1989)
    .then(data => {
        console.log(data);
    });
```

#### Response:

```
{
  "service": [object of type service]
}
```

___

### getUsers()

Get list of users

#### Example:

```js

clockodo
    .getUsers()
    .then(data => {
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

___

### getUser(id)

Get a co-worker by their ID.

#### Parameters:

**id** *- Type: Integer*

Clockodo User ID

#### Example:

```js

clockodo
    .getUser(101)
    .then(data => {
        console.log(data);
    });
```

#### Response:

```
{
  "user": [object of type user]
}
```

___

### getEntry(id)

Get an entry by its ID.

#### Parameters:

**id** *- Type: Integer*

Clockodo Entry ID

#### Example:

```js

clockodo
    .getEntry(2000)
    .then(data => {
        console.log(data);
    });
```

#### Response:

```
{
  "entry": [object of type entry]
}
```

___

### getEntries(begin, end[, filters])

Gets list of Clockodo activity entries.

#### Parameters:

**begin** *- Type: String*

Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:MM:SS"

**end** *- Type: String*

End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:MM:SS"

**filters(optional)**

* `filterUserId`: (integer)
* `filterCustomerId`: (integer)
* `filterProjectId`: (integer)
* `filterServiceId`: (integer)
* `filterBillable`: (enum) ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_NOT_BILLED, ClockodoApi.ENTRY_BILLED
* `filterText`: (string) text of entry

#### Example:

```js
const options = {
    filterBillable: ClockodoApi.ENTRY_BILLED,
    filterUserId: 007,
    begin: "2017-08-18 00:00:00",
    end: "2018-02-09 00:00:00",
};

clockodo
    .getEntries(options)
    .then(data => {
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

___

### getTasks(params)

Get Clockodo Tasks (grouped entries).

#### Parameters:

**count(optional)** *- Type: integer*

Count of days for which the tasks will be listed. *default: 8, max: 30*

#### Example:

```js
const options = {
    count: 6
};

clockodo
    .getTasks(options)
    .then(data => {
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

___

### getTask(id)

Get individual Clockodo Task by its ID.

#### Parameters:

**id** *- Type: integer*

Task ID from Clockodo

#### Example:

```js

clockodo
    .getTask(777)
    .then(data => {
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

___

### getEntryGroups(begin, end, grouping[, options])

Get a group of entries defined by your criteria.

#### Parameters:

**begin** *- Type: String*

Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:MM:SS"

**end** *- Type: String*

End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:MM:SS"

**grouping** *- Type: Array*

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

* `filterUserId`: (integer)
* `filterCustomerId`: (integer)
* `filterProjectId`: (integer)
* `filterServiceId`: (integer)
* `filterBillable`: (enum) ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_NOT_BILLED, ClockodoApi.ENTRY_BILLED
* `filterText`: (string) text of entry
* `roundBy`: (integer) Rounds the duration of entries to provided minutes. *Default: 0*
* `prependCustomer`: (Boolean) Prepends customer name to the front of project names. *Default: true*
* `calcHardBudgetRevenues  `: (Boolean) By default, revenues for projects with hard budgets aren't calculated. If you activate this option, the sum of all revenues to this project can be more than the project budget. *Default: false*

#### Example:

```js
const params = {
    begin: "2017-08-18 00:00:00",
    end: "2018-02-09 00:00:00",
    grouping: ["customers_id", "projects_id"],
    roundBy: 15,
};

clockodo
    .getEntries(params)
    .then(data => {
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

___

### getClockRunning()

Get currently running entry for the credentials attached to Clockodo object.

#### Example:

```js
clockodo
    .getClockRunning()
    .then(data => {
        console.log(data);
    });
```

#### Response:

```
{
  "running": [object of type entry]
}  
```

___

### getClockStatus()

Get status information of the clock for the credentials attached to Clockodo object.

#### Example:

```js
clockodo
    .getClockStatus()
    .then(data => {
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

___

### getAbsences(params)

Gets a list of absences in the provided year

#### Parameters:

**year** *- Type: integer*

Year of absences

#### Example:

```js

clockodo
    .getAbsences({ year: 2018 })
    .then(data => {
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

___

### getAbsence(id)

Gets a selected absence by its ID.

#### Parameters:

**id** *- Type: integer*

Clockodo Absence ID

#### Example:

```js

clockodo
    .getAbsence(007)
    .then(data => {
        console.log(data);
    });
```

#### Response:

```
{
  "absence": [object of type absence]
}
```

___

## License

Unlicense

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
