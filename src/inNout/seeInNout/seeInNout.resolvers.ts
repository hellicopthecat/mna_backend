import {Company} from "@prisma/client";
import {Resolvers} from "../../types";
import client from "../../prismaClient";

export default {
  Query: {
    seeInNout: async (_, {companyName}: Company) => {
      const {inNout} = await client.company.findUnique({
        where: {companyName},
        select: {inNout: true},
      });
      return inNout;
    },
  },
} as Resolvers;
