import {Product} from "@prisma/client";
import client from "../prismaClient";

export default {
  Product: {
    company: async ({id}: Product) => {
      const {company} = await client.product.findUnique({
        where: {id},
        select: {company: true},
      });
      return company;
    },
    incomeExpend: async ({id}: Product) => {
      const {incomeExpend} = await client.product.findUnique({
        where: {id},
        select: {incomeExpend: true},
      });
      return incomeExpend[0];
    },
    incomeExpendTypeId: async ({id}: Product) => {
      const {id: IETypeId} = await client.product.findUnique({
        where: {id},
        select: {id: true},
      });
      return IETypeId;
    },
  },
};
