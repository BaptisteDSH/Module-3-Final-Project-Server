// api/index.js
require("dotenv").config();
require("../db");

const express = require("express");
const app = express();

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
