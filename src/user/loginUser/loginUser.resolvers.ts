import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "@prisma/client";
import client from "../../prismaClient";
import {Resolvers} from "../../types";

export default {
  Mutation: {
    loginUser: async (_, {username, password}: User) => {
      try {
        const existsUser = await client.user.findFirst({where: {username}});
        if (!existsUser) {
          return {
            ok: false,
            errorMsg: "가입된 이메일계정이 존재하지 않습니다.",
          };
        }
        const confirmPassword = await bcrypt.compare(
          password,
          existsUser.password
        );
        if (!confirmPassword) {
          return {
            ok: false,
            errorMsg: "비밀번호가 일치하지 않습니다.",
          };
        }
        const token = jwt.sign(
          {
            id: existsUser.id,
            username: existsUser.username,
            email: existsUser.email,
          },
          process.env.TOKEN_SECRET_KEY
        );
        return {
          ok: true,
          token,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
} as Resolvers;
