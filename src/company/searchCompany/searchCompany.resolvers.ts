import {Company} from "@prisma/client";
import client from "../../prismaClient";
import {Resolvers} from "../../types";
import {protectResolver} from "../../user/user.util";

export default {
  Query: {
    searchCompany: protectResolver(
      async (_, {companyName}: Company, {logginUser}) => {
        const resultCompany = await client.company.findUnique({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
        });
        return resultCompany;
      }
    ),
  },
} as Resolvers;
