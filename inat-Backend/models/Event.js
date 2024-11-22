const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: { type: [String], default: [] },
});

module.exports = mongoose.model("Event", eventSchema);
