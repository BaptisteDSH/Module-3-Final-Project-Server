const mongoose = require("mongoose");
require("dotenv").config();
require("../db");

const Event = require("../models/Event.model");

mongoose.connection.once("open", async () => {
  try {
    const count = await Event.countDocuments();
    const events = await Event.find({}).limit(50).lean();
    console.log(`Found ${count} event(s)`);
    console.log(JSON.stringify(events, null, 2));
  } catch (err) {
    console.error("Error querying events:", err);
  } finally {
    process.exit(0);
  }
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
  process.exit(1);
});
