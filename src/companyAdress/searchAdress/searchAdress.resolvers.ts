import {Company} from "@prisma/client";
import {Resolvers} from "../../types";
import client from "../../prismaClient";

export default {
  Query: {
    searchAdress: async (_, {companyName}: Company) => {
      const findAdress = await client.companyAdress.findMany({
        where: {companyName: {contains: companyName}},
      });
      return findAdress;
    },
  },
} as Resolvers;
