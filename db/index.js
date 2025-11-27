const mongoose = require("mongoose");

// Use environment variables for the MongoDB URIs
const mongoUriOnline =
  process.env.MONGODB_URI ||
  "mongodb+srv://anonymousbapt:BHQvso7h6M6Tk5VW@module-3-back-end.xbckh.mongodb.net";
const mongoUriLocal =
  process.env.MONGODB_URI_LOCAL || "mongodb://localhost:27017";

// Select the URI based on the environment
// On Vercel, NODE_ENV is automatically set to 'production'
// If MONGODB_URI is set, use it (production), otherwise use local
const isProduction =
  process.env.NODE_ENV === "production" || process.env.MONGODB_URI;
const uri = isProduction ? mongoUriOnline : mongoUriLocal;

console.log("[DB] Environment:", process.env.NODE_ENV || "not set");
console.log("[DB] Using:", isProduction ? "production" : "local", "database");
console.log(
  "[DB] MongoDB URI:",
  uri.replace(/:\/\/[^:]+:[^@]+@/, "://***:***@")
);

// Attempt to connect to MongoDB
mongoose
  .connect(uri)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`[DB] Connected to MongoDB! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("[DB] Error connecting to MongoDB:", err.message);
    console.error("[DB] Full error:", err);
  });
