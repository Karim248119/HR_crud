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
  trainings: [
    {
      name: { type: String, required: true },
      img: { type: String, required: false },
      equipment: { type: [String], required: true },
      primaryMuscles: { type: [String], required: true },
    },
  ],
});

module.exports = mongoose.model("Training", trainingSchema);
