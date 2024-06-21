const express = require("express");

const router = express.Router();

const workoutController = require("../controller/workouts.controller");
const ValidationSchema = require("../middleware/Validation");

router
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(ValidationSchema(), workoutController.addWorkout);

router
  .route("/:workoutId")
  .get(workoutController.getSingleWorkout)
  .patch(workoutController.updateWorkout)
  .delete(workoutController.deleteWorkout);

module.exports = router;
