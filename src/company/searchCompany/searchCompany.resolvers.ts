import {Company} from "@prisma/client";
import client from "../../prismaClient";
import {Resolvers} from "../../types";
import {protectResolver} from "../../user/user.util";

export default {
  Query: {
    searchCompany: protectResolver(async (_, {companyName}: Company) => {
      const resultCompany = await client.company.findUnique({
        where: {companyName},
      });
      return resultCompany;
    }),
  },
} as Resolvers;
