const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  mandate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);
