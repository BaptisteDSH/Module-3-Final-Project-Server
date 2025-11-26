const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (app) => {
  const allowedOrigins = [
    "https://pawty.netlify.app", // Production frontend
    "https://thunderous-bavarois-8fd281.netlify.app", // Production frontend alternate
    "http://localhost:5173", // Local development frontend
    "http://localhost:3000", // Local development alternate
  ];

  app.use(logger("dev"));

  app.use(
    cors({
      origin: (origin, callback) => {
        console.log("CORS request from origin:", origin);
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.log("CORS blocked origin:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
      allowedHeaders: "Content-Type,Authorization",
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
