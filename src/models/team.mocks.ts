import { faker } from "@faker-js/faker";

import { type Team } from "./team.js";

export const createTeamMocks = ({ count = 1 }: { count?: number }): Array<Team> =>
  Array.from({ length: count }, (_, index): Team => {
    return {
      id: index,
      name: faker.person.jobArea() + " Team",
      leader: faker.datatype.boolean() ? index : null,
      userIds: Array.from(
        { length: faker.number.int({ min: 0, max: 5 }) },
        (_, memberIndex) => memberIndex,
      ),
    };
  });
