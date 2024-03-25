import {User} from "@prisma/client";
import {protectResolver} from "../user.util";
import client from "../../prismaClient";

export default {
  Query: {
    searchUsers: protectResolver(
      async (_, {user: {username}}: {user: User}) => {
        const existsUser = await client.user.findFirst({
          where: {username},
        });

        if (!existsUser) {
          return {
            ok: false,
            errorrMsg: "찾으시는 회사 혹은 유저가 존재하지 않습니다.",
          };
        }
        return existsUser;
      }
    ),
  },
};
