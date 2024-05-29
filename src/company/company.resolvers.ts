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
    isManager: async ({id}: Company, __, {logginUser}) => {
      const manager = await client.company.findUnique({
        where: {id, companyManager: {some: {id: logginUser.id}}},
      });

      return manager ? true : false;
    },
    companyAdress: async ({id}: Company) => {
      const {companyAdress} = await client.company.findUnique({
        where: {id},
        select: {companyAdress: true},
      });
      return companyAdress;
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
    connectedCompany: async ({id}: Company) => {
      const {connectedCompany} = await client.company.findUnique({
        where: {id},
        select: {
          connectedCompany: {skip: 0, take: 5, orderBy: {createdAt: "desc"}},
        },
      });
      return connectedCompany;
    },
    connectedCompanyCount: async ({id}: Company) => {
      const {connectedCompany} = await client.company.findUnique({
        where: {id},
        select: {connectedCompany: true},
      });
      return connectedCompany.length;
    },
    connectingCompany: async ({id}: Company) => {
      const {connectingCompany} = await client.company.findUnique({
        where: {id},
        select: {
          connectingCompany: {skip: 0, take: 5, orderBy: {createdAt: "desc"}},
        },
      });
      return connectingCompany;
    },
    connectingCompanyCount: async ({id}: Company) => {
      const {connectingCompany} = await client.company.findUnique({
        where: {id},
        select: {connectingCompany: true},
      });
      return connectingCompany.length;
    },
    companyProduct: async ({id}: Company) => {
      const product = await client.company.findUnique({
        where: {id},
        select: {
          companyProduct: {skip: 0, take: 10, orderBy: {createdAt: "desc"}},
        },
      });
      return product.companyProduct;
    },
    companyInNout: async ({id}: Company) => {
      const {inNout} = await client.company.findUnique({
        where: {id},
        select: {inNout: true},
      });
      return inNout;
    },
    companyWorker: async ({id}: Company) => {
      const {worker} = await client.company.findFirst({
        where: {id},
        select: {
          worker: {include: {vacation: {where: {companyId: id}}}},
        },
      });
      const workers = worker.filter((items) =>
        items.vacation.filter((item) => item.companyId === id)
      );
      return workers;
    },
    workerVacation: async ({id}: Company) => {
      const {Vacation} = await client.company.findUnique({
        where: {id},
        select: {Vacation: true},
      });
      const vacation = Vacation.filter((item) => item.companyId === id);
      return vacation;
    },
    workerSalary: async ({id}: Company) => {
      const {Salary} = await client.company.findUnique({
        where: {id},
        select: {Salary: true},
      });
      return Salary;
    },
  },
} as Resolvers;
