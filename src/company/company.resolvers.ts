import {Company} from "@prisma/client";
import client from "../prismaClient";
import {Resolvers} from "../types";

export default {
  Company: {
    companyOwner: async ({id}: Company) => {
      const {companyOwner} = await client.company.findUnique({
        where: {id},
        select: {companyOwner: true},
      });
      return companyOwner;
    },
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
    connectedCompany: async ({id}: Company, __, {logginUser}) => {
      const {connectedCompany} = await client.company.findUnique({
        where: {id, companyManager: {some: {id: logginUser.id}}},
        select: {connectedCompany: true},
      });
      return connectedCompany;
    },
    connectedCompanyCount: async ({id}: Company, __, {logginUser}) => {
      const {connectedCompany} = await client.company.findUnique({
        where: {id, companyManager: {some: {id: logginUser.id}}},
        select: {connectedCompany: true},
      });
      return connectedCompany.length;
    },
    connectingCompany: async ({id}: Company, __, {logginUser}) => {
      const {connectingCompany} = await client.company.findUnique({
        where: {id, companyManager: {some: {id: logginUser.id}}},
        select: {connectingCompany: true},
      });
      return connectingCompany;
    },
    connectingCompanyCount: async ({id}: Company, __, {logginUser}) => {
      const {connectingCompany} = await client.company.findUnique({
        where: {id, companyManager: {some: {id: logginUser.id}}},
        select: {connectingCompany: true},
      });
      return connectingCompany.length;
    },
  },
} as Resolvers;
