const express = require("express");
const morgan = require("morgan");

const logger = require("./logger");
const auth = require("./auth");
const gqlServer = require("./graphql");
const routes = require("./routes");

const app = express();
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth.init());
app.use(routes);

const server = (async () => {
  await gqlServer.start();
  gqlServer.applyMiddleware({ app });
  return app.listen(4000, () => {
    logger.info("hi, I am listening to 4000");
    logger.info("graphql path" + gqlServer.graphqlPath);
  });
})();

module.exports = server;
