import {Product} from "@prisma/client";
import {Resolvers} from "../../types";
import client from "../../prismaClient";

export default {
  Query: {
    seeProduct: async (
      _,
      {itemProductId, itemName, itemModelName}: Product
    ) => {
      const findProduct = await client.product.findMany({
        where: {
          OR: [
            {itemProductId: {contains: itemProductId}},
            {itemName: {contains: itemName}},
            {itemModelName: {contains: itemModelName}},
          ],
        },
      });
      return findProduct;
    },
  },
} as Resolvers;
