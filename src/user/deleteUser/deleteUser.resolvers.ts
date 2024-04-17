import {User} from "@prisma/client";
import {protectResolver} from "../user.util";
import bcrypt from "bcrypt";
import client from "../../prismaClient";

export default {
  Mutation: {
    deleteUser: protectResolver(async (_, {password}: User, {logginUser}) => {
      const existsUser = await client.user.findUnique({
        where: {id: logginUser.id},
      });
      if (!existsUser) {
        return {
          ok: false,
          errorMsg: "해당 유저가 아닙니다.",
        };
      }
      const confirmPass = await bcrypt.compare(password, logginUser.password);
      if (!confirmPass) {
        return {
          ok: false,
          errorMsg: "비밀번호가 틀렸습니다.",
        };
      }
      const deleteUserResult = await client.user.delete({
        where: {id: logginUser.id},
      });
      if (!deleteUserResult) {
        return {
          ok: false,
          errorMsg: "유저 정보를 삭제하는데 실패했습니다.",
        };
      }
      return {
        ok: true,
      };
    }),
  },
};
