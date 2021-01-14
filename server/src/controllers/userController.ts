import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import Post from "../models/post";

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
    if (err) next(err);
    res.json(user);
  });
};

export const get_user_posts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Post.find({ user: req.params.userid }, (err: any, posts: any) => {
    if (err) next(err);

    res.json(posts);
  }).populate("user");
};

// Get all users
export const get_users = (req: Request, res: Response, next: NextFunction) => {
  User.find((err: any, users: any) => {
    if (err) return res.json(err);
    res.json(users);
  });
};

// add friends
// userA can goto profile
// send friend request to userB
// request added to userB friendRequests
// userB receives request and can decline or accept
// if accept:
// userB added to userA friendsList and userA added to userB friendsList
// friendRequest removed from userB friendRequests
// else:
// remove request

// send friendRequest
export const send_request = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // find the user from the req params
  User.findOne({ _id: req.params.userid2 }, (err: Error, user: any) => {
    if (err) return res.json(err);
    // adds the value of user1 _id to friendRequests array of user2
    user.friendRequests.push(req.params.userid1);

    return res.status(200).json({ user1: req.params.userid1, user2: user._id });
  });
};

export const get_requests = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get requests for user
  User.findById(req.params.userid, (err: Error, user: any) => {
    if (err) return res.json(err);

    // success

    // returns friendRequests of users after populating
    return res.status(200).json(user.friendRequests);
  }).populate("friendRequests");
};

// accept friend request
// api route will have userid1 and userid2
// userid1 = user that is accepting request FROM userid2
export const accept_request = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // find user1
  User.findById(req.params.userid1, (err: Error, user1: any) => {
    if (err) next(err); // might want return res.json instead

    // success
    User.findById(req.params.userid2),
      (err: Error, user2: any) => {
        if (err) next(err); // might want return res.json instead

        // success

        // 2 way friend add
        user1.friendsList.push(user2);
        user2.friendsList.push(user1);

        //const newList = user1.friendsList;

        // removes the the user2 friendRequest
        user1.friendRequests.splice(user1.friendRequests.indexOf(user2));
      };
  }).populate("friendRequests");
};

// handle reject request

// handle remove friend
