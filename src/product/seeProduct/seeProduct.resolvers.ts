import {Product} from "@prisma/client";
import {Resolvers} from "../../types";
import client from "../../prismaClient";

export default {
  Query: {
    seeProduct: async (_, {id}: Product) => {
      const findProduct = await client.product.findUnique({
        where: {
          id,
        },
      });
      return findProduct;
    },
  },
} as Resolvers;
