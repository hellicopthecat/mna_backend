import {Vacation} from "@prisma/client";
import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  Vacation: {
    description: async ({id}: Vacation) => {
      const {description} = await client.vacation.findUnique({
        where: {id},
        select: {description: true},
      });
      return description;
    },
    user: async ({id}: Vacation) => {
      const {user} = await client.vacation.findUnique({
        where: {id},
        select: {user: true},
      });
      return user;
    },
    company: async ({id}: Vacation) => {
      const {company} = await client.vacation.findUnique({
        where: {id},
        select: {company: true},
      });
      return company;
    },
  },
} as Resolvers;
