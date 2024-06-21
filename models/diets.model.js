const { default: mongoose } = require("mongoose");

const dietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  tips: {
    type: Array,
    required: true,
  },

  info: {
    description: {
      type: String,
      required: true,
    },

    avoid: {
      type: Array,
      required: false,
    },
    friendly: {
      type: Array,
      required: false,
    },
  },
  moreInfo: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Diet", dietSchema);
