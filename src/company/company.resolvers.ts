import {Company} from "@prisma/client";
import client from "../prismaClient";
import {Resolvers} from "../types";

export default {
  Company: {
    isOwned: ({userId}: Company, __, {logginUser}) => {
      return userId === logginUser.id ? true : false;
    },
    isManger: async ({id}: Company, __, {logginUser}) => {
      const manager = await client.company.findUnique({
        where: {id, companyManager: {some: {id: logginUser.id}}},
      });

      return manager ? true : false;
    },
    companyManager: async ({id}: Company, __, {logginUser}) => {
      const targetCompany = await client.company.findMany({
        where: {id},
        select: {
          companyManager: {
            select: {
              id: true,
              createdAt: true,
              updateAt: true,
              username: true,
              email: true,
              firstName: true,
              lastName: true,
              avatar: true,
              isManage: true,
            },
          },
        },
      });
      const manager = targetCompany.map((worker) => worker.companyManager);
      return manager[0];
    },
    connectedCompany: (_, __, {logginUser}) => {},
    connectingCompany: (_, __, {logginUser}) => {},
  },
} as Resolvers;
