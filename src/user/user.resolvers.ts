import {Company, User} from "@prisma/client";
import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  User: {
    companyId: async (_, __, {logginUser}) => {
      const company = await client.company.findFirst({
        where: {id: logginUser.companyId},
      });
      return company.id;
    },
    companyName: async (_, __, {logginUser}) => {
      const company = await client.company.findFirst({
        where: {companyManager: {some: {id: logginUser.id}}},
      });
      return company.companyName;
    },

    myCompany: (_, __, {logginUser}) =>
      client.company.findFirst({
        where: {
          companyManager: {
            some: {id: logginUser.id},
          },
        },
      }),
  },
} as Resolvers;
