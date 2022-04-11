import faker from "@faker-js/faker";
import { Customer } from "./customer.js";

export const createCustomerMocks = ({ count = 1 }: { count?: number } = {}) => {
  return Array.from({ length: count }, (_, index): Customer => {
    const customerId = index;

    return {
      id: customerId,
      name: faker.company.companyName(),
      number: faker.datatype.hexaDecimal(),
      active: faker.datatype.float({ min: 0, max: 10 }) > 1,
      billableDefault: faker.datatype.boolean(),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      color: faker.datatype.number({ min: 1, max: 9 }),
    };
  });
};
