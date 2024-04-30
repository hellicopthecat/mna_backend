import client from "../../prismaClient";
import {protectResolver} from "../user.util";

export default {
  Query: {
    seeMyprofile: protectResolver(async (_, __, {logginUser}) => {
      const myProfile = await client.user.findUnique({
        where: {id: logginUser.id},
      });
      return myProfile;
    }),
  },
};
