import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  User: {
    ownCompany: async (_, __, {logginUser}) => {
      const myCompany = await client.user.findUnique({
        where: {id: logginUser.id},
        select: {ownCompany: true},
      });
      return myCompany.ownCompany;
    },
    // hasCompanyCount: async (_, __, {logginUser}) => {
    //   const me = await client.user.findFirst({
    //     where: {id: logginUser.id},
    //     select: {ownCompany: true},
    //   });
    //   return me.ownCompany.length;
    // },
    // manageCompany: async (_, __, {logginUser}) => {
    //   const company = await client.user.findFirst({
    //     where: {id: logginUser.id},
    //     select: {isManage: true},
    //   });

    //   return company.isManage;
    // },
    // manageCompanyCount: async (_, __, {logginUser}) => {
    //   const company = await client.user.findFirst({
    //     where: {id: logginUser.id},
    //     select: {isManage: true},
    //   });

    //   return company.isManage.length;
    // },
  },
} as Resolvers;
