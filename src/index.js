const express = require('express');
const morgan = require('morgan');

const logger = require('./logger');
const gqlServer = require('./graphql');

const app = express();
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const server = (async () => {
    await gqlServer.start();
    gqlServer.applyMiddleware({ app });
    return app.listen(4000, () => {
      logger.info("hi, I am listening to 4000")
      logger.info('graphql path' + gqlServer.graphqlPath)
    });
  })();
  
  module.exports = server;
  