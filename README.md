# Clockodo Node/JavaScript API

The Node/JavaScript Client for the [Clockodo-API](https://www.clockodo.com/de/api/).

### init API

Get user (email) and clockodo api key on "[My area](https://my.clockodo.com/en/users/editself)".

```
const Clockodo = require("clockodo-node");
const clockodo = newClockodo("your@mail.com", "your-api-key");
```

We have provided methods for each of the endpoints available by the Clockodo API. The request parameters passed to the queries have been renamed for ease of use, and any key names in the response object returned by Clockodo have been converted to camel case. We have also cut the fluff to return only the data from the response.

### getEntries(begin, end[, filters])

#### Parameters:

**begin**
Type: String
Description: Beginning date for the range of Clockodo entries to return. Should accept any valid date format, because it parses the string into the format Clockodo wants: "YYYY-MM-DD hh:mm:ss".

**end**
Type: String
Description: End date for the range of Clockodo entries to return.

**filters(optional)**

* `filterUserId`: (string)
* `filterCustomerId`: (string)
* `filterProjectId`: (string)
* `filterServiceId`: (string)
* `filterBillable`: (enum) 0(unbillable), 1(billable), 2(billed and billable)
* `filterText`: (string) text of entry

Example:

```
const options = {
    filterBillable: 2,
    filterUserId: 007,
};

clockodo
    .getEntries("03-12-2016", "08-18-2017", options)
    .then(data => {
        console.log(data);
    });
```

More Infos: [Clockodo UserReport API](https://www.clockodo.com/de/api/userreports/)

### getUsers()

More Infos: [Clockodo Customers API](https://www.clockodo.com/de/api/customers/)

### getEntries(parameters)

More Infos: [Clockodo Entries API](https://www.clockodo.com/de/api/entries/)

### getAbsences(parameters)

More Infos: [Clockodo Absences API](https://www.clockodo.com/de/api/absences/)

### getEntryGroup(parameters)

More Infos: [Clockodo EntryGroups API](https://www.clockodo.com/de/api/entrygroups/)

### getCustomers()

More Infos: [Clockodo Customers API](https://www.clockodo.com/de/api/customers/)

## License

Unlicense

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
