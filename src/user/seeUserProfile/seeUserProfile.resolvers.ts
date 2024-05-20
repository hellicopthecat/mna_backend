import {User} from "@prisma/client";
import {protectResolver} from "../user.util";
import client from "../../prismaClient";

export default {
  Query: {
    seeUserProfile: protectResolver(async (_, {username}: User) => {
      const existsUser = await client.user.findUnique({where: {username}});
      if (!existsUser) {
        return {
          ok: false,
          errorMsg: "유저가 존재하지 않습니다.",
        };
      }
      return existsUser;
    }),
  },
};
