import express from "express";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import mongoose from "mongoose";
const session = require("express-session");
import passport from "./config/passport";
import cors from "cors";

passport;

// Routes variables
let apiRouter = require("./routes/api");

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
// connects with react app
app.use("/", express.static(path.join(__dirname, "..", "client", "build")));

// entry point for api
app.use("/api", apiRouter);

app.listen(process.env.PORT || 8080);
