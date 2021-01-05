const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
import User from "../models/user";
import bcrypt from "bcryptjs";

// LocalStrategy
passport.use(
  new LocalStrategy((username: string, password: string, done: any) => {
    User.findOne({ username: username }, (err: any, user: any) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Incorrect username" });
      bcrypt.compare(password, user.password, (err: any, res: any) => {
        if (res) {
          return done(null, user);
        }
        if (!res) {
          // Password don't match
          return done(null, false, { msg: "Incorrect password" });
        }
        return done(null, user, { message: "Logged In successfully" });
      });
    });
  })
);

// app.js will pass global passport object here
// function will config it

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwt_payload: any, done: any) {
      // JWT is valid
      return done(null, jwt_payload);
    }
  )
);

module.exports = passport;
