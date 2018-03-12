# Clockodo Node/JavaScript API

The Node/JavaScript Client for the [Clockodo-API](https://www.clockodo.com/de/api/).

### init API

Get user (email) and clockodo api key on "[My area](https://my.clockodo.com/en/users/editself)".

```
const clockodo = require("clockodo-node");
clockodo.setClientSettings("your@mail.com", "your-api-key");
```

### getUserReports()

Example:

```
const options = {
    type: 1,
    year: 2018,
};

clockodo
    .getUserReports(options)
    .then((data) => {
        console.log(data.userreports);
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
