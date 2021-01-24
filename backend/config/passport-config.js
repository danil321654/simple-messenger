const {Strategy, ExtractJwt} = require("passport-jwt");
require("dotenv").config();
const User = require("../models/user");

const applyPassportStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.secret;
  passport.use(
    new Strategy(options, (payload, done) => {
      console.log(payload);
      User.findOne({email: payload.email}, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, {
            email: user.email,
            _id: user["_id"]
          });
        }
        return done(null, false);
      });
    })
  );
};

module.exports = applyPassportStrategy;
