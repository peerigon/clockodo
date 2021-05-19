import snakecaseKeys from "snakecase-keys";
import { Api, Config } from "./utilities/api";
import * as REQUIRED from "./utilities/requiredParams";
import {
    AbsenceReturnType,
    AbsencesReturnType,
    DeleteReturnType,
    CustomerReturnType,
    CustomersReturnType,
    ProjectReturnType,
    ServiceReturnType,
    ServicesReturnType,
    UserReturnType,
    UsersReturnType,
    EntryReturnType,
    EntriesReturnType,
    TasksReturnType,
    TaskDurationReturnType,
    DeleteEntryGroupsReturnType,
    EditEntryGroupsReturnType,
    UserReportReturnType,
    UserReportsReturnType,
    ClockReturnType,
    ClockEditReturnType,
    ClockStopReturnType,
    TargetHoursReturnType,
    TargetHourReturnType,
    AddUserReturnType,
    EntryGroupsReturnType,
    ClockStartReturnType,
    AddEntryReturnType,
    EditEntryReturnType,
    LumpsumServicesReturnType,
    SearchTextsReturnType,
    LumpsumServiceReturnType,
} from "./returnTypes";
import { TimeEntryBillability } from "./enums";
import {
    Absence,
    ClockingTimeEntry,
    Customer,
    Entry,
    LumpsumService,
    LumpsumServiceEntry,
    LumpsumValueEntry,
    ManualTimeEntry,
    Project,
    Service,
    TargetHoursRow,
    User,
} from "./interfaces";

export class Clockodo {
    api: Api;

    constructor(config: Config) {
        this.api = new Api(config);
    }

    use = (plugin: (clockodo: Clockodo) => void) => {
        plugin(this);
    };

    getAbsence = async ({ id }: Pick<Absence, "id">): AbsenceReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ABSENCE);

        return this.api.get("/absences/" + id);
    };

    getAbsences = async ({ year }: { year: number }): AbsencesReturnType => {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_ABSENCES);

        return this.api.get("/absences", { year });
    };

    getClock = async (): ClockReturnType => {
        return this.api.get("/v2/clock");
    };

    getCustomer = async ({ id }: Pick<Customer, "id">): CustomerReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_CUSTOMER);

        return this.api.get("/customers/" + id);
    };

    getCustomers = async (): CustomersReturnType => {
        return this.api.get("/customers");
    };

    getEntry = async ({ id }: Pick<Entry, "id">): EntryReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ENTRY);

        return this.api.get("/v2/entries/" + id);
    };

    getEntries = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): EntriesReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRIES);

        return this.api.get("/v2/entries", {
            ...requiredArguments,
            ...options,
        });
    };

    getEntryGroups = async (
        {
            timeSince,
            timeUntil,
            grouping,
        }: { timeSince: string; timeUntil: string; grouping: Array<string> },
        options?: Record<string, unknown>
    ): EntryGroupsReturnType => {
        const requiredArguments = { timeSince, timeUntil, grouping };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRY_GROUPS);

        // Could be replaced with Object.fromEntries() once it's supported everywhere
        const camelCaseGrouping: Record<string, boolean> = {};

        grouping.forEach((key) => {
            camelCaseGrouping[key] = true;
        });

        requiredArguments.grouping = Object.keys(
            snakecaseKeys(camelCaseGrouping)
        );

        return this.api.get("/v2/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    getProject = async ({ id }: Pick<Project, "id">): ProjectReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_PROJECT);

        return this.api.get("/projects/" + id);
    };

    getSearchTexts = async (
        options?: Record<string, unknown>
    ): SearchTextsReturnType => {
        return this.api.get("/clock/searchtexts", options);
    };

    getService = async ({ id }: Pick<Service, "id">): ServiceReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SERVICE);

        return this.api.get("/services/" + id);
    };

    getServices = async (): ServicesReturnType => {
        return this.api.get("/services");
    };

    // This endpoint still uses the old lumpSum casing
    getLumpSumService = async ({
        id,
    }: Pick<LumpsumService, "id">): LumpsumServiceReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_LUMPSUM_SERVICE);

        return this.api.get("/lumpsumservices/" + id);
    };

    // This endpoint still uses the old lumpSum casing
    getLumpSumServices = async (): LumpsumServicesReturnType => {
        return this.api.get("/lumpsumservices");
    };

    // TODO: targethoursRow
    getSingleTargetHourSet = async ({
        id,
    }: Pick<TargetHoursRow, "id">): TargetHourReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SINGLE_TARGET_HOUR_SET);

        return this.api.get("/targethours/" + id);
    };

    getTargetHours = async (
        options?: Record<string, unknown>
    ): TargetHoursReturnType => {
        return this.api.get("/targethours", options);
    };

    // TODO: Deprecated
    getTaskDuration = async (
        {
            taskCustomersId,
            taskProjectsId,
            taskServicesId,
            taskText,
            taskBillable,
        }: {
            taskCustomersId: number;
            taskProjectsId: number;
            taskServicesId: number;
            taskText: string;
            taskBillable: TimeEntryBillability;
        },
        options?: Record<string, unknown>
    ): TaskDurationReturnType => {
        const requiredArguments = {
            taskCustomersId,
            taskProjectsId,
            taskServicesId,
            taskText,
            taskBillable,
        };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_TASK_DURATION);

        return this.api.get("/tasks/duration", {
            ...requiredArguments,
            ...options,
        });
    };

    // TODO: Deprecated
    getTasks = async (options?: Record<string, unknown>): TasksReturnType => {
        return this.api.get("/tasks", options);
    };

    getUser = async ({ id }: Pick<User, "id">): UserReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_USER);

        return this.api.get("/users/" + id);
    };

    getUsers = async (): UsersReturnType => {
        return this.api.get("/users");
    };

    getUserReport = async (
        { id, year }: { id: User["id"]; year: number },
        options?: Record<string, unknown>
    ): UserReportReturnType => {
        REQUIRED.checkRequired({ id, year }, REQUIRED.GET_USER_REPORTS);

        return this.api.get("/userreports/" + id, {
            year,
            ...options,
        });
    };

    getUserReports = async (
        { year }: { year: number },
        options?: Record<string, unknown>
    ): UserReportsReturnType => {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_USER_REPORTS);

        return this.api.get("/userreports", { year, ...options });
    };

    changeClockDuration = async (
        {
            entryId,
            durationBefore,
            duration,
        }: { entryId: Entry["id"]; durationBefore: number; duration: number },
        options?: Record<string, unknown>
    ): ClockEditReturnType => {
        const requiredArguments = { durationBefore, duration };

        REQUIRED.checkRequired(
            { entryId, ...requiredArguments },
            REQUIRED.CHANGE_CLOCK_DURATION
        );

        return this.api.put("/v2/clock/" + entryId, {
            ...requiredArguments,
            ...options,
        });
    };

    startClock = async (
        {
            customersId,
            servicesId,
            billable,
        }: Pick<ClockingTimeEntry, typeof REQUIRED.START_CLOCK[number]>,
        options?: Record<string, unknown>
    ): ClockStartReturnType => {
        const requiredArguments = { customersId, servicesId, billable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);

        return this.api.post("/v2/clock", {
            ...requiredArguments,
            ...options,
        });
    };

    addCustomer = async (
        { name }: Pick<Customer, typeof REQUIRED.ADD_CUSTOMER[number]>,
        options?: Record<string, unknown>
    ): CustomerReturnType => {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_CUSTOMER);

        return this.api.post("/customers", { name, ...options });
    };

    addProject = async (
        {
            name,
            customersId,
        }: Pick<Project, typeof REQUIRED.ADD_PROJECT[number]>,
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ name, customersId }, REQUIRED.ADD_PROJECT);

        return this.api.post("/projects", {
            name,
            customersId,
            ...options,
        });
    };

    addService = async (
        { name }: Pick<Service, typeof REQUIRED.ADD_SERVICE[number]>,
        options?: Record<string, unknown>
    ): ServiceReturnType => {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_SERVICE);

        return this.api.post("/services", { name, ...options });
    };

    addUser = async (
        {
            name,
            number,
            email,
            role,
        }: Pick<User, typeof REQUIRED.ADD_USER[number]>,
        options?: Record<string, unknown>
    ): AddUserReturnType => {
        const requiredArguments = { name, number, email, role };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_USER);

        return this.api.post("/users", {
            ...requiredArguments,
            ...options,
        });
    };

    addEntry = async (
        requiredArguments:
            | Pick<ManualTimeEntry, typeof REQUIRED.ADD_TIME_ENTRY[number]>
            | Pick<
                  LumpsumValueEntry,
                  typeof REQUIRED.ADD_LUMPSUM_VALUE_ENTRY[number]
              >
            | Pick<
                  LumpsumServiceEntry,
                  typeof REQUIRED.ADD_LUMPSUM_SERVICE_ENTRY[number]
              >,
        options?: Record<string, unknown>
    ): AddEntryReturnType => {
        if ("lumpsumsId" in requiredArguments) {
            REQUIRED.checkRequired(
                requiredArguments,
                REQUIRED.ADD_LUMPSUM_SERVICE_ENTRY
            );
        } else if ("lumpsum" in requiredArguments) {
            REQUIRED.checkRequired(
                requiredArguments,
                REQUIRED.ADD_LUMPSUM_VALUE_ENTRY
            );
        } else {
            REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_TIME_ENTRY);
        }

        return this.api.post("/v2/entries", {
            ...requiredArguments,
            ...options,
        });
    };

    addAbsence = async (
        {
            dateSince,
            dateUntil,
            type,
        }: Pick<Absence, typeof REQUIRED.ADD_ABSENCE[number]>,
        options?: Record<string, unknown>
    ): AbsenceReturnType => {
        const requiredArguments = { dateSince, dateUntil, type };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ABSENCE);

        return this.api.post("/absences", {
            ...requiredArguments,
            ...options,
        });
    };

    stopClock = async (
        { entryId }: { entryId: Entry["id"] },
        options?: Record<string, unknown>
    ): ClockStopReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.STOP_CLOCK);

        return this.api.delete("/v2/clock/" + entryId, options);
    };

    deactivateCustomer = async (
        { customersId }: { customersId: Customer["id"] },
        options?: Record<string, unknown>
    ): CustomerReturnType => {
        REQUIRED.checkRequired({ customersId }, REQUIRED.DEACTIVATE_CUSTOMER);

        return this.api.delete("/customers/" + customersId, options);
    };

    deactivateProject = async (
        { projectsId }: { projectsId: Project["id"] },
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ projectsId }, REQUIRED.DEACTIVATE_PROJECT);

        return this.api.delete("/projects/" + projectsId, options);
    };

    deactivateService = async (
        { servicesId }: { servicesId: Service["id"] },
        options?: Record<string, unknown>
    ): ServiceReturnType => {
        REQUIRED.checkRequired({ servicesId }, REQUIRED.DEACTIVATE_SERVICE);

        return this.api.delete("/services/" + servicesId, options);
    };

    deactivateUser = async (
        { usersId }: { usersId: User["id"] },
        options?: Record<string, unknown>
    ): UserReturnType => {
        REQUIRED.checkRequired({ usersId }, REQUIRED.DEACTIVATE_USER);

        return this.api.delete("/users/" + usersId, options);
    };

    deleteEntry = async (
        { entryId }: { entryId: Entry["id"] },
        options?: Record<string, unknown>
    ): DeleteReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.DELETE_ENTRY);

        return this.api.delete("/v2/entries/" + entryId, options);
    };

    deleteEntryGroup = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): DeleteEntryGroupsReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.DELETE_ENTRY_GROUP);

        return this.api.delete("/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    deleteAbsence = async (
        { absenceId }: { absenceId: Absence["id"] },
        options?: Record<string, unknown>
    ): DeleteReturnType => {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.DELETE_ABSENCE);

        return this.api.delete("/absences/" + absenceId, options);
    };

    editCustomer = async (
        { customersId }: { customersId: Customer["id"] },
        options?: Record<string, unknown>
    ) => {
        REQUIRED.checkRequired({ customersId }, REQUIRED.EDIT_CUSTOMER);

        return this.api.put("/customers/" + customersId, options);
    };

    editProject = async (
        { projectsId }: { projectsId: Project["id"] },
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ projectsId }, REQUIRED.EDIT_PROJECT);

        return this.api.put("/projects/" + projectsId, options);
    };

    editService = async (
        { servicesId }: { servicesId: Service["id"] },
        options?: Record<string, unknown>
    ): ServiceReturnType => {
        REQUIRED.checkRequired({ servicesId }, REQUIRED.EDIT_SERVICE);

        return this.api.put("/services/" + servicesId, options);
    };

    editUser = async (
        { usersId }: { usersId: User["id"] },
        options?: Record<string, unknown>
    ): UserReturnType => {
        REQUIRED.checkRequired({ usersId }, REQUIRED.EDIT_USER);

        return this.api.put("/users/" + usersId, options);
    };

    editEntryGroup = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): EditEntryGroupsReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.EDIT_ENTRY_GROUP);

        return this.api.put("/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    editAbsence = async (
        { absenceId }: { absenceId: Absence["id"] },
        options?: Record<string, unknown>
    ): AbsenceReturnType => {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.EDIT_ABSENCE);

        return this.api.put("/absences/" + absenceId, options);
    };

    editEntry = async (
        { entryId }: { entryId: Entry["id"] },
        options?: Record<string, unknown>
    ): EditEntryReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.EDIT_ENTRY);

        return this.api.put("/v2/entries/" + entryId, options);
    };
}
