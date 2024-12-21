// ℹ️ Package responsible for making the connection with MongoDB
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// Log the MongoDB URI for debugging purposes
console.log(
  "MongoDB URI:",
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_LOCAL
);

// Use environment variables for the MongoDB URIs
const mongoUriOnline =
  process.env.MONGODB_URI ||
  "mongodb+srv://anonymousbapt:uzhmK5iR2Sn7TMdx@module-3-back-end.xbckh.mongodb.net/";
const mongoUriLocal =
  process.env.MONGODB_URI_LOCAL || "mongodb://localhost:27017/";

// Select the URI based on the environment
const uri =
  process.env.NODE_ENV === "production" ? mongoUriOnline : mongoUriLocal;

// Attempt to connect to MongoDB
mongoose
  .connect(uri) // No need for useNewUrlParser or useUnifiedTopology
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to MongoDB! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });
