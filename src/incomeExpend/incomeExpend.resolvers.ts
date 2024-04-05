import {IncomeExpend} from "@prisma/client";
import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  IncomeExpend: {
    productItem: async ({id}: IncomeExpend) => {
      const {productItem} = await client.incomeExpend.findUnique({
        where: {id},
        select: {productItem: true},
      });
      return productItem;
    },
    inNout: async ({id}: IncomeExpend) => {
      const {InNout} = await client.incomeExpend.findUnique({
        where: {id},
        select: {InNout: true},
      });
      return InNout;
    },
  },
} as Resolvers;
