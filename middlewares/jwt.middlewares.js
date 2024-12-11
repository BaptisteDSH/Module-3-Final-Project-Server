const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const authorizationHeaders = req.headers.authorization.split(" ");
  try {
    if (authorizationHeaders[0] === "Bearer" && authorizationHeaders[1]) {
      const theToken = authorizationHeaders[1];
      const payLoad = jwt.verify(theToken, process.env.TOKEN_SECRET);
      console.log("Here is the JWT payload: ", payLoad);
      req.payLoad = { currentUser: payLoad };
      next();
    } else {
      res.status(403).json({ message: "No Token Present" });
    }
  } catch (error) {
    res.status(403).json({ Message: "Invalid Token" });
  }
}

module.exports = { isAuthenticated };
