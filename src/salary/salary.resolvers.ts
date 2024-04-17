import {Salary} from "@prisma/client";
import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  Salary: {
    user: async ({id}: Salary) => {
      const {user} = await client.salary.findFirst({
        where: {id},
        select: {user: true},
      });
      return user;
    },
    company: async ({id}: Salary) => {
      const {company} = await client.salary.findFirst({
        where: {id},
        select: {company: true},
      });
      return company;
    },
  },
} as Resolvers;
