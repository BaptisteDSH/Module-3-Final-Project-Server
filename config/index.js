const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (app) => {
  // Configure CORS to dynamically handle local and production origins
  const allowedOrigins = [
    "https://pawty.netlify.app", // Production frontend
    "http://localhost:5173", // Local frontend
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: "GET,POST,PUT,DELETE", // Allowed methods
      allowedHeaders: "Content-Type,Authorization", // Allowed headers
    })
  );

  // Middleware configuration
  app.use(logger("dev")); // Log requests in dev mode
  app.use(express.json()); // Parse JSON body
  app.use(express.urlencoded({ extended: false })); // Parse URL-encoded body
  app.use(cookieParser()); // Parse cookies
};
