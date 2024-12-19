// ℹ️ Gets access to environment variables/settings
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.use(express.json());

// 👇 Start handling routes here
app.get("/", (req, res) => {
  res.json("All good in here");
});

// Example route for /api/events (for logging purpose)
app.use((req, res, next) => {
  console.log(`Request received at: ${req.originalUrl}`);
  next();
});

// Routes
const userRoutes = require("./routes/user.routes");
app.use("/api/user", userRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/api/events", eventRoutes);

const adoptionRoutes = require("./routes/adoption.routes");
app.use("/api/adoptions", adoptionRoutes);

// Upload route
const uploadRoute = require("./routes/cloudinary.routes");
app.use("/uploads", uploadRoute);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling
require("./error-handling")(app);

module.exports = app;
