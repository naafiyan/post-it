import passport from "passport";
var JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var LocalStrategy = require("passport-local").Strategy;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

// TODO: implement jwt

// setting up passport
// setting up local strategy
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

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    (jwtPayload: any, done: any) => {
      User.findById(jwtPayload._id)
        .then((user: any) => {
          return done(null, user);
        })
        .catch((err: any) =>
          done(err, false, { message: "Token not matched" })
        );
      return done(null, jwtPayload);
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err: any, user: any) {
    done(err, user);
  });
});

export const login_user = (req: any, res: any, next: any) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Could not authenticate",
        user,
      });
    }
    if (err) res.send(err);

    //Success
    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "",
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      (err: any, token: any) => {
        if (err) next(err);
        res.status(200).json({
          token: token,
          user: user,
        });
      }
    );
  })(req, res);
};

export const signup_user = (req: any, res: any, next: any) => {
  // const { username } = req.body;
  bcrypt.hash(req.body.password, 10, (err: any, hashedPassword: any) => {
    if (err) next(err);

    // add checks for same email
    // User.findOne({ username: username }, (err: any, user: any) => {
    //   if (err) next(err);
    //   if (user) {
    //     return res
    //       .status(400)
    //       .json({ message: "User with username already exists!" });
    //   }
    // });
    // Success so hash password and save user
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    user.save((err: any) => {
      if (err) next(err);

      // Success

      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || "",
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
        (err: any, token: any) => {
          if (err) next(err);
          res.status(200).json({
            token: token,
            user: user,
          });
        }
      );
    });
  });
};

// Get one user
export const get_user = (req: any, res: any, next: any) => {
  User.findById(req.params.userid, (err: any, user: any) => {
    res.json(user);
  });
};

// Get all users
export const get_users = (req: any, res: any, next: any) => {
  User.find((err: any, users: any) => {
    if (err) return res.json(err);
    res.json(users);
  });
};

export const checkAuth = (req: any, res: any, next: any) => {
  const authenticated: boolean = typeof req.user !== "undefined";

  res.status(200).json({
    authenticated,
  });
};
