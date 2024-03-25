import client from "../../prismaClient";
import {protectResolver} from "../user.util";

export default {
  Query: {
    seeMyprofile: protectResolver((_, __, {logginUser}) =>
      client.user.findUnique({where: {id: logginUser.id}})
    ),
  },
};
