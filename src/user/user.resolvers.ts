import {Resolvers} from "../types";
import client from "../prismaClient";
import {User} from "@prisma/client";

export default {
  User: {
    ownCompany: async ({id}: User) => {
      const myCompany = await client.user.findUnique({
        where: {id},
        select: {ownCompany: true},
      });
      return myCompany.ownCompany;
    },
    hasCompanyCount: async ({id}: User) => {
      const me = await client.user.findFirst({
        where: {id},
        select: {ownCompany: true},
      });
      return me.ownCompany.length;
    },
    manageCompany: async ({id}: User) => {
      const company = await client.user.findFirst({
        where: {id},
        select: {isManage: true},
      });
      return company.isManage;
    },
    manageCompanyCount: async ({id}: User) => {
      const company = await client.user.findFirst({
        where: {id},
        select: {isManage: true},
      });

      return company.isManage.length;
    },
  },
} as Resolvers;
