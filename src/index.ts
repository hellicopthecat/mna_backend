import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import http from "http";
import {typeDefs, resolvers} from "./schema";

const PORT = 4000;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(() => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );
});
httpServer.listen(PORT, () => {
  console.log(`✅ Server is Listen http://localhost:${PORT}/graphql`);
});
