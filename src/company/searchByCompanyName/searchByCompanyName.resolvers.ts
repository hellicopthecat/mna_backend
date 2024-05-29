import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Query: {
    searchByCompanyName: protectResolver(async (_, {companyName}: Company) => {
      const findCompany = await client.company.findMany({where: {companyName}});
      return findCompany;
    }),
  },
};
