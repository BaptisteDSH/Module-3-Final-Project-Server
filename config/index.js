const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (app) => {
  // Allow proxies (necessary for hosting platforms like Vercel)
  app.set("trust proxy", 1);

  // List of allowed origins
  const allowedOrigins = [
    "http://localhost:5173", // For local development
    "https://genuine-zabaione-f61f6a.netlify.app", // Production frontend
  ];

  // CORS middleware
  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        // Allow requests if origin is in the list or not provided (e.g., Postman)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.error(`CORS error: Origin ${origin} is not allowed.`);
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );

  // Logging middleware
  app.use(logger("dev"));

  // Middleware to parse JSON and URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
