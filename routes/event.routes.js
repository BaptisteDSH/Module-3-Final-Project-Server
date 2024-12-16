const router = require("express").Router();
const EventModel = require("../models/Event.model");

//Post an event
router.post("/create", (req, res, next) => {
  console.log(req.body);
  EventModel.create(req.body)
    .then((createdEvent) => {
      res.status(201).json(createdEvent);
    })
    .catch((error) => {
      next(error);
    });
});

//Get all events
router.get("/", (req, res, next) => {
  EventModel.find({})
    .then((events) => {
      // console.log("Retrieved events -->", events);
      res.json(events);
    })
    .catch((error) => {
      console.error("Error while reretieving events -->", error);
      next(error);
    });
});

//Get specific event by ID

router.get("/:eventId", (req, res, next) => {
  EventModel.findById(req.params.eventId)
    .populate("organizerId")
    .then((oneEvent) => {
      console.log("here is one event", oneEvent);
      res.status(200).json(oneEvent);
    })
    .catch((err) => {
      next(err);
    });
});

//Get All Events by UserId
router.get("/organizer/:organizerId", (req, res, next) => {
  EventModel.find({ organizerId: req.params.userId })
    .populate("organizerId")
    .then((events) => res.status(200).json(events))
    .catch((error) => next(error));
});

//Update an event by ID
router.put("/:eventId", (req, res, next) => {
  EventModel.findByIdAndUpdate(req.params.eventId, req.body, { new: true })
    .then((updatedEvent) => {
      res.status(200).json(updatedEvent);
    })

    .catch((error) => {
      next(error);
    });
});

//Delete an event by ID
router.delete("/:eventId", (req, res, next) => {
  EventModel.findByIdAndDelete(req.params.eventId)
    .then((deletedEvent) => {
      console.log("event deleted", deletedEvent);
      res.status(204).json(deletedEvent);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
