const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middlewares");




//Sign Up route
router.post("/signup", async (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    location,
    age,
    description,
    picture,
    phone,
    pet,
  } = req.body;
  try {
    const emailAlreadyTaken = await UserModel.findOne({ email });
    if (emailAlreadyTaken)
      res.status(403).json({ messsage: "Invalid Credentials" });
    else {
      const salt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(password, salt);
      const createdUser = await UserModel.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        location,
        age,
        description,
        picture,
        phone,
        pet,
      });
      res.status(201).json({ data: createdUser });
      return;
    }
    const createdUser = await User.create(req.body);
    console.log("user created", createdUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sign Up Error" });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      // preparing the password check
      const dbPassword = foundUser.password;
      const frontEndPassword = password;
      // doing the password check
      const passwordsMatch = bcryptjs.compareSync(frontEndPassword, dbPassword);
      console.log("dbPassword:", dbPassword);
      console.log("frontEndPassword:", frontEndPassword);
      if (passwordsMatch) {
        const { _id, name } = foundUser;
        const payLoad = { _id, name };
        const authToken = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        console.log("the Token is :", authToken);
        res.status(200).json({ message: "Successful Login", authToken });
      } else {
        const error = new Error("Invalid password");
        error.statusCode = 500;
        throw error;
      }
    } else {
      const error = new Error("Invalid email");
      error.statusCode = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

//Verify route
router.get("/verify", isAuthenticated, (req, res) => {
  // console.log("made it to verify route", req.payLoad);
  res.status(200).json(req.payLoad.currentUser);
});

//Get one user by their ID
router.get("/:userId", (req, res, next) => {
  UserModel.findById(req.params.userId)
    .then((oneUser) => {
      console.log("One user found", oneUser);
      res.json(oneUser);
    })
    .catch((error) => {
      next(error);
    });
});

//Updating one user
router.put("/:userId", async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User successfully updated", updatedUser });
    } else {
      const error = new Error("There was an issue updating the user");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

//Delete the specified user by Id
router.delete("/:userId", (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.userId)
    .then((oneUser) => {
      console.log("One User deleted", oneUser);
      res.status(204).json(oneUser);
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
