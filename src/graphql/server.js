const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const logger = require("../logger");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const auth = require("../auth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authorization = req?.headers?.authorization || "";
    if (authorization) {
      const token = authorization.split(" ")[1];
      if (token) {
        logger.info(`token: ${token}`);
        const user = auth.getUser(token);
        if (user) return user;
      }
    }
    logger.warn("auth failed");
    throw new AuthenticationError("you must be logged in");
  },
});

module.exports = server;
