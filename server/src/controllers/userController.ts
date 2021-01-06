import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

import { body, validationResult } from "express-validator";

import { NextFunction, Request, Response } from "express";
// TODO: implement jwt

export const login_user = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Could not authenticate",
      });
    }
    if (err) res.send(err);

    //Success
    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "",
      // {
      //   expiresIn: process.env.JWT_EXPIRES_IN,
      // },
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

export const signup_user = [
  // Sanitization
  body("username", "Username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email must be specified")
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;
    User.findOne(
      { username },
      (
        err: any,
        user: { username: string; password: string; email: string }
      ) => {
        if (user)
          return res.status(400).json({
            message: "User with this username already exists",
          });

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) console.log(err);
          const user: any = new User({
            username: username,
            password: hashedPassword,
            email: email,
          });

          user.save((err: any) => {
            if (err) throw Error(err);
            // saved

            const token = jwt.sign(
              { _id: user._id, username: user.username },
              process.env.JWT_SECRET || ""
              //{ expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(200).json({
              token,
              user: user,
              message: "Signed up Successfully",
            });
          });
        });
      }
    );
  },
];

// Get one user
export const get_user = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userid, (err: any, user: any) => {
    res.json(user);
  });
};

// Get all users
export const get_users = (req: Request, res: Response, next: NextFunction) => {
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
