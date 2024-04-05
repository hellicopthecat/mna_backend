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
      const result = companyProduct.map((item) => item.companyProduct);
      return result[0];
    },
  },
} as Resolvers;
