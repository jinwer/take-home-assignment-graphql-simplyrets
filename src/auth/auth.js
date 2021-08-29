const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const logger = require("../logger");

// TODO: hardcoded for now. could use random seed/salt
const SECRET = "side-abc123";

passport.use(
  new LocalStrategy((username, password, done) => {
    logger.info("authenticating");
    if (!username) {
      logger.warn("auth error!");
      return done(new Error("auth error!!!"), false, {
        message: "need a username",
      });
    }
    if (!password) {
      logger.warn("auth error!");
      return done(new Error("auth error!!!"), false, {
        message: "need a password",
      });
    }

    // TODO: hardcoded for now
    if (username !== "user1@sideinc.com" || password !== "676cfd34-e706-4cce-87ca-97f947c43bd4") {
      logger.warn("auth error!");
      return done(new Error("auth error!!!"), false, {
        message: "auth error!!!",
      });
    }

    // TODO: expiration
    const token = jwt.sign({ username, password }, SECRET);
    logger.info("auth done");

    return done(null, token);
  })
);

const init = () => passport.initialize();

const local = (req, res, next) =>
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      logger.warn("need auth to continue");
      return res.send(401, "need auth");
    }
    logger.info("auth  ok");
    res.send(user);
  })(req, res, next);

const getUser = (token) => {
  return jwt.verify(token, SECRET, (err, user) => {
    if (err) return "";
    return user.username;
  });
};

module.exports = {
  init,
  local,
  getUser,
};
