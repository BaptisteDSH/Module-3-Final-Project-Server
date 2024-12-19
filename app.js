// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.use(express.json());

// 👇 Start handling routes here

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const userRoutes = require("./routes/user.routes");
app.use("/api/user", userRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/api/events", eventRoutes);

const adoptionRoutes = require("./routes/adoption.routes");
app.use("/api/adoptions", adoptionRoutes);

//import of cloudinary upload route
const uploadRoute = require("./routes/cloudinary.routes");
app.use("/uploads", uploadRoute);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
