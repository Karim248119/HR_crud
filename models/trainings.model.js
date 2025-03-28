const { default: mongoose } = require("mongoose");

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  bg: {
    type: String,
    required: false,
  },
  trainings: [
    {
      name: { type: String, required: true },
      img: { type: String, required: false },
      equipment: { type: Array, required: true },
      primaryMuscles: { type: Array, required: true },
    },
  ],
});

module.exports = mongoose.model("Training", trainingSchema);
