import { faker } from "@faker-js/faker";
import { User, UserLanguage, UserRole, WorkTimeEditLock } from "./user.js";

export const createUserMocks = ({
  count = 1,
  workTimeEditLockDays = 0,
  boss,
  absenceManagersId,
}: {
  count?: number;
  workTimeEditLockDays?: WorkTimeEditLock;
  boss?: number;
  absenceManagersId?: Array<number>;
}) =>
  Array.from({ length: count }, (_, index): User => {
    const userId = index;

    return {
      id: userId,
      name: faker.person.fullName(),
      number: faker.string.hexadecimal(),
      email: faker.internet.email(),
      role: [UserRole.Owner, UserRole.Manager, UserRole.Worker][index % 3],
      active: faker.number.int({ min: 0, max: 10 }) > 2,
      timeformat12h: faker.datatype.boolean(),
      weekstartMonday: faker.datatype.boolean(),
      weekendFriday: faker.datatype.boolean(),
      language: [UserLanguage.De, UserLanguage.En, UserLanguage.Fr][index % 3],
      timezone: faker.location.timeZone(),
      wageType: null,
      canGenerallySeeAbsences: faker.datatype.boolean(),
      canGenerallyManageAbsences: faker.datatype.boolean(),
      canAddCustomers: faker.datatype.boolean(),
      worktimeRegulationId: null,
      teamsId: null,
      editLock: "2018-12-31",
      editLockDyn: null,
      editLockSync: faker.datatype.boolean(),
      nonbusinessgroupsId: null,
      workTimeEditLockDays,
      boss: boss ?? null,
      absenceManagersId: absenceManagersId ?? null,
      defaultHolidaysCount: false,
      defaultTargetHours: false,
    };
  });
