import express from "express";
import path from "path";
import "dotenv/config";
import mongoose from "mongoose";
import passport from "passport";
const session = require("express-session");
require("./config/passport");

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// routes
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(3000);
