# Clockodo

**Unofficial JavaScript/TypeScript SDK for [Clockodo](https://www.clockodo.com).**

[![Version on NPM](https://img.shields.io/npm/v/clockodo?style=for-the-badge)](https://www.npmjs.com/package/clockodo)
[![Semantically released](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-release)
[![Monthly downloads on NPM](https://img.shields.io/npm/dm/clockodo?style=for-the-badge)](https://www.npmjs.com/package/clockodo)<br>
[![NPM Bundle size minified](https://img.shields.io/bundlephobia/min/clockodo?style=for-the-badge)](https://bundlephobia.com/result?p=clockodo)
[![NPM Bundle size minified and gzipped](https://img.shields.io/bundlephobia/minzip/clockodo?style=for-the-badge)](https://bundlephobia.com/result?p=clockodo)<br>
[![License](https://img.shields.io/npm/l/clockodo?style=for-the-badge)](./LICENSE)

## Installation and usage

```
npm install clockodo
```

For the constructor arguments, you must get the user (email) and clockodo API key from the "[My area](https://my.clockodo.com/en/users/editself)" section of Clockodo's website.

```js
import { Clockodo } from "clockodo";

const clockodo = new Clockodo({
  client: {
    // You need to add some information about yourself that will be
    // sent along every request,
    // see https://www.clockodo.com/en/api/ "Client identification"
    name: "The name of your application or your company",
    email: "technical-contact@your-company.com",
  },
  authentication: {
    user: "test-user@example.com",
    // You can get your API key from https://my.clockodo.com/en/users/editself
    apiKey: "kjfdskj643fgnlksf343kdslm",
  },
});
```

## Config

- `client`: Specify a `name` and an `email` for the `X-Clockodo-External-Application` header
- `authentication`: Specify a `user` and an `apiKey` to authenticate every request
- `baseUrl`: Points to the Clockodo API. Defaults to `https://my.clockodo.com/api`

You can update the configuration later like this:

```js
clockodo.api.config({
  authentication: {
    /* ... */
  },
});
```

## API

We have provided methods for each of the endpoints available by the Clockodo API. In order to provide a seamless API to JavaScript, we renamed the request and response object keys from what you will see in the Clockodo docs by removing special characters and converting to camel casing. If you are interested, you can find the mappings in the [mappings.ts file](https://github.com/peerigon/clockodo/blob/main/src/lib/mappings.ts).

For any questions about the different properties please consult the official [Clockodo-API](https://www.clockodo.com/en/api/).

Some constants are also available for import:

```js
import { EntryType, Billability, AbsenceStatus, AbsenceType } from "clockodo";

console.log(EntryType.Time); // 1
console.log(EntryType.LumpsumValue); // 2
console.log(EntryType.LumpsumService); // 3

console.log(Billability.NotBillable); // 0
console.log(Billability.Billable); // 1
console.log(Billability.Billed); // 2
```

Checkout [models](https://github.com/peerigon/clockodo/blob/main/src/models) for more constants and TypeScript types.

---

## Get Methods

### getAbsence()

Gets a selected absence by its ID.

#### Example:

```js
await clockodo.getAbsence({ id: 7 });
```

---

### getUsersAccessCustomersProjects()

Gets a user's (readonly) access rights for customers and projects.

#### Example:

```js
await clockodo.getUsersAccessCustomersProjects({ usersId: 67325 });
```

---

### getUsersAccessServices()

Gets a user's (readonly) access rights for services.

#### Example:

```js
await clockodo.getUsersAccessServices({ usersId: 67325 });
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
import { Billability } from "clockodo";

await clockodo.getEntries({
  timeSince: "2017-08-18T00:00:00Z",
  timeUntil: "2018-02-09T00:00:00Z",
  filterBillable: Billability.Billed,
});
```

---

### getEntryGroups()

Get a group of entries defined by your criteria.

#### Example:

```js
await clockodo.getEntryGroups({
  timeSince: "2017-08-18T00:00:00Z",
  timeUntil: "2018-02-09T00:00:00Z",
  grouping: ["customersId", "projectsId"],
  roundToMinutes: 15,
});
```

---

### getEntriesTexts()

Retreive descriptions (and no additional info) entered for time and lump sum entries. Seems to be a tight but case insensitive match.

#### Example:

```js
await clockodo.getEntriesTexts({ text: "meeting with client" });
```

---

### getProject()

Get a project by its ID. For a list of projects, use getCustomers().

#### Example:

```js
await clockodo.getProject({ id: 1985 });
```

---

### getProjects()

Returns all projects.

#### Example:

```js
await clockodo.getProjects();
// or filter by a specific customer id
await clockodo.getProjects({
  filterCustomersId: 123,
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

### getTeam()

Get team by id.

#### Example:

```js
await clockodo.getTeam({ id: 10 });
```

---

### getTeams()

Get list of all teams.

#### Example:

```js
await clockodo.getTeams();
```

---

### getLumpSumService()

Get a lumpsum service by its ID.

#### Example:

```js
await clockodo.getLumpSumService({ id: 10 });
```

---

### getLumpSumServices()

Get a list of all lumpsum services

#### Example:

```js
await clockodo.getLumpSumServices();
```

---

### getTargethoursRow()

Get a specific target hour period for a specific user by its ID (not the ID of the user)

#### Example:

```js
await clockodo.getTargethoursRow({ id: 1234 });
```

---

### getTargethours()

Get list of target hours for all users, with option to pass an object with an `usersId` to filter the history of target hours to a specific user.

#### Example:

```js
await clockodo.getTargethours();
// or
await clockodo.getTargethours({ usersId: 346923 });
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
await clockodo.getUserReport({ usersId: 1263, year: 2017 });
```

---

### getUserReports()

Get an employee/user's report, which contains data such as hours worked and holidays taken.

#### Example:

```js
await clockodo.getUserReports({ year: 2017, type: 1 });
```

---

### [getNonbusinessGroups()](https://www.clockodo.com/en/api/nonbusinessgroups/)

With this resource you can read all nonbusiness groups. The editing and adding of nonbusiness groups is currently not possible.

#### Example:

```js
await clockodo.getNonbusinessGroups();
```

---

### [getNonbusinessDays()](https://www.clockodo.com/en/api/nonbusinessdays/)

With this resource you can read all nonbusiness days. The editing and adding of nonbusiness days is currently not possible.

#### Example:

```js
await clockodo.getNonbusinessDays({
  nonbusinessgroupsId: 123,
  year: 2021,
});
```

---

### [getAggregatesUsersMe()](https://www.clockodo.com/en/api/aggregates/users/me/)

With this resource you can read user and company seetings for the logged in user. Editing is currently not possible.

#### Example:

```js
await clockodo.getAggregatesUsersMe();
```

---

## Post Methods

### addAbsence()

Default behavior adds an absence for the user attached to the credentials given to the clockodo object. To add the absence for another user you can use the `usersId` option if you have the permissions.

#### Example:

```js
import { AbsenceType } from "clockodo";

await clockodo.addAbsence({
  dateSince: "2017-08-18T00:00:00Z",
  dateUntil: "2018-02-09T00:00:00Z",
  type: AbsenceType.SpecialLeave,
  note: "elternzeit",
  usersId: 12321,
});
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

| Type of entry         | Required properties                                                                  |
| :-------------------- | :----------------------------------------------------------------------------------- |
| Manual time entry     | `customersId`, `servicesId`, `billable`, `timeSince`, `timeUntil`                    |
| Lumpsum value entry   | `customersId`, `servicesId`, `billable`, `timeSince`, `lumpsum`                      |
| Lumpsum service entry | `customersId`, `lumpsumServicesAmount`, `lumpsumServicesId`, `billable`, `timeSince` |

#### Example:

```js
import { Billability } from "clockodo";

await clockodo.addEntry({
  customersId: 1,
  servicesId: 2,
  billable: Billability.Billable,
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

### addTeam()

Creates a new team under your organization.

#### Example:

```js
await clockodo.addTeam({ name: "Gold Team" });
```

---

### addUser()

Creates new user in organization.

#### Example:

```js
import { UserRole } from "clockodo";

await clockodo.addUser({
  name: "Merkel",
  number: "08",
  email: "angela@eu.eu",
  role: UserRole.Owner,
});
```

---

### startClock()

Start a new running clockodo entry.

#### Example:

```js
import { Billability } from "clockodo";

await clockodo.startClock({
  customersId: 24,
  servicesId: 7,
  projectsId: 365,
  billable: Billability.Billable,
});
```

---

## Put methods

### changeClockDuration()

Changes the duration of an entry. Because the ID returned by clock methods is just the entry ID, and this function can only be used after an entry is finished, there seems to be no difference from using editEntry().

#### Example:

```js
await clockodo.changeClockDuration({
  entriesId: 7082,
  duration: 540,
  durationBefore: 300,
});
```

---

### editAbsence()

Edit existing Clockodo absence.

#### Example:

```js
await clockodo.editAbsence({ id: 74, note: "I know what he did last summer" });
```

---

### editCustomer()

Edit existing Clockodo customer.

#### Example:

```js
await clockodo.editCustomer({ id: 15, name: "The Mystery Gang" });
```

---

### editEntry()

Changes the values of a Clockodo entry. Unlike changeClockDuration(), editEntry() can seemingly mutate any of the accepted parameters even when the entry is running.

#### Example:

```js
await clockodo.editEntry({ id: 365, duration: 540 });
```

---

### editEntryGroup()

Allows for mass edit of entries based on a set of filters.

#### Example:

```js
import { Billability } from "clockodo";

await clockodo.editEntryGroup({
  timeSince: "2017-08-18T00:00:00Z",
  timeUntil: "2018-02-09T00:00:00Z",
  filterText: "Browsing Reddit",
  billable: Billability.NotBillable,
});
```

---

### editProject()

Edit existing project.

#### Example:

```js
await clockodo.editProject({ id: 20, name: "Awesome new project" });
```

---

### editService()

Edit existing service.

#### Example:

```js
await clockodo.editService({ id: 23, name: "Room Service" });
```

---

### editTeam()

Edit existing team.

#### Example:

```js
await clockodo.editTeam({ id: 6324, name: "New Team Name" });
```

---

### editUser()

Edit existing user.

#### Example:

```js
await clockodo.editUser({ id: 33, name: "Moalo Loco" });
```

---

## Delete methods

### deactivateCustomer()

Deactivates (not deletes) customer.

#### Example:

```js
await clockodo.deactivateCustomer({ id: 343 });
```

---

### deactivateProject()

Deactivates (not deletes) project.

#### Example:

```js
await clockodo.deactivateProject({ id: 8 });
```

---

### deactivateService()

Deactivates (not deletes) service.

#### Example:

```js
await clockodo.deactivateService({ id: 94 });
```

---

### deactivateUser()

Deactivates (not deletes) user.

#### Example:

```js
await clockodo.deactivateUser({ id: 7 });
```

---

### deleteAbsence()

Deletes absence (go figure).

#### Example:

```js
await clockodo.deleteAbsence({ id: 31 });
```

---

### deleteEntry()

Deletes a single entry by ID

#### Example:

```js
await clockodo.deleteEntry({ id: 543512 });
```

---

### deleteTeam()

Deletes a team by ID

#### Example:

```js
await clockodo.deleteTeam({ id: 764 });
```

---

### deleteEntryGroup()

Deletes one or more entries based on a series of filters that builds an "entry group".

#### Example:

```js
await clockodo.deleteEntryGroup({
  timeSince: "2017-08-18T00:00:00Z",
  timeUntil: "2018-02-09T00:00:00Z",
  text: "chilin everyday",
});
```

---

### register()

Creates a new clockodo account.

#### Example:

```js
await clockodo.register({
  companiesName: "Acme Corporation",
  name: "Road Runner",
  email: "runner@acme.com",
});
```

---

### stopClock()

Stops a running clock/entry.

#### Example:

```js
await clockodo.stopClock({ entriesId: 7082 });
```

---

## Development

To run integration tests you need to create an `.env` by copying the `.env.example` and entering credentials of a dev-user, as you don't want to mess up your real clockodo data.

## License

MIT

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
