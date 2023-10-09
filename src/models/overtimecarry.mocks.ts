import { faker } from "@faker-js/faker";
import { OvertimecarryRow } from "./overtimecarry.js";

export const createOvertimecarryMocks = ({
  count = 1,
  usersId = 0,
}: { count?: number; usersId?: number } = {}) => {
  return Array.from({ length: count }, (): OvertimecarryRow => {
    return {
      usersId,
      year: faker.datatype.number({ min: 1900, max: 2024 }),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      hours: faker.datatype.number({ min: 0, max: 100 }),
    };
  });
};
