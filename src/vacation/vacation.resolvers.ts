import {Vacation} from "@prisma/client";
import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  Vacation: {
    user: async ({id}: Vacation) => {
      const {user} = await client.vacation.findFirst({
        where: {id},
        select: {user: true},
      });
      return user;
    },
  },
} as Resolvers;
