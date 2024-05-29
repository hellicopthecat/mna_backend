import {Salary} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Query: {
    seeSalary: protectResolver(async (_, {id}: Salary) => {
      const salary = await client.salary.findUnique({where: {id}});
      return salary;
    }),
  },
};
