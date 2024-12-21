require("dotenv").config(); // Load environment variables from a .env file

const app = require("./app");

// Set the port from environment variables or default to 5005
const PORT = process.env.PORT || 5005;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on http://localhost:${PORT}`
  );
});
