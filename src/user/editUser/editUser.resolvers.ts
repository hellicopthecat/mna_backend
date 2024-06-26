import bcrypt from "bcrypt";
import {User} from "@prisma/client";
import {protectResolver} from "../user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    editUser: protectResolver(
      async (
        _,
        {password, firstName, lastName, avatar, phone}: User,
        {logginUser}
      ) => {
        try {
          let newHashPw: string;
          if (password?.length < 3) {
            return {
              ok: false,
              errorMsg: "3자 이상으로 작성해야합니다.",
            };
          }
          if (password) {
            newHashPw = await bcrypt.hash(password, 10);
          }

          const userUpdate = await client.user.update({
            where: {id: logginUser.id},
            data: {firstName, lastName, password: newHashPw, phone},
          });
          if (userUpdate) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              errorMsg: "프로필을 업데이트할 수 없습니다.",
            };
          }
        } catch (err) {
          return err;
        }
      }
    ),
  },
};
