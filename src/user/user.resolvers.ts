import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  User: {
    isOwner: async (_, __, {logginUser}) => {
      const {id: userID, username} = await client.user.findUnique({
        where: {id: logginUser.id},
        select: {id: true, username: true},
      });
      const {id: companyOwnerId, companyOwner} = await client.company.findFirst(
        {
          where: {companyManager: {some: {id: userID}}},
        }
      );
      const MATCH_ID = userID === companyOwnerId;
      const MATCH_OWNER = username === companyOwner;
      return MATCH_ID && MATCH_OWNER;
    },
    isAdmin: async (_, __, {logginUser}) => {
      const {id: userID} = await client.user.findUnique({
        where: {id: logginUser.id},
        select: {id: true},
      });
      const {id: companyOwnerId} = await client.company.findFirst({
        where: {companyManager: {some: {id: userID}}},
      });
      const MATCH_ID = userID === companyOwnerId;
      return MATCH_ID;
    },
    isManager: async (_, __, {logginUser}) =>
      await client.company.findMany({
        where: {
          companyManager: {
            some: {id: logginUser.id},
          },
        },
        select: {
          companyName: true,
        },
      }),
    company: (_, __, {logginUser}) =>
      client.company.findMany({
        where: {
          companyManager: {
            some: {id: logginUser.id},
          },
        },
      }),
  },
} as Resolvers;
