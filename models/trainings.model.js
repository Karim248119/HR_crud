const { default: mongoose } = require("mongoose");

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  bg: {
    type: String,
    required: true,
  },
  trainings: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("Training", trainingSchema);
