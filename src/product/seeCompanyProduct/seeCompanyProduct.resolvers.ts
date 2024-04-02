import {Company} from "@prisma/client";
import {Resolvers} from "../../types";
import client from "../../prismaClient";

export default {
  Query: {
    seeCompanyProduct: async (_, {companyName}: Company) => {
      const companyProduct = await client.company.findMany({
        where: {companyName},
        select: {companyProduct: true},
      });
      return companyProduct;
    },
  },
} as Resolvers;
