# Clockodo Node/JavaScript API

**The Node/JavaScript Client for the [Clockodo-API](https://www.clockodo.com/de/api/).**

[![](https://img.shields.io/npm/v/clockodo.svg)](https://www.npmjs.com/package/clockodo)
[![Dependency Status](https://david-dm.org/peerigon/clockodo.svg)](https://david-dm.org/peerigon/clockodo)
[![Build Status](https://travis-ci.org/peerigon/clockodo.svg?branch=master)](https://travis-ci.org/peerigon/clockodo)

## Note

The new version of this package features a breaking change. Please consult the changelog. Documentation will follow shortly

---

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

-   Get methods
    -   [getAbsence()](#getabsenceid)
    -   [getAbsences()](#getabsencesparams)
    -   [getClock()](#getclock)
    -   [getClockUpdate()](#getclockupdate)
    -   [getCustomer()](#getcustomerid)
    -   [getCustomers()](#getcustomers)
    -   [getEntry()](#getentryid)
    -   [getEntries()](#getentriesbegin-end-filters)
    -   [getEntryGroups()](#getentrygroupsbegin-end-grouping-options)
    -   [getProject()](#getprojectid)
    -   [getSearchTexts()](#getsearchtextsparams)
    -   [getService()](#getserviceid)
    -   [getServices()](#getservices)
    -   [getUser()](#getuserid)
    -   [getUsers()](#getusers)
    -   [getUserReport()](#getuserreportid)
    -   [getUserReports()](#getuserreportsid-params)
    -   [getTasks()](#gettasksparams)
    -   [getTaskDuration()](#gettaskdurationparams)
-   Post methods
    -   [startClock()](#startclockparams)
-   Put methods
    -   [changeClockDuration()](#changeclockdurationid-params)
    -   [editEntry()](#editentryid-params)
-   Delete methods
    -   [stopClock()](#stopclockid-params)

---

---

## License

Unlicense

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
