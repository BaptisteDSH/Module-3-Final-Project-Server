// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it
// Use the environment variable or fallback to the local MongoDB URI
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/our-backend";

// Log the URI for debugging purposes (optional, avoid in production for security)
console.log("MongoDB URI:", MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Recommended options for Mongoose
  })
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
    process.exit(1); // Exit the process if the connection fails
  });
