import {Resolvers} from "../types";
import client from "../prismaClient";
import {User} from "@prisma/client";

export default {
  User: {
    vacation: async ({id}: User) => {
      const {vacation} = await client.user.findFirst({
        where: {id},
        select: {vacation: true},
      });
      return vacation;
    },
    salary: async ({id}: User) => {
      const {salary} = await client.user.findFirst({
        where: {id},
        select: {salary: true},
      });
      return salary;
    },
    ownCompany: async ({id}: User) => {
      const myCompany = await client.user.findFirst({
        where: {id},
        select: {ownCompany: {skip: 0, take: 6, orderBy: {createdAt: "asc"}}},
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
        select: {isManage: {skip: 0, take: 6, orderBy: {createdAt: "asc"}}},
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
