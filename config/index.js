const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (app) => {
  app.set("trust proxy", 1);

  // CORS middleware
  app.use(
    cors({
      origin: [process.env.ORIGIN],
    })
  );

  // // Explicitly set CORS headers for all responses
  // app.use((req, res, next) => {
  //   const origin = req.headers.origin;
  //   if (allowedOrigins.includes(origin)) {
  //     res.setHeader("Access-Control-Allow-Origin", origin);
  //     res.setHeader("Access-Control-Allow-Credentials", "true");
  //   }
  //   next();
  // });

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
