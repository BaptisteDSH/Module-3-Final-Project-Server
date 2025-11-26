const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (app) => {
  const allowedOrigins = [
    "https://pawty.netlify.app", // Production frontend
    "http://localhost:5173", // Local development frontend
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
