import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
const session = require("express-session");
import passport from "./config/passport";
dotenv.config();
import cors from "cors";

passport;

// Routes variables
let indexRouter = require("./routes/index");
let postsRouter = require("./routes/posts");
let usersRouter = require("./routes/users");
let commentsRouter = require("./routes/comments");

const app = express();

// MongoDB
mongoose.connect(process.env.MONGO_DB || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// routes
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.listen(process.env.PORT || 8080);
