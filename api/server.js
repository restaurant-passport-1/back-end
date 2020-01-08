const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router");
const passRouter = require("../passport/passport-router");
const restricted = require("../auth/auth-middleware");
const yelpRouter = require("./yelp-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/auth/passport", restricted, passRouter);
server.use("/api/auth/restaurants", yelpRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Restaurant Passport is LIVE" });
});

module.exports = server;
