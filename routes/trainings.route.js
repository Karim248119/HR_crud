const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

const trainingController = require("../controller/trainings.controller");
const ValidationSchema = require("../middleware/Validation");

router
  .route("/")
  .get(trainingController.getAllTrainings)
  .post(
    ValidationSchema(),
    upload.single("img"),
    trainingController.addTraining
  );

router
  .route("/:trainingId")
  .get(trainingController.getSingleTraining)
  .patch(trainingController.updateTraining)
  .delete(trainingController.deleteTraining);

module.exports = router;
