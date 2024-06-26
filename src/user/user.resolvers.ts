import {Resolvers} from "../types";
import client from "../prismaClient";
import {Company, User} from "@prisma/client";

export default {
  User: {
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
        select: {ownCompany: {skip: 0, take: 12, orderBy: {createdAt: "asc"}}},
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
        select: {isManage: {skip: 0, take: 12, orderBy: {createdAt: "asc"}}},
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
