import {Product} from "@prisma/client";
import {Resolvers} from "../../types";
import client from "../../prismaClient";

export default {
  Query: {
    seeProduct: async (
      _,
      {itemProductId, itemName, itemModelName, id}: Product
    ) => {
      const findProduct = await client.product.findMany({
        where: {
          OR: [
            {id},
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
