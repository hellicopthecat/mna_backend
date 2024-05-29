import {Vacation} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Query: {
    seeVacation: protectResolver(async (_, {id}: Vacation) => {
      const vacation = await client.vacation.findUnique({where: {id}});
      return vacation;
    }),
  },
};
