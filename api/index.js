// api/index.js
console.log("[API] Starting API server...");
console.log("[API] NODE_ENV:", process.env.NODE_ENV);

require("dotenv").config();
console.log("[API] Environment variables loaded");

require("../db");
console.log("[API] Database connection initiated");

const express = require("express");
const cors = require("cors");
const app = express();

console.log("[API] Express app created");

// CORS configuration - must be before routes
const allowedOrigins = [
  "https://pawty.netlify.app",
  "https://thunderous-bavarois-8fd281.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        console.log("CORS blocked:", origin);
        return callback(
          new Error("Not allowed by CORS - origin: " + origin),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configuration middleware
require("../config")(app);
app.use(express.json());

// Routes
const userRoutes = require("../routes/user.routes");
app.use("/api/user", userRoutes);

const eventRoutes = require("../routes/event.routes");
app.use("/api/events", eventRoutes);

const adoptionRoutes = require("../routes/adoption.routes");
app.use("/api/adoptions", adoptionRoutes);

const uploadRoute = require("../routes/cloudinary.routes");
app.use("/uploads", uploadRoute);

// Error handling
require("../error-handling")(app);

// Route par défaut pour tester
app.get("/", (req, res) => {
  res.json({
    message: "Pawty API is running! 🐾",
    endpoints: ["/api/user", "/api/events", "/api/adoptions", "/uploads"],
  });
});

module.exports = app;
