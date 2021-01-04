import express from "express";
import path from "path";
import "dotenv/config";
import mongoose from "mongoose";
import passport from "passport";
var LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

let cors = require("cors");

// Routes variables
let indexRouter = require("./routes/index");
let postsRouter = require("./routes/posts");
let usersRouter = require("./routes/users");

const app = express();

// MongoDB
mongoose.connect(process.env.MONGO_DB || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// middleware
app.use(cors());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT);
