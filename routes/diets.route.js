const express = require("express");

const router = express.Router();

const dietsController = require("../controller/diets.controller");
const ValidationSchema = require("../middleware/Validation");

router
  .route("/")
  .get(dietsController.getAllDiets)
  .post(ValidationSchema(), dietsController.addDiet);

router
  .route("/:dietId")
  .get(dietsController.getSingleDiet)
  .patch(dietsController.updateDiet)
  .delete(dietsController.deleteDiet);

module.exports = router;
