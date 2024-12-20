// ℹ️ Package responsible to make the connection with MongoDB
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app
console.log("here is our mongo db uri", process.env.MONGODB_URI);

const mongoUriOnline =
  "mongodb+srv://anonymousbapt:uzhmK5iR2Sn7TMdx@module-3-back-end.xbckh.mongodb.net/";
const mongoUriLocal = "mongodb://localhost:27017/";

let uri =
  process.env.NODE_ENV === "production" ? mongoUriOnline : mongoUriLocal;

mongoose
  .connect(uri)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
