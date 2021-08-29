const { ApolloServer, AuthenticationError } = require('apollo-server-express');
// const logger = require('../logger');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
});

module.exports = server;

