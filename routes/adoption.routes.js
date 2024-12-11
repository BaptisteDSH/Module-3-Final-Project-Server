const router = require("express").Router();
const AdoptionModel = require("../models/Adoption.model");
const UserModel = require("../models/Adoption.model");

//Create one adoption
router.post("/", async (req, res, next) => {
  const { description, pet, picture, user } = req.body;
  if (!description || !pet || !pet.name || !picture || !user) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }

  try {
    AdoptionModel.create({
      description,
      pet,
      picture,
      user,
    });
    console.log("Adoption created:");
    res.status(201).json({ message: "Adoption successfully created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Get All Adoptions
router.get("/", async (req, res, next) => {
  AdoptionModel.find({})
    .then((adoptions) => {
      console.log("Retrieved adoptions -->", adoptions);
      res.json(adoptions);
    })
    .catch((error) => {
      console.error("Error while reretieving adoptions -->", error);
      next(error);
    });
});

//Get All Adoptions by UserId
router.get("/user/:userId", (req, res, next) => {
  AdoptionModel.find({ user: req.params.userId })
    .populate("user")
    .then((adoptions) => res.status(200).json(adoptions))
    .catch((error) => next(error));
});

//Get one adoption by their ID
router.get("/:adoptionId", (req, res, next) => {
  AdoptionModel.findById(req.params.adoptionId)
    .populate("user")
    .then((oneAdoption) => {
      if (!oneAdoption) {
        return res.status(404).json({ message: "Adoption not found" });
      }
      console.log("One adoption found", oneAdoption);
      res.json(oneAdoption);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

//Updating one adoption
router.put("/:adoptionId", async (req, res, next) => {
  try {
    const updatedAdoption = await AdoptionModel.findByIdAndUpdate(
      req.params.adoptionId,
      req.body,
      { new: true }
    ).populate("user");
    if (updatedAdoption) {
      res
        .status(200)
        .json({ message: "Adoption successfully updated", updatedAdoption });
    } else {
      const error = new Error("There was an issue updating the adoption");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Delete the specified adoption by Id
router.delete("/:adoptionId", (req, res, next) => {
  AdoptionModel.findByIdAndDelete(req.params.adoptionId)
    .then((oneAdoption) => {
      if (!oneAdoption) {
        return res.status(404).json({ message: "Adoption not found" });
      }
      console.log("One adoption deleted", oneAdoption);
      res.status(204).json(oneAdoption);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
