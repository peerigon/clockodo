import faker from "faker";
import { Customer } from "./customer.js";
import { createProjectMocks } from "./project.mocks.js";

export const createCustomerMocks = ({
  count,
}: {
  count: number;
}): Array<Required<Customer>> => {
  let projectIds = 0;

  return Array.from({ length: count }, (_, index) => {
    const customerId = index;

    return {
      id: customerId,
      name: faker.company.companyName(),
      number: null,
      active: faker.datatype.float({ min: 0, max: 10 }) > 1,
      billableDefault: faker.datatype.boolean(),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      projects: createProjectMocks({
        count: faker.datatype.number({ min: 0, max: 5 }),
      }).map((project) => ({
        ...project,
        id: projectIds++,
        customersId: customerId,
      })),
      color: faker.datatype.number({ min: 1, max: 9 }),
    };
  });
};
