import {Product} from "@prisma/client";
import {Resolvers} from "../../types";
import client from "../../prismaClient";

export default {
  Query: {
    seeProduct: async (_, {itemProductId, itemName, itemModelName}: Product) =>
      await client.product.findMany({
        where: {
          OR: [
            {itemProductId: {contains: itemProductId}},
            {itemName: {contains: itemName}},
            {itemModelName: {contains: itemModelName}},
          ],
        },
      }),
  },
} as Resolvers;
