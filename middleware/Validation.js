const { body } = require("express-validator");

const ValidationSchema = () => {
  return [body("name").notEmpty().isLength({ min: 2 })];
};
module.exports = ValidationSchema;
