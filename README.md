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
    // see Clockodo API docs section "Client identification"
    // PLEASE NOTE: name + ";" + email must not be longer than 50 characters.
    name: "Your application/company",
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

We provide methods for Clockodo endpoints and normalize payload keys automatically: query params and request bodies are mapped from camelCase to snake_case (deeply), response bodies are mapped from snake_case to camelCase (deeply), and empty query values (`undefined`, `null`, `""`) are omitted. You can find the implementation in [`src/lib/mappings.ts`](./src/lib/mappings.ts).

For any questions about the different properties please consult the official Clockodo API documentation.

Some constants are also available for import:

```js
import { AbsenceStatus, AbsenceType, Billability, EntryType } from "clockodo";

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

Get all customers from all pages.

#### Example:

```js
await clockodo.getCustomers();
// or
await clockodo.getCustomers({
  // Filter by active flag
  filterActive: true,
});
```

---

### getCustomersPage()

Get all customers from a specific page.

#### Example:

```js
await clockodo.getCustomersPage({ page: 2 });
```

---

### getEntry()

Get an entry by its ID.

#### Example:

```js
await clockodo.getEntry({ id: 4 });
```

---

### splitAllEntriesAtMidnight()

Splits all entries for a given user and day at midnight.

#### Example:

```js
await clockodo.splitAllEntriesAtMidnight({
  day: "2026-02-17",
  usersId: 123,
});
```

---

### getEntries()

Get all entries from all pages.

#### Example:

```js
import { Billability } from "clockodo";

await clockodo.getEntries({
  // timeSince and timeUntil are required
  timeSince: "2017-08-18T00:00:00Z",
  timeUntil: "2018-02-09T00:00:00Z",
  // You can also add additional filters here
  filterBillable: Billability.Billed,
});
```

---

### getEntriesPage()

Get all entries from a specific page

#### Example:

```js
await clockodo.getEntriesPage({
  timeSince: "2017-08-18T00:00:00Z",
  timeUntil: "2018-02-09T00:00:00Z",
  page: 2,
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

Retreive all descriptions (and no additional info) entered for time and lump sum entries from all pages.

#### Example:

```js
await clockodo.getEntriesTexts({ term: "meeting with client" });
```

---

### getEntriesTextsPage()

Retreive all descriptions from a specific page.

#### Example:

```js
await clockodo.getEntriesTextsPage({ term: "meeting with client", page: 2 });
```

---

### getProject()

Get a project by its ID.

#### Example:

```js
await clockodo.getProject({ id: 1985 });
```

---

### getProjects()

Get all projects from all pages.

#### Example:

```js
await clockodo.getProjects();
// or
await clockodo.getProjects({
  // Filter by a specific customer id
  filterCustomersId: 123,
  // Filter by active flag
  filterActive: true,
});
```

---

### getProjectsPage()

Get all projects from a specific page.

#### Example:

```js
await clockodo.getProjectsPage({ page: 2 });
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

### getServicesPage()

Get a list of services from a specific page.

#### Example:

```js
await clockodo.getServicesPage({ page: 2 });
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

### getLumpSumServicesPage()

Get a list of lumpsum services from a specific page.

#### Example:

```js
await clockodo.getLumpSumServicesPage({ page: 2 });
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

### getSurchargeModel()

Get a surcharge model by ID.

#### Example:

```js
await clockodo.getSurchargeModel({ id: 7 });
```

---

### getSurchargeModels()

Get all surcharge models.

#### Example:

```js
await clockodo.getSurchargeModels();
```

---

### getUserReport()

Get a report for a specific user and year.

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

### getNonbusinessGroups()

Gets all nonbusiness groups.

#### Example:

```js
await clockodo.getNonbusinessGroups();
```

---

### getNonbusinessGroup()

Gets a nonbusiness group by ID.

#### Example:

```js
await clockodo.getNonbusinessGroup({ id: 123 });
```

---

### getNonbusinessDays()

Gets all nonbusiness days for a given year.

#### Example:

```js
await clockodo.getNonbusinessDays({
  nonbusinessGroupId: 123,
  year: 2021,
});
```

---

### getNonbusinessDay()

Gets a nonbusiness day by ID.

#### Example:

```js
await clockodo.getNonbusinessDay({ id: 12, year: 2026 });
```

---

### getAggregatesUsersMe()

Gets user and company settings for the logged-in user.

#### Example:

```js
await clockodo.getAggregatesUsersMe();
```

---

### getWorkTimesPage()

Gets work times from a specific page.

#### Example:

```js
await clockodo.getWorkTimesPage({
  usersId: 123,
  dateSince: "2026-02-01",
  dateUntil: "2026-02-07",
  page: 2,
});
```

---

### getWorkTimes()

Gets all work time pages for the given filter.

#### Example:

```js
await clockodo.getWorkTimes({
  usersId: 123,
  dateSince: "2026-02-01",
  dateUntil: "2026-02-07",
});
```

---

### getWorkTimesChangeRequestsPage()

Gets work time change requests from a specific page.

#### Example:

```js
await clockodo.getWorkTimesChangeRequestsPage({
  usersId: 123,
  dateSince: "2026-02-01",
  dateUntil: "2026-02-07",
  page: 2,
});
```

---

### getWorkTimesChangeRequests()

Gets all work time change request pages for the given filter.

#### Example:

```js
await clockodo.getWorkTimesChangeRequests({
  usersId: 123,
  dateSince: "2026-02-01",
  dateUntil: "2026-02-07",
});
```

---

### getOvertimecarry()

Gets overtime carry rows.

#### Example:

```js
await clockodo.getOvertimecarry({ usersId: 17, year: 2028 });
```

---

### getOvertimecarryRow()

Gets an overtime carry row by ID.

#### Example:

```js
await clockodo.getOvertimecarryRow({ id: 7 });
```

---

### getHolidaysQuotas()

Gets holiday quota rows.

#### Example:

```js
await clockodo.getHolidaysQuotas({ usersId: 17, year: 2028 });
```

---

### getHolidaysQuota()

Gets a holiday quota row by ID.

#### Example:

```js
await clockodo.getHolidaysQuota({ id: 7 });
```

---

### getHolidaysCarryovers()

Gets holiday carryover rows.

#### Example:

```js
await clockodo.getHolidaysCarryovers({ usersId: 17, year: 2028 });
```

---

### getHolidaysCarryover()

Gets a holiday carryover row by ID.

#### Example:

```js
await clockodo.getHolidaysCarryover({ id: 7 });
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

### addLumpsumService()

Adds a lumpsum service.

#### Example:

```js
await clockodo.addLumpsumService({ name: "Flat Rate Support", price: 99 });
```

---

### addNonbusinessGroup()

Creates a nonbusiness group.

#### Example:

```js
await clockodo.addNonbusinessGroup({ name: "NRW", preset: "" });
```

---

### addNonbusinessDay()

Creates a nonbusiness day.

#### Example:

```js
await clockodo.addNonbusinessDay({
  nonbusinessGroupId: 2,
  type: "DISTINCT_ONCE",
  name: "Labor Day",
});
```

---

### addOvertimecarry()

Creates an overtime carry row.

#### Example:

```js
await clockodo.addOvertimecarry({
  usersId: 17,
  year: 2028,
  hours: 8,
  note: "carryover",
});
```

---

### addHolidaysQuota()

Creates a holidays quota row.

#### Example:

```js
await clockodo.addHolidaysQuota({
  usersId: 17,
  yearSince: 2028,
  count: 30,
});
```

---

### addHolidaysCarryover()

Creates a holidays carryover row.

#### Example:

```js
await clockodo.addHolidaysCarryover({
  usersId: 17,
  year: 2028,
  count: 5,
});
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

### addSurchargeModel()

Adds a surcharge model.

#### Example:

```js
await clockodo.addSurchargeModel({ name: "Night Shift", accumulation: true });
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

### addWorkTimesChangeRequest()

Creates a work time change request.

#### Example:

```js
import { WorkTimeChangeRequestIntervalType } from "clockodo";

await clockodo.addWorkTimesChangeRequest({
  date: "2026-02-17",
  usersId: 123,
  changes: [
    {
      type: WorkTimeChangeRequestIntervalType.Add,
      timeSince: "2026-02-17T08:00:00Z",
      timeUntil: "2026-02-17T12:00:00Z",
    },
  ],
});
```

---

### approveWorkTimesChangeRequest()

Approves a work time change request by ID.

#### Example:

```js
await clockodo.approveWorkTimesChangeRequest({ id: 17 });
```

---

### declineWorkTimesChangeRequest()

Declines a work time change request by ID.

#### Example:

```js
await clockodo.declineWorkTimesChangeRequest({ id: 17 });
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

### editLumpsumService()

Edit an existing lumpsum service.

#### Example:

```js
await clockodo.editLumpsumService({ id: 15, name: "Updated Flat Rate" });
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

### editSurchargeModel()

Edit an existing surcharge model.

#### Example:

```js
await clockodo.editSurchargeModel({ id: 365, name: "ABC" });
```

---

### editNonbusinessGroup()

Edits a nonbusiness group.

#### Example:

```js
await clockodo.editNonbusinessGroup({ id: 2, name: "Holidays" });
```

---

### editNonbusinessDay()

Edits a nonbusiness day.

#### Example:

```js
await clockodo.editNonbusinessDay({
  id: 2,
  name: "Holiday",
  type: "DISTINCT_RECURRING",
});
```

---

### editOvertimecarry()

Edits an overtime carry row.

#### Example:

```js
await clockodo.editOvertimecarry({ id: 2, hours: 8, note: "updated" });
```

---

### editHolidaysQuota()

Edits a holidays quota row.

#### Example:

```js
await clockodo.editHolidaysQuota({ id: 2, count: 25, note: "updated" });
```

---

### editHolidaysCarryover()

Edits a holidays carryover row.

#### Example:

```js
await clockodo.editHolidaysCarryover({ id: 2, count: 5, note: "updated" });
```

---

## Delete methods

### deleteCustomer()

Deletes the customer.

#### Example:

```js
await clockodo.deleteCustomer({ id: 343 });
```

---

### deleteProject()

Deletes the project.

#### Example:

```js
await clockodo.deleteProject({ id: 8 });
```

---

### deleteService()

Deletes the service.

#### Example:

```js
await clockodo.deleteService({ id: 94 });
```

---

### deleteUser()

Deletes user.

#### Example:

```js
await clockodo.deleteUser({ id: 7 });
```

---

### deleteSurchargeModel()

Deletes a surcharge model by ID.

#### Example:

```js
await clockodo.deleteSurchargeModel({ id: 31 });
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

### deleteLumpsumService()

Deletes a lumpsum service by ID.

#### Example:

```js
await clockodo.deleteLumpsumService({ id: 94 });
```

---

### deleteTeam()

Deletes a team by ID

#### Example:

```js
await clockodo.deleteTeam({ id: 764 });
```

---

### deleteNonbusinessGroup()

Deletes a nonbusiness group by ID.

#### Example:

```js
await clockodo.deleteNonbusinessGroup({ id: 31 });
```

---

### deleteNonbusinessDay()

Deletes a nonbusiness day by ID.

#### Example:

```js
await clockodo.deleteNonbusinessDay({ id: 31 });
```

---

### deleteOvertimecarry()

Deletes an overtime carry row by ID.

#### Example:

```js
await clockodo.deleteOvertimecarry({ id: 31 });
```

---

### deleteHolidaysQuota()

Deletes a holidays quota row by ID.

#### Example:

```js
await clockodo.deleteHolidaysQuota({ id: 31 });
```

---

### deleteHolidaysCarryover()

Deletes a holidays carryover row by ID.

#### Example:

```js
await clockodo.deleteHolidaysCarryover({ id: 31 });
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

### withdrawWorkTimesChangeRequest()

Withdraws a work time change request by ID.

#### Example:

```js
await clockodo.withdrawWorkTimesChangeRequest({ id: 17 });
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

#### Example for self:

```js
await clockodo.stopClock({ entriesId: 7082 });
```

#### Example for another user (needs requesting user to be owner):

```js
await clockodo.stopClock({ entriesId: 7082, usersId: 123 });
```

---

## Development

To run integration tests you need to create an `.env` by copying the `.env.example` and entering credentials of a dev-user, as you don't want to mess up your real clockodo data.

## License

MIT

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
