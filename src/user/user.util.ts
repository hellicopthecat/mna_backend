import jwt, {JwtPayload} from "jsonwebtoken";
import client from "../prismaClient";
import {Context, Resolver} from "../types";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const {id} = jwt.verify(token, process.env.TOKEN_SECRET_KEY) as JwtPayload;
    const user = await client.user.findUnique({where: {id}});

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectResolver =
  (resovler: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.logginUser) {
      return {
        ok: false,
        errorMsg: "로그인 후 사용 가능합니다.",
      };
    }
    return resovler(root, args, context, info);
  };
